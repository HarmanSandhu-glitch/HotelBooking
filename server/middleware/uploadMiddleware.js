import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

// Use memory storage instead of CloudinaryStorage
const storage = multer.memoryStorage();

// Configure multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Check file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG and WebP images are allowed.'), false);
        }
    }
});

// Helper function to upload to Cloudinary
const uploadToCloudinary = (fileBuffer, folder = 'hotel-booking') => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: 'auto',
                transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        uploadStream.end(fileBuffer);
    });
};

// Middleware for single image upload
export const uploadSingle = (req, res, next) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return handleUploadError(err, req, res, next);
        }
        
        if (req.file) {
            try {
                const result = await uploadToCloudinary(req.file.buffer);
                req.file.path = result.secure_url;
                req.file.filename = result.public_id;
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Error uploading image to Cloudinary: ' + error.message
                });
            }
        }
        next();
    });
};

// Middleware for multiple images upload (up to 10)
export const uploadMultiple = (req, res, next) => {
    upload.array('images', 10)(req, res, async (err) => {
        if (err) {
            return handleUploadError(err, req, res, next);
        }
        
        if (req.files && req.files.length > 0) {
            try {
                const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
                const results = await Promise.all(uploadPromises);
                
                req.files = req.files.map((file, index) => ({
                    ...file,
                    path: results[index].secure_url,
                    filename: results[index].public_id
                }));
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Error uploading images to Cloudinary: ' + error.message
                });
            }
        }
        next();
    });
};

// Error handling middleware for multer
export const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File size too large. Maximum size is 5MB.'
            });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                success: false,
                message: 'Too many files. Maximum is 10 images.'
            });
        }
        return res.status(400).json({
            success: false,
            message: err.message
        });
    } else if (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
    next();
};

// Helper function to delete image from Cloudinary
export const deleteImage = async (imageUrl) => {
    try {
        // Extract public_id from Cloudinary URL
        const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(publicId);
        console.log('✅ Image deleted from Cloudinary:', publicId);
    } catch (error) {
        console.error('❌ Error deleting image:', error.message);
        throw error;
    }
};

export default upload;

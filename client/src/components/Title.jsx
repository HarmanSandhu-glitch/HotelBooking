import React from 'react';

const Title = ({ title, subTitle, align, font }) => {
    return (
        <div className={`flex flex-col justify-center items-center text-center ${align === "left" ? "md:items-start md:text-left" : ""}`}>
            <h1 className={`text-4xl md:text-5xl font-bold ${font || "font-playfair"} text-gray-900 mb-3`}>{title}</h1>
            <p className="text-base md:text-lg text-gray-600 mt-2 max-w-2xl leading-relaxed">{subTitle}</p>
        </div>
    );
};

export default Title;
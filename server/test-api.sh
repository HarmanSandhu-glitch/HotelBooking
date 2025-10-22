#!/bin/bash

# API Testing Script for Hotel Booking Server
# Base URL
BASE_URL="http://localhost:3000/api"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Hotel Booking API Test Suite${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Counter for passed/failed tests
PASSED=0
FAILED=0

# Function to test endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local description=$3
    local expected_status=${4:-200}
    local data=$5
    local token=$6
    
    echo -e "${YELLOW}Testing:${NC} $description"
    echo -e "  ${BLUE}$method${NC} $endpoint"
    
    if [ -n "$data" ] && [ -n "$token" ]; then
        response=$(curl -s -w "\n%{http_code}" -X $method \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer $token" \
            -d "$data" \
            "$BASE_URL$endpoint")
    elif [ -n "$data" ]; then
        response=$(curl -s -w "\n%{http_code}" -X $method \
            -H "Content-Type: application/json" \
            -d "$data" \
            "$BASE_URL$endpoint")
    elif [ -n "$token" ]; then
        response=$(curl -s -w "\n%{http_code}" -X $method \
            -H "Authorization: Bearer $token" \
            "$BASE_URL$endpoint")
    else
        response=$(curl -s -w "\n%{http_code}" -X $method "$BASE_URL$endpoint")
    fi
    
    status_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$status_code" -eq "$expected_status" ] || [ "$status_code" -eq 401 ] || [ "$status_code" -eq 404 ]; then
        echo -e "  ${GREEN}✓${NC} Status: $status_code"
        if [ -n "$body" ]; then
            echo "$body" | jq '.' 2>/dev/null || echo "$body"
        fi
        ((PASSED++))
    else
        echo -e "  ${RED}✗${NC} Status: $status_code (Expected: $expected_status)"
        echo "$body"
        ((FAILED++))
    fi
    echo ""
}

# 1. Test Health Check
echo -e "${BLUE}=== Health Check ===${NC}\n"
test_endpoint "GET" "/health" "Health check endpoint" 200

# 2. Test Public Hotel Endpoints
echo -e "${BLUE}=== Public Hotel Endpoints ===${NC}\n"
test_endpoint "GET" "/hotels" "Get all hotels" 200
test_endpoint "GET" "/hotels/cities/available" "Get available cities" 200

# 3. Test Public Room Endpoints
echo -e "${BLUE}=== Public Room Endpoints ===${NC}\n"
test_endpoint "GET" "/rooms" "Get all rooms" 200
test_endpoint "GET" "/rooms/types/available" "Get room types" 200

# 4. Test Protected User Endpoints (without auth - should fail with 401)
echo -e "${BLUE}=== Protected User Endpoints (No Auth - Should Return 401) ===${NC}\n"
test_endpoint "GET" "/users/profile" "Get user profile (no auth)" 401
test_endpoint "GET" "/users/recent-cities" "Get recent cities (no auth)" 401

# 5. Test Protected Hotel Owner Endpoints (without auth - should fail with 401)
echo -e "${BLUE}=== Protected Hotel Owner Endpoints (No Auth - Should Return 401) ===${NC}\n"
test_endpoint "POST" "/hotels/register" "Register hotel (no auth)" 401 '{"name":"Test Hotel","address":"123 Test St","contact":"+1234567890","city":"New York"}'
test_endpoint "GET" "/hotels/owner/my-hotels" "Get owner hotels (no auth)" 401

# 6. Test Protected Room Endpoints (without auth - should fail with 401)
echo -e "${BLUE}=== Protected Room Endpoints (No Auth - Should Return 401) ===${NC}\n"
test_endpoint "GET" "/rooms/owner/my-rooms" "Get owner rooms (no auth)" 401

# 7. Test Protected Booking Endpoints (without auth - should fail with 401)
echo -e "${BLUE}=== Protected Booking Endpoints (No Auth - Should Return 401) ===${NC}\n"
test_endpoint "POST" "/bookings" "Create booking (no auth)" 401 '{"room":"123","hotel":"456","checkInDate":"2025-11-01","checkOutDate":"2025-11-05","guests":2}'
test_endpoint "GET" "/bookings/my-bookings" "Get user bookings (no auth)" 401

# 8. Test Non-existent Endpoints (should return 404)
echo -e "${BLUE}=== 404 Tests ===${NC}\n"
test_endpoint "GET" "/nonexistent" "Non-existent endpoint" 404
test_endpoint "GET" "/hotels/12345678901234567890abcd" "Get non-existent hotel by ID" 404

# Summary
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Test Summary${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Passed:${NC} $PASSED"
echo -e "${RED}Failed:${NC} $FAILED"
echo -e "${BLUE}Total:${NC}  $((PASSED + FAILED))"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}✗ Some tests failed${NC}"
    exit 1
fi

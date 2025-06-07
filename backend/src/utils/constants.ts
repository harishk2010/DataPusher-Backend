

export const MongoDB = {
  SUCCESS: "✅ MongoDB Connected:",
  ERROR: "❌ MongoDB Connection Failed"
};

export const S3BucketErrors={
    ERROR_GETTING_IMAGE:"Error gettting the image from S3 Bucket!",
    NO_FILE:"No file uploaded"
}
export const AdminErrorMsg = {
  NO_ADMIN_ID: "No user id found",
  NO_ADMIN: "No user found",
  NO_ADMIN_DATA: "User data not found",
  NO_ADMINNAME: "Username not found",
};


export const AdminSuccessMsg = {
    ADMIN_FOUND: "Admin found successfully",
    ADMIN_DATA_FOUND: "Admin data retrieved successfully",

   
  };
  
export const AuthErrorMsg = {
    NO_ACCESS_TOKEN: "Unauthorized access. Please provide a valid token.",
    NO_REFRESH_TOKEN: "Unauthorized access. Session verification required.",
    INVALID_ACCESS_TOKEN: "Unauthorized access. Please authenticate again.",
    INVALID_REFRESH_TOKEN: "Session verification failed. Please log in again.",
    ACCESS_TOKEN_EXPIRED: "Session expired. Refreshing authentication...",
    REFRESH_TOKEN_EXPIRED: "Session expired. Please log in again.",
    AUTHENTICATION_FAILED: "Authentication failed. Please try again later.",
    PERMISSION_DENIED: "You do not have permission to perform this action.",
    ACCESS_FORBIDDEN: "You do not have permission to perform this action.",
    TOKEN_EXPIRED_NAME:'TokenExpiredError'
};

export const GeneralServerErrorMsg = {
    INTERNAL_SERVER_ERROR: "Internal server error!",
    DATABASE_ERROR: "Database operation failed!",
    OPERATION_FAILED: "Operation could not be completed!",
    UNEXPECTED_ERROR: "An unexpected error occurred!",
  };
  

export const JwtErrorMsg = {
  JWT_NOT_FOUND: "JWT not found in the cookies",
  INVALID_JWT: "Invalid JWT",
  JWT_EXPIRATION: "1h",
  JWT_REFRESH_EXPIRATION: "6h",
};
export const EnvErrorMsg = {
    CONST_ENV: "",
    JWT_NOT_FOUND: "JWT secret not found in the env",
    NOT_FOUND: "Env not found",
    ADMIN_NOT_FOUND: "Environment variables for admin credentials not found",
  };
  

export const CategorySuccessMsg = {
    CATEGORY_ADDED: "Category added successfully!",
    CATEGORY_UPDATED: "Category updated successfully!",
    CATEGORY_FETCHED: "Fetched categories successfully!",

    CATEGORY_FOUND: "Category found successfully!",
    CATEGORY_LISTED: "Category listed successfully!",
    CATEGORY_UNLISTED: "Category unlisted successfully!",
  };
  
  export const CategoryErrorMsg = {
    CATEGORY_EXISTS: "Category already exists!",
    CATEGORY_NOT_UPDATED: "Category not updated!",

    CATEGORY_NOT_FOUND: "Category not found!",
    CATEGORY_NOT_CREATED: "Could not create category!",
    CATEGORY_NOT_FETCHED: "Could not fetch categories!",
    CATEGORY_LISTING_FAILED: "Failed to list/unlist category!",
    INTERNAL_SERVER_ERROR: "Internal server error!",
  };



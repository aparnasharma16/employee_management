const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const ApiError = require("./ApiError");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * @description Uploads a file from a local path to Cloudinary
 * @param {string} localFilePath The path to the local file
 * @returns {object | null} The Cloudinary response object or null if upload fails
 */
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "employee_photos",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

/**
 * @description Deletes a file from Cloudinary using its public ID
 * @param {string} publicId The public ID of the file to delete
 */
const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    throw new ApiError(500, "Failed to delete image from Cloudinary");
  }
};

module.exports = { uploadOnCloudinary, deleteFromCloudinary };

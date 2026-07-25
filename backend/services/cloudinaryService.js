const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = (buffer, folder, publicId) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        overwrite: true,
        resource_type: 'image',
        transformation: [
          { width: 400, height: 400, crop: 'fill', gravity: 'face' },
          { quality: 'auto', fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (error) reject(error);
        else resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
};

exports.uploadImage = async (fileBuffer, folder, publicId) => {
  return uploadToCloudinary(fileBuffer, folder, publicId);
};

exports.deleteImage = async (publicId) => {
  if (!publicId) return;
  return await cloudinary.uploader.destroy(publicId);
};

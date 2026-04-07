const cloudinary = require('../config/cloudinary');

exports.uploadImage = (fileBuffer, folder, publicId = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      folder,
      resource_type: 'auto'
    };
    if (publicId) options.public_id = publicId;

    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve({
        url: result.secure_url,
        publicId: result.public_id
      });
    });

    uploadStream.end(fileBuffer);
  });
};

exports.deleteImage = async (publicId) => {
  if (!publicId) return;
  return await cloudinary.uploader.destroy(publicId);
};

const cloudinary = require("cloudinary");

const UploadProductImagesCloudinary = async (req, res) => {
  try {
    //first of all check given images is an array if not make sure to make it array
    // const imagesArray = Array.isArray(images) ? images : [images]; // Ensure it's an array
    // console.log(typeof imagesArray);
    // Validate file types and size

    //it is an array where we will store object of uploaded images properties
    const uploadedImages = [];
    // console.log("uploadImages before upload" + uploadedImages);

    //check is images given by local machine
    if (req.files?.images) {
      // console.log("if comes : " + req.files?.images);

      //if images not in the form of array then convert to array
      const imagesArray = Array.isArray(req.files?.images)
        ? req.files?.images
        : [req.files?.images];
      console.log("convert images to array " + imagesArray);

      // const start = Date.now();
      //loop for upload image on cloudinary one by one and then store every image url and id in uploadedImages array
      const uploadedLocalImages = await Promise.all(
        imagesArray.map((image) =>
          cloudinary.uploader.upload(image.tempFilePath, {
            folder: "productImages",
            quality: "auto:low",
            chunk_size: 6000000, // Upload in 6MB chunks
            transformation: [
              {
                width: 800,
                height: 800,
                crop: "limit",
                fetch_format: "auto",
                quality: "auto",
              },
            ],
          })
        )
      );
      console.log("uploadedLocalImages : " + uploadedLocalImages);

      // console.log(`Upload Time: ${Date.now() - start}ms`);
      //if not upload successfully
      if (!uploadedLocalImages) {
        console.log("uploadedLocalImages error : " + uploadedLocalImages);

        res.status(500).json({
          success: false,
          message: `Something went wrong while uploading image`,
        });
      }

      // Store { url, public_id }
      uploadedImages.push(
        ...uploadedLocalImages.map((img) => ({
          url: img.secure_url,
          public_id: img.public_id,
        }))
      );
      console.log("Images upload " + uploadedImages);
    }

    //if user gives images from google or another as only url(string)
    if (req.body?.images) {
      console.log("req.body?.images : " + req.body?.images);

      //if images not in the form of array
      const imagesArray = Array.isArray(req.body.images)
        ? req.body.images
        : [req.body.images];
      console.log("convert images to array " + imagesArray);
      // console.log(imagesArray[0]);

      // const start = Date.now();
      //loop for upload image on cloudinary one by one and then store every image url and id in uploadedImages array
      const uploadedLocalImages = await Promise.all(
        imagesArray.map((image) =>
          cloudinary.v2.uploader.upload(image, {
            folder: "productImages",
            quality: "auto:low",
            chunk_size: 6000000, // Upload in 6MB chunks
            transformation: [
              {
                width: 800,
                height: 800,
                crop: "limit",
                fetch_format: "auto",
                quality: "auto",
              },
            ],
          })
        )
      );
      console.log("uploadedLocalImages : " + uploadedLocalImages);
      // console.log(`Upload Time: ${Date.now() - start}ms`);
      //if not upload successfully
      if (!uploadedLocalImages) {
        console.log("uploadedLocalImages error : " + uploadedLocalImages);

        res.status(500).json({
          success: false,
          message: `Something went wrong while uploading image`,
        });
      }

      // Store { url, public_id }
      uploadedImages.push(
        ...uploadedLocalImages.map((img) => ({
          url: img.secure_url,
          public_id: img.public_id,
        }))
      );
      console.log("Uploaded images req.body.images : " + uploadedLocalImages);
    }

    console.log("Final upload " + uploadedImages);

    return uploadedImages;
  } catch (error) {
    console.log("images upload error" + error);
    res.status(500).json({
      success: false,
      message: `product images upload failed: ${error.message}`,
    });
  }
};

module.exports = UploadProductImagesCloudinary;

import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;

// cloudinary.config({
//   cloud_name: "cloud-mahadi",
//   api_key: "628425217641132",
//   api_secret: "RNTnDYsj8FjLKJUSygvr4v4TlhA",
//   secure: true,
// });

// const createFacility = catchAsync(async (req: Request, res: Response) => {
//   try {
//     const { name, description, pricePerHour, location } = req.body;

//     let imageUrl = "";

//     // upload image to cloudinary
//     if (req.file) {
//       try {
//         const result = await cloudinary.uploader.upload(req.file.path, {
//           folder: "facilities",
//         });
//         imageUrl = result.secure_url;
//         fs.unlinkSync(req.file.path);
//       } catch (error) {
//         console.error("Cloudinary upload error:", error);
//         return res.status(500).json({ error: "Cloudinary upload failed" });
//       }
//     }

//     const facilityData = {
//       name,
//       description,
//       pricePerHour: Number(pricePerHour),
//       location,
//       image: imageUrl,
//     };

//     const facility = await Facility.create(facilityData);

//     res.status(201).json({
//       success: true,
//       data: facility,
//     });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// });

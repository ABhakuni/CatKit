import CatKitModel from "../models/catkit.model.js";
import {uploadImage, deleteImage} from '../utils/cloudinaryUtil.js';
import fs from 'fs-extra';

export const getCatImages = async (req, res) => {
  try {
    const catImages = await CatKitModel.find();
    return res.json(catImages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const uploadCatImage = async (req, res) => {
  const { name, description } = req.body;

  if (!req.files?.image) return res.status(404).json({message: 'Image is required'})
  if(!req.files?.image?.mimetype) return res.status(404).json({ message: 'File type not supported. Please upload either of .png,.jpg,.jpeg formats'})
  if(!req.files?.image?.size>10485760) return res.status(404).json({ message: 'Maximum File Size allowed is 10MB. Please compress the image and reupload'})

  try {
    const newCatImage = new CatKitModel({
      name,
      description,
    });

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath)
      newCatImage.image = {
        public_id: result.public_id,
        secure_url: result.secure_url
      }
      await fs.unlink(req.files.image.tempFilePath)
    }
    
    const savedCatImage = await newCatImage.save();
    return res.json(savedCatImage);
  } catch (error) {
    if (req.files?.image) {
      await fs.unlink(req.files.image.tempFilePath)
    }
    return res.status(500).json({ message: error.message });
  }
};

export const updateCatImage = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const catImageFound = await CatKitModel.findById(id);
    if (!catImageFound)
      return res.status(404).json({ message: "Id Not Found" });
    if (!req.files?.image) return res.status(404).json({message: 'Image is required'})
    if(!req.files?.image?.mimetype) return res.status(404).json({ message: 'File type not supported. Please upload either of .png,.jpg,.jpeg formats'})
    if(!req.files?.image?.size>10485760) return res.status(404).json({ message: 'Maximum File Size allowed is 10MB. Please compress the image and reupload'})
    
    await deleteImage(catImageFound.image.public_id)

    const newCatImage = new CatKitModel({
      name,
      description,
    });
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath)
      newCatImage.image = {
        public_id: result.public_id,
        secure_url: result.secure_url
      }
      await fs.unlink(req.files.image.tempFilePath)
    }

    const newImageData = {
      name: newCatImage?.name || catImageFound?.name,
      description: newCatImage?.description || catImageFound?.description,
      image: req.files?.image ? newCatImage?.image : catImageFound?.image
    };
    const updatedCatImage = await CatKitModel.findByIdAndUpdate(id, newImageData, {
      new: true,
    });
    return res.json(updatedCatImage);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCatImage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCatImage = await CatKitModel.findByIdAndDelete(id);

    if (!deletedCatImage) return res.status(404).json({message: 'Id does not exist'});
    await deleteImage(deletedCatImage.image.public_id);
    return res.json(deletedCatImage);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCatImage = async (req, res) => {
  const { id } = req.params;
  try {
    const catImageFound = await CatKitModel.findById(id);
    if (!catImageFound)
      return res.status(404).json({ message: "Id not found" });
    return res.json(catImageFound);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

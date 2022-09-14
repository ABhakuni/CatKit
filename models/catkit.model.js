import mongoose from "mongoose";

const catkitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      secure_url: String,
      public_id: String,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("CatKitModel", catkitSchema);

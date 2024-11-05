import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    thumbnail :{
      type: String,
  
    },
    photo: {
      type: String, // base64 encoded ucun string qebul edir
       
    },
    price: {
      type: String,
    },
    distance: {
      type: String,
    },
    catagory: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
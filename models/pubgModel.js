import mongoose from "mongoose";

const pubgModel = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
}, {
  timestamps: true
});

const PubgModel = mongoose.model("Pubg", pubgModel);

export default PubgModel;

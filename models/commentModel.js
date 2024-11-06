const reviewSchema = new mongoose.Schema({
    rating: Number,
    review: String,
    name: String,
    email: String,
    catagory: String,
  });
  
  const Review = mongoose.model('Review', reviewSchema);
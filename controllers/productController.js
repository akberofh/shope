import Product from "../models/productModel.js";

const addUserProduct = async (req, res) => {
  try {
    const { title, body } = req.body;

    let photo = '';

    // Eğer bir fotoğraf dosyası mevcutsa base64 olarak dönüştür
    if (req.file) {
      photo = req.file.buffer.toString('base64');
    }

    if (req.user) {
      const product = await Product.create({
        title,
        body,
         photo,
        user_id: req.user._id,
      });

      res.status(201).json(product);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProduct = async (req, res) => {
    try {
      if (req.user) {
        const userProduct = await Product.find({ user_id: req.user._id });
        res.status(200).json(userProduct);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const deleteUserProduct = async (req, res) => {
  try {
    if (req.user) {
      const deleteProduct = await Product.findById(req.params.id);

      if (deleteProduct && deleteProduct.user_id.toString() === req.user._id.toString()) {
        await Product.deleteOne({ _id: req.params.id });
        res.json({ message: `${req.params.id} id-li post silindi` });
      } else {
        res.status(404).json({ message: 'Product not found or unauthorized' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addUserProduct, getUserProduct, deleteUserProduct };
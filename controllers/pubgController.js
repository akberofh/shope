import PubgModel from "../models/pubgModel.js";

const pubgPost = async (req, res) => {
  const { title, description, thumbnail, price, distance, catagory } = req.body;
  let photo = '';

  // Eğer bir fotoğraf dosyası mevcutsa base64 olarak dönüştür
  if (req.file) {
    photo = req.file.buffer.toString('base64');
  }

  try {
    // Yeni pubg postu oluştur ve fotoğrafı ekle
    const pubg = await PubgModel.create({
      title,
      description,
      thumbnail,
      price,
      distance,
      catagory,
      photo
    });

    res.status(201).json({ pubg });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const pubgUpdateProfil = async (req, res) => {
  const { id } = req.params; // Parametrelerden ID'yi al
  try {
    // Belirtilen ID ile bir Pubg kaydı bul
    const pubg = await PubgModel.findById(id);

    if (!pubg) {
      return res.status(404).json({ message: 'Pubg post not found' });
    }

    // Güncelleme işleminden önce mevcut veriyi kontrol et
    console.log("Önceki Veri: ", pubg);

    // Gelen verileri güncelle
    pubg.title = req.body.title !== undefined ? req.body.title : pubg.title;
    pubg.price = req.body.price !== undefined ? req.body.price : pubg.price;
    pubg.description = req.body.description !== undefined ? req.body.description : pubg.description;

    // Eğer bir fotoğraf dosyası mevcutsa, base64 formatında güncelle
    if (req.file) {
      pubg.photo = req.file.buffer.toString('base64');
    }

    // Güncellenmiş Pubg kaydını kaydet
    const updatedPubg = await pubg.save();

    // Güncellenmeden sonraki veriyi kontrol et
    console.log("Güncellenmiş Veri: ", updatedPubg);

    // Güncellenmiş veriyi döndür
    res.json({
      _id: updatedPubg._id,
      title: updatedPubg.title,
      description: updatedPubg.description,
      photo: updatedPubg.photo,
      price: updatedPubg.price, // Fiyatı da yanıt olarak ekleyin
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


const getPubg = async (req, res) => {
  try {
    const allPubges = await PubgModel.find();
    res.json({ allPubges });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getByIdPubg = async (req, res) => {
  const { id } = req.params;
  try {
    const getById = await PubgModel.findById(id);
    if (!getById) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json({ getById });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedData = await PubgModel.findOneAndDelete({ _id: id });
    if (!deletedData) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json({ deletedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { pubgPost, getPubg, getByIdPubg, deleteById, pubgUpdateProfil };

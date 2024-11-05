import express from 'express'
import { deleteById, getByIdPubg, getPubg, pubgPost, pubgUpdateProfil } from '../controllers/pubgController.js'
import upload from '../middleware/uploadMiddleware.js'

const router = express.Router()


router.get('/', getPubg)

router.post('/',   pubgPost)

router.get('/:id', getByIdPubg)

router.delete('/:id',  deleteById)

router.put('/postt/:id', upload.single('photo'), pubgUpdateProfil);


router.patch('/:id', (req, res) => {
    //req.params.id
    res.json({msg: 'update metod'})
})

export default router
/**
 *  HELPERS 
 */
const getToken = require("../helpers/getToken.helper");
const getUserByToken = require("../helpers/getUserByToken.helper");

/**
 *  MODELS 
 */
const Pet = require("../models/Pet");

module.exports = class PetController {

  /**
   *  CREATE A PET 
   */
  static async create(req, res) {
    
    const { name, age, weight, color } = req.body;
    const images = req.files;
    const available = true;

    /**
     *  IMAGES UPLOAD 
     */

    /**
     *  VALIDATION 
     */
    if(!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }

    if(!age) {
      res.status(422).json({ message: "A idade é obrigatória!" });
      return;
    }

    if(!weight) {
      res.status(422).json({ message: "A peso é obrigatória!" });
      return;
    }

    if(!color) {
      res.status(422).json({ message: "A cor é obrigatória!" });
      return;
    }

    if(images.length === 0) {
      res.status(422).json({ message: "A imagem é obrigatória!" });
      return;
    }

    /**
     *  GET PET OWNER 
     */
    const token = getToken(req);
    const user = await getUserByToken(token);

    /**
     *  CREATE A PET 
     */
    const pet = new Pet({
      name, 
      age, 
      weight, 
      color, 
      available, 
      images: [], 
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone
      }
    });

    images.map((image) => {
      pet.images.push(image.filename)
    });

    try {
      const newPet = await pet.save();
      res.status(201).json({
        message: "Pet Cadastrado com Sucesso!",
        newPet
      });
    } catch (err) {
      res.status(500).json({ message: error })
    }

  }

  static async getAll(req, res) {

    const pets = await Pet.find().sort("-createdAt");

    res.status(200).json({
      pets: pets
    });

  }

  static async getAllUserPets(req, res) {

    /**
     *  GET USER FROM TOKEN 
     */
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ "user._id": user._id }).sort("-createdAt");

    res.status(200).json({
      pets
    })

  }

  static async getAllUserAdoptions(req, res) {

    /**
     *  GET USER FROM TOKEN 
     */
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ "adopter._id": user._id }).sort("-createdAt");

    res.status(200).json({
      pets
    })

  }

}
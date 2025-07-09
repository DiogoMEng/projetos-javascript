/**
 *  HELPERS 
 */
const getToken = require("../helpers/getToken.helper");
const getUserByToken = require("../helpers/getUserByToken.helper");
const ObjectId = require("mongoose").Types.ObjectId;

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

  static async getPetById(req, res) {

    const id = req.params.id;

    /**
     *  CHECK IF ID IS VALID 
     */
    if(!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido" });
      return;
    }

    /**
     *  CHECK IF PET EXISTS 
     */
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
      return;
    }

    res.status(200).json({
      pet: pet,
    })

  }

  static async removePetById(req, res) {

    const id = req.params.id;

    if(!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido" });
      return;
    }

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if(pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({ message: "Houve um problema em processar a sua solicitação, tente novamente mais tarde" });
      return;
    }

    await Pet.findByIdAndDelete(id);

    res.status(200).json({ message: "Pet removido com sucesso!" });

  }

  static async updatePet(req, res) {

    const { name, age, weight, color, available } = req.body || {};
    const id = req.params.id;
    const images = req.files;
    const updatedData = {};

    /**
     *  CHECK IF ID IS VALID 
     */
    if(!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido" });
      return;
    }

    /**
     *  CHECK IF PET EXISTS 
     */
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
      return;
    }

    /**
     *  VALIDATION 
     */
    if(!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    } else {
      updatedData.name = name;
    }

    if(!age) {
      res.status(422).json({ message: "A idade é obrigatória!" });
      return;
    } else {
      updatedData.age = age;
    }

    if(!weight) {
      res.status(422).json({ message: "A peso é obrigatória!" });
      return;
    } else {
      updatedData.weight = weight;
    }

    if(!color) {
      res.status(422).json({ message: "A cor é obrigatória!" });
      return;
    } else {
      updatedData.color = color;
    }

    if(images.length === 0) {
      res.status(422).json({ message: "A imagem é obrigatória!" });
      return;
    } else {
      updatedData.images = [];
      images.map((image) => {
        updatedData.images.push(image.filename);
      });
    }

    await Pet.findByIdAndUpdate(id, updatedData);

    res.status(200).json({ message: "Pet Atualizado com Sucesso" });

  }

}
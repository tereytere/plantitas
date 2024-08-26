const Plant = require('../models/plant.model');

const addPlant = async (req, res) => {

    try {
        const newPlant = new Plant(req.body);
        const findPlant = await Plant.find({ name: newPlant.name })
        if (findPlant.length === 0) {
            if (req.file.path) {
                newPlant.image = req.file.path;
            }
            const createdPlant = await newPlant.save();
            res.status(201).json({ message: "Planta añadida", data: createdPlant });
        } else {
            res.status(200).json({ message: "Esta planta ya existe" });
        }
    } catch (error) {
        console.log(error);
    }
}

const changePlant = async (req, res) => {
    const { id } = req.params;
    try {
        const body = req.body;
        const findPlant = await Plant.findByIdAndUpdate(id, body, { new: true });
        if (!findPlant) {
            return res.status(404).json({ message: "La planta no existe" });
        } else {
            return res.status(200).json(findPlant);
        }
    } catch (error) {
        console.log(error);
    }

}


const getPlant = async (req, res) => {
    const { id } = req.params;
    try {
        const findPlant = await Plant.findById(id);
        if (!findPlant) {
            return res.status(404).json({ message: "La planta no existe" });
        } else {
            return res.status(200).json(findPlant);
        }
    } catch (error) {
        console.log(error);
    }
}

const getPlants = async (req, res) => {
    try {
        const findPlants = await Plant.find();
        if (!findPlants) {
            return res.status(404).json({ message: "No existen plantas" });
        } else {
            return res.status(200).json(findPlants);
        }
    } catch (error) {
        console.log(error);
    }
}

const deletePlant = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPlant = await Plant.findByIdAndDelete(id);
        if (!deletedPlant) {
            return res.status(200).json({ success: false, message: "No existe ese id" })
        }
        if (deletedPlant.image) {
            deleteFile(deletedPlant.image)
            return res.status(200).json({ success: true, deleted: deletedPlant });
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports = { addPlant, deletePlant, getPlant, getPlants, changePlant }
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/jwt');
const { deleteFile } = require('../../utils/deleteCloudiFile');

const addUser = async (req, res) => {

    try {
        const newUser = new User(req.body);
        const findUser = await User.find({ email: newUser.email })
        if (findUser.length === 0) {
            if (req.file.path) {
                newUser.image = req.file.path;
            }
            newUser.password = bcrypt.hashSync(newUser.password, 10);
            const createdUser = await newUser.save();
            res.status(201).json({ message: "Usuario creado", data: createdUser });
        } else {
            res.status(409).json({ message: "El email ya existe" });
        }
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const user = req.body;
        const userByEmail = await User.find({ email: user.email });
        if (userByEmail.length !== 0) {
            if (bcrypt.compareSync(user.password, userByEmail[0].password)) {
                const data = { id: userByEmail[0]._id, email: userByEmail[0].email, role: userByEmail[0].role };
                const token = generateToken(data);
                return res.status(200).json({ token: token });
            } else {
                return res.status(200).json({ message: "La contraseña no es correcta" });
            }
        } else {
            return res.status(404).json({ message: "El email no existe" });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const findUser = await User.findById(id).populate("plants");
        if (!findUser) {
            return res.status(404).json({ message: "El usuario no existe" });
        } else {
            return res.status(200).json({ findUser });
        }
    } catch (error) {
        console.log(error);
    }
}

const getUsers = async (req, res) => {
    try {
        const findUsers = await User.find().populate("plants");
        if (!findUser) {
            return res.status(404).json({ message: "No existen usuarios" });
        } else {
            return res.status(200).json(findUsers);
        }
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const body = req.body;
        const findUser = await User.findByIdAndUpdate(id, body, { new: true });
        if (!findUser) {
            return res.status(404).json({ message: "El usuario no existe" });
        } else {
            return res.status(200).json(findUser);
        }
    } catch (error) {
        console.log(error);
    }
}

const addPlantToUser = async (req, res) => {

    const { idU } = req.params;
    const { id, status, size } = req.body;
    try {
        const modifyUser = await User.findByIdAndUpdate(idU, { $push: { plants: id, status, size } }, { new: true });
        if (!modifyUser) {
            return res.status(404).json({ message: "El usuario no existe" });
        } else {
            return res.status(200).json(modifyUser);
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await User.findByIdAndDelete(id);
        if (!deleteUser) {
            return res.status(200).json({ success: false, message: "No existe ese id" })
        }
        if (deleteUser.image) {
            deleteFile(deleteUser.image)
            return res.status(200).json({ success: true, deleted: deleteUser });
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports = { addUser, login, getUserById, getUsers, deleteUser, updateUser, addPlantToUser }
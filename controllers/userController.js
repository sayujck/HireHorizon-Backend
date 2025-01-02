const users = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// register
exports.registerController = async (req, res) => {
    // console.log("Inside registerController");
    // console.log(req.body);
    const { fullname, email, phoneNumber, password, userType } = req.body
    console.log(fullname, email, phoneNumber, password, userType);
    try {

        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("User Already Exist.. Please Login!")
        }
        else {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = new users({
                fullname, email, phoneNumber, password: hashedPassword, userType
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    } catch (err) {
        res.status(401).json(err)
    }
}

// login
exports.loginController = async (req, res) => {
    const { email, password, userType } = req.body
    try {
        const existingUser = await users.findOne({ email })

        if (!existingUser) {
            return res.status(404).json("Invalid Email/Password");
        }

        else {
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            // console.log("Password match result:", isPasswordValid);

            if (!isPasswordValid) {
                return res.status(404).json("Invalid Password");
            }

            if (existingUser.userType !== userType) {
                return res.status(404).json("Invalid User Type");
            }

            const token = jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD)
            res.status(200).json({
                user: existingUser,
                token
            })
        }

    } catch (err) {
        res.status(401).json(err)
    }
}

// update profile
exports.updateProfileController = async (req, res) => {
    // console.log("Inside updateProfileController");
    const userId = req.userId; // middleware authentication
    console.log(userId);
    // get text data from req.body, file data from req.file
    const { fullname, email, phoneNumber, bio, skills } = req.body
    const skillsArray = skills?.split(",");
    let profilePic="";
    const uploadProfileImgFile = req.file?req.file.filename:profilePic
    console.log(uploadProfileImgFile);
    console.log(fullname, email, phoneNumber, bio, skills);
    
    
    // update user - findByIdandUpdate
    try {
        const updateUser = await users.findByIdAndUpdate({ _id: userId }, {
            fullname, email, phoneNumber, 
            "profile.bio":bio, 
            "profile.skills":skillsArray,
            "profile.profilePic":uploadProfileImgFile
        }, { new: true })

        console.log(updateUser);
        
        await updateUser.save()
        res.status(200).json(updateUser)
    }
    catch (err) {
        res.status(401).json(err)
    }
}
import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import User from "../models/user.model.js";

export const register = (req, res) => {
    //CHECK USER IF EXISTS

    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");
        //CREATE A NEW USER
        //Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q =
            "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)";

        const values = [
            req.body.username,
            req.body.email,
            hashedPassword,
            req.body.name,
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created.");
        });
    });




};

export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ?";

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        const checkPassword = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );

        if (!checkPassword)
            return res.status(400).json("Wrong password or email!");

        const token = jwt.sign({ id: data[0].id }, "secretkey");

        const { password, ...others } = data[0];

        res
            .cookie("accessToken", token, {
                httpOnly: true,
            })
            .status(200)
            .json(others);
    });


};

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out.")

};



export const Signup = async (req, res) => {

    console.log("00000");
    const { name, username, password } = req.body;

    // if (password !== confirmPassword) {
    // 	return res.status(400).json({ error: "Passwords don't match" });
    // }

    console.log("00000");
    const user = await User.findOne({ username });

    if (user) {
        return res.status(400).json({ error: "Username already exists" });
    }

    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
        name,
        username,
        password: hashedPassword,
        gender: "male",
        profilePic: boyProfilePic,
    });

    if (newUser) {
        // Generate JWT token here
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            username: newUser.username,
            profilePic: newUser.profilePic,
        });
    } else {
        res.status(400).json({ error: "Invalid user data" });
    }

    // localStorage.setItem("chat-user", JSON.stringify(res.json()));

};

export const Signin = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name }); // Await the findOne operation
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        // Send user data in the response
        res.status(201).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const Signout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};









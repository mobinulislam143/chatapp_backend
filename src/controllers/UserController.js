const UserModel = require('../models/UserModel');
const generatetokenSetCookie = require('../utils/generateToken');

// C=Create

exports.signUp = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ status: "Password doesn't match" });
        }

        const user = await UserModel.findOne({ username });
        if (user) {
            return res.status(400).json({ status: "Username already exists" });
        }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new UserModel({
            fullname,
            username,
            password,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });
        if(newUser){
            generatetokenSetCookie(newUser._id, res)
            await newUser.save();

            res.status(200).json({ status: "success", data: newUser });
        }else{
            
            res.status(400).json({ status: "Invalid user data." });
        }
      
    } catch (e) {
        res.status(400).json({ status: "fail", data: e.toString() });
    }
};


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ status: 'failed', message: 'User not found' });
        }

        // Check if password matches
        if (user.password !== password) {
            return res.status(400).json({ status: 'failed', message: 'Password does not match' });
        }

        // Generate and set token cookie, and capture the token
        const token = generatetokenSetCookie(user._id, res);

        console.log(token)
        res.status(200).json({ 
            status: "success", 
            data: user, 
            token: token // Include the token in the response
        });
    } catch (e) {
        res.status(400).json({ status: "fail", data: e.toString() });
    }
};

exports.logout= (req, res) => {
    try {
       res.cookie('token', "", {maxAge:0})
       
        res.status(200).json({status:"success",data:"Logout successfully."})
    }catch (e) {
        res.status(400).json({status:"fail",data:e.toString()})
    }
    
}
exports.Users= async(req, res) => {
    try {
       let loggedInUserId  = req.user._id
       console.log(res.cookie('token'))

       const fileredUser = await UserModel.find({ _id: { $ne: loggedInUserId } }).select("-password")
        res.status(200).json({status:"success",data:fileredUser})
    }catch (e) {
        res.status(400).json({status:"fail",data:e.toString()})
    }
    
}

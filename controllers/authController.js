//import model
import User from "../models/userModel.js";
//hash passwords
import bcrypt from "bcrypt";

//register user
async function register(req, res) {
    try {

        //what data we will be using
        const { name, email, password } = req.body;

        //check if user already exists
        const existingUser = await User.findOne({ email});

        if (existingUser) {
            res.status(404).json({ message: "User already exists" });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create new user
        const newUser = await User.create({ name, email, password:hashedPassword,profilepic:null });

        //send a res.status(201)-->data created successfully
        res.status(201).json(newUser);
        
    } catch (error) {
        res.status(500).json({ error:error.message });
        
    }
}

// login 
async function login(req,res){
    try{
        const {email,password}=req.body;
        // check if user exists
        const existinguser= await User.findOne({email});
        if(!existinguser){
            return res.status(404).json({message:"invalid credentials"});
        }

        // check if password matches
          const comparePassword= await bcrypt.compare(password,existinguser.password);
            if(!comparePassword){
                return res.status(404).json({message:"invalid credentials"});
            }
            res.status(200).json(existinguser);

    }catch(error){
                res.status(500).json({ error:error.message });

    }
  
//view all users
}


export { register,login };
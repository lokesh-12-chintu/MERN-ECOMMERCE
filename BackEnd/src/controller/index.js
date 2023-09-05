const User = require("../models/index");
const jwt = require('jsonwebtoken')
const shortid = require("shortid")

exports.signup = async(req,res) => {
    try{
    const {firstName,lastName,email,password} = req.body;
    let exist = await User.findOne({email})
    if (exist){
        return res.status(400).send("User Already Exist")
    }
    
    const _user = new User({
        firstName,
        lastName,
        email,
        password,
        username:shortid.generate(),
        role:"user"
    });

    await _user.save();
    res.status(201).send('User created Successfully')
    }catch(err){
        return res.status(400).send('Internal Server Error')
    }
}

exports.signin = async(req,res) => {
    try{
        const {email,password} = req.body;
        User.findOne({email})
        .then((user,error) => {
            if(error) return res.status(400).json({error})
            if(user){
               if(user.role === "user"){
                    const token = jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"100d"})
                    const {_id,firstName,lastName,email,role,fullName} = user;
                    res.status(200).json({
                        token,
                        user:{
                            _id,firstName,lastName,email,role,fullName
                        }
                    })
               }
            }  
        })
        
    }catch(err){
        return res.status(400).send("Invalid Password")
    }
}

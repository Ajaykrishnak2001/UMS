import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateWebTokens.js';
import bcrypt from 'bcrypt'




const securePassword = async (password)=>{
    try {
        const hashBcrypt = await bcrypt.hash(password,10);
        if(hashBcrypt) return hashBcrypt

    } catch (error) {
        console.log(error.message);
    }
}



const registerUser=async(req,res)=>{
    try {
        const {name,email,mobile,password} = req.body;
        const emailExits = await User.findOne({email:email});
        if(emailExits){
            res.json({ status: "emailExits" });
        }else{
            const hashedPassword = await securePassword(password)
            if(hashedPassword){
                const newUser = new User({
                    name: name,
                    email:email,
                    mobile:mobile,
                    password : hashedPassword
                });
                await newUser.save();
                res.json({status:"success"})
            }
        }
            
    } catch (error) {
        console.log(error.message);
    }
}




const verifyLogin=async(req,res)=>{
    try {
        const {email,password} = req.body;
       console.log(email,password,'hhhhhhhhhhhhhhhhhhhh');
       
        const findUser = await User.findOne({email:email});
        
        if(findUser && findUser.is_blocked === false){
            const isPasswordMatch = await bcrypt.compare(password,findUser.password);
            if(isPasswordMatch){
                const token = await generateToken({id : findUser._id})
                let data={}
                for(let key in findUser.toObject()){
                    if(key !== 'password'){
                        data[key] = findUser[key]
                    }
                }
                res.json({
                    token:token,
                    data:data
                })
            }else{
                res.json({status: "incorrect"})
            }
        }else{
            res.json({status:"usernotfound"})
        }
    } catch (error) {
        console.log(error.message);
    }
}



const profileEdit=async(req,res)=>{
    try {
        const {name,mobile,userId} = req.body;
        const updateUser = await User.findByIdAndUpdate(
            {_id:userId},
            {
                $set:{
                    name:name,
                    mobile:mobile
                }
            }
        )
        if(updateUser){
            const data={}
            const userData = await User.findOne({_id:userId})
            for(let key in userData.toObject()){
                if(key !== 'password'){
                    data[key] = userData[key]
                }
            }
            res.json({
                data:data
            })
        }
    } catch (error) {
        console.log(error.message);

    }
    
}


const addImage=async(req,res)=>{
    try {
        const image = req.file.filename
        const userId = req.body.userId
        const findUser = await User.findByIdAndUpdate(
            {_id : userId},
            {
                image :image
            }
        )

        let data = {}
        if(findUser){
            const Data = await User.findOne({_id:userId})

            for(let key in Data.toObject()){
                if(key !== 'password'){
                    data[key] = Data[key]
                }
            }
            res.json({
                data:data
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}






export {

    registerUser,
    verifyLogin,
    profileEdit,
    addImage

}
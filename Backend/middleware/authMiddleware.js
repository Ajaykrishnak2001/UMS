// import jwt from 'jsonwebtoken';
// import expressAsyncHandler from 'express-async-handler';
// import User from '../models/userModel.js';

// const protect = expressAsyncHandler(async(req ,res ,next )=>{
//     let token = req.cookies.jwt;

//     if(token){
//         try {
//            const decoded =  jwt.verify (token , process.env.JWT_SECRET_KEY);
           
//            req.user =  await User.findById(decoded.userId).select('-password');

//            next();
//         } catch (error) {
//             res.status(401).json({message:"Not authorized , Invalid token"})
//         }
//     }else{
//         res.status(401).json({message: "Not authorized , no token"})
//     }
// })

// export {protect}
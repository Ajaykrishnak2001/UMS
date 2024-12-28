import jwt from 'jsonwebtoken'

const generateToken = (payload)=>{
    const secretKey = process.env.JWT_SECRET_KEY
    const expireTime = {
        expiresIn : '1h'
    }
    const token = jwt.sign(payload,secretKey,expireTime)

    return token;
}

export default generateToken
import User from "../model/user.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from "../model/token.js";

dotenv.config();


export const signupUser = async(request, response) => {
    try{
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = {username: request.body.username, name: request.body.name, password: hashedPassword};
        const newUser = new User(user);
        await newUser.save();
        response.status(201).json({ message: "User registered successfully!" });

    }catch(error){
        response.status(500).json({ message: "Error while signing up user" });
    }
}

export const loginUser = async(request, response) => {
    console.log('c1')
    let user = await User.findOne({username: request.body.username });
    console.log('user', user);
    if(!user){
        return response.status(400).json({msg: 'Username doesnot match'});
    }
    try{
        let match = await bcrypt.compare(request.body.password, user.password);
        if(match){
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({token: refreshToken});
            await newToken.save();
            return response.status(200).json({accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username })
        }else{
            return response.status(400).json({msg: 'password does not match'});
        }
    }catch(error){
        return response.status(500).json({ message: "Error while logging in user"});
    }
}
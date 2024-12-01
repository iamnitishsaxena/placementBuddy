import User from "../model/user.js"

export const signupUser = async(request, response) => {
    try{
        const user = request.body;
        const newUser = new User(user);
        await newUser.save();
        response.status(201).json({ message: "User registered successfully!" });

    }catch(error){
        response.status(500).json({ message: "Error while signing up user" });
    }
}
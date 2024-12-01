import mongoose from "mongoose";

const Connection = async(username, password) => {
    const url = `mongodb://${username}:${password}@placementbuddy-shard-00-00.3qhav.mongodb.net:27017,placementbuddy-shard-00-01.3qhav.mongodb.net:27017,placementbuddy-shard-00-02.3qhav.mongodb.net:27017/?ssl=true&replicaSet=atlas-747wpi-shard-0&authSource=admin&retryWrites=true&w=majority&appName=placementBuddy`;
    try{
        await mongoose.connect(url, {useNewUrlParser: true});
        console.log('Connection to the database successfull')
    }catch(error){
        console.log('Error while connecting to the Database', error);
    }
}

export default Connection;
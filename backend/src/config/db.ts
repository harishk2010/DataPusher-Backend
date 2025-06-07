import mongoose from "mongoose";
import dotenv from "dotenv";
import { MongoDB } from "../utils/constants";
import seedRoles from "./RolesSeeding";

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' });
    console.log(process.env.MONGO_URI,"production")
  } else {
      dotenv.config({ path: '.env' });
      console.log(process.env.MONGO_URI,"dev")
  }

const connectDB=async()=>{
    try {
      console.log(process.env.MONGO_URI,"inside db")

       
        let connect=await mongoose.connect(`${process.env.MONGO_URI}`)
        
        console.log(`${MongoDB.SUCCESS} ${connect.connection.host}`)
        seedRoles()
    } catch (error) {
      
        console.error(MongoDB.ERROR)
        throw error
    }
}

export default connectDB
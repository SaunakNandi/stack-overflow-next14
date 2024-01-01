"use server"

import User from "@/database/user.model"
import { connectToDatabase } from "../mongoose"

export async function getUserById(params:any) {
    try{
        connectToDatabase()
        const {userId}=params
        // based on the userId we can fetch the user from the database by using User model
        // seach the user by clerkId
        const user=await User.findOne({clerkId:userId})  
        return user 
    }
    catch(error){
        alert("Error")
        throw error
    }
}
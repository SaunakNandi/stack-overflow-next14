import mongoose, { model } from 'mongoose'

let isConnected: boolean=false
export const connectToDatabase=async()=>{
    mongoose.set('strictQuery',true)  // prevent unknown field queries
    
    if(!process.env.MONGODB_URL) 
        return console.log("MISSING MONGODB_URL")

    if(isConnected)
    {
        console.log('MONGODB is already connected')
        return
    }
     try{
        await mongoose.connect(process.env.MONGODB_URL,{
            dbName:'devflow'
        })
        isConnected=true
        console.log('MONGODB is connected')
    } catch (error) {
        console.log(error)
    }
}


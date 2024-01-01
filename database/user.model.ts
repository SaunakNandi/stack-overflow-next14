import { Schema,model,models, Document } from "mongoose"

// Creating a Question Model using Mongoose
export interface IUser extends Document{
    clerkId:string;
    name:string;
    username:string;
    email:string;
    password?:string
    bio?:string;
    picture:string;
    location?:string;
    portfoliowebsite?:string;
    reputation?:number;
    saved:Schema.Types.ObjectId[];   // which post the user have saved
    joinedAt:Date
}

const UserSchema=new Schema({
    clerkId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username:{
        type:String, required:true,unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,  // required: true, not mentioned because somebody can log using google or github
    },
    bio: {
        type: String
    },
    picture: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    portfoliowebsite: {
        type: String
    },
    reputation: {
        type: Number, default:0
    },
    saved: [{
        type: Schema.Types.ObjectId,
        ref: 'Question' // Assuming there is a 'Post' model that users can save
    }],
    joinedAt: {
        type: Date,
        default:Date.now,
    }
})

// make model from QuestionSchema
// check if model is present or not if not them create a model
const User=models.User || model('User',UserSchema)

export default User
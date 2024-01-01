"use server"

// In the context of MongoDB, a "document" refers to a record or data entry 
// in a collection. A collection is a grouping of MongoDB documents. 
// Each document is a set of key-value pairs, where keys are field 
// names and values are the data associated with those fields.

import Question from "@/database/question.model"
import { connectToDatabase } from "../mongoose"
import Tag from "@/database/tag.model"

// export async function createQuestion(params: any) {
//     try {
//         // connect to DB
//         connectToDatabase()
//         // path is the url to the page we have reloaded, here Home page. Its so because we have to re-validate the page
//         // so that nextjs knows something has changed
//         const {title,content,tags,author,path}=params
        
//         // create the question
//         const question = await Question.create({
//             title,
//             content,
//             author
//         })

//         const tagDocuments=[]

//         // Create the tag or get them if they already exist

//         for(const tag of tags)
//         {
//             //console.log(tag)
//             // check the NOTE.txt

//     // findOneAndUpdate: A MongoDB method used to find a document based on specified criteria and update it,
//     //  or insert a new document if the criteria do not match any existing documents.

//             const existingTag=await Tag.findOneAndUpdate(
//                 { name: { $regex: new RegExp(`^${tag}$`, "i") } }, 
//                 { $setOnInsert: { name: tag }, $push: { question: question._id } },
//                 { upsert: true, new: true }
//             )
//             tagDocuments.push(existingTag._id)
//         }
//         //console.log(tagDocuments)
//         
//         await Question.findByIdAndUpdate(question._id,{
//             $push: { tags: { $each: tagDocuments }}  // for each tagDocument we push the id of that tag
//         })

//         // Create an interaction record for the user's ask_question action. This is to tag which user created this perticular question
        
//         // Increment author's reputation by +5 for creating a question
//     } catch (error) {
        
//     }
// }

export async function createQuestion(params: any) {
    try {
        // connect to DB
      connectToDatabase();
    // path is the url to the page we have reloaded, here Home page. Its so because we have to re-validate the page
        // so that nextjs knows something has changed
      const { title, content, tags, author, path } = params;
  
      // Create the question
      const question = await Question.create({
        title,
        content,
        author
      });
  
      const tagDocuments = [];
  
      // Create the tags or get them if they already exist
      for (const tag of tags) {

        
// findOneAndUpdate: A MongoDB method used to find a document based on specified criteria and update it,
//  or insert a new document if the criteria do not match any existing documents.
        const existingTag = await Tag.findOneAndUpdate(
          { name: { $regex: new RegExp(`^${tag}$`, "i") } }, 
          { $setOnInsert: { name: tag }, $push: { questions: question._id } },
          { upsert: true, new: true }
        )
  
        tagDocuments.push(existingTag._id);
      }
  // find the question we created and push the tags
      await Question.findByIdAndUpdate(question._id, {
        $push: { tags: { $each: tagDocuments }}       // for each tagDocument we push the id of that tag
      });
  
    // Create an interaction record for the user's ask_question action. This is to tag which user created this perticular question
        
       // Increment author's reputation by +5 for creating a question    
    } 
    catch (error) {
      console.log(error);
    }
  }
  
 
  
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";
import { db } from "../name";
import { databases } from "./config";


export default async function getOrCreateDb() {
    try {
        await databases.get(db);
        console.log("Database connection");
    } catch (error) {
        try {
            await databases.create(db,db);
            console.log("Database connected");
            await Promise.all([
                createAnswerCollection(),
                createCommentCollection(),
                createQuestionCollection(),
                createVoteCollection()
            ]).catch((err:any)=>console.log("something error at connection collection",err?.message))
        } catch (error:any) {
            console.log("Error creating databases or collection",error?.message)
        }
    }
    return databases;
}
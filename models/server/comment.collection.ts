import {db,commentCollection} from "../name";
import {IndexType,Permission} from "node-appwrite";
import {databases} from "./config"

export default async function createCommentCollection(){
    //creating collection
    await databases.createCollection(db,commentCollection,commentCollection,[
        Permission.read("any"),
        Permission.create("user"),
        Permission.delete("user"),
        Permission.update("user"),
    ])

    //create attributes
    await Promise.all([
        databases.createEnumAttribute(db,commentCollection,"type",["answer","question"],true),
        databases.createStringAttribute(db,commentCollection,"content",50,true),
        databases.createStringAttribute(db,commentCollection,"typeId",50,true),
        databases.createStringAttribute(db,commentCollection,"authorId",50,true),
  ])
}
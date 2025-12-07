import { IndexType, Permission } from "node-appwrite";

import {db,questionCollectioin} from "../name";
import {databases} from "./config";

export default async function createQuestionCollection(){
    await databases.createCollection(db,questionCollectioin,questionCollectioin,[
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users")
    ])
    console.log("Question collection created")

    //creating attributes and indexes
    await Promise.all([
        databases.createStringAttribute(db,questionCollectioin,"title",100,true),
        databases.createStringAttribute(db,questionCollectioin,"content",10000,true),
        databases.createStringAttribute(db,questionCollectioin,"authorId",50,true),
        databases.createStringAttribute(db,questionCollectioin,"tags",50,true,undefined,true),
        databases.createStringAttribute(db,questionCollectioin,"attachmentId",50,false),
    ]);
    console.log("Question attributes created");
/*     // create index
    await Promise.all([
        databases.createIndex({
            databaseId: db,
            collectionId: questionCollectioin,
            key: "title",
            type: IndexType.Fulltext,
            attributes: ["title"],
            orders: ["asc"]
        }),
        databases.createIndex({
            databaseId: db,
            collectionId: questionCollectioin,
            key: "content",
            type: IndexType.Fulltext,
            attributes: ["content"],
            orders: ["asc"]
        })
    ]) */
}
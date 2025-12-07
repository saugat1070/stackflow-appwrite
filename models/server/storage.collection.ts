
import { Permission } from "node-appwrite";
import { questionAttachmentBucket } from "../name"
import {databases,storage} from "./config"

export default async function getOrCreateStorage() {
    try {
        await storage.getBucket(questionAttachmentBucket);
        console.log("Storage Connected");
    } catch (er:any) {
        try {
            await storage.createBucket(
                questionAttachmentBucket,
                questionAttachmentBucket,
                [
                    Permission.read("any"),
                    Permission.create("users"),
                    Permission.update("users"),
                    Permission.delete("users"),
                    Permission.read("users")
                ],
                false,undefined,undefined,["jpg","png","gif","jpeg","webp","heic"]
            );
            console.log("Storage Created");
            console.log("Storage connected");
        } catch (error) {
            console.error("Error creating Storage:",error);
        }
    }
}
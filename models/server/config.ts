import {Avatars,Client,Databases,Storage,Users} from "node-appwrite";
import { Env } from "@/lib/envConfig";

let client = new Client();

client.setEndpoint(Env?.appwriteEndPoint)
      .setProject(Env?.appwriteProjectId)
      .setKey(Env?.appwriteApi)


const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);
const users = new Users(client);



export {client,users,databases,avatars,storage} ;


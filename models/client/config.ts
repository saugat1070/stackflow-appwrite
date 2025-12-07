
import {Client,Account,Databases, Avatars,Storage} from "appwrite";
import { Env } from "@/lib/envConfig";


const client = new Client()
.setEndpoint(Env.appwriteEndPoint!)
.setProject(Env.appwriteProjectId!);

const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

export {client,account,databases,avatars,storage} ;

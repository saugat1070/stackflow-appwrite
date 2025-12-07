process.loadEnvFile(".env");

interface ENV{
    appwriteProjectId : string;
    appwriteProjectName : string;
    appwriteEndPoint: string;
    domain: string;
    appwriteApi : string;
}


export const Env:ENV = {
    appwriteProjectId :process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
    appwriteProjectName: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_NAME!,
    appwriteEndPoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    domain: process.env.DOMAIN!,
    appwriteApi: process.env.APPWRITE_API_KEY!,
}
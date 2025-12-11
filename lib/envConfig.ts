// process.loadEnvFile(".env")
interface ENV{
    appwriteProjectId : string;
    appwriteProjectName : string;
    appwriteEndPoint: string;
    domain: string;
    appwriteApi : string;
}

// function getEnvVariable(key: string): string {
//     const value = process.env[key];
//     if (!value) {
//         throw new Error(`Environment variable ${key} is not set`);
//     }
//     return value;
// }

export const Env: ENV = {
    appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    appwriteProjectName: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_NAME),
    appwriteEndPoint: String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
    domain: String(process.env.DOMAIN),
    appwriteApi: String(process.env.APPWRITE_API_KEY)
}


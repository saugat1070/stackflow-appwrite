import {create} from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { AppwriteException,ID,Models } from "node-appwrite";
import { account } from "@/models/client/config";
export interface UserPref{
    reputation:number,

}
interface IAuthStore{
    session: Models.Session | null;
    jwt: string | null;
    user: Models.User<UserPref> | null;
    hydrated: boolean;
    setHydrated(): void;
    verifySession():Promise<void>;
    login(email:string,password:string):Promise<{success:boolean,error ?: AppwriteException | null}>;
    createAccount(name:string,email:string,password:string):Promise<{success:boolean,error ?: AppwriteException | null}>;
    logout():Promise<void>
    
}


export const useAuthStore = create<IAuthStore>()(
    persist(
        immer(
            (set)=>({
                session:null,
                jwt:null,
                user:null,
                hydrated:false,
                setHydrated(){
                    set({hydrated:true})
                },
                async  verifySession() {
                    try {
                        const session = await account.getSession("current")
                        set({session});
                    } catch (error:any) {
                        console.log(`Error at verifySession:${error?.message}`)
                    }
                },
                async  login(email,password) {
                    try {
                        const session = await account.createEmailPasswordSession(email.toString(),password.toString());
                        const [user,{jwt}] = await Promise.all([
                            account.get<UserPref>(),
                            account.createJWT()
                        ]);
                        // const cookieStorage = await cookies();
                        // cookieStorage.set("auth-token:",jwt);
                        return { success: true };
                    } catch (error: any) {
                        console.log(`Error at Login:${error?.message}`);
                        return { success: false, error };
                    }
                },
                async  createAccount(name,email,password) {
                    try {
                        await account.create(ID.unique(),email,password,name)
                        return {success:true}
                    } catch (error:any) {
                        console.log(`Error at CreatAccount on zustand:${error}`)
                        return {success:false}
                    }
                },
                async  logout() {
                    try {
                        // Call API route to logout and clear cookie
                        const logout = await account.deleteSessions();
                    } catch (error:any) {
                        console.log(`Error at logout:${error?.message}`)
                    }
                }
            })
        ),
        {
            name:"auth",
            onRehydrateStorage(){
                return (state,error)=>{
                    if(!error) state?.setHydrated();
                }
            }
        }
    )
)
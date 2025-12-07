import {create} from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { AppwriteException,ID,Models } from "node-appwrite";
import { account } from "@/models/client/config";
import { Noto_Sans_Bhaiksuki } from "next/font/google";

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
                        const session = await account.createEmailPasswordSession(email,password);
                        const [user,{jwt}] = await Promise.all([
                            account.get<UserPref>(),
                            account.createJWT()
                        ]);
                        if(!user.prefs?.reputation) await account.updatePrefs<UserPref>({reputation:0})
                        set({session,user:user,jwt});
                        return {success:true}
                    } catch (error:any) {
                        console.log(`Error at Login:${error?.message}`);
                        return {success:false};
                    }
                },
                async  createAccount(name,email,password) {
                    try {
                        await account.create(ID.unique(),email,password,name)
                        return {success:true}
                    } catch (error:any) {
                        console.log(`Error at CreatAccount on zustand:${error?.message}`)
                        return {success:false}
                    }
                },
                async  logout() {
                    try {
                        await account.deleteSessions();
                        set({session:null,jwt:null,user:null})
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
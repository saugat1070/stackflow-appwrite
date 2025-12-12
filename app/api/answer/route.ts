import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { UserPref } from "@/store/auth.store";
import { AsyncCallbackSet } from "next/dist/server/lib/async-callback-set";

export async function POST(request:NextRequest){
    try {
        const {questionId,answer,authorId} = await request.json();
        await databases.createDocument(db,answerCollection,ID.unique(),{
            content:answer,authorId,questionId
        });
        const prefs = await users.getPrefs<UserPref>(authorId)
        await users.updatePrefs<UserPref>(authorId,{
            reputation: Number(prefs.reputation) +1
        })

        return NextResponse.json({success:true},{status:201})
    } catch (error:any) {
        return NextResponse.json({
            error: error?.message || "Error Creating answer"
        },{status: error?.status || error?.code || 500})
    }
}

export async function DELETE(request:NextRequest) {
    try {
       const {answerId} = await request.json()
       await databases.getDocument(db,answerCollection,answerId);
       const response = await databases.deleteDocument(db,answerCollection,answerId);
       const prefs = await users.getPrefs<UserPref>(answerId.authorId)
        await users.updatePrefs<UserPref>(answerId.authorId,{
            reputation: Number(prefs.reputation) -1
        })

        return NextResponse.json({success:true},{status:201})
    } catch (error:any) {
        return NextResponse.json({
            error:error?.message || "Error creating answer"
        },{status:error?.code || 500})
    }
}

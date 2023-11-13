import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
export async function POST(request:NextRequest){
     const session= await getServerSession(authOptions)
    const body=await request.json()
    //check authorization
    if(!session)
    return NextResponse.json({error:'Unauthorized'},{status:401})
    //validate body
   const validation= issueSchema.safeParse(body)
   //check Validation
   if(!validation.success){
    //call format function to show errors separately for each field
    return NextResponse.json(validation.error.format(),{status:400})
   }
   //create an issue

  const newIssue=await prisma.issue.create({
    data:{
        title:body.title,
        description:body.description
    }
   })
   return NextResponse.json(newIssue,{status:201})


}
import React from 'react'
import prisma from '@/prisma/client'
import dynamic from 'next/dynamic'
import IssueFormSkeleton from './loading'

const IssueForm=dynamic(()=>import('../../_components/IssueForm'),
   {ssr:false,
     loading:()=><IssueFormSkeleton/>
  }
)
interface Props{
params:{id:string}
    
}
const EditPage = async({params}:Props) => {
const issue=await prisma.issue.findUnique({
  where:{
    id:parseInt(params.id)
  }
})
  return (
    <IssueForm issue={issue!}/>
  )
}

export default EditPage
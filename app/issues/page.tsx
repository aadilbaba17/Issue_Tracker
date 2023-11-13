import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import Pagination from '../components/Pagination'
import IssueTable, { IssueQuery, columnNames } from './IssueTable'
import IssueActions from './issueActions'
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'

interface Props{
  searchParams:IssueQuery,

}
const page = async ({searchParams}:Props) => {


  const statuses=Object.values(Status);
  const status= statuses.includes(searchParams.status)?
                searchParams.status:
                undefined;
  const orderBy= columnNames
                  .includes(searchParams.orderBy)?
                  {[searchParams.orderBy]:'asc'}:
                  undefined;
  const where={status}
    const page=parseInt(searchParams.page)|| 1;
    const pageSize=10;
  const issues=await prisma.issue.findMany({
    where,
    orderBy,
    skip:(page-1)*pageSize,
    take:pageSize
  })
  const issueCount = await prisma.issue.count({where})

  return (
    <>
    <Flex direction='column' gap='3'>
      <IssueActions/>
      <IssueTable searchParams={searchParams} issues={issues}/>
    <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page}/>
    </Flex>
    </>
  )
}
export const dynamic='force-dynamic'
export const metadata:Metadata={
  title:"Issue Tracker-Issue list ",
  description:"View all project issues"
}


export default page
import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueCharts from "./IssueCharts";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";


export default async function Home() {
  const open = await prisma.issue.count({where:{status:'OPEN'}})
  const close = await prisma.issue.count({where:{status:'CLOSED'}})
  const inProgress = await prisma.issue.count({where:{status:'IN_PROGRESS'}})
  return (
          <Grid columns={{initial:'1',md:"2"}} gap='5'>
              <Flex direction='column' gap="5">
                <IssueSummary open={open} close={close} inProgress={inProgress}/>
                <IssueCharts  open={open} close={close} inProgress={inProgress}/>
              </Flex>
                <LatestIssues/>
          </Grid>
     
  )
}
export const dynamic='force-dynamic'
export const metadata:Metadata={
  title:"Issue Tracker-Dashboard",
  description:"View summary of project issues"
}

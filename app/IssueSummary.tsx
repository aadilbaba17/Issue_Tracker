import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'
interface Props{
open:number;
close:number,
inProgress:number
}
const IssueSummary = ({open,close,inProgress}:Props) => {
    const containers=[
        {label:'Open Issues', value:open,status:"OPEN"},
        {label:'Closed Issues', value:close,status:"CLOSED"},
        {label:'In progress Issues', value:inProgress,status:"IN_PROGRESS"}
    ]
  return (
    <Flex gap='4'>
        {containers.map(container=>
        <Card key={container.label}>
          <Flex direction='column' gap='2'>
           <Link className='text-sm font-medium' href={`/issues?status=${container.status}`}> {container.label}</Link>
           <Text size='3' className='font-bold'>{container.value}</Text>
          </Flex>

        </Card>)}
    </Flex>
  )
}

export default IssueSummary
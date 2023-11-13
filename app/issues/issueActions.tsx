import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueFilter from './IssueFilter'

const IssueActions = () => {
  return (
    <Flex  justify='between'>
      <IssueFilter/>
        <Link href='/issues/new'>
            <Button>Add Issue</Button>
            </Link>
            
            </Flex>
  )
}

export default IssueActions
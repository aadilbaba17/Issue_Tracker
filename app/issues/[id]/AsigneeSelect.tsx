'use client'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import { Skeleton }   from '@/app/components'
import axios from 'axios'
import toast ,{Toaster} from 'react-hot-toast'


const AsigneeSelect = ({issue}:{issue:Issue}) => {
    const {data:users,isLoading,error} =useUsers()
    if(error) return null;
    if(isLoading) return <Skeleton height='2rem'/>

    const assignIssue=(userId:string)=>
    axios.patch('/api/issues/' + issue.id,
    {assignedToUserId:userId || null} )
    .catch(()=>{toast.error('Could not assign the issue')})

  return (
    <>
    <Select.Root 
    defaultValue={issue.assignedToUserId||''}
    onValueChange={assignIssue}>
        <Select.Trigger placeholder='Asign...'/>
        <Select.Content>
            <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value=''>Unassign</Select.Item>
            {users?.map((user)=> <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)}
           
            </Select.Group>
        </Select.Content>
    </Select.Root>
    <Toaster/>
    </>
  )
}

const useUsers=()=>useQuery<User[]>({
    queryKey:['users'],
    queryFn:()=>axios.get('/api/users').then(res=>res.data),
    staleTime:60*1000,
    retry:3
  })

export default AsigneeSelect
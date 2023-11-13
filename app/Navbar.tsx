"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import { useSession } from 'next-auth/react'
import classNames from 'classnames'
import { Skeleton } from '@/app/components'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'

const Navbar = () => {
  return (
    <nav className=' border-b mb-5 px-5 py-3 '>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
            <Link href='/'><AiFillBug /></Link>
            <NavLinks />
          </Flex>
          <Box>
            <AuthStatus />
          </Box>
        </Flex>
      </Container>
    </nav>
  )
};
const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { lablel: "dasboard", href: '/' },
    { lablel: "Issues", href: '/issues' }
  ]
  return (
    <ul className='flex space-x-6'>
      {links.map((link) => {
        return (
          <li key={link.href}>
            <Link

              className={classNames({
                "nav-link": true,
                '!text-zinc-900': link.href == currentPath,

              })}
              // className={`${link.href==currentPath?'text-zinc-900':'text-zinc-400'} hover:text-zinc-800 transition-colors`}
              href={link.href}>{link.lablel}</Link></li>
        )
      })}
    </ul>

  )
}

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === 'loading') return <Skeleton width='3rem'/>;
  if (status === 'unauthenticated') {
    return (
      <Link href={'/api/auth/signin'} className='nav-link'>Log In</Link>
    )
  }
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar src={session!.user!.image!}
          fallback="?"
          size="2"
          radius='full'
          className='cursor-pointer'
          referrerPolicy='no-referrer'
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text size='2'>
            {session!.user!.email}
          </Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link href={'/api/auth/signout'}>Log Out</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )

}




export default Navbar
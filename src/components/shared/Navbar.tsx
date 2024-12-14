import { NAV_LINKS } from '@/lib/constants'
import React from 'react'
import { Button, buttonVariants } from '../ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {  hasCookie } from 'cookies-next';
import { cookies } from 'next/headers';

const Navbar = async () => {
  const token = await hasCookie('token', { cookies })
  return (
    <header className='h-16 center bg-gray-800'>
      <nav className='box between'>
        <Link href="/" className='text-white text-3xl font-semibold'>K</Link>
        <ul className='center gap-4'>
          {NAV_LINKS.map((link) => (
            <li key={link.name} className=' text-white tracking-wide'>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
        <>
          {token ? <Button>Logout</Button> :
            <div className='space-x-4'>
              <Link className={cn(buttonVariants({ variant: 'default' }))} href="/sign-up">Sign-up</Link>
              <Link className={cn(buttonVariants({ variant: 'default' }))} href="/sign-in">Sign-in</Link>
            </div>
          }
        </>
      </nav>
    </header>
  )
}

export default Navbar

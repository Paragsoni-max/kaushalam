import { FOOTER_LINKS } from '@/lib/constants'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className='h-16 center bg-gray-800 text-white'>
            <section className='box between gap-4'>
                <Link href="/" className='text-white text-3xl font-semibold'>K</Link>
                <div className=' space-x-8'>
                    {FOOTER_LINKS.map((link) => (
                        <Link key={link.name} href={link.href}>{link.name}</Link>
                    ))}
                </div>
            </section>
        </footer>
    )
}

export default Footer

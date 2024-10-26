import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className='text-white-100 bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 body-text'>
        <div className='container mx-auto text-white flex flex-wrap p-3 flex-col md:flex-row items-center md:w-[80%]'>
        <Link href="/" className="flex title-font font-extrabold items-center uppercase text-gray-100">
                <Image src="/Pizza.svg" alt="Navbar logo" width={60} height={60}>
                </Image>
                <p className="leading-5 text-xl mx-2">Pizza Hub</p>
            </Link>
            <p className='text-sm text-gray-100 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4'>
                Copyright o 2024 Pizza Hub
            </p>
        </div>
    </footer>
  )
}

export default Footer
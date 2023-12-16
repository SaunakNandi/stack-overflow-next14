/* eslint-disable react/jsx-no-undef */
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { SignedIn, UserButton } from '@clerk/nextjs'
import Theme from './Theme'
import MobileNav from './MobileNav'
import GlobalSearch from './search/GlobalSearch'
const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6
    shadow-light-300">
        <Link href="/" className="flex items-center gap-1">
            <Image src="/assets/images/site-logo.svg"
            width={23}
            height={23}
            alt="Devflow"/>
            {/* max-sm:hidden means for small screen keep it hidden */}
            <p className='h2-bold font-spaceGrotesk text-dark-100
            dark:text-light-900 max-sm:hidden'>Dev <span className="text-primary-500">Overflow</span></p>
        </Link>
        <GlobalSearch/>
        <div className="flex-between gap-5">
            <Theme></Theme>

            {/* The code inside the SignedIn will only display if the user in loggedin*/}
            <SignedIn>
                <UserButton afterSignOutUrl="/"
                appearance={{
                    elements:{
                        avatarBox:'h-10 w-10'
                    },
                    variables:{
                        colorPrimary:'#ff7000'
                    }
                }}/>
            </SignedIn>
            
            <MobileNav></MobileNav>
        </div>
    </nav>
  )
}

export default Navbar
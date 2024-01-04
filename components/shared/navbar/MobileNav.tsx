"use client"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"

  import Image from 'next/image'
import Link from 'next/link'
import { SignedOut } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'

//called by MobleNav
export const NavContent=()=>{

  const pathname=usePathname()  // usePathname is a client-side hook
  //console.log(pathname)
  return(
    <section className='flex h-full flex-col gap-6 pt-16'>
      {sidebarLinks.map((item)=>{
        const isActive=(pathname.includes(item.route) && item.route.length>1) || pathname===item.route
        return(
          <SheetClose asChild key={item.route}>
            <Link href={item.route}
            className={`${isActive? 'primary-gradient rounded-lg text-light-900'
          :'text-dark300_light900'}
            flex items-center justify-start gap-4  p-4`}>
              {/* invert-colors and invert is same */}
              <Image src={item.imgURL} alt={item.label}
              width={20}
              height={20}
              className={`${isActive?"":"invert"}`}/>
              <p className={`${isActive?"base-bold":"base-medium"}`}>{item.label}</p>
            </Link>
          </SheetClose>
        )
      })}
    </section>
  )
}
const MobileNav = () => {
  return (
    <Sheet >
        {/* <SheetTrigger asChild> means passing Image inside it */}
        {/* <sheetTrigger> act as button */}
      <SheetTrigger asChild>
        <Image src="/assets/icons/hamburger.svg"
        width={36}
        height={36}
        alt="Menu"
        className='invert-colors cursor-pointer sm:hidden'/>
      </SheetTrigger>
      <SheetContent side="left" 
      className='background-light900_dark200'>
        <Link href="/" className="flex items-center gap-1">
            <Image src="/assets/images/site-logo.svg"
            width={23}
            height={23}
            alt="Devflow"/>
            {/* max-sm:hidden means for small screen keep it hidden */}
            <p className='h2-bold text-dark100_light900 font-spaceGrotesk'>Dev <span className="text-primary-500">Overflow</span></p>
        </Link>
        <div>
          <SheetClose asChild>
            <NavContent></NavContent>
          </SheetClose>

          {/* Only going to work if we sign out */}
          <SignedOut>
            {/* <SheetClose> is a component in the shadcn-ui library that allows you to close sheets. Sheets are modal components 
            that can be used to display additional information or interact with the user in a focused way. */}
            {/* Content to show (i.e sign-in) after we signed out */}
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href='/sign-in'>
                  <Button className='small-medium btn-secondary
                  min-h-[41px] w-full rounded-lg px-4 py-3'>
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href='/sign-up'>
                  <Button className='small-medium light-border-2 btn-tertiary
                  text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3'>
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav
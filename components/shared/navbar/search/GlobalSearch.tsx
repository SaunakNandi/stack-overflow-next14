import React from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
const GlobalSearch = () => {
  return (
    <div className='relative w-full max-w-[600px] max-lg:hidden'>
        <div className="background-light800_darkgradient
        relative flex min-h-[56px] grow
        items-center gap-1 rounded-xl">
            <Image src="/assets/icons/search.svg"
              width={24}
              height={24} alt="search"
              className='cursor-pointer'/>

              <Input type="text"
              placeholder="search globally"
              className="paragraph-regular placeholder
              background-light800_darkgradient text-dark400_light700
              border-none shadow-none"/>
        </div>
    </div>
  )
}

export default GlobalSearch
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
interface MetricProps{
    imgUrl:string
    alt:string
    value:string | number
    title:string
    href?:string
    textStyles?:string
    isAuhtor?:boolean
}
const Metric = ({imgUrl,alt,value,title,href,textStyles,isAuhtor}:MetricProps) => {
  
// We are trying to put the avatar inside the Link component but we cannot put all the parts(i.e profile name,votes,view) under <Link/>
// so we put the icons under metricContent and then checking if(href) (only passed by the avatar metric) has url, if yes then put 
// {metricContent} under <Link></Link>

  const metricContent=(
    <>
    <Image src={imgUrl}
        width={16}
        height={16}
        alt={alt}
        className={`object-contain ${href? 'rounded-full':''}`}/>
        <p className={`${textStyles} flex items-center gap-1`}>
            {value}
            <span className={`small-regular
            ${isAuhtor?'max-sm:hidden': ''}`}>
            {title}
            </span>
        </p>
    </>
  )

  if(href)
  {
    // if href present return from here (This will only take the profile icon i.e the first Metric)
    return (
      <Link href={href} className="flex-center gap-1">
        {metricContent}
      </Link>
    )
  }

    // if href not present return from here (This will take the rest of the Metric) 
  return (
    <div
    className='flex-center flex-wrap gap-1'>
        {metricContent}
    </div>
  )
}

export default Metric
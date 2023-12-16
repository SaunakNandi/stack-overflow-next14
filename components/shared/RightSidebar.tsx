
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import RenderTag from './RenderTag'

const RightSidebar = () => {
    const hotQuestions=[
        {_id:1,title:'Would it be appropriate to point out an error in another paper during a referee report?'},
        {_id:2,title:'Would it be appropriate to point out an error in another paper during a referee report?'},
        {_id:3,title:'Would it be appropriate to point out an error in another paper during a referee report?'},
        {_id:4,title:'Would it be appropriate to point out an error in another paper during a referee report?'},
        {_id:5,title:'Would it be appropriate to point out an error in another paper during a referee report?'}
    ]

    const popularTags=[
        {_id:1,name:"javascript",totalQuestions:5},
        {_id:2,name:"react",totalQuestions:5},
        {_id:3,name:"next",totalQuestions:5},
        {_id:4,name:"vue",totalQuestions:5},
        {_id:5,name:"angular",totalQuestions:5},
    ]
  return (
    <section className='background-light900_dark200 light-border 
    custom-scrollbar sticky right-0 flex h-screen 
    w-[350px] flex-col overflow-y-auto border-l p-6 
    pt-36 shadow-light-300 max-xl:hidden
    '>
        <div className="">
            <h3 className="h3-bold text-dark200_light900">
                Top Questions
            </h3>
            <div className="mt-7 flex w-full flex-col
            gap-[30px]">
                {hotQuestions.map((question)=>(
                    <Link 
                    className='flex cursor-pointer items-center'
                    key={question._id} href={`/questions/${question._id}`}>
                        <p className='body-medium text-dark500_light700'>{question.title}</p>
                        <Image src="/assets/icons/chevron-right.svg"
                        className='invert-colors'
                        alt="question.title"
                        width={20}
                        height={20}/>
                    </Link>
                ))}
            </div>
        </div>
        <div className="mt-16">
            <h3 className="h3-bold text-dark200_light900">Popular tags</h3>
            <div className="mt-7 flex flex-col gap-4">
                {popularTags.map((tag)=>(

                    <RenderTag key={tag._id}
                    _id={tag._id}
                    name={tag.name}
                    totalQuestions={tag.totalQuestions}
                    showCount
                    />
                ))}
            </div>
        </div>
    </section>
  )
}

export default RightSidebar
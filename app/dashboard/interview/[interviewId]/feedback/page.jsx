"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import PropTypes from 'prop-types'

function Feedback({params}) {

    const [feedbackList, setFeedbackList]=useState([]);
    const router=useRouter();

    useEffect(()=>{
        GetFeedback();
    },[])

    const GetFeedback= async()=>{

        const result = await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id);
        console.log(result);
        setFeedbackList(result);
    }

  return (
    <div className='p-10 '>
        <h2 className='text-3xl font-bold text-pink-500'>Congratulations!!</h2>
        <h2 className='font-bold text-2xl text-pink-400'>Here is your Feedback for the interview</h2>
        <h2 className='text-pink-300 text-lg my-3'>Your overall interview rating: <strong>7/10</strong></h2>

        <h2 className='text-sm text-pink-200'>Below is the interview questions asked along with a correct format of answering, along with your answer for comparison and feedback for areas of improvement:</h2>

        {feedbackList && feedbackList.map((item, index)=>(
            <Collapsible key={index} className='mt-7'>
            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 text-pink-500 w-full'>
            {item.question} <ChevronDown className='h-6 w-6 text-pink-300 mr-2'/>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className='flex flex-col gap-2'>
                <h2 className='text-pink-400 p-2 border rounded-lg'><strong>Rating: </strong>{item.rating}</h2>
                <h2 className='p-2 border rounded-lg bg-pink-100 text-sm text-pink-400'><strong className='text-pink-400'>Your Answer: </strong>{item.userAns}</h2>
                <h2 className='p-2 border rounded-lg bg-pink-100 text-sm text-pink-600'><strong className='text-pink-600'>Correct Answer: </strong>{item.correctAns}</h2>
                <h2 className='p-2 border rounded-lg bg-pink-100 text-sm text-pink-400'><strong className='text-pink-400'>Feedback: </strong>{item.feedback}</h2>

              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}


        <Button onClick={()=>router.replace('/dashboard')} className='mt-2'>Home</Button>


    </div>
  )
}
Feedback.propTypes = {
    params: PropTypes.shape({
        interviewId: PropTypes.string.isRequired,
    }).isRequired,
}

export default Feedback
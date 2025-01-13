"use client";
import { db } from '@/utils/db';
import { IntervAI } from '@/utils/schema';
import { eq } from 'drizzle-orm'; 
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Interview() {
    const params = useParams(); 
    
    const [interviewData, setInterviewData] = useState();
    const [webCamEnabled, setWebCamEnabled] = useState(false);

    useEffect(() => {
        console.log(params.interviewId);
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        try {
            const result = await db
                .select()
                .from(IntervAI)
                .where(eq(IntervAI.mockId, params.interviewId));

            setInterviewData(result[0]);
        } catch (error) {
            console.error('Error fetching interview details:', error);
        }
    };

    return (
     <div className='my-10 '>
        <h2 className='font-bold text-2xl text-pink-400'>Let's Get Started</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div>
           {webCamEnabled ? 
           <Webcam 
               onUserMedia={() => setWebCamEnabled(true)}
               onUserMediaError={() => setWebCamEnabled(false)}
               mirrored={true}
               style={{
                   height: 300,
                   width: 300
               }}
           /> 
           :
           <>
               <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
               <Button className='w-full' onClick={() => setWebCamEnabled(true)}>Enable Web Camera and Microphone</Button>
           </>
           }
        </div>
        
        {interviewData ? (
            <div className='flex flex-col my-5 gap-5  '>
                <div className=' flex flex-col p-5 rounded-lg border gap-5'>
                <h2 className='text-lg text-pink-400'><strong>Job Position:</strong> {interviewData.jobPosition}</h2>
                <h2 className='text-lg text-pink-400'><strong>Job Description:</strong> {interviewData.jobDesc}</h2>
                <h2 className='text-lg text-pink-400'><strong>Years of Experience:</strong> {interviewData.jobExperience}</h2>
                </div>
                <div className='p-5 border rounded-lg border-pink-400 bg-pink-200'>
                    <h2 className='flex gap-2 items-center text-pink-400'><Lightbulb/><strong>Information</strong></h2>
                    <h2 className='mt-3 text-pink-400'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                </div>
            </div>
        ) : (
            <p>Loading interview details...</p>  // Show a loading message while waiting for data
        )}
        </div>
        <div className='flex justify-end items-end'>
            <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
        <Button className='mt-10 '>Start the Interview</Button>
        </Link>
        </div>
        
         
       
    </div>
    
    );
}

export default Interview;

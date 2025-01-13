"use client"
import { db } from '@/utils/db';
import { IntervAI } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview() {
    const params = useParams(); 
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);

    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        try {
          const result = await db
            .select()
            .from(IntervAI)
            .where(eq(IntervAI.mockId, params.interviewId));
      
          const rawJsonMockResp = result[0].jsonMockResp;
          console.log('Raw jsonMockResp:', rawJsonMockResp);  // Check raw data before parsing
      
          const jsonMockResp = JSON.parse(rawJsonMockResp);
          console.log('Parsed jsonMockResp:', jsonMockResp);  // Check the structure
      
          // Check if interview_questions exists and is an array
          if (jsonMockResp && Array.isArray(jsonMockResp.interview_questions)) {
            setMockInterviewQuestion(jsonMockResp.interview_questions);  // Set the questions array directly
          } else {
            console.error('interview_questions is not an array or is missing:', jsonMockResp.interview_questions);
            setMockInterviewQuestion([]);  // Empty array if not in the correct format
          }
      
          setInterviewData(result[0]);
        } catch (error) {
          console.error('Error fetching interview details:', error);
        }
      };
      
      

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <QuestionsSection mockInterviewQuestion={mockInterviewQuestion} 
                activeQuestionIndex = {activeQuestionIndex}
                />

                <RecordAnswerSection
                mockInterviewQuestion={mockInterviewQuestion} 
                activeQuestionIndex = {activeQuestionIndex}
                interviewData={interviewData}
                />
            </div>
            <div className='flex justify-end gap-6'>
               {activeQuestionIndex>0 && 
               <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
               {activeQuestionIndex != mockInterviewQuestion?.length-1 && 
               <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
               {activeQuestionIndex == mockInterviewQuestion?.length-1 && 
               <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
               <Button >End Interview</Button></Link>}
            </div>
        </div>
    );
}

export default StartInterview;

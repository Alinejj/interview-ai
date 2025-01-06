"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModel'
import {  LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { IntervAI } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'


function AddNewInterview() {
    const [openDialog, setOpenDialog] =useState(false);
    const [jobPosition, setJobPosition]=useState();
    const [jobDesc, setJobDesc]=useState();
    const [jobExperience, setJobExperience]=useState();
    const [loading, setLoading]=useState(false);
    const [jsonResponse, setJsonResponse]=useState([]);
    const router = useRouter();
    const {user} = useUser();

    const onSubmit= async(e)=>{
      setLoading(true);
      e.preventDefault();
      console.log(jobPosition, jobDesc, jobExperience);

      const InputPrompt="Job Position: "+jobPosition+", Job Description: "+jobDesc+", Years of Experience: "+jobExperience+", Based on the description and years of experience give us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview questions along with answers in json format, give us question and answer field on json ";

      const result= await chatSession.sendMessage(InputPrompt);

      const MockJsonResponse=(result.response.text()).replace('```json', '').replace('```', '');

      console.log(JSON.parse(MockJsonResponse));
      setJsonResponse(MockJsonResponse);


     if(MockJsonResponse){ 
      const response = await db.insert(IntervAI)
      .values({
        mockId: uuidv4(),
        jsonMockResp: MockJsonResponse,
        jobPosition: jobPosition,
        jobDesc: jobDesc,
        jobExperience: jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-YYYY')
      }).returning({mockId:IntervAI.mockId});
        
      console.log("Inserted ID:", response)
      
      if (response.length > 0 && response[0]?.mockId) {
        router.push(`/dashboard/interview/${response[0].mockId}`);
      } else {
        console.error("mockId not found in the response:", response);
      }
      if(response){
        setOpenDialog(false);
      }
    }
    else{
      console.log("ERROR");
      router.push('/dashboard/interview/'+response[0]?.mockId)
    }
      setLoading(false);
    }

  return (
    <div>
      <button
      className="p-10 w-full border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
  <h2 className="font-bold text-lg text-center text-pink-300">
    + Add New
  </h2>
</button>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl mb-2">
              Tell us more about the position you are interviewing for
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <form onSubmit={onSubmit}>
            <div>
              <h2 className="text-pink-400 mb-2">
                Add the job description details for the position/role and years
                of experience
              </h2>
              <div className="space-y-2">
                <label htmlFor="job-position" className="block"> Job Position </label>
                <Input id="job-position" placeholder="Ex. Machine Learning Engineer" required
                onChange={(event)=>setJobPosition(event.target.value)}
                />
              </div>
              <div className="my-3">
                <label htmlFor="job-description" className="block"> Job Description/Tech Stack </label>
                <Textarea id="job-position" placeholder="Ex. React, C++, NodeJs, NoSQL etc" required
                onChange={(event)=>setJobDesc(event.target.value)}
                />
              </div>
              <div className="my-3">
                <label htmlFor="years-of-experience" className="block"> Years of Experience </label>
                <Input id="years-of-exp" placeholder="Ex. 5" type='number' max="100" required
                onChange={(event)=>setJobExperience(event.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-5 justify-end mt-4">
              <Button  type='button' variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button type='submit' disabled={loading}>
                {loading? 
                <>
                <LoaderCircle className='animate-spin' /> 'Generating response from AI'
                </> : 'Start Interview'}
               </Button>
            </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewInterview
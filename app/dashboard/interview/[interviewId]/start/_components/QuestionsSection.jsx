

import React from 'react';
import PropTypes from 'prop-types';
import { Lightbulb, Volume2 } from 'lucide-react';

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {

    const textToSpeach = (text) =>{
        if('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }
        else{
            alert('Sorry, your browser does not support text to speech')
        }
    }

    console.log('mockInterviewQuestion:', mockInterviewQuestion); // Log the questions to verify
  
    if (!Array.isArray(mockInterviewQuestion) || mockInterviewQuestion.length === 0) {
      return <p>No questions available or invalid data format.</p>;
    }
  
    return mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion.map((question, index) => (
            <h2 key={question.id || index} className={`p-2  bg-secondary rounded-full mt-4 text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex==index && 'bg-pink-400 text-white'}`}>
              Question #{index + 1}
            </h2>
          ))}


        </div>
        <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>

          <Volume2 className='cursor-pointer' onClick={()=>textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)} />

        <div className='border rounded-lg p-5 bg-pink-200 mt-20'>
            <h2 className='flex gap-2 items-center text-pink-400'>
                <Lightbulb />
                <strong className='text-pink-400'>Note:</strong>
            </h2>
            <h2 className='text-sm text-pink-400 my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
        </div>
      </div>
    );
  }
  

  QuestionsSection.propTypes = {
    mockInterviewQuestion: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeQuestionIndex: PropTypes.number.isRequired,
  };
  
 
  export default QuestionsSection;
  
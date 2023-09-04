
import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface DictaphoneProps {
  onTextChange: (text: string) => void;
  isStarted: boolean; 
}

const Dictaphone: React.FC<DictaphoneProps> = ({ onTextChange,isStarted }) => {
  const [check, setCheck] = useState(true);

  const handleCheck = () => {
    setCheck(!check);
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      // Call the callback function with the recorded text
      onTextChange(transcript);
    }
  }, [transcript, onTextChange]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const test = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10 mt-10';
  const che = 'bg-green-500 text-white font-bold py-2 px-4 rounded ml-10 mt-10';

  return (
    <>
      <div>
        <p className='bg-blue-400 text-white center font-bold py-2 px-4 rounded mt-10 w-30'>
         Try Speaking your responce !!! Currenntly  Microphone: {listening ? 'on' : 'off'}
        </p>  

        {isStarted &&   <button
          className={check ? test : che}
          onClick={() => {

          
              SpeechRecognition.startListening();
              handleCheck();
            
            
          }}
        >   
          Enable mic
        </button>}
       
       {isStarted &&  <button
          className={check ? test : che}
          onClick={() => {
            SpeechRecognition.stopListening();
            handleCheck();
          }}
        >
          Disable mic
        </button>}
        {/* <button
          className={check ? test : che}
          onClick={() => {
            resetTranscript();
            handleCheck();
          }}
        >
          Reset
        </button> */}
        {/* <p className='w-160 h-160 ml-10 mr-10 mt-10 border border-2'>{transcript}</p> */}
      </div>
    </>
  );
};

export default Dictaphone;

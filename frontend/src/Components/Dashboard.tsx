import React, { useState, useEffect } from 'react';
import Dictaphone from './SpeechRecognition';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const navigate = useNavigate()
  const [isStarted, setIsStarted] = useState(false);
  const [dataArray, setDataArray] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recordedText, setRecordedText] = useState<string | null>(null);
  const [timer, setTimer] = useState<number | null>(null); 
  const [questions, setQuestions] = useState<string[]>([]);

  const handleStartButtonClick = () => {
    setIsStarted(true); // Enable timer and voice recognition
    setTimer(60); // Start the timer with an initial value of 60 seconds
  };

  useEffect(() => {
    const storedData = localStorage.getItem('questions');
    if (storedData) {
      setQuestions(JSON.parse(storedData));
    }
  }, []);

  const handleDictaphoneText = (text: string) => {
    setRecordedText(text);
  };

  useEffect(() => {
    if (isStarted) {
      // Start the timer when isStarted becomes true
      if (currentQuestionIndex < questions.length && timer !== null && timer > 0) {
        const interval = setInterval(() => {
          setTimer((prevTimer) => (prevTimer !== null ? prevTimer - 1 : null));
        }, 1000);

        // Clear the timer when the component unmounts or the question changes
        return () => {
          clearInterval(interval);
        };
      }
    }
  }, [isStarted, currentQuestionIndex, questions, timer]);

  useEffect(() => {
    if (timer === 0 && currentQuestionIndex < questions.length - 1) {
      // Timer has expired, move to the next question if there are more questions
      if (recordedText) {
        // Save the recorded text to the array
        setDataArray((prevDataArray) => [...prevDataArray, recordedText]);
        setRecordedText(null);
      }
      // Move to the next question
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimer(60); // Reset timer to 60 seconds for the next question
    }
  }, [timer, recordedText, currentQuestionIndex, questions]);


  const sendDataToServer = () => {
    console.log(dataArray);
    let payload = {
        "id": "64f23246c5cd72aa0ab6ec28",
        "question1": questions[0],
        "question2": questions[1],
        "answer1": dataArray[0]||"",
        "answer2": dataArray[1]||"",
    };
    // console.log(payload);

    // Define the endpoint URL
    const endpoint = "https://hacksquad-api.onrender.com/question/rating";

    // Define the request options
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    };

    // Make the POST request
    fetch(endpoint, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Response from server:", data);
            localStorage.setItem("feedback", JSON.stringify(data));
          navigate("/feedback");
        })
        .catch((error) => {
            console.error("Error sending data to server:", error);
            
        });
};


  return (
    <div>
      {currentQuestionIndex < questions.length && (
        <h2>{questions[currentQuestionIndex]}</h2>
      )}

{!isStarted && (
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded ml-10 mt-10"
          onClick={handleStartButtonClick}
        >
          Start the Inteview
        </button>
      )}

      <p className="timer" >
        {isStarted && timer !== null ? `Time left: ${timer} seconds` : ''}
      </p>

{/* <input type="text" className='mb-4 px-4 py-2 text-lg bg-opacity-10 border-opacity-10 border-opacity-10 text-white'/> */}

      {recordedText && <p className='w-160 h-160 ml-10 mr-10 mt-10 border border-2'>Recorded Text: {recordedText}</p>}

      <Dictaphone onTextChange={handleDictaphoneText} isStarted={isStarted} />

      {currentQuestionIndex === questions.length - 1 && (
        <button
          className='bg-green-500 text-white font-bold py-2 px-4 rounded ml-10 mt-10'
          onClick={sendDataToServer}
        >
          Submit Data
        </button>
      )}

      
    </div>
  );
};

export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import Dictaphone from './SpeechRecognition';

// const Dashboard = () => {
//   const [isStarted, setIsStarted] = useState(false);
//   const [dataArray, setDataArray] = useState<string[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
//   const [recordedText, setRecordedText] = useState<string | null>(null);
//   const [timer, setTimer] = useState<number | null>(null);
//   const [questions, setQuestions] = useState<string[]>([]);

//   const handleStartButtonClick = () => {
//     setIsStarted(true);
//     setCurrentQuestionIndex(0);
//     setTimer(60);
//   };

//   useEffect(() => {
//     const storedData = localStorage.getItem('questions');
//     if (storedData) {
//       setQuestions(JSON.parse(storedData));
//     }
//   }, []);

//   const handleDictaphoneText = (text: string) => {
//     setRecordedText(text);
//   };

//   useEffect(() => {
//     let interval: NodeJS.Timeout | null = null;

//     if (isStarted) {
//       if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
//         if (timer !== null && timer > 0) {
//           interval = setInterval(() => {
//             setTimer((prevTimer) => (prevTimer !== null ? prevTimer - 1 : null));
//           }, 1000);
//         } else if (timer === 0) {
//           // Timer has expired, move to the next question if there are more questions
//           if (recordedText) {
//             setDataArray((prevDataArray) => [...prevDataArray, recordedText]);
//             setRecordedText(null);
//           }

//           if (currentQuestionIndex < questions.length - 1) {
//             setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//             setTimer(60);
//           }
//         }
//       }
//     }

//     // Clear the interval when the component unmounts, the question changes, or isStarted becomes false
//     return () => {
//       if (interval) {
//         clearInterval(interval);
//       }
//     };
//   }, [isStarted, currentQuestionIndex, questions, timer, recordedText]);

//   const sendDataToServer = () => {
//     console.log(dataArray);
//     // Create a function to send data to the server here
//   };

//   return (
//     <div>
//       {currentQuestionIndex >= 0 && (
//         <>
//           <h2>{questions[currentQuestionIndex]}</h2>
//           <p className="timer">
//             {isStarted && timer !== null ? `Time left: ${timer} seconds` : ''}
//           </p>
//           {recordedText && <p>Recorded Text: {recordedText}</p>}
//           <Dictaphone onTextChange={handleDictaphoneText} isStarted={isStarted} />
//         </>
//       )}

//       {currentQuestionIndex === questions.length - 1 && timer === 0 && (
//         <button
//           className='bg-green-500 text-white font-bold py-2 px-4 rounded ml-10 mt-10'
//           onClick={sendDataToServer}
//         >
//           Submit Data
//         </button>
//       )}

//       {!isStarted && currentQuestionIndex === -1 && (
//         <button
//           className="bg-blue-500 text-white font-bold py-2 px-4 rounded ml-10 mt-10"
//           onClick={handleStartButtonClick}
//         >
//           Start
//         </button>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

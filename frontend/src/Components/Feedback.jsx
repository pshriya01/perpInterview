import React from 'react';

const Feedback = () => {
  // Retrieve data from localStorage and parse it
  // const inputString = JSON.parse(localStorage.getItem("feedback")) || "\n    [\n        score: 8,\n        feedback: \"The answer provided is answering the question correctly.\",\n        extra: None,\n        error: None\n    ]";
  const inputString ="\n    [\n        score: 8,\n        feedback: \"The answer provided is answering the question correctly.\",\n        extra: None,\n        error: None\n    ]";

//"\n    [\n        score: 8,\n        feedback: \"The answer provided is answering the question correctly.\",\n        extra: None,\n        error: None\n    ]"

  const keyValueRegex = /(\w+):\s*([\w\s"'.]+),/g;
  
  // Initialize an empty object
  const result = {};
  
  // Extract and populate key-value pairs
  let match;
  while ((match = keyValueRegex.exec(inputString)) !== null) {
    const key = match[1];
    let value = match[2].trim();
  
    // Convert "None" to null
    if (value === "None") {
      value = null;
    } else if (value.startsWith('"') && value.endsWith('"')) {
      // If the value is wrapped in double quotes, remove them
      value = value.slice(1, -1);
    }
  
    result[key] = value;
  }
  
  console.log(result);


  return (
    <div className="items-center mt-[-100px] flex h-screen border-2 border-black justify-center">
      <div>
      <div>
      <h1 className="text-2xl text-custom-teal mb-10 font-bold">Feedback</h1>
      </div>
        <div className="border p-2 mb-4 " >
          <div > <span className="font-bold">Score:</span> {result.score}</div>
          <div ><span className="font-bold">Feedback</span>: {result.feedback}</div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
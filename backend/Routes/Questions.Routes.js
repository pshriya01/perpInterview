const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const QuestionRoute = express.Router();
const { HistoryModel } = require("../Models/history.model");


//OpenAI Config
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

//Routes
QuestionRoute.post("/query", async (req, res) => {
  const { role } = req.body;

  // Set the prompt based on the received job role and experience
  const prompt = `Act as an Interviewer, For Job role ${role} developer and assume that the job you are interviewing about is for fresher , ask only two technical interview questions`;
  
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 300,
      temperature: 0.7, // Adjust the value to control the randomness of the generated text
      //   stop: "\n",
    });

    let data = response.data.choices[0].text;
    let stringWithoutNewlines = data.replace(/\n\n/g, "");

    let qnArray = stringWithoutNewlines.split("\n");
    console.log(qnArray);

    return res.status(200).json({
      success: true,
      data: qnArray,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "There was an issue on the server",
    });
  }
});

QuestionRoute.post("/rating", async (req, res) => {
  //Body should be in this format:
  // {
  //     "userid":"put_userid_here",
  //     "question1":"Put your question 1 here",
  //     "question2":"Put your question 2 here",
  //     "answer1":"Put your answer 1 here",
  //     "answer2":"Put your answer 2 here"
  // }

  if (!req.body.question2) {
    return res.status(404).json({ msg: "Something went wrong!" });
  }
  const obj = [
    {
      question: req.body.question1,
      answer: req.body.question1,
    },
    {
      question: req.body.question2,
      answer: req.body.question2,
    },
  ];

  let objStr = JSON.stringify(obj);
  
  const prompt = `read the following array of objects and rate the answer out of 10 according to their questions. 
	
	${objStr} 
	
    Level of the question is  hard so the response should be also based on that level

	Provide the response on this format : "score: {the score}" "feedback : {the feedback}"
    

and  do not insert any "\n" text in the response
    `;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 1000,
      temperature: 1, // Adjust the value to control the randomness of the generated text
      // stop: "\n",
    });

    let data = response.data.choices[0].text;

    console.log(data);

    //Saving data in History collection here
    console.log("USER ID", req.body);
    const history = new HistoryModel({
      body: data,
      userID: req.body.id,
      date: Date(),
    });
    await history.save();

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
          ? error.response.data.error.message
          : "There was an issue on the server"
        : "There was an issue on the server",
    });
  }
});

module.exports = { QuestionRoute };


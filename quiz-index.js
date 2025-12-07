<<<<<<< HEAD
import express from "express";
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import bodyParser from "body-parser";
import path from 'path';
import pg from 'pg';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.set('view engine', 'ejs');


// serve static files from a "public" folder (create it and put quiz.css and quiz-client.js there)
app.use(express.static(path.join(__dirname, 'public')));

// tell Express where views are (we moved `index.ejs` into `views/`)
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

var InitialCount = 30;
//var Round = [1,2,3,4,5];
var currentRoundIndex = 1;
var questionIndex = 0;
var mcqRoundOptions = [];


//home page
app.get("/", (req, res) => {
    console.log("the directory is " + __dirname);
    const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Quiz',
    password: 'Enter Your Password',
    port: 'Enter Your Port',
  });

  //connecting to DATABASE to fetch round 1 questions
  db.connect();
  db.query('SELECT mcq.optiona, mcq.optionb, mcq.optionc, a.answer, q.question, q.category FROM questions AS q LEFT JOIN mcq_options AS mcq ON q.id = mcq.id_question JOIN answers AS a ON a.id = q.id WHERE round = $1', [currentRoundIndex],(err, result) => {
    if (err) {
      console.log("Error fetching questions:", err.stack)
    }

    const quizQuestions = result.rows;
    console.log(quizQuestions);
    console.log("Questions fetched:", quizQuestions.length);
    res.render("index", {
      round: currentRoundIndex,
      count: InitialCount, 
      questionsAndCategory: quizQuestions,
      questionIndex: questionIndex,
      disablePrev: true})  // <-- add a flag for disabling
      db.end();
      });

     
  });

//handling button presses
app.post("/submit", (req, res) => {
  console.log("Button pressed:", req.body.control);
  //logic for NEXT and PREV buttons
  if (req.body.control === "NEXT") {
    //CASE 1: if next is pressed and we are not at the last question of the round
    //add 1 to the question index to proceed to next question
    //redirect to /submit to refresh page
    //
    ///CASE 2:PRESSING NEXT AT LAST QUESTION OF THE ROUND
    //if we are at the last question of the round pressing NEXT will
    //advance us to next round TO GET TO MEMO OF COMPLETED ROUND
    //i.e redirected to /memo
    //which will then display the memo for that round
    //
    ///CASE 3:PRESSING NEXT AFTER MEMO PAGE
    //SEE LOGIC BELOW
    if (questionIndex < 9) {
      questionIndex++;
      console.log(questionIndex);
      res.redirect("/submit?done=true");
      }else if (questionIndex === 9){
        
        questionIndex++;
        console.log("All questions in this round completed. Fetching Memo.");
        res.redirect("/memo");
      }else{
        console.log("End of questions in this round.");
        //now we control the rounds part
        if(currentRoundIndex < 4){
          //If we are not at the last round, 4th round, then move to next round
          //and reset question index to 0
          //rendirect to /submit to load next round questions
          //if we are at last round, reset to round 1 and question index to 0
          currentRoundIndex++;
          questionIndex = 0;
          console.log("Round advanced to:", currentRoundIndex);
          res.redirect("/submit?done=true");
        }else{
          currentRoundIndex = 1;
          questionIndex = 0;
          res.redirect("/submit?done=true");
        }
      }

  //PRESSING PREV BUTTON
  } else if (req.body.control === "PREV") {

    if (questionIndex > 0) {
      questionIndex--;
      console.log(questionIndex);
      res.redirect("/submit?done=true");
    }else{
      //SEND ALERT THAT THERE ARE NO PREVIOUS QUESTIONS

      res.render("index ", { alertMessage: "Questions are done." });

    } 
}});


app.get("/submit", (req, res) => {
    console.log(questionIndex);
    const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Quiz',
    password: 'Enter Your Password',
    port: 'Enter Your Port',
  });

  db.connect();
  db.query('SELECT mcq.optiona, mcq.optionb, mcq.optionc, a.answer, q.question, q.category FROM questions AS q LEFT JOIN mcq_options AS mcq ON q.id = mcq.id_question JOIN answers AS a ON a.id = q.id WHERE round = $1', [currentRoundIndex], (err, result) => {
    if (err) {
      console.log("Error fetching questions:", err.stack)
    }
    if(questionIndex>0){
      const quizQuestions = result.rows;
      console.log("Questions fetched:", quizQuestions.length);
      res.render("index", {
        round: currentRoundIndex,
        count: InitialCount, 
        questionsAndCategory: quizQuestions,
        questionIndex: questionIndex,
        disablePrev: false});
        db.end();
    }else{
      const quizQuestions = result.rows;
      console.log("Questions fetched:", quizQuestions.length);
      res.render("index", {
        round: currentRoundIndex,
        count: InitialCount, 
        questionsAndCategory: quizQuestions,
        questionIndex: questionIndex,
        disablePrev: true}); //talk about ternary operator here 
        db.end();
    }

    
      });
  });
app.post("/memo", (req, res) => {
  const a = req.body.answer;
  console.log("Memo submitted with answer:", a);
  res.redirect("/submit?done=true");
})

app.get("/memo", (req, res) => {
    console.log(questionIndex);
    const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Quiz',
    password: 'Enter Your Password',
    port: 'Enter Your Password',
  });
  console.log("current round for memo:", currentRoundIndex);
  db.connect();
  db.query('SELECT mcq.optiona, mcq.optionb, mcq.optionc, a.answer, q.question, q.category FROM questions AS q LEFT JOIN mcq_options AS mcq ON q.id = mcq.id_question JOIN answers AS a ON a.id = q.id WHERE round = $1;', [currentRoundIndex], (err, result) => {
    if (err) {
      console.log("Error fetching Memo:", err.stack)
    }else{
      const memoData = result.rows;
      console.log("Memo fetched:", memoData.length);
      console.log(memoData);
      res.render("memo", {
        round: currentRoundIndex,
        memoData: memoData
      });
    };
    db.end();
  });
});


//this is to link backend to frontend 
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})

// Timer functionality



=======
import express from "express";
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import bodyParser from "body-parser";
import path from 'path';
import pg from 'pg';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.set('view engine', 'ejs');


// serve static files from a "public" folder (create it and put quiz.css and quiz-client.js there)
app.use(express.static(path.join(__dirname, 'public')));

// tell Express where views are (we moved `index.ejs` into `views/`)
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

var InitialCount = 30;
//var Round = [1,2,3,4,5];
var currentRoundIndex = 1;
var questionIndex = 0;
var mcqRoundOptions = [];


//home page
app.get("/", (req, res) => {
    console.log("the directory is " + __dirname);
    const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Quiz',
    password: '$6YFEzw',
    port: 5432,
  });

  //connecting to DATABASE to fetch round 1 questions
  db.connect();
  db.query('SELECT mcq.optiona, mcq.optionb, mcq.optionc, a.answer, q.question, q.category FROM questions AS q LEFT JOIN mcq_options AS mcq ON q.id = mcq.id_question JOIN answers AS a ON a.id = q.id WHERE round = $1', [currentRoundIndex],(err, result) => {
    if (err) {
      console.log("Error fetching questions:", err.stack)
    }

    const quizQuestions = result.rows;
    console.log(quizQuestions);
    console.log("Questions fetched:", quizQuestions.length);
    res.render("index", {
      round: currentRoundIndex,
      count: InitialCount, 
      questionsAndCategory: quizQuestions,
      questionIndex: questionIndex,
      disablePrev: true})  // <-- add a flag for disabling
      db.end();
      });

     
  });

//handling button presses
app.post("/submit", (req, res) => {
  console.log("Button pressed:", req.body.control);
  //logic for NEXT and PREV buttons
  if (req.body.control === "NEXT") {
    //CASE 1: if next is pressed and we are not at the last question of the round
    //add 1 to the question index to proceed to next question
    //redirect to /submit to refresh page
    //
    ///CASE 2:PRESSING NEXT AT LAST QUESTION OF THE ROUND
    //if we are at the last question of the round pressing NEXT will
    //advance us to next round TO GET TO MEMO OF COMPLETED ROUND
    //i.e redirected to /memo
    //which will then display the memo for that round
    //
    ///CASE 3:PRESSING NEXT AFTER MEMO PAGE
    //SEE LOGIC BELOW
    if (questionIndex < 9) {
      questionIndex++;
      console.log(questionIndex);
      res.redirect("/submit?done=true");
      }else if (questionIndex === 9){
        
        questionIndex++;
        console.log("All questions in this round completed. Fetching Memo.");
        res.redirect("/memo");
      }else{
        console.log("End of questions in this round.");
        //now we control the rounds part
        if(currentRoundIndex < 4){
          //If we are not at the last round, 4th round, then move to next round
          //and reset question index to 0
          //rendirect to /submit to load next round questions
          //if we are at last round, reset to round 1 and question index to 0
          currentRoundIndex++;
          questionIndex = 0;
          console.log("Round advanced to:", currentRoundIndex);
          res.redirect("/submit?done=true");
        }else{
          currentRoundIndex = 1;
          questionIndex = 0;
          res.redirect("/submit?done=true");
        }
      }

  //PRESSING PREV BUTTON
  } else if (req.body.control === "PREV") {

    if (questionIndex > 0) {
      questionIndex--;
      console.log(questionIndex);
      res.redirect("/submit?done=true");
    }else{
      //SEND ALERT THAT THERE ARE NO PREVIOUS QUESTIONS

      res.render("index ", { alertMessage: "Questions are done." });

    } 
}});


app.get("/submit", (req, res) => {
    console.log(questionIndex);
    const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Quiz',
    password: '$6YFEzw',
    port: 5432,
  });

  db.connect();
  db.query('SELECT mcq.optiona, mcq.optionb, mcq.optionc, a.answer, q.question, q.category FROM questions AS q LEFT JOIN mcq_options AS mcq ON q.id = mcq.id_question JOIN answers AS a ON a.id = q.id WHERE round = $1', [currentRoundIndex], (err, result) => {
    if (err) {
      console.log("Error fetching questions:", err.stack)
    }
    if(questionIndex>0){
      const quizQuestions = result.rows;
      console.log("Questions fetched:", quizQuestions.length);
      res.render("index", {
        round: currentRoundIndex,
        count: InitialCount, 
        questionsAndCategory: quizQuestions,
        questionIndex: questionIndex,
        disablePrev: false});
        db.end();
    }else{
      const quizQuestions = result.rows;
      console.log("Questions fetched:", quizQuestions.length);
      res.render("index", {
        round: currentRoundIndex,
        count: InitialCount, 
        questionsAndCategory: quizQuestions,
        questionIndex: questionIndex,
        disablePrev: true}); //talk about ternary operator here 
        db.end();
    }

    
      });
  });
app.post("/memo", (req, res) => {
  const a = req.body.answer;
  console.log("Memo submitted with answer:", a);
  res.redirect("/submit?done=true");
})

app.get("/memo", (req, res) => {
    console.log(questionIndex);
    const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Quiz',
    password: '$6YFEzw',
    port: 5432,
  });
  console.log("current round for memo:", currentRoundIndex);
  db.connect();
  db.query('SELECT mcq.optiona, mcq.optionb, mcq.optionc, a.answer, q.question, q.category FROM questions AS q LEFT JOIN mcq_options AS mcq ON q.id = mcq.id_question JOIN answers AS a ON a.id = q.id WHERE round = $1;', [currentRoundIndex], (err, result) => {
    if (err) {
      console.log("Error fetching Memo:", err.stack)
    }else{
      const memoData = result.rows;
      console.log("Memo fetched:", memoData.length);
      console.log(memoData);
      res.render("memo", {
        round: currentRoundIndex,
        memoData: memoData
      });
    };
    db.end();
  });
});


//this is to link backend to frontend 
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})

// Timer functionality


>>>>>>> master

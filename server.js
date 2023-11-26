const express = require('express');
const app = express();
const PORT = process.env.PORT || 8001;
const path = require('path');
const fs = require("fs");
var PDF="WHITE.PDF";

const bodyParser = require('body-parser');

var nodemailer = require('nodemailer');
const { dirname } = require('path');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'javascriptextreme@gmail.com',
    pass: 'extreme@javaScript'
  }
});


app.use(express.static("."));
app.use(express.static("jsons"));
// app.use(express.static("pdfs"));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/main.html");
});

app.get('/getQuestions',(req,res)=>{
    var Qfile =fs.readFileSync(__dirname+"/jsons/questions.json");
    var questionList = JSON.parse(Qfile);
    res.json(questionList);
});

app.get('/getResult',(req,res)=>{
    var result = req.query.result;
    var email = req.query.email;
    var date = new Date();
    var uData = fs.readFileSync(__dirname+"/jsons/data.json");
    var userData = JSON.parse(uData);
    var user = {
        userEmail:email,
        userResult:result,
        userData:date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
    }
    userData.users[userData.users.length]=user;
    fs.writeFile(__dirname+'/data.json',JSON.stringify(userData),(err)=>{
        if(err){
            throw err;
        }
    });
    var total = parseInt(result);
    if(total>16){
        PDF="RedPlan.pdf";
        res.json({"color":"Red"});
    }else if(total>8){
        PDF="YellowPlan.pdf";
        res.json({"color":"Yellow"});
    }else{
        PDF="GreenPlan.pdf";
        res.json({"color":"Green"});
    }
    sendMail(email);
});

function sendMail(email){
    let info = transporter.sendMail({
        from: 'javascriptextreme@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Your Yoga and Food Plan", // Subject line
        text: "Check attached pdf.\n\n\nThank You\nJavaScriptX",
        attachments: [
          {
            filename: PDF,
            path: path.join(__dirname + "/pdfs/"+PDF)
          },
        ],
      });
}

app.get('/Red',(req,res)=>{
    res.sendFile(path.join(__dirname+"/pdfs/RedPlan.pdf"));
})

app.get('/Yellow',(req,res)=>{
    res.sendFile(path.join(__dirname+"/pdfs/YellowPlan.pdf"));
})

app.get('/Green',(req,res)=>{
    res.sendFile(path.join(__dirname+"/pdfs/GreenPlan.pdf"));
})

app.get('/setComment',(req,res)=>{
    var CommentName = req.query.CommentName;
    var CommentEmail = req.query.CommentEmail;
    var Comment = req.query.Comment;
    var comments = fs.readFileSync(__dirname+"/jsons/comment.json");
    var comments = JSON.parse(comments);
    var newComment = {
        Name:CommentName,
        Email:CommentEmail,
        CommentRecieved:Comment
    }
    comments.data[comments.data.length]=newComment;
    fs.writeFile(__dirname+"/jsons/comment.json",JSON.stringify(comments),(err)=>{
        if(err) return res.json({"success":"false"});
        else return res.json({"success":"true"});
    })
});

app.get('/getCount',(req,res)=>{
    var data = fs.readFileSync(__dirname+"/jsons/data.json");
    data = JSON.parse(data);
    var red=0,yellow=0,green=0;
    for(i=0;i<data.users.length;i++){
        if(data.users[i].userResult>16){
            red++;
        }else if(data.users[i].userResult>8){
            yellow++;
        }else{
            green++;
        }
    }
    var response = {
        one:(red+yellow+green),
        two:green,
        three:yellow,
        four:red
    }
    res.json({"response":response});
});


app.use(express.json()); // Add this line to enable JSON parsing

// //code to add sign up to user.json 
// app.post('/signup', (req, res) => {
//     const { email, password, name } = req.body;
  
//     if (email && password && name) {
//       const userData = {
//         email: email,
//         password: password,
//         name: name,
//         premiumStatus: 0, // Set premiumStatus to 0 by default
//       };
  
//       const usersData = JSON.parse(fs.readFileSync('jsons/users.json', 'utf-8'));
//       usersData.users.push(userData);
  
//       fs.writeFileSync('jsons/users.json', JSON.stringify(usersData, null, 2), 'utf-8');
  
//       res.status(200).json({ message: 'Sign up successful!' });
//     } else {
//       res.status(400).json({ message: 'Please enter valid email, password, and name.' });
//     }
//   });

//adds user account to users.json
app.post('/signup', (req, res) => {
    try {
      const usersData = JSON.parse(fs.readFileSync('jsons/users.json', 'utf-8') || '{"users": []}');
      
      const { email, password, name } = req.body;
  
      if (email && password && name) {
        const userData = {
          email: email,
          password: password,
          name: name,
          premiumStatus: 0, // Set premiumStatus to 0 by default
        };
  
        usersData.users.push(userData);
  
        fs.writeFileSync('jsons/users.json', JSON.stringify(usersData, null, 2), 'utf-8');
  
        res.status(200).json({ message: 'Sign up successful!' });
      } else {
        res.status(400).json({ message: 'Please enter valid email, password, and name.' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.post('/signin', (req, res) => {
    try {
      const usersData = JSON.parse(fs.readFileSync('jsons/users.json', 'utf-8') || '{"users": []}');
      
      const { email, password } = req.body;
  
      if (email && password) {
        const user = usersData.users.find(user => user.email === email && user.password === password);
  
        if (user) {
          res.status(200).json({ message: 'Login successful!' });
        } else {
          res.status(401).json({ message: 'Login failed. Please check your email and password.' });
        }
      } else {
        res.status(400).json({ message: 'Please enter both email and password.' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

//adds journal comment to journal.json
  app.post('/addThought', (req, res) => {
    try {
      const journalData = JSON.parse(fs.readFileSync('jsons/journal.json', 'utf-8') || '{"thoughts": []}');
      
      const { comment } = req.body;
  
      if (comment) {
        const thought = {
          comment: comment,
        };
  
        journalData.thoughts.push(thought);
  
        fs.writeFileSync('jsons/journal.json', JSON.stringify(journalData, null, 2), 'utf-8');
  
        res.status(200).json({ message: 'Thought added successfully!' });
      } else {
        res.status(400).json({ message: 'Please enter a comment.' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Endpoint to get all journal entries
app.get('/getJournalEntries', (req, res) => {
    try {
      const journalData = JSON.parse(fs.readFileSync('jsons/journal.json', 'utf-8') || '{"thoughts": []}');
      res.status(200).json({ entries: journalData.thoughts });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });




  app.use(bodyParser.json());

  app.post('/submitQuestionnaire', (req, res) => {
    const responseData = req.body.responses;
  
    // Assuming questionnaire.json exists with an initial structure
    let questionnaireData = {
      responses: [
        { "Q1": 0 },
        { "Q2": 0 },
        { "Q3": 0 },
        { "Q4": 0 },
        { "Q5": 0 }
      ]
    };
  
    // Update the questionnaire data based on the submitted responses
    responseData.forEach(response => {
      const questionKey = Object.keys(response)[0];
      const questionIndex = parseInt(questionKey.slice(1)) - 1;
      
      questionnaireData.responses[questionIndex][questionKey] = response[questionKey];
    });
  
    // Save the updated data back to the questionnaire.json file
    fs.writeFileSync('questionnaire.json', JSON.stringify(questionnaireData, null, 2), 'utf-8');
  
    res.json({ success: true, message: 'Questionnaire submitted successfully' });
  });
  

app.listen(PORT,()=>{
    console.log("http://localhost:"+PORT);
});
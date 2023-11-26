const QSection = document.getElementById("QSection");
const status = document.getElementById("status");
const navbuttons = document.getElementById("navbuttons");
const prevBut = document.getElementById("prev");
const nextBut = document.getElementById("next");
const email_address = document.getElementById("email_address");
const CommentName = document.getElementById("CommentName");
const CommentEmail = document.getElementById("CommentEmail");
const Comment = document.getElementById("Comment");
const CommentStatus = document.getElementById("CommentStatus");



var questions=[];
var Qno = 0;
var marks = [-1,-1,-1,-1,-1];
var QuestionData=[];

function init(){
    prevBut.style.display="none";
    nextBut.style.display="none";
    fetch('/getQuestions').then(res=>res.json()).
    then(data=>{
        for(i=0;i<data.question.length;i++){
            QuestionData[i]=data.question[i].name;
            var newQ = '<div class="question-ml-sm-5-pl-sm-5-pt-2"><div class="py-2 h5"><b>'+data.question[i].Q+'</b></div><div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">';
            for(j=0;j<data.question[i].options.length;j++){
                newQ += ' <label class="options">'+data.question[i].options[j]+' <input type="radio" value="'+data.question[i].values[j]+'" name="'+data.question[i].name+'"> <span class="checkmark"></span> </label>';
            }
            newQ+='</div>';
            questions[i]=newQ;
        }
        showQuestion(); // Display the first question immediately
    });
    countAllNumbers();
}

function showQuestion(){
    nextBut.style.display="inline-block";
    if(Qno==0){
        prevBut.style.display="none";
        // Remove the email input section
        QSection.innerHTML=questions[Qno].replace('<label for="email_address" class="col-md-4 col-form-label text-md-right">E-Mail:</label><div class="col-md-6"><input type="email" id="email_address" class="form-control" name="email-address" required autofocus></div><div class="ml-auto mr-sm-5"><button class="btn btn-success" onclick="readEmail()">Next</button></div>', '');
    } else {
        prevBut.style.display="inline-block";
        QSection.innerHTML=questions[Qno];
    }
}

function previous(){
    if(Qno>0){
        Qno--;
        showQuestion();
    }
}
// function next(){
//     var ele = (document.getElementsByName(QuestionData[Qno]));
//     var selected = false;
//     var Qmark=0;
//     for(i=0;i<ele.length;i++){
//         if(ele[i].checked){
//             selected=true;
//             Qmark=ele[i].value;
//         }
//     }
//     if(!selected){
//         status.innerHTML="please select answer from the following option with best of your knowledge";
//     }
//     if(Qno<questions.length-1 && selected){
//         marks[Qno]=parseInt(Qmark);
//         Qno++;
//         status.innerHTML="";
//         showQuestion();
//     }
//     else if(Qno==questions.length-1){
//         marks[Qno]=parseInt(Qmark);
//         var totalMarks=0;
//         for(i=0;i<marks.length;i++){
//             totalMarks+=marks[i];
//         }
//         prevBut.style.display = "none";
//         nextBut.style.display = "none";
//         var url = '/getResult?result=' + totalMarks;
//         fetch(url).then(res => res.json()).
//             then(data => {
//                 QSection.style.textAlign = "center";
//                 QSection.style.color = data.color;
//                 QSection.style.fontSize = "20px";
//                 var showData = "Mental Health Percentage : " + (100 - ((totalMarks / 24 * 100).toFixed(2)));
//                 showData += "<br/><br/><br/>"
//                 showData+="Click <a href='/"+data.color+"' target='_blank'>link</a> to see";
//                 QSection.innerHTML = showData;
//             });
//     }
// }

function next() {
    var ele = document.getElementsByName(QuestionData[Qno]);
    var selected = false;
    var Qmark = 0;
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            selected = true;
            Qmark = ele[i].value;
        }
    }
    if (!selected) {
        status.innerHTML = "please select an answer from the following options with the best of your knowledge";
    }
    if (Qno < questions.length - 1 && selected) {
        marks[Qno] = parseInt(Qmark);
        Qno++;
        status.innerHTML = "";
        showQuestion();
    } else if (Qno == questions.length - 1) {
        marks[Qno] = parseInt(Qmark);
        var totalMarks = 0;
        for (i = 0; i < marks.length; i++) {
            totalMarks += marks[i];
        }
        prevBut.style.display = "none";
        nextBut.style.display = "none";
        var url = '/getResult?result=' + totalMarks;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                QSection.style.textAlign = "center";
                QSection.style.color = data.color;
                QSection.style.fontSize = "20px";
                var showData = "Mental Health Percentage: " + (100 - ((totalMarks / 24 * 100).toFixed(2)));
                showData += "<br/><br/><br/>";
                showData += "Click <a href='/"+data.color+"' target='_blank'>link</a> to see";
                QSection.innerHTML = showData;

                // Call the submitQuestionnaire function here
                submitQuestionnaire();
            });
    }
}

function readEmail(){
    // No need to check for email validity, just proceed to show the questions
    showQuestion();
}

function sendComment(){
    var url="/setComment?CommentName="+CommentName.value+"&CommentEmail="+CommentEmail.value+"&Comment="+Comment.value;
    CommentName.value="";
    CommentEmail.value="";
    Comment.value="";
    fetch(url).then(res=>res.json()).
    then(data=>{
        if(data.success){
            CommentStatus.innerHTML="Response Recorded";
        }else{
            CommentStatus.innerHTML="Error Occured";
        }
    })
}

var CountOne=20,CountTwo=5,CountThree=12,CountFour=3;

function countAllNumbers(){
    fetch('/getCount').then(res=>res.json()).
    then(data=>{
        CountOne = data.response.one;
        CountTwo = data.response.two;
        CountThree = data.response.three;
        CountFour = data.response.four;
    });
}

var mouseoverCount=0;
var intervalCount=0;
function showAllCount(){
    var count1=0,count2=0,count3=0,count4=0;
    if((mouseoverCount++)==1){
        var x = setInterval(()=>{
            if((count1++)<CountOne){
                peopleCount1.innerHTML=count1;
            }
            if((count2++)<CountTwo){
                peopleCount2.innerHTML=count1;
            }
            if((count3++)<CountThree){
                peopleCount3.innerHTML=count1;
            }
            if((count4++)<CountFour){
                peopleCount4.innerHTML=count1;
            }
            if((intervalCount++)>=CountOne){
                clearInterval(x);
            }
        },200);
    }
}

// Assuming marks array is already populated

function submitQuestionnaire() {
    // Create an array of response objects
    const responses = marks.map((mark, index) => ({ [`Q${index + 1}`]: mark }));
  
    // Create the data object to be sent to the server
    const data = { responses };
  
    // Send the data to the server
    fetch('/submitQuestionnaire', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
      console.log('Questionnaire submitted successfully:', result);
    })
    .catch(error => {
      console.error('Error submitting questionnaire:', error);
    });
  }
  
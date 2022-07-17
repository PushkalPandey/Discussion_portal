// fetch question inputs element with submit button
// create a fucntion to validate the question 
// finalize data structure to store question
   // structure
   /* var question = {
     title:"",
     description:"",
     answer: [{ name:"", text:"" }],
     isResolved:"",
     createdAt: // date and time
   } */

// create a function store in localstorage
    // get and push new question and then store

// create a function to print on screen




var subjectArea = document.getElementById("subjectArea");
var questionArea = document.getElementById("questionArea");
var submitBtn = document.getElementById("submitBtn");
var questionContainer = document.getElementById("questionContainer");
var showQueryContainer = document.getElementById("show_query");
var createQuestionContainer = document.getElementById("createQuestionContainer");
var nameArea = document.getElementById("res_name");
var commentArea = document.getElementById("comment");
var i=0;



var question = {
    title:"",
    description:"",
    // answer: [{ name:"", text:"" }],
    answer:[],
    isResolved:"",
    createdAt: "",
  };





var questions = getQuestions();
console.log(questions);


//Print all the todos initially stored in Local Storage
questions.forEach(function(question) {
    printQuestion(question);
});


//When Submit button is clicked, add Question
submitBtn.addEventListener("click",function(event) {


   
         addQuestion( subjectArea.value, questionArea.value);
    
});



//ADD QUESTION Function
function addQuestion(subValue, questionValue){
    var isValidInput = CheckValidInput(subValue, questionValue);

    if(isValidInput){
        initObject(subValue, questionValue);
        printQuestion(question);
        saveQuestion(question);
        clearInput(subjectArea,questionArea);
    }
    else{
        console.log("Incorrect Input");
    }
    questions = getQuestions();
    console.log(questions);
}

var index=0;

//printQuestion
function printQuestion(query){


    var unitQuestionContainer = document.createElement("div");
    unitQuestionContainer.setAttribute("class","unitQuestionContainer");
    unitQuestionContainer.setAttribute("id","id"+i++);
    questionContainer.appendChild(unitQuestionContainer);

    var subNode = document.createElement("h2");
    subNode.innerText = query.title;
    unitQuestionContainer.appendChild(subNode);

    var textNode = document.createElement("p");
    textNode.innerText = query.description;
    unitQuestionContainer.appendChild(textNode);
    // var x=id;
    const selected=document.querySelector(".unitQuestionContainer#id"+(i-1));
    // console.log("selected",selected);
    // console.log("query",query);
    //Btn Listener Part
    selected.addEventListener("click", function(){
        
        // console.log(selected);
        // console.log("query",query);
        index=parseInt(selected.getAttribute('id').replace("id", ""));
        console.log(index);
        showQueryContainer.style.display="block";
        createQuestionContainer.style.display="none";
    });
        
        var submitAnswerBtn = document.getElementById("done");
        // submitAnswerBtn.setAttribute("value",value.title);
        submitAnswerBtn.addEventListener("click", function(){
            var nameVal=nameArea.value;
            var commentVal=commentArea.value;
            var isValidInput = CheckValidInput(nameVal, commentVal);
            if(isValidInput){
                console.log("Ok");
                
                
                console.log("questionsbefore",questions);

                //To update the answer of particular question
                questions[index].answer.push({name:nameVal,comment:commentVal});
                
                console.log("questionsafter",questions);
                // printAnswers(value,nameVal,commentVal);
                // saveAnswer(value);
                // clearInput(nameArea,commentArea);
            }
        });

    

}






// function saveAnswer(obj){
//     var questions = getQuestions();
   
//     for (let i = 0; i < questions.length; i++) {
//         if(questions[i].createdAt === obj.createdAt ){
//             questions[i].answer = obj.answer;
//             break;
//         }
//         }
//         questions = JSON.stringify(questions);
// localStorage.setItem("questions",questions);


// }


//SAve Question
function saveQuestion(question){
var questions = getQuestions();
questions.push(question);

questions = JSON.stringify(questions);
localStorage.setItem("questions",questions)

}





//INitialize Values in Object 
function initObject(subValue, quesionValue){
    question.title = subValue;
    question.description= quesionValue;
    question.isResolved= false;
    question.answer= [];
    question.createdAt=new Date().toUTCString();
}








//Check Validity
function CheckValidInput(subValue, quesionValueue) {
    if(subValue!="" && quesionValueue!=""){
        return true;
    }
}


//clearInput
function clearInput(sub, ques) {
    sub.value="";
    ques.value="";
}


//Get Question from Local Storage
function getQuestions(){

    var questions = localStorage.getItem("questions");

    if(questions)
    {
        
        return JSON.parse(questions);
    }

    return [];
}
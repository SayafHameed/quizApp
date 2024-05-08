let url="https://quizapi.io/api/v1/questions?apiKey=fMA8TPsfa6pElCsA1FudfC8nNVPfvbX9XMpKPPt0"
let questionName=document.querySelector("#question");
// let answerbutton=document.querySelector(".answer-buttons");
let next=document.querySelector("#next-btn");
let previous=document.querySelector("#previous-btn");
let quiz=document.querySelector(".quiz");
let submit=document.querySelector("#submit-btn");
//  window.addEventListener("load",startquiz
//  );
const start=document.querySelector("#start")
const category=document.querySelector("#categories");
const limit=document.querySelector('#limit');
const level=document.querySelector('#diffculty');
const startmenu=document.querySelector(".startmenu");
let currentquestionNo=0;
let score=0;
let questionNo=1;
start.addEventListener("click",()=>{
    start.style.display="none";
    category.style.display="none";
    limit.style.display="none";
    level.style.display="none";
startmenu.style.display="none"
quiz.style.display="block";
// console.log(quiz);
    startquiz();
});
let data=null;

async function startquiz(){
    data=null;
    currentquestionNo=0;
    score=0;
    questionNo=1;
    // console.log(`${category.value},${level.value},${limit.value}`);
    url=url+`&category=${category.value}&difficulty=${level.value}&limit=${limit.value}`
    let response= await fetch(url);
    data=await response.json();
    // console.log(data);
    // console.log(limit.value);
    if(limit.value==1){
        next.style.display="none";
        submit.style.display="block";
        previous.style.display="block"
        showQuestion(data);
    }
    else{
        previous.style.display="block"
        previous.innerHTML="Previous";
        next.style.display="block"
        next.innerHTML="Next";
       
        showQuestion(data);
    }
    
}
 function showQuestion(data){
 let h2=document.createElement("h2");
 quiz.appendChild(h2);
 h2.classList.add("question");
 h2.innerHTML=`Q. ${questionNo} / ${limit.value} : ${data[currentquestionNo].question}`
    let div=document.createElement("div")
    div.classList.add("answer-buttons");
   quiz.appendChild(div);
    // console.log(data);
    for (let key in data[currentquestionNo].answers) {
        if (data[currentquestionNo].answers.hasOwnProperty(key)) {
            value = data[currentquestionNo].answers[key];
            if(value){
                const button=document.createElement("button");
                button.innerHTML=value;
                button.classList.add("btn");
                div.appendChild(button)
                button.addEventListener("click",(e)=>{
                    answer(e);
                })
            }
            
           
        }
    }  
}
// console.log(questionNo);
next.addEventListener("click",()=>{
    if(questionNo===limit.value-1){
        next.style.display="none";
        submit.style.display="block";
    }
    if(questionNo<limit.value){
        currentquestionNo++;
        questionNo++;
         let answerbutton=document.querySelector(".answer-buttons")
         answerbutton.remove();
         let h2question=document.querySelector(".question");
         h2question.remove();
        showQuestion(data);
    }
})
previous.addEventListener("click",()=>{
   if(questionNo>1){
    currentquestionNo--;
        questionNo--;
        let btn=document.querySelector(".btn")
        btn.parentElement.remove();
        next.style.display="block";
        submit.style.display="none";
        // console.log(questionNo);
        showQuestion(data);
    }
})
function answer(e){
    // console.log(data[currentquestionNo]);
    const corectAnswer=data[currentquestionNo].correct_answer;
    // console.log(corectAnswer);
    let text=e.target.innerHTML;

    let answers=data[currentquestionNo].answers;
    let options=document.querySelector(".btn");
    if(text===answers[corectAnswer]){
        score++;
        e.target.classList.add("trueAnswer");
    }
    else{
    //   score--;
        e.target.classList.add("wrongAnswer");
    }
    Array.from(options.parentElement.children).forEach((ele)=>{
        // console.log(ele.innerHTML);
        if(ele.innerHTML===answers[corectAnswer]){
            ele.classList.add("trueAnswer");
        }
        ele.disabled=true;
    })
}
let result=document.querySelector("#result");
let newquiz=document.querySelector("#new-quiz");
// console.log(result);

// console.log(submit);
submit.addEventListener("click",(e)=>{
    e.preventDefault();
    
    Array.from(quiz.children).forEach((ele)=>{
        // console.log(ele.innerHTML);
        ele.remove();
    })
    quiz.style.display="none";
    result.style.display="block"
    result.innerHTML=`You got ${score<0?0:score} from ${limit.value}`
    previous.style.display="none";
    submit.style.display="none"
    newquiz.style.display="block"

})
newquiz.addEventListener("click",()=>{
    start.style.display="block";
    category.style.display="block";
    limit.style.display="block";
    level.style.display="block";
    startmenu.style.display="flex"
    result.style.display="none"
    newquiz.style.display="none"
    // console.log(quiz);
    // quiz.parentElement.children.remove();

});




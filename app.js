let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];


const resetGame = () => {
    turnO = true;
    enableBtns();
    msgContainer.classList.add("hide");
    btnclickCount = 0;
    
    boxes.forEach((box) => {
        box.style.border = ""; 
    });
};


let btnclickCount= 0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            box.style.color = "#E9FF70";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "#70d6ff";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
        btnclickCount++;
        
        if (btnclickCount === 9 && msgContainer.classList.contains("hide")) {
            showTied();
        }
    });
});


const enableBtns=()=>{
    for(box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const disableBtns=()=>{
    for(box of boxes){
        box.disabled=true;
    }
}

const showWinner=(winner)=>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBtns();

}

const showTied=()=>{
    msg.innerText = "Game is tied !!";
    msgContainer.classList.remove("hide");
    disableBtns();
    
}

const checkWinner=()=>{
    for(let pattern of winPatterns){
        let pos1Val =  boxes[pattern[0]].innerText;
        let pos2Val =  boxes[pattern[1]].innerText;
        let pos3Val =  boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                boxes[pattern[0]].style.border = "5px dashed red";
                boxes[pattern[1]].style.border = "5px dashed red";
                boxes[pattern[2]].style.border = "5px dashed red";
            }
        }
    }
};

newbtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);


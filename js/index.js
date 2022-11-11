let bgMusic=new Audio("../music/bg.mp3");
let outMusic= new Audio("../music/snakegame.mp3");
let foodSound= new Audio("../music/foodSound2.wav")
let highScore=localStorage.getItem('score');

let score=0;
let inputDir = { x: 0, y: 0 };
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 5, y: 10 };
let lastPaintTime = 0;
let speed = 3;


function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gamePlay();
}

function setScore(score){
    
    if(localStorage.getItem("score") < score){
        localStorage.setItem("score",score);
    }
}

//checking is out or not
function isOut(sArr) {
    for (let i = 1; i < sArr.length ; i++) {
        if (sArr[i].x == sArr[0].x && sArr[i].y == sArr[0].y) {
            
            return true;
        }
    }

    if (sArr[0].x >= 18 || sArr[0].y >= 18 || sArr[0].x <= 0 || sArr[0].y <= 0) {
        return true;
    }
    return false;
}
 
function gamePlay() {
   
    // check wether the snake got colloided
    if (isOut(snakeArr)) {
        bgMusic.pause(); 
        outMusic.play();
        window.alert("game over");
        score=0;
        inputDir = { x: 0, y: 0 };
        snakeArr = [
            { x: 10, y: 15 }
        ]
    }

    //update snake if snake eats food
    
    if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        
        foodSound.play();
        
        score++;
        setScore(score);
        highScore=localStorage.getItem('score');
            if(speed==20){return speed;}
            else{speed++}
        
        console.log(snakeArr[0].x,snakeArr[0].y);
        //generate food
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

    }
    //snake to move
    for (let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;




    //display food and sanke



    //snake display
    container.innerHTML = '';
    snakeArr.forEach((e, index) => {
        
        
        snakeElem = document.createElement('div');
        snakeElem.style.gridRowStart = e.y;
        snakeElem.style.gridColumnStart = e.x;
        
        if (index==0){
            snakeElem.classList.add('head');
        }
        else{
            snakeElem.classList.add('snake');
        }

            container.appendChild(snakeElem);

    });

    //food
    foodElem = document.createElement('div');
    foodElem.style.gridRowStart = food.y;
    foodElem.style.gridColumnStart = food.x;
    foodElem.classList.add('food');
    container.appendChild(foodElem);

    scoreContainer.innerHTML='';
    scoreElem=document.createElement('div');
    scoreElem.innerHTML= "High score ="+highScore;
    scoreElem.classList.add('score');
    scoreContainer.appendChild(scoreElem);

    currentScore=document.createElement('div');
    currentScore.innerHTML="Your Score="+score;
    currentScore.classList.add('currentScore');
    scoreContainer.appendChild(currentScore);
}











window.requestAnimationFrame(main);

//in which direction the snake should move
window.addEventListener('keydown', e => {
    bgMusic.play(); 

    switch (e.key) {

        case 'ArrowUp':
            if(inputDir.x==0 && inputDir.y==1 ){
                cconsole.log("cant move opposit side");
                return;
            }
            else{
            inputDir.x = 0;
            inputDir.y = -1;
            console.log("arrowup");
            }
            break;

        case 'ArrowDown':
            if(inputDir.x==0 && inputDir.y==-1){
                console.log("cant move opposit side");
                return ;
            }
            else{
            inputDir.x = 0;
            inputDir.y = 1;
            console.log("ArrowDown");
            }
            break;

        case 'ArrowLeft':
            if(inputDir.x == 1 && inputDir.y==0){
                console.log("cant move opposit side");
                return;
            }
            else{
            inputDir.x = -1;
            inputDir.y = 0;
            console.log("arrowupL");
            }
            break;

        case 'ArrowRight':
            if(inputDir.x==-1 && inputDir.y == 0){
                console.log("cant move opposit side");
                return;
            }
            else{
            inputDir.x = 1;
            inputDir.y = 0;
            console.log("arrowupR");
            }
            break;
    }
})
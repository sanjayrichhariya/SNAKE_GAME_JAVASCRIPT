
let inputDir = {x: 0, y: 0}; 
let speed = 30;
let score = 0;
let level=1;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};
enemy={x: 7, y:6};
enemy1={x: 10, y:8};
enemy2={x:14, y:12};

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/5000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    
    if(isCollide(snakeArr)){
        score = 0;
        level = 1;
        levelBox.innerHTML = "Level: " + level;
        scoreBox.innerHTML = "Score: " + score; 
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press Space/Enter key to play again!");
        snakeArr = [{x: 13, y: 15}];
    }

    

    if((snakeArr[0].y == enemy.y && snakeArr[0].x ==enemy.x && score>2) || (snakeArr[0].y == enemy1.y && snakeArr[0].x == enemy1.x && score>6) || (snakeArr[0].y == enemy2.y && snakeArr[0].x == enemy2.x && score>9)){
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press Space/Enter key to play again!");
        snakeArr = [{x: 13, y: 15}];
        score = 0;
        level = 1;
        levelBox.innerHTML = "Level: " + level;
        scoreBox.innerHTML = "Score: " + score; 
    }
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        
        levelBox.innerHTML = "Level: " + level;
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        if(score==9){
            level++;
            }
        else if(score==5){
            level++;
        }
        else if(score==2){
            level++;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
        enemy = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
        a=7;
        b=18;
        enemy1 = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
        a=5;
        b=10;
        enemy2 = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

    if(score>9){
        enemyadd(enemy);
        enemyadd(enemy1);
        enemyadd(enemy2);
        
    }
    else if(score>5){
        enemyadd(enemy);
        enemyadd(enemy1);
    }
    else if(score>2){
        enemyadd(enemy);
    }
    if(score>1)
    main(5000);
    
    

}
function enemyadd(e){
    
    enemyElement = document.createElement('div');
        enemyElement.style.gridRowStart = e.y;
        enemyElement.style.gridColumnStart = e.x;
        enemyElement.classList.add('enemy')
    board.appendChild(enemyElement);
}


let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} 
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});
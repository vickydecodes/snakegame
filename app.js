const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
const scoreText = document.querySelector('#span');
const r = document.querySelector('#right');
const l = document.querySelector('#left');
const u = document.querySelector('#up');
const d = document.querySelector('#down');
const refresh = document.querySelector('#refresh');
const pause = document.querySelector('#pause');
const house = document.querySelector('#house');
const hiss = new Audio('food_G1U6tlb.mp3');
const hit = new Audio('crash-snake-16-47956.mp3')


const width = canvas.width;
const height = canvas.height;
const unit = 25;


let foodX;
let foodY;
let xvel = 25;
let yvel = 0;
let score = 0;
let active = true;
let started = false;




let snake = [
    { x: unit * 3, y: 0 },
    { x: unit * 2, y: 0 },
    { x: unit, y: 0 },
    { x: 0, y: 0 }
]



window.addEventListener('keydown', keypress);
startGame();


function startGame() {
    // context.fillStyle = 'red';
    context.fillStyle = 'black'
    context.fillRect(0, 0, width, height);
    createFood();
    displayFood();
    drawSnake();
    // moveSnake();
    // clearBoard();
    // drawSnake();
}


function clearBoard() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
}

function createFood() {
    foodX = Math.floor(Math.random() * width / unit) * unit;
    foodY = Math.floor(Math.random() * height / unit) * unit;
    // displayFood();
}


function displayFood() {
    context.fillStyle = ' #39FF14';
    context.fillRect(foodX, foodY, unit, unit)
}

function drawSnake() {
    context.fillStyle = '#FF3131';
    context.strokeStyle = 'black';
    snake.forEach((snakepart) => {
        context.fillRect(snakepart.x, snakepart.y, unit, unit);
        context.strokeRect(snakepart.x, snakepart.y, unit, unit);
    })
}



function moveSnake() {
    const head = { x: snake[0].x + xvel, y: snake[0].y + yvel };
    snake.unshift(head);
    if (snake[0].x === foodX && snake[0].y === foodY) {
        score += 1;
        scoreText.textContent = score;
        createFood();
        hiss.play()
    } else {
        snake.pop();
    }

}






function nextTick() {
    if (active) {
        setTimeout(() => {
            clearBoard();
            displayFood();
            moveSnake();
            drawSnake();
            checkOver();
            selfHit();
            nextTick();
        }, 150)
    } else {
        hit.play();
        clearBoard();
        canvas.remove();
        const h12 = document.createElement('h1');
        const btn = document.createElement('button');
        btn.setAttribute('class', 'btn btn-primary');
        btn.innerText = 'Restart'
        btn.addEventListener('click', function () {
            window.location.reload();
            btn.remove();
            h12.remove();

        })
        h12.innerText = 'GAME OVER';
        house.append(h12);
        house.append(btn)


    }

}

function selfHit(){
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            active = false;
        }
    }
}









function disOver() {

    context.font = "bold 50px serif";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fllText("Game Over", 250, 250);
}

function keypress(event) {
    if (!started) {
        started = true;
        nextTick();
 
    }

    const left = 37;
    const right = 39;
    const up = 38;
    const down = 40;

    switch (true) {
        case (event.keyCode == left && xvel != unit):
            xvel = -unit;
            yvel = 0;
            break;
        case (event.keyCode == right && xvel != -unit):
            xvel = unit;
            yvel = 0;
            break;
        case (event.keyCode == up && yvel != unit):
            xvel = 0;
            yvel = -unit;
            break;
        case (event.keyCode == down && yvel != -unit):
            xvel = 0;
            yvel = unit;
            break;
    }
};

function checkOver() {
   
    switch (true) {
        case (snake[0].x < 0):
        case (snake[0].x >= width):
        case (snake[0].y < 0):
        case (snake[0].y >= height):
            // case (snake2[0].x < 0):
            // case (snake2[0].x >= width):
            // case (snake2[0].y < 0):
            // case (snake2[0].y >= height):
            active = false;
            break;
            
    }
        
}





l.addEventListener('click', function () {
    if (!started) {
        started = true;
        nextTick();
    }
    if (xvel != unit) {
        xvel = -unit;
        yvel = 0;
    }
});
r.addEventListener('click', function () {
    if (!started) {
        started = true;
        nextTick();
    }
    if (xvel != -unit) {
        xvel = unit;
        yvel = 0;
    }
});
u.addEventListener('click', function () {
    if (!started) {
        started = true;
        nextTick();
    }
    if (yvel != unit) {
        xvel = 0;
        yvel = -unit;
    }
});
d.addEventListener('click', function () {
    if (!started) {
        started = true;
        nextTick();
    }
    if (yvel != -unit) {
        xvel = 0;
        yvel = unit;
    }
});

// window.addEventListener('keydown', keypress)



















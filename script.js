const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;
const cw = canvas.width;
const ch = canvas.height;

let snake = {
    x: cw/2,
    y: ch/2,
    dir: "",
    len: 1,
    w: 10,
    h: 10,
    speed: 10,
    slad : []
};

const apple = {
    x: cw/2 + 10,
    y: ch/2,
    w: 10,
    h: 10,
};

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

color = getRandomColor

function table() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cw, ch);
}

function drawApple () {
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, apple.w, apple.h);

    if (snake.x == apple.x && snake.y == apple.y) {
        snake.len+=1;
        ctx.fillStyle = 'red';
        let x = Math.round((Math.floor((Math.random() * cw-10))))
        let y = Math.round((Math.floor((Math.random() * ch-10))))
        apple.x = x - x%10;
        apple.y = y - y%10;      
    }
}
function drawSnake() {
    
   
    snake.slad.push([snake.x, snake.y])

    for (let i = 0 ; i < snake.len ; i++)
    {   
        x = snake.slad[snake.slad.length-(i+1)][0];
        y = snake.slad[snake.slad.length-(i+1)][1];
        ctx.fillStyle = getRandomColor();
        ctx.fillRect(x, y, snake.w, snake.h);         
    }

    console.log('len', snake.slad.length)
    
    if (snake.x < 0) {
        snake.x = cw;
    }
    else if (snake.x > cw-10) {
        snake.x = 0;
    }
    else if (snake.y < 0) {
        snake.y = ch;
    }
    else if (snake.y > ch-10) {
        snake.y = 0;
    }
    
    if (snake.dir === "up"){
        snake.y -= snake.speed; 
       
    }
    else if (snake.dir == "down"){
        snake.y += snake.speed;
 
    }
    else if (snake.dir == "left"){
        snake.x -= snake.speed;
   
    }
    else if (snake.dir == "right"){
        snake.x += snake.speed;
       
    }

    if (snake.slad.length > snake.len  ) {
    snake.slad.shift()
    }

    
}

function snakePosition(e) {

   switch (e.keyCode) {
    case 37:
    snake.dir = "left";
    break;
    case 39:
    snake.dir = "right";
    break;
    case 38:
    snake.dir = "up";
    break;
    case 40:
    snake.dir = "down";
    break;
    }
}

addEventListener("keydown", snakePosition);

function game() {
    table();
    drawSnake();
    drawApple();
}

setInterval(game, 50)
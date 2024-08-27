
// Canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.height = 600;
canvas.width = 480;



// Paddle 
let paddleWidth = 80;
let paddleHeight = 30;
let paddleX = (canvas.width - paddleWidth) / 2;

const paddle_bg_path = "/Png/slipper.png";
let avatar_path = ["#ff0000", "../Images/hasi.png", "../Images/quader.png"];


// Player ball
let ballRadius = 7;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballSpeedX = 2;
let ballSpeedY = -2;



// Brick
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;




// Bricks
let baseRows = 3; // Starting with 3 rows
let baseColumns = 5; // Constant number of columns
let bricks = [];
let totalBricks = (baseColumns * baseRows); 

// Reset bricks array for the new level
for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 }; // All bricks are initially intact
    }
}



// Red ball
let redBallRadius = 25;
let redBall = { x: Math.random() * (canvas.width - 4 * redBallRadius) + redBallRadius, y: -redBallRadius, speedY: 2 };



let hitScore = 0;
let gameState = 'running';
let score = 0; // Initialize score
let currentLevel = 1; // Start at level 1
const maxLevels = 6; // Limit to 6 levels







// Event handlers and game controls

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

let rightPressed = false;
let leftPressed = false;



// // for mobile



// Initialize paddleX and interval outside the function scope
let intervalLeftButton, intervalRightButton;

// Function to handle mobile controls
function mobileControls() {
    const moveLeftButton = document.getElementById('moveLeftButton');

    // Click and hold down
    moveLeftButton.addEventListener('mousedown', () => {
        intervalLeftButton = setInterval(() => {
            if(paddleX > 0){    // prevents overflow of paddle on left side of canvas
                paddleX--;      
            }
        }, 5); 
    });

    // Click released
    moveLeftButton.addEventListener('mouseup', () => {
        clearInterval(intervalLeftButton); // Stop increasing paddleX
    });


      // Click and hold down for right button
      moveRightButton.addEventListener('mousedown', () => {
        intervalRightButton = setInterval(() => {
            if(paddleX < canvas.width - paddleWidth){    // prevents overflow of paddle on right side of canvas
                paddleX++;      
            }
        }, 5); 
    });

    // Click released for right button
    moveRightButton.addEventListener('mouseup', () => {
        clearInterval(intervalRightButton); // Stop moving paddle right
    });
}


// Call mobileControls function to attach event listeners
mobileControls();



// Controls pc


function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}


// reload button

document.addEventListener('keydown', clickHandler, false);

function clickHandler(e){
    if(e.code == "Space"){
        reload();
    }
}

function reload(){
    window.location.reload();
}







// draw everything

// function drawPaddle() {
//     ctx.beginPath();
//     ctx.rect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
// }

function drawPaddle() {
    let paddle_img = new Image();
    paddle_img.src = "https://github.com/StrandedDev/Breakout/blob/main/Png/slipper.png";
    ctx.drawImage(paddle_img, paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


function drawRedBall(){
    ctx.beginPath();
    ctx.arc(redBall.x, redBall.y, redBallRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}


// Draw red ball
// function drawRedBall(){

//     console.log("redball: " + currentAvatar)

//     if(currentAvatar == 0){
//         ctx.beginPath();
//         ctx.arc(redBall.x, redBall.y, redBallRadius, 0, Math.PI * 2);
//         ctx.fillStyle = 'red';
//         ctx.fill();
//         ctx.closePath();
//     }
//     else if(currentAvatar == 1){
//          // Draw the circular clipping path
//     ctx.beginPath();
//    // ctx.arc(200, 200, 150, 0, Math.PI * 2, true); // Centered circle
//     ctx.arc(redBall.x, redBall.y, redBallRadius, 0, Math.PI * 2);
//     ctx.clip();

//     // Draw the image within the clipped area
//     ctx.drawImage(avatar_path[1], 0, 0, 300, 300); // Adjust size as needed
//     }
//     else if(2){

//         let quader_img = new Image();
//         quader_img.src = avatar_path[2];
//         ctx.beginPath();
//         ctx.arc(redBall.x, redBall.y, redBallRadius, 0, Math.PI * 2);
//         ctx.clip();
//         ctx.drawImage(quader_img, 0, 0, 30, 30); // Adjust size as needed
//         ctx.closePath();
//         console.log(currentAvatar);

//     }
// }



function drawBricks() {

    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                // Calculate brickX and brickY to ensure bricks fit within the canvas
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;

                // Ensure bricks do not go beyond the canvas boundaries
                brickX = Math.min(brickX, canvas.width - brickWidth);
                brickY = Math.min(brickY, canvas.height - brickHeight);

                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}




function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}







// Game mechanics and collision detection

function collisionDetection() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            if(b.status == 1) {
                if(ballX > b.x && ballX < b.x + brickWidth && ballY + ballRadius > b.y && ballY - ballRadius < b.y + brickHeight) {
                    ballSpeedY = -ballSpeedY;
                    b.status = 0; // Remove the brick from play
                    score += 100; // Increase score by 100 points
                    sfx_bounce_elem.play();
                }
            }
        }
    }
     // Paddle collision detection
     if(ballX > paddleX && ballX < paddleX + paddleWidth && ballY + ballRadius > canvas.height - paddleHeight && ballY + ballRadius < canvas.height) {
        // Ensure the collision happens at the top of the paddle
        let collidePoint = ballX - (paddleX + paddleWidth / 2);
        
        // Normalize the value of collidePoint to be between -1 and 1
        collidePoint = collidePoint / (paddleWidth / 2);
        
        // Calculate the angle of reflection based on where the ball hits the paddle
        let angle = collidePoint * Math.PI / 3;
        
        // Update ball speed based on the new angle
        ballSpeedX = 3 * Math.sin(angle); // Increase multiplier to increase speed
        ballSpeedY = -3 * Math.cos(angle); // Ensure the ball goes upwards

        sfx_bounce_elem.play();  // play sound on collision
    }
}


function checkWinCondition() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                return false; // Brick still exists, not yet won
            }
        }
    }
    return true; // No bricks left, player wins
}





function handleGameOver(won) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    if(won) {
        currentLevel++; // Increment level
        if(currentLevel <= maxLevels) { // Ensure we don't exceed max levels
            console.log(`Level ${currentLevel} started!`);

            // Increment totalRows for the next level
            baseRows = baseRows + 1;

            // Regenerate bricks for the next level
            bricks = []; // Reset bricks array
            // Recalculate total bricks and regenerate bricks
            totalBricks = baseColumns * baseRows;
            brickRowCount = baseRows; // Rows increase with level

            brickColumnCount = baseColumns; // Columns stay constant

            for(let c=0; c<brickColumnCount; c++) {
                bricks[c] = [];
                for(let r=0; r<brickRowCount; r++) {
                    bricks[c][r] = { x: 0, y: 0, status: 1 }; // All bricks are initially intact
                }
            }
            // Redraw everything to reflect the new level
            drawBricks();
            drawBall();
            drawPaddle();
        } else {
           // alert("Congratulations! You've reached the maximum level!");
            document.location.reload(); // Reload the page to restart the game
        }
    } else {
       // alert("Game Over. Try again!");
        document.location.reload(); // Reload the page to restart the game
    }
}








// Main function


function draw() {


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();


    // Game controls with arrow

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
        sfx_bounce_elem.play();  // play sound on impact with walls
    }
    if(ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
        sfx_bounce_elem.play();    // play sound on impact 
    }
    else if(ballY + ballRadius > canvas.height) {
        // game over
        gameState = 'over';
        handleGameOver(false); // Game over due to ball fell off
    }

    if(ballY + ballRadius > canvas.height-paddleHeight && ballX > paddleX && ballX < paddleX + paddleWidth) {
        ballSpeedY = -ballSpeedY;
        sfx_bounce_elem.play();    // play sound on impact 
    }

    if(checkWinCondition()) {
        handleGameOver(true); // Game Over due to winning condition
    }




    // red ball 

    drawRedBall();

    // Update score display
    ctx.font = '16px Arial';
    ctx.fillText('Hasina hit: ' + hitScore, (canvas.width - 100), 20);

    // Move red ball vertically
    redBall.y += redBall.speedY;


    // Randomly respawn red ball outside canvas if it falls off-screen
     if (redBall.y > canvas.height + redBallRadius) {
        redBall.x = Math.random() * (canvas.width - 4 * redBallRadius) + redBallRadius; // Ensure it's within canvas width with margin
        redBall.y = -redBallRadius; // Reset above the canvas
    }

    // Collision detection with paddle
    if (redBall.y + redBallRadius > canvas.height - paddleHeight &&
        redBall.x > paddleX && redBall.x < paddleX + paddleWidth) {
        hitScore++; // Increase score
        redBall.x = Math.random() * window.innerWidth; // Respawn at random location
        redBall.y = -redBallRadius; // Above the canvas

        sfx_slap_elem.play();   // play slap sfx when red ball hits paddle
    }


    requestAnimationFrame(draw);
}










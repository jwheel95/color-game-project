let numSquares = 6;
let colors = generateRandomColors(numSquares);

//Query Selectors
const squares = document.querySelectorAll(".square");
const colorDisplay = document.querySelector("#colorDisplay");
const messageDisplay = document.querySelector("#message");
const h1 = document.querySelector("h1");
const resetButton = document.querySelector("#reset");
const easyBtn = document.querySelector("#easyBtn");
const hardBtn = document.querySelector("#hardBtn");
const modeButtons = document.querySelectorAll(".mode");

//Chooses random "correct" color
let pickedColor = pickColor();

// Event Listeners for Easy or Hard Mode btns
for(i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        this.classList.add("selected");
        if(this.textContent === "Easy"){
            numSquares = 3;
        } else {
            numSquares = 6;
        }
        reset();
    });
}

//Reset Function
function reset() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    resetButton.textContent = "New Colors";
    messageDisplay.textContent= "";
    colorDisplay.textContent = pickedColor;
    for(i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
}

//Clicking Reset Button
resetButton.addEventListener("click", function() {
    reset();
})

//Display RGB to guess
colorDisplay.textContent = pickedColor;

for (i = 0; i < squares.length; i++) {
    //add initial colors to squares
    squares[i].style.backgroundColor= colors[i];
    //add click listeners to squares
    squares[i].addEventListener("click", function(){
        let clickedColor = this.style.backgroundColor;
        if(clickedColor === pickedColor){
            messageDisplay.textContent = "Correct!";
            resetButton.textContent = "Play Again?";
            changeColors(pickedColor);
            h1.style.backgroundColor = clickedColor;
        } else {
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = "Try Again";
        }
    })
}

//Functions
function changeColors(color) {
    for(i = 0; i< squares.length; i++)
    squares[i].style.backgroundColor = color;
}

function pickColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    let arr = [];
    for(i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
/**
 * Akbar Hasadi Putra Siregar
 * 6/20/2021 10:45PM
 * https://github.com/akbarhps
 */

let array = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
let run = false;

let stepIterations = 1;
let steps = 0;

function setup() {
    frameRate(60);
    setupLayout();
    drawRectangle();
}

function draw() {
    if (run) {
        doStep();
    }
}

function windowResized() {
    resizeCanvas(windowWidth - 20, windowHeight - 100);
    drawRectangle();
}

function setupLayout() {
    createCanvas(windowWidth - 20, windowHeight - 200).parent('view');
    select("#doStep").mousePressed(doStep);
    select("#doRun").mousePressed(doRun);
    select("#doShuffle").mousePressed(doShuffle);
    select("#openGithub").mousePressed(openGithub);
    sizeChangeListener();
}

function sizeChangeListener() {
    let sizeInput = document.getElementById('size');
    sizeInput.addEventListener('input', (event) => {
        stepIterations = 0;
        let value = Number(event.target.value);
        if (value < 10) {
            value = 10;
        } else if (value > 50) {
            value = 50;
        }
        sizeInput.value = value;
        recreateArray(value);
    });
}

function drawRectangle() {
    background(0);
    for (let index = 0; index < array.length; index++) {
        let rectXPosition = width / array.length * index;
        let rectYPosition = height;
        let rectHeight = (height / array.length) * -array[index];
        let rectWidth = width / array.length;
        let rectCornerRadius = 4;

        index === steps ? fill(255, 255, 255) : fill(0, 0, 0);
        stroke(255, 255, 255);
        rect(rectXPosition, rectYPosition, rectWidth, rectHeight, rectCornerRadius);
    }
}

function doStep() {
    if (array[steps] > array[steps + 1]) {
        [array[steps], array[steps + 1]] = [array[steps + 1], array[steps]];
    }
    if (steps++ >= array.length - stepIterations - 1) {
        steps = 0;
        stepIterations++;
    }
    if (stepIterations >= array.length) {
        doRun();
    }
    drawRectangle();
}

function doRun() {
    run = !run;
    toggleRunButton();
}

function doShuffle() {
    array = shuffleArray(array);
    stepIterations = 0;
    drawRectangle();
}

function toggleRunButton() {
    if (run) {
        select("#doRun").html('Stop 🤚').addClass('active');
    } else {
        select("#doRun").html('Run 🏃‍♂️').removeAttribute('class');
    }
}

function recreateArray(size) {
    array = [];
    for (let i = 1; i <= size; i++) {
        array.push(i);
    }
    array = shuffleArray(array);
    drawRectangle();
}

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] =
            [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function openGithub() {
    window.open('https://www.github.com/akbarhps', '_blank');
}
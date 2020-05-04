let neuralNetwork = new NeuralNetwork(input_x_hidden_weights, hidden_x_output_weights); //declare neural network variable
let outputChart  = new OutputChart(); //define output variable

let drawingCanvas =  document.getElementById('input-canvas'); //define the input canvas to draw the digit
drawingCanvas.width= 84; //width of canvas
drawingCanvas.height= 84; //height canvas
let drawingContext = drawingCanvas.getContext('2d'); //get a 2d canvas

let feedCanvas = document.getElementById('feed-image'); //define canvas the written digit should be fed into
feedCanvas.width= 28; //width of canvas
feedCanvas.height= 28; //height of canvas because pixels should equal ro 28*28 =  784
let feedContext = feedCanvas.getContext('2d'); //get a 2d canvas

function getMousePos(evt) { // function to track mouse position and resize the handwritten digit given as input
    var rect = drawingCanvas.getBoundingClientRect(); //get mouse positions from drawing canvas as objects
    return {
        x: evt.clientX - rect.left, //substract client window  relative mouse position x to convert into canvas element itself
        y: evt.clientY - rect.top //substract client window  relative mouse position to y convert into canvas element itself
    };
}
var mouseIsDown = false; //declare variable to detect if mouseisdown and initiate as false
drawingCanvas.onmousedown =  ev => {
    mouseIsDown = true; //if mouse is down set mouseIsDown variable as true
}
drawingCanvas.onmouseup =  ev => {
    mouseIsDown = false; //if mouse is up set mouseIsDown variable as false
}
drawingCanvas.onmousemove = e => { //on the event of mouse movement
    if(!mouseIsDown) return; //if mouseIsDown is not false

    drawingContext.beginPath(); //begin path of drawing canvas
    drawingContext.arc(getMousePos(e).x, getMousePos(e).y, 3, 0, 2 * Math.PI, false); //get mouse position x, get mouse position y,set radius, start angle, end angle and counterclockwise sense
    drawingContext.fillStyle = '#000000'; //default black for the pen colour
    drawingContext.fill();

    return false;
}
drawingCanvas.addEventListener('mouseout', function(){
    mouseIsDown = false;
}, false);

document.getElementById('recognise-button').onclick = function(){ //upon clicking on "recognize-button"
    feedContext.drawImage(drawingCanvas, 0, 0, feedCanvas.width, feedCanvas.height); //position the handwritten image on the canvas, by specifying width and height
    let rgbaArray = feedContext.getImageData(0, 0, feedCanvas.width, feedCanvas.height).data; //feed the positioned image as data values to the array
    let pixels = []; //initialize pixel array
    for(let i = 3; i<rgbaArray.length; i = i + 4) // since radius is set as 3 i = 3
        pixels.push(rgbaArray[i]); //push the rgbaArray
    let output = neuralNetwork.query(pixels)._data; //input pixel array in data form
    outputChart.plot(output) //plot chart according to the data
    document.getElementById('output-block').innerText = output.indexOf(Math.max(...output)); //get the greatest value from output variable and assign to the inner text of "output-block"
    document.getElementById('output-block').className += ' has-output';
};

document.getElementById('clear-button').onclick = function(){ //upon clicking on "clear-button"
    outputChart.clear(); //clear chart output
    drawingContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height); //set drawing canvas coordinates to 0,0
    feedContext.clearRect(0, 0, feedCanvas.width, feedCanvas.height); //set feeding canvas coordinates to 0,0
    document.getElementById('output-block').innerText = ''; //clear
    document.getElementById('output-block').classList.remove('has-output'); //clear
};


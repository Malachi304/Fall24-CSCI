let a3 = document.getElementById('a3');
let a2 = document.getElementById('a2');
let a1 = document.getElementById('a1');
let a0 = document.getElementById('a0');

let Xmax = document.getElementById('Xmax');
let Xmin = document.getElementById('Xmin');
let n = document.getElementById('n');

let canvas = document.getElementById('myCanvas');
ctx = canvas.getContext('2d');
let height = 0;
let width = 0;
let Xscale = 0;
let Yscale = 0;
let Xoffset = 0;
let Yoffset = 0;
let fun = 0;

let myData = {
    "a values":23};


function user_function(){
    //let display = document.getElementById('Display-axis').checked;

    // Only calculate function if they want to also display the plot
    if(document.getElementById('Display-axis').checked){

        // Display graph section if box is checked 
        canvas.style.display="block";

        let interval = (parseFloat(Xmax.value) - parseFloat(Xmin.value)) / parseInt(n.value);

        let ymax = (parseFloat(a3.value) * Math.pow(parseFloat(Xmax.value), 3)) +
                   (parseFloat(a2.value) * Math.pow(parseFloat(Xmax.value), 2)) +
                   (parseFloat(a1.value) * parseFloat(Xmax.value)) +
                   parseFloat(a0.value);

        let ymin = (parseFloat(a3.value) * Math.pow(parseFloat(Xmin.value), 3)) +
                   (parseFloat(a2.value) * Math.pow(parseFloat(Xmin.value), 2)) +
                   (parseFloat(a1.value) * parseFloat(Xmin.value)) +
                   parseFloat(a0.value);

        
        console.log("Ymax: "+ ymax);
        console.log("Ymin: "+ ymin);
        console.log("Interval: " + interval)

        height = canvas.height;
        width = canvas.width;

        Xscale = width / (parseFloat(Xmax.value) - parseFloat(Xmin.value));
        Yscale = height / (ymax - ymin);


        // Draw graph in canvas container
        drawAxis();
        plotFunction(fun);
        print();

    }
    else{
        // Hide container when box is not checked
        canvas.style.display="none";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }

}
function drawAxis() {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2); // Draw X-axis
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height); // Draw Y-axis
    ctx.stroke();
}

function plotFunction() {
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;

    ctx.beginPath();

    for (let x = parseFloat(Xmin.value); x <= parseFloat(Xmax.value); x += 0.1) {
        let y = (parseFloat(a3.value) * Math.pow(x, 3)) +
                (parseFloat(a2.value) * Math.pow(x, 2)) +
                (parseFloat(a1.value) * x) +
                parseFloat(a0.value);

        Xoffset = width / 2 + (x * Xscale);
        Yoffset = height / 2 - (y * Yscale);

        ctx.strokeStyle = 'blue';

        if (x === parseFloat(Xmin.value)) {
            ctx.moveTo(Xoffset, Yoffset);  // Start the path at the first point
        } else {
            ctx.lineTo(Xoffset, Yoffset);  // Draw lines to subsequent points
        }
    }

    ctx.stroke();  // Actually draw the function plot
}

function print(){

    var textedJson = JSON.stringify(myData, undefined, 2);
    $('#myTextarea').text(textedJson);
}
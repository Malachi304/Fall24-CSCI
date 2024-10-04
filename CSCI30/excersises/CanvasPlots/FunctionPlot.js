let a3 = document.getElementById('a3');
let a2 = document.getElementById('a3');
let a1 = document.getElementById('a3');
let a0 = document.getElementById('a3');

let Xmin = document.getElementById('Xmax');
let Xmax = document.getElementById('Xmin');
let n = document.getElementById('n');
let x = document.getElementById('x');

let canvas = document.getElementById('myCanvas'); 



function compute(){
    //let display = document.getElementById('Display-axis').checked;

    // Only calculate function if they want to also display the plot
    if(document.getElementById('Display-axis').checked){
        let ans = (a3 * Math.pow(x, 3)) + (a2 * Math.pow(x, 2)) + (a1* x ) + a0;

        // Intervals of points based on n
        let interval = (Xmax.value - Xmin.value) / n.value;

        // Calculating Ymin and Ymax
        let ymax = (a3.value * Math.pow(Xmax.value, 3)) + (a2.value * Math.pow(Xmax.value, 2)) + (a1.value* Xmax.value ) + a0.value;
        let ymin = (a3.value * Math.pow(Xmin.value, 3)) + (a2.value * Math.pow(Xmin.value, 2)) + (a1.value* Xmin.value ) + a0.value;
        console.log("Ymax: "+ ymax);
        console.log("Ymin: "+ ymin);
        console.log("Interval: " + interval)

        // Plot canvas
        var ctx = canvas.getContext('2d');
        ctx.fillStyle='blue';
        ctx.fillRect(20,20,100,100);
    }
    else{
        return;
    }

}
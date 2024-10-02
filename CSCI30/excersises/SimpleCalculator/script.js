// Note-to-self: 
// This code could've been simplified if you make functions for number buttons, 
// and operation buttons, instead of having a universal button function, 
// and hard coding possibilities within that one function ... seperation of consern...

// Array that holds continuous user inputs 
let screen_content = [];
// Saved content that the user enters (see button_push())
let screen_content_saved = [];

// Checks if an operation is ready to be performed 
let perform_operation = false;

// On push function, takes button type pushed as parameter
function button_push(btn){

    // If the passed parameter is NOT a number (or '.'), we know it is some kind of operation
    if(!Number.isInteger(btn) && btn !== '.'){
        // Add the operation to the array so that it is visible on screen
        screen_content.push(btn);

        // This is the first half of the operation (ex : the x in 'x + y')
        screen_content_saved = screen_content;
        
        // Then clear the main screen, but add the content to a smaller "old-content" screen, so that it is still viable
        document.getElementById('content').innerHTML=" ";
        // Set screen content to display array, .join('') so there are no commas between each element
        document.getElementById('old-content').innerHTML=screen_content.join('');

        // Erase main array to perpare for second half of operation (ex : the y in 'x + y')
        screen_content = []

        // Set ready for operation
        // NOTE : This will not run an operation until the second hald of the operation has been passed
        perform_operation = true;
    }
    else if (Number.isInteger(btn) || btn == '.'){
        // Add to array for numbers larger than 1 digit
        screen_content.push(btn); 
        document.getElementById('content').innerHTML=screen_content.join('');

        // If an operation is ready to be performed, run operation function
        if(perform_operation){
            // Pass second half of operation 
            operation(screen_content);
        }
    }
    else{
        console.log('ERROR : Invalid Input (function button_push(btn))')
    }
}

// Simple clear function, sets content to empty string
function clear_content(){
    document.getElementById('content').innerHTML=" ";
    document.getElementById('old-content').innerHTML=" ";
    // Rest content array
    screen_content = []; 
}

// Calculator Operations
function operation(num2){

    // Since we saved the operation at the end of the array
    let op = screen_content_saved.pop();
    // Ensure that 'op' is a string and trim any whitespace just in case (I had spaces in my html)
    op = String(op).trim();
  
    // New array without operation string (..beacause we popped earliar)
    let num1 = screen_content_saved.join('');
    // Get rid of array commas 
    num2 = num2.join('');

    let ans = 0;

    // Parse both numbers to float for accurate math operations
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (op){
        case '%':
            break;
        case '/':
            ans = num1 / num2;
            break;
        case '+':
            ans = num1 + num2;
            break;
        case '-':
            ans = num1 - num2;
            break;
        case '*':
            ans = num1 * num2;
            break;
        default:
            console.log('ERROR : Invalid Input (function operation(op))')
    }

    document.getElementById('content').innerHTML=ans;
    perform_operation = false; 

}

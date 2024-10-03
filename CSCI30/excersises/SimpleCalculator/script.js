// Note-to-self: 
// This code could've been simplified if you make functions for number buttons, 
// and operation buttons, instead of having a universal button function, 
// and hard coding possibilities within that one function ... seperation of consern...

// Array that holds continuous user inputs 
let screen_content = [];
// Saved content that the user enters (see button_push())
let screen_content_saved = [];

let last_ans = 0;
let last_op = '';
let last_parameter = 0;
let neg = false; 

// On push function, takes button type pushed as parameter
function button_push(btn){

    // If the passed parameter is NOT a number (or '.'), we know it is some kind of operation
    if(!Number.isInteger(btn) && btn !== '.' && btn !== '='){

        if(btn == '-'){
            if(neg == true){
                neg = false;
                screen_content.shift();
            }
            else{
                neg = true;
                screen_content.unshift(btn);
            }   
            // Then clear the main screen, but add the content to a smaller "old-content" screen, so that it is still viable
            document.getElementById('content').innerHTML=" ";
            // Set screen content to display array, .join('') so there are no commas between each element
            document.getElementById('old-content').innerHTML=screen_content.join('');
            return;
        }
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

    }
    else if (Number.isInteger(btn) || btn == '.'){
        // Add to array for numbers larger than 1 digit
        screen_content.push(btn); 
        document.getElementById('content').innerHTML=screen_content.join('');


    }
    else if (btn == '='){
        // If there is an existing operation that has not been cleared, that operation is used again
        if(last_ans > 0){
            console.log(screen_content);
            operation(last_ans); 
        }
        // Perform operation
        else{
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
    // Reset content array, ans, last saved operation, and parameter (fresh start)
    screen_content = [];
    last_ans = 0; 
    last_op = '';
    last_parameter = 0; 
}

// Calculator Operations
function operation(num2){

    let op = '';
    let num1 = [];
    let ans = 0;

    // Checks if this is a new operation
    if(last_op == ''){
        // Since we saved the operation at the end of the array
        op = screen_content_saved.pop();
        // Ensure that 'op' is a string and trim any whitespace just in case (I had spaces in my html)
        op = String(op).trim();

        // Get rid of array commas 
        num2 = num2.join('');
        
        // New array without operation string (..beacause we popped earliar)
        num1 = screen_content_saved.join(''); 

        // Parse both numbers to float for accurate math operations
        num1 = parseFloat(num1);   
        num2 = parseFloat(num2);
        
   
    }
    // Case for '=' being pushed repeatidly after an operation (ex: 3 + 1 = 4, and pushing '=' again does the operation 4 + 1, then 5 + 1, and so on...)
    else{
        // If the operation is done again, num2 (which would be the last saved answer in this case), needs to swap to num1 to maintain order of operations 
        num1 = num2;
        // num1 is set to last parameter of last operaiton to maintain order of operations 
        num2 = last_parameter;
        console.log("num2: " + num2)
        console.log("num1: " + num1)
        // The last operation is reused
        op = last_op;
    }

    switch (op){
        case '%':
            num1 = num1 / 100;
            ans = num1* num2;
            break;
        case '/':
            if(num2 == 0){
                ans = "Zero Error"
            }
            else{
              ans = num1 / num2;
            }
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
    }

    // Display ans
    document.getElementById('content').innerHTML=ans;
    document.getElementById('old-content').innerHTML=num1 + op + num2 + '=';

    // Save previous operation
    last_ans = ans;
    last_op = op;
    last_parameter = num2; 

}

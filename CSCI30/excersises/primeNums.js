function addRow(){
    let user_input = document.getElementById("user_input");
    let table = document.getElementById("prime_table");


    // Delete the table (excluding headers, see function) when adding new content
    deleteTable()

    // Number of primes the user wants to generate
    for (let i = 0; i < user_input.value; i++){

        // Get current row index
        let rowCount = table.rows.length;
        console.log(rowCount);
        // Insert new row at next avalible index
        let row = table.insertRow(rowCount);

        // First cell = index (row count)
        // Second cell = prime number at that index
        row.insertCell(0).innerHTML= rowCount;
        row.insertCell(1).innerHTML= calculatePrimeNums(rowCount);

    }

}

function calculatePrimeNums(index){
    // Array of prime numbers
    let primes = [];

    // Current number. Prime numbers start at 2
    let currentNum = 2; 

    // While length of prime number array is less than index of current row
    // We want the last index of the array to be returned
    while(primes.length < index){
        // Check if the current number is prime or not
        if(is_prime(currentNum)){
            primes.push(currentNum)
        }
        currentNum ++; 
    }

    return primes[primes.length - 1]; 
}

function is_prime(num){

    // Prime numbers are always greater than 1
    if(num <= 1){
        return false
    }

    // If a number is divisible by a number GREATER THAN or EQUAL TO it's own square root,
    // then it is true that it is also divisible by a smaller number, 
    // which if true, means the number is divisible by more than 1, and itself. 
    for(let i = 2; i <= Math.sqrt(num); i++){
        if(num % i === 0){
            return false;
        }
    }
    return true;
}

// Deletes all table rows after index 1 (Header)
function deleteTable(){
    let table = document.getElementById("prime_table");

    while(table.rows.length > 1){
        table.deleteRow(1)
    }

}

function addRow(){
    let user_input = document.getElementById("user_input");
    let table = document.getElementById("prime_table");
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);

    row.insertCell(0).innerHTML= rowCount;
    row.insertCell(1).innerHTML= calculatePrimeNums(user_input);

}

function deleteRow(obj){
    let table = document.getElementById("prime_table");
    let index = obj.parentNode.rowIndex; 
    table.deleteRow(index);
}

function calculatePrimeNums(){

}
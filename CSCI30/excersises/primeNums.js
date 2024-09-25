function addRow(){
    let user_input = document.getElementById("user_input");
    let table = document.getElementById("prime_table");

    deleteTable()

    for (let i = 0; i < user_input.value; i++){

        let rowCount = table.rows.length;
        let row = table.insertRow(rowCount);
        row.insertCell(0).innerHTML= rowCount;
        row.insertCell(1).innerHTML= calculatePrimeNums(rowCount);

    }

}

function calculatePrimeNums(index){

    if(index == 1){
        return 2
    }
    else if(index == 2){
        return 3
    }
    else if(index==3){
        return 5
    }
    else if(index==4){
        return 7
    }
    else if(index==5){
        return 11
    }
    else
        return 6 * index -1
    

}

function deleteTable(){
    let table = document.getElementById("prime_table");

    while(table.rows.length > 1){
        table.deleteRow(1)
    }

}

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

displayTransactions();

function addTransaction() {

    let description = document.getElementById("description").value;

    let amount = Number(document.getElementById("amount").value);

    let type = document.getElementById("type").value;

    let category = document.getElementById("category").value;

    let date = document.getElementById("date").value;

    if (description === "" || amount <= 0 || date === "") {

        alert("Please fill all fields.");

        return;

    }

    let transaction = {

        description,

        amount,

        type,

        category,

        date

    };

    transactions.push(transaction);

    saveData();

    displayTransactions();

    clearInputs();

}

function displayTransactions() {

    let list = document.getElementById("transactionList");

    list.innerHTML = "";

    let income = 0;

    let expense = 0;

    transactions.forEach(function (transaction, index) {

        let li = document.createElement("li");

        li.innerHTML = `

<div>

<b>${transaction.description}</b><br>

${transaction.category} |

${transaction.date}<br>

${transaction.type} - Ksh ${transaction.amount}

</div>

<button

class="deleteBtn"

onclick="deleteTransaction(${index})">

Delete

</button>

`;

        list.appendChild(li);

        if (transaction.type === "Income") {

            income += transaction.amount;

        } else {

            expense += transaction.amount;

        }

    });

    document.getElementById("income").innerHTML = income;

    document.getElementById("expense").innerHTML = expense;

    document.getElementById("balance").innerHTML = income - expense;

}

function deleteTransaction(index) {

    transactions.splice(index, 1);

    saveData();

    displayTransactions();

}

function saveData() {

    localStorage.setItem(

        "transactions",

        JSON.stringify(transactions)

    );

}

function clearInputs() {

    document.getElementById("description").value = "";

    document.getElementById("amount").value = "";

    document.getElementById("date").value = "";

    document.getElementById("type").value = "Income";

    document.getElementById("category").value = "Salary";

}

function searchTransaction() {

    let input = document.getElementById("search").value.toLowerCase();

    let list = document.querySelectorAll("#transactionList li");

    list.forEach(function (item) {

        if (item.innerText.toLowerCase().includes(input)) {

            item.style.display = "flex";

        } else {

            item.style.display = "none";

        }

    });

}
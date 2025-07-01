function openForm() {
    // schedule -C
    var net_schedulec_one = Number(removeDollarSign(document.getElementById("net1").textContent));
    var net_schedulec_two = Number(removeDollarSign(document.getElementById("net2").textContent));
    // schedule -SE
    var schedule_se_one = Number(removeDollarSign(document.getElementById("total_tax1").textContent));
    var schedule_se_two = Number(removeDollarSign(document.getElementById("total_tax2").textContent));

    sessionStorage.setItem('net1', net_schedulec_one);
    sessionStorage.setItem('net2', net_schedulec_two);

    sessionStorage.setItem('total_tax1', schedule_se_one);
    sessionStorage.setItem('total_tax2', schedule_se_two);
    // Redirect to form.html
    window.open('form1040.html');


}


// //////////////////////////////////////////////////////////////////
const firebaseConfig = {
    apiKey: "AIzaSyDESnSv6vkBGEA0BcaO4Yj4SN8F00OJ4ZI",
    authDomain: "schedule-c-tax-projection.firebaseapp.com",
    projectId: "schedule-c-tax-projection",
    storageBucket: "schedule-c-tax-projection.appspot.com",
    messagingSenderId: "607892483031",
    appId: "1:607892483031:web:57adee6239f6753b523992",
    measurementId: "G-XYMK64786C",
};

firebase.initializeApp(firebaseConfig);

const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
});

function num(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;

    // Allow numbers 0-9, minus sign only at the beginning, comma, and period
    if (
        (charCode >= 48 && charCode <= 57) ||  // 0-9
        (charCode === 45 && evt.target.selectionStart === 0 && evt.target.value.indexOf('-') === -1) ||  // Minus sign only at the beginning
        charCode === 44 ||                     // Comma
        charCode === 46                        // Period
    ) {
        return true;
    }

    return false;
}

// EXPENSE ELEMENTS
const expense1 = document.getElementById("w3o-expense-textinput1");
const expense_adjust1 = document.getElementById("w3o-expense-textinput2");
const advertising = document.getElementById("advertising_scenario2");

const expense2 = document.getElementById("w3o-expense-textinput3");
const expense_adjust2 = document.getElementById("w3o-expense-textinput4");
const car = document.getElementById("car_scenario2");

const expense3 = document.getElementById("w3o-expense-textinput5");
const expense_adjust3 = document.getElementById("w3o-expense-textinput6");
const commission = document.getElementById("commission_scenario2");

const expense4 = document.getElementById("w3o-expense-textinput7");
const expense_adjust4 = document.getElementById("w3o-expense-textinput8");
const contract = document.getElementById("contract_scenario2");

const expense5 = document.getElementById("w3o-expense-textinput9");
const expense_adjust5 = document.getElementById("w3o-expense-textinput10");
const depletion = document.getElementById("depletion_scenario2");

const expense6 = document.getElementById("w3o-expense-textinput13");
const expense_adjust6 = document.getElementById("w3o-expense-textinput14");
const employee = document.getElementById("employee_scenario2");

const expense7 = document.getElementById("w3o-expense-textinput15");
const expense_adjust7 = document.getElementById("w3o-expense-textinput16");
const insurance = document.getElementById("insurance_scenario2");

const expense8 = document.getElementById("w3o-expense-textinput17");
const expense_adjust8 = document.getElementById("w3o-expense-textinput18");
const interest = document.getElementById("interest_scenario2");

const expense9 = document.getElementById("w3o-expense-textinput23");
const expense_adjust9 = document.getElementById("w3o-expense-textinput24");
const office = document.getElementById("office_scenario2");


const expense10 = document.getElementById("w3o-expense-textinput37");
const expense_adjust10 = document.getElementById("w3o-expense-textinput38");
const travel = document.getElementById("travel_scenario2");

const expense11 = document.getElementById("w3o-expense-textinput39");
const expense_adjust11 = document.getElementById("w3o-expense-textinput40");
const deductible = document.getElementById("home_office");

const expense12 = document.getElementById("w3o-expense-textinput41");
const expense_adjust12 = document.getElementById("w3o-expense-textinput42");
const utilities = document.getElementById("other_expenses");


//********************** */
const elementsone = document.querySelectorAll(
    '[class^="w2AnnualIncome"] , [id^="result"] , [id^="w3o-expense-textinput"], [id^="w3o-eassets-textinput"] , [id^="form_8829"] '
);

elementsone.forEach((element) => {
    element.addEventListener("input", function (event) {
        let inputValue = element.value.trim(); // Remove leading/trailing spaces
        let numericValue = inputValue.replace(/[^-0-9]/g, ""); // Allow only digits and minus sign

        if (numericValue !== "" && numericValue !== '-') {
            console.log("here")
            numericValue = parseInt(numericValue, 10); // Convert to integer for better handling
            let formattedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(numericValue);

            element.value = formattedValue;
        } else {
            element.value = ""; // Clear the input if numericValue is empty
        }
    });
});

var tentative_scenario1, tentative_scenario2, net_scenario1, net_scenario2;
// ******************************************



function removeDollarSign(value) {
    return value.replace(/[$,]/g, ""); // Removes dollar signs and commas
}
function updateResult3() {
    // Get the values of result1 and result2
    let result1Value = Number(removeDollarSign(document.getElementById("result1").value));
    let result2Value = Number(removeDollarSign(document.getElementById("result2").value));

    console.log(result1Value, result2Value)
    // Check if the values are valid numbers
    if (!isNaN(result1Value) && !isNaN(result2Value)) {
        // Calculate the sum of result1 and result2
        let result3Value = result1Value + result2Value;

        // Update the content of result3
        document.getElementById("result3").textContent = formatter.format(result3Value);
    }
    else {
        // Handle the case where result1 or result2 is not a valid number
        document.getElementById("result3").textContent = "Invalid input";
    }


    resultsection();

}
const resultIds = ["result1", "result2"];
resultIds.forEach(resultId => {
    document.getElementById(resultId).addEventListener("input", updateResult3);
});


const expenseSets = [
    [expense1, expense_adjust1, advertising],
    [expense2, expense_adjust2, car],
    [expense3, expense_adjust3, commission],
    [expense4, expense_adjust4, contract],
    [expense5, expense_adjust5, depletion],
    [expense6, expense_adjust6, employee],
    [expense7, expense_adjust7, insurance],
    [expense8, expense_adjust8, interest],
    [expense9, expense_adjust9, office],
    [expense10, expense_adjust10, travel],
    [expense11, expense_adjust11, deductible],
    [expense12, expense_adjust12, utilities],

];

//function trigger for income set
for (let i = 0; i < expenseSets.length; i++) {
    const elementsnew = expenseSets[i];

    elementsnew.forEach((element) => {
        element.addEventListener("input", function () {
            handleChangeExpenses(elementsnew[0], elementsnew[1], elementsnew[2]);
        });
    });
}

function handleChangeExpenses(expense, adjust, result) {
    const income1Value = removeDollarSign(expense.value);
    const income2Value = removeDollarSign(adjust.value);

    if (expense.id == "form_8829_sc1") {
        result.innerHTML = formatter.format(
            (Number(income2Value) + Number(income1Value))
        );
    } else {
        result.innerHTML = formatter.format(
            (Number(income2Value) + Number(income1Value))
        );
    }

    document.getElementById("result4").textContent = formatter.format(
        Number(removeDollarSign(expense1.value)) +
        Number(removeDollarSign(expense2.value)) +
        Number(removeDollarSign(expense3.value)) +
        Number(removeDollarSign(expense4.value)) +
        Number(removeDollarSign(expense5.value)) +
        Number(removeDollarSign(expense6.value)) +
        Number(removeDollarSign(expense7.value)) +
        Number(removeDollarSign(expense8.value)) +
        Number(removeDollarSign(expense9.value)) +
        Number(removeDollarSign(expense10.value)) +
        Number(removeDollarSign(expense11.value)) +
        Number(removeDollarSign(expense12.value))
    );

    document.getElementById("result5").textContent = formatter.format(
        Number(removeDollarSign(expense_adjust1.value)) +
        Number(removeDollarSign(expense_adjust2.value)) +
        Number(removeDollarSign(expense_adjust3.value)) +
        Number(removeDollarSign(expense_adjust4.value)) +
        Number(removeDollarSign(expense_adjust5.value)) +
        Number(removeDollarSign(expense_adjust6.value)) +
        Number(removeDollarSign(expense_adjust7.value)) +
        Number(removeDollarSign(expense_adjust8.value)) +
        Number(removeDollarSign(expense_adjust9.value)) +
        Number(removeDollarSign(expense_adjust10.value)) +
        Number(removeDollarSign(expense_adjust11.value)) +
        Number(removeDollarSign(expense_adjust12.value))
    );

    document.getElementById("result6").textContent = formatter.format(
        Number(removeDollarSign(advertising.innerHTML)) +
        Number(removeDollarSign(car.innerHTML)) +
        Number(removeDollarSign(commission.innerHTML)) +
        Number(removeDollarSign(contract.innerHTML)) +
        Number(removeDollarSign(depletion.innerHTML)) +
        Number(removeDollarSign(employee.innerHTML)) +
        Number(removeDollarSign(insurance.innerHTML)) +
        Number(removeDollarSign(interest.innerHTML)) +
        Number(removeDollarSign(office.innerHTML)) +
        Number(removeDollarSign(travel.innerHTML)) +
        Number(removeDollarSign(deductible.innerHTML)) +
        Number(removeDollarSign(utilities.innerHTML))
    );

    resultsection();
}

function updateElementTextContent(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = formatter.format(value);
    }
}



var tentative_scenario1, tentative_scenario2,
    net_scenario1, net_scenario2, income_subject1, income_subject2, medicare1, medicare2
    , fica1, fica2;
var result_array1 = [], result_array2 = [];


function resultsection() {

    max_threshold_amount = Number(160200);
    // var W2_one = Number(removeDollarSign(document.getElementById("w2AnnualIncome").value));
    // var W2_two = Number(removeDollarSign(document.getElementById("w2AnnualIncome_two").value));

    // Net Profit or Loss = Gross Income - Total expenses
    var Net_scenario1 = Number(removeDollarSign(document.getElementById("result1").value)) -
        Number(removeDollarSign(document.getElementById("result4").textContent));

    var Net_scenario2 = Number(removeDollarSign(document.getElementById("result3").textContent)) -
        Number(removeDollarSign(document.getElementById("result6").textContent));

    var income_subject1 = Number(Net_scenario1) * (92.35 / 100) > 0 ? Number(Net_scenario1) * (92.35 / 100) : 0;
    var income_subject2 = Number(Net_scenario2) * (92.35 / 100) > 0 ? Number(Net_scenario2) * (92.35 / 100) : 0;

   
    var amount_excess_one = max_threshold_amount;
    var amount_excess_two = max_threshold_amount;

    const income_subject_social_one = (amount_excess_one < income_subject1 ? amount_excess_one : 0)
        + Math.min((amount_excess_one > income_subject1 ? income_subject1 : 0), max_threshold_amount);

    const income_subject_social_two = (amount_excess_two < income_subject2 ? amount_excess_two : 0)
        + Math.min((amount_excess_two > income_subject2 ? income_subject2 : 0), max_threshold_amount);



    medicare1 = income_subject1 * (2.9 / 100);
    medicare2 = income_subject2 * (2.9 / 100);

    fica1 = Math.min(income_subject_social_one * (0.124));
    fica2 = Math.min(income_subject_social_two * (0.124));

    console.log(income_subject_social_one, income_subject_social_two);

    updateElementTextContent("social1", income_subject_social_one);
    updateElementTextContent("social2", income_subject_social_two);

    updateElementTextContent("net1", Net_scenario1);
    updateElementTextContent("net2", Net_scenario2);

    updateElementTextContent("tax1", income_subject1);
    updateElementTextContent("tax2", income_subject2);


    updateElementTextContent("med1", medicare1);
    updateElementTextContent("med2", medicare2);
    updateElementTextContent("fica1", fica1);
    updateElementTextContent("fica2", fica2);

    updateElementTextContent("total_tax1", (medicare1 + fica1))
    updateElementTextContent("total_tax2", (medicare2 + fica2))


    // result_array1[0] = medicare1;
    // result_array2[0] = medicare2;

    // result_array1[1] = fica1;
    // result_array2[1] = fica2;

    // result_array1[2] = taxes1;
    // result_array2[2] = taxes2;

    // let chartStatus2 = Chart.getChart("barChart");
    // if (chartStatus2 != undefined) {
    //     chartStatus2.destroy();
    // }

    // graph(result_array1, result_array2);
}

function toggleW2Salary() {
    var checkbox = document.getElementById("checker");
    var W2SalaryDiv = document.getElementById("W2-salary");

    if (checkbox.checked) {
        W2SalaryDiv.style.display = "block";
    } else {
        W2SalaryDiv.style.display = "none";
    }
}

function toggleW2Salary2() {
    var checkbox = document.getElementById("checker2");
    var W2SalaryDiv = document.getElementById("W2-salary_two");

    if (checkbox.checked) {
        W2SalaryDiv.style.display = "block";
    } else {
        W2SalaryDiv.style.display = "none";
    }
}
function graph(arr1, arr2) {
    // console.log(arr1 , arr2);
    var data = {
        labels: ["Medicare Tax", "FICA Tax", "Self-Employment Tax"],
        datasets: [
            {
                label: 'Scenario 1',
                backgroundColor: 'rgba(173, 216, 230, 0.7)', // Light Blue
                borderColor: 'rgba(173, 216, 230, 1)',
                borderWidth: 1,
                data: [arr1[0], arr1[1], arr1[2]]
            },
            {
                label: 'Scenario 2',
                backgroundColor: 'rgba(144, 238, 144, 0.7)', // Light Green
                borderColor: 'rgba(144, 238, 144, 1)',
                borderWidth: 1,
                data: [arr2[0], arr2[1], arr2[2]]
            }
        ]
    };

    var ctx = document.getElementById('barChart').getContext('2d');

    var options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Tax Amount (in dollars)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Tax Parameters'
                }
            }
        }
    };

    var barChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
}


function disp() {
    document.getElementById("result").style.display = "block";
    document.getElementById("input").style.display = "none";
}

function disp2() {
    document.getElementById("result").style.display = "none";
    document.getElementById("input").style.display = "block";
}



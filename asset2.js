TAX_CREDIT_SINGLE_PHASE_START = 200000;
TAX_CREDIT_SINGLE_PHASE_END = 240000;

TAX_CREDIT_MARRIED_PHASE_START = 400000;
TAX_CREDIT_MARRIED_PHASE_END = 440000;

TAX_CREDIT_HEAD_PHASE_START = 200000;
TAX_CREDIT_HEAD_PHASE_END = 240000;

CHILD_CREDIT = 2000;
DEPENDENT_CREDIT = 500;

var adjusted_income1, adjusted_income2, tax_before_credits1, tax_before_credits2;
var bracket1 , bracket2 , bracket3 , bracket4 , bracket5 , bracket6 , bracket7;
// Number formatting functions
const elementsone = document.querySelectorAll(
    '[class^="w3o-custmVal"] '
);

elementsone.forEach((element) => {
    element.addEventListener("input", function (event) {
        let inputValue = element.value.trim(); // Remove leading/trailing spaces
        let numericValue = inputValue.replace(/[^-0-9]/g, ""); // Allow only digits and minus sign

        if (numericValue !== "" && numericValue !== '-') {

            numericValue = parseInt(numericValue, 10); // Convert to integer for better handling
            let formattedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(numericValue);

            element.value = formattedValue;
        } else {
            element.value = ""; // Clear the input if numericValue is empty
        }
    });
});

function removeDollarSign(value) {
    return value.replace(/[$,]/g, ""); // Removes dollar signs and commas
}

const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
});

// Type of deduction portion
// select element
var deductionTypeOne = document.getElementById('deduction_type_one');
var deductionTypeTwo = document.getElementById('deduction_type_two');

// Standard row inputs
var Standard_deduction_1 = document.getElementById('standard_deduction_1');
var Standard_deduction_2 = document.getElementById('standard_deduction_2');

// Itemized row inputs
var Itemized_deduction_1 = document.querySelectorAll(".itemized_1");
var Itemized_deduction_2 = document.querySelectorAll(".itemized_2");

// Section.
var StandardRow = document.getElementById('standard_deduction_row');
var ItemizedRow = document.querySelectorAll(".itemized_row");

function applyStandardRowStyles(element) {
    element.style.display = 'flex';
    element.style.width = '100%';
    element.style.flexWrap = 'wrap';
}

function toggleElements(itemizedElements, action) {
    itemizedElements.forEach(function (element) {
        if (action === 'enable') {
            element.removeAttribute('disabled');
        } else if (action === 'disable') {
            element.setAttribute('disabled', true);
        }
    });
}


function checkItemizedDeduction() {
    Standard_deduction_2.value = "";
    Standard_deduction_1.value = "";

    if (deductionTypeOne.value === 'standard' || deductionTypeTwo.value === 'standard') {
        if (deductionTypeOne.value === 'standard') {
            applyStandardRowStyles(StandardRow);

            Standard_deduction_1.disabled = false;
            if (deductionTypeTwo.value !== 'standard') {
                Standard_deduction_2.disabled = true;
            }
        }
        if (deductionTypeTwo.value === 'standard') {
            applyStandardRowStyles(StandardRow);
            Standard_deduction_2.disabled = false;

            if (deductionTypeOne.value !== 'standard') {
                Standard_deduction_1.disabled = true;
            }

        }

    }
    else {
        StandardRow.style.display = 'none';

    }


    if (deductionTypeOne.value === 'itemized' || deductionTypeTwo.value === 'itemized') {

        if (deductionTypeOne.value === 'itemized') {

            ItemizedRow.forEach(function (element) {
                applyStandardRowStyles(element);
            });
            toggleElements(Itemized_deduction_1, 'enable');
            if (deductionTypeTwo.value !== 'itemized') {
                toggleElements(Itemized_deduction_2, 'disable');
            }
        }

        if (deductionTypeTwo.value === 'itemized') {
            ItemizedRow.forEach(function (element) {
                applyStandardRowStyles(element);
            });
            toggleElements(Itemized_deduction_2, 'enable');


            if (deductionTypeOne.value !== 'itemized') {
                toggleElements(Itemized_deduction_1, 'disable');
            }
        }
    }
    else {
        ItemizedRow.forEach(function (element) {
            element.style.display = 'none';
        });

    }
}

deductionTypeOne.addEventListener('change', checkItemizedDeduction);
deductionTypeTwo.addEventListener('change', checkItemizedDeduction);
checkItemizedDeduction();


function getValue(elementId) {
    return Number(removeDollarSign(document.getElementById(elementId).value));
}

function getSelection(elementId) {
    return document.getElementById(elementId).value;
}
const elements = [
    document.getElementById("deduction_type_one"),
    document.getElementById("deduction_type_two"),
    document.getElementById("filing_status_one"),
    document.getElementById("filing_status_two"),
    document.getElementById("qualified1"),
    document.getElementById("qualified2"),
    document.getElementById("sixty_five_1"),
    document.getElementById("sixty_five_2")
];

elements.forEach(element => {
    element.addEventListener('change', calculate_result_section);
});
var marginal_tax_rate = 0;
function calculate_result_section() {
    var deduction1, deduction2;
    // Scenario 1
    var income1 = getValue("total_income1");
    var adjustments1 = getValue("totalAdjustmentsIncome1");
    var itemized_deductions1 = getValue("totalItemizedDeductions1");
    var tax_credits1 = getValue("totalCredits1");
    var other_taxes1 = getValue("total_other_taxes_1");
    var payments1 = getValue("total_payments_1");
    var older_taxpayer_1 = getValue("sixty_five_1");
    var qualified_business1 = Number(removeDollarSign(document.getElementById("qualified1").value));
    var alternative_tax1 = getValue("alternative_minimum_tax1");
    var excessive_repayment1 = getValue("credit_repayment1");

    var deduction_type_1 = getSelection("deduction_type_one");
    var filing_status1 = getSelection("filing_status_one");

    // Scenario 2
    var income2 = getValue("total_income2");
    var adjustments2 = getValue("totalAdjustmentsIncome2");
    var itemized_deductions2 = getValue("totalItemizedDeductions2");
    var tax_credits2 = getValue("totalCredits2");
    var other_taxes2 = getValue("total_other_taxes_2");
    var payments2 = getValue("total_payments_2");
    var older_taxpayer_2 = getValue("sixty_five_2");
    var qualified_business2 = Number(removeDollarSign(document.getElementById("qualified2").value));
    var alternative_tax2 = getValue("alternative_minimum_tax2");
    var excessive_repayment2 = getValue("credit_repayment2");

    var deduction_type_2 = getSelection("deduction_type_two");
    var filing_status2 = getSelection("filing_status_two");

    adjusted_income1 = income1 - adjustments1;
    adjusted_income2 = income2 - adjustments2;

    document.getElementById("gross1").textContent = formatter.format(adjusted_income1);
    document.getElementById("gross2").textContent = formatter.format(adjusted_income2);

    if (deduction_type_1 == 'standard') {
        deduction1 = Number(calculateDeduction(older_taxpayer_1, filing_status1));
        document.getElementById("standard_deduction_1").value = formatter.format(deduction1);

    }
    else {
        deduction1 = itemized_deductions1;
    }
    if (deduction_type_2 == 'standard') {
        deduction2 = Number(calculateDeduction(older_taxpayer_2, filing_status2));
        document.getElementById("standard_deduction_2").value = formatter.format(deduction2);
    }
    else {
        deduction2 = itemized_deductions2;

    }


    var taxable_income_1 = (qualified_business1 + adjusted_income1) - deduction1;
    var taxable_income_2 = (qualified_business2 + adjusted_income2) - deduction2;


    var Tax1 = Math.max(calculateTaxonTaxableIncome(filing_status1 , taxable_income_1) , 0);
    document.getElementById("margin1").textContent = marginal_tax_rate + "%";

    var Tax2 = Math.max(calculateTaxonTaxableIncome(filing_status2 , taxable_income_2) , 0);
    document.getElementById("margin2").textContent = marginal_tax_rate + "%";

    tax_before_credits1 = Tax1 + alternative_tax1 + excessive_repayment1;
    tax_before_credits2 = Tax2 + alternative_tax2 + excessive_repayment2;


    var tax_after_all_params1 = (tax_before_credits1 - tax_credits1) + other_taxes1 + payments1;
    var tax_after_all_params2 = (tax_before_credits2 - tax_credits2) + other_taxes2 + payments2;

    document.getElementById("tax1_due").textContent = formatter.format(tax_after_all_params1);
    document.getElementById("tax2_due").textContent = formatter.format(tax_after_all_params2);

    document.getElementById("taxes_combined1").textContent = formatter.format(Tax1);
    document.getElementById("taxes_combined2").textContent = formatter.format(Tax2);
    document.getElementById("taxable1").textContent = formatter.format(taxable_income_1);
    document.getElementById("taxable2").textContent = formatter.format(taxable_income_2);
    document.getElementById("ded1").textContent = formatter.format(deduction1);
    document.getElementById("ded2").textContent = formatter.format(deduction2);
    document.getElementById("business_deduction1").textContent = formatter.format(qualified_business1);
    document.getElementById("business_deduction2").textContent = formatter.format(qualified_business2);

}

function calculateTaxonTaxableIncome(status , income) {
 if(status === 'single'){
     bracket1 = 11000;
     bracket2 = 44725;
     bracket3 = 95375;
     bracket4 = 182100;
     bracket5 = 231250;
     bracket6 = 578125;
     bracket7 = 1000000;
 }
 else if(status === 'married'){
    bracket1 = 22000;
    bracket2 = 89450;
    bracket3 = 190750;
    bracket4 = 364200;
    bracket5 = 462500;
    bracket6 = 693750;
    bracket7 = 1000000;
 }
else{
    bracket1 = 15700;
    bracket2 = 59850;
    bracket3 = 95350;
    bracket4 = 182100;
    bracket5 = 231250;
    bracket6 = 578100;
    bracket7 = 1000000;
}
    
    if (income <= bracket1) {
        tax = 0.1 * income;
        marginal_tax_rate = 10;
    } else if (income <= bracket2) {
        tax = 0.1 * bracket1 + 0.12 * (income - bracket1);
        marginal_tax_rate = 12;
    } else if (income <= bracket3) {
        tax = 0.1 * bracket1 + 0.12 * (bracket2 - bracket1) + 0.22 * (income - bracket2);
        marginal_tax_rate = 22;
    } else if (income <= bracket4) {
        tax = 0.1 * bracket1 + 0.12 * (bracket2 - bracket1) + 0.22 * (bracket3 - bracket2) + 0.24 * (income - bracket3);
        marginal_tax_rate = 24;
    } else if (income <= bracket5) {
        tax = 0.1 * bracket1 + 0.12 * (bracket2 - bracket1) + 0.22 * (bracket3 - bracket2) + 0.24 * (bracket4 - bracket3) + 0.32 * (income - bracket4);
        marginal_tax_rate = 32;
    } else if (income <= bracket6) {
        tax = 0.1 * bracket1 + 0.12 * (bracket2 - bracket1) + 0.22 * (bracket3 - bracket2) + 0.24 * (bracket4 - bracket3) + 0.32 * (bracket5 - bracket4) + 0.35 * (income - bracket5);
        marginal_tax_rate = 35;
    } else if (income <= bracket7) {
        tax = 0.1 * bracket1 + 0.12 * (bracket2 - bracket1) + 0.22 * (bracket3 - bracket2) + 0.24 * (bracket4 - bracket3) + 0.32 * (bracket5 - bracket4) + 0.35 * (bracket6 - bracket5) + 0.37 * (income - bracket6);
        marginal_tax_rate = 37;
    } else {
        tax = 0
    }

    return tax;
}






function calculateDeduction(taxpayer_number, status) {

    if (taxpayer_number === 0 || taxpayer_number === "") {
        return (status === "married" ? 27700 : 0) +
            (status === "single" ? 13850 : 0) +
            (status === "head" ? 20800 : 0);
    } else if (taxpayer_number === 1) {
        return (status === "married" ? 27700 + 1500 : 0) +
            (status === "single" ? 13850 + 1850 : 0) +
            (status === "head" ? 20800 + 1850 : 0);
    } else if (taxpayer_number === 2) {
        return (status === "married" ? 27700 + (1500 * 2) : 0) +
            (status === "single" ? 13850 + 1850 : 0) +
            (status === "head" ? 20800 + 1850 : 0);
    } else {
        return 0;
    }

}
// Addition of sections
function calculateTotal(className, target_id) {
    // Get all elements with the specified class
    var elements = (document.getElementsByClassName(className));
    var sum = 0;

    // Iterate through elements and add their values to the sum
    for (var i = 0; i < elements.length; i++) {
        sum += parseFloat(removeDollarSign(elements[i].value)) || 0; // Convert value to a number, default to 0 if NaN
    }
    document.getElementById(target_id).value = formatter.format(sum);

    child_credit();
    calculate_result_section();

}

// INCOME
var totalIncomeElements_one = document.getElementsByClassName("total_income_one");
var totalIncomeElements_two = document.getElementsByClassName("total_income_two");
// ADJUSTMENTS TO INCOME
var adjustment_income_one = document.getElementsByClassName("adjustment_income_one");
var adjustment_income_two = document.getElementsByClassName("adjustment_income_two");

var item_one = document.getElementsByClassName("item_one");
var item_two = document.getElementsByClassName("item_two");

var credits_one = document.getElementsByClassName("credits_1");
var credits_two = document.getElementsByClassName("credits_2");

var other_one = document.getElementsByClassName("other_1");
var other_two = document.getElementsByClassName("other_2");

var pay_one = document.getElementsByClassName("payment_1");
var pay_two = document.getElementsByClassName("payment_2");

for (var i = 0; i < totalIncomeElements_one.length; i++) {
    totalIncomeElements_one[i].addEventListener("input", function () {
        calculateTotal("total_income_one", "total_income1");
    })

    totalIncomeElements_two[i].addEventListener("input", function () {
        calculateTotal("total_income_two", "total_income2");
    })
}

for (var i = 0; i < pay_one.length; i++) {
    pay_one[i].addEventListener("input", function () {
        calculateTotal("payment_1", "total_payments_1");
    })

    pay_two[i].addEventListener("input", function () {
        calculateTotal("payment_2", "total_payments_2");
    })
}


for (var i = 0; i < other_one.length; i++) {
    other_one[i].addEventListener("input", function () {
        calculateTotal("other_1", "total_other_taxes_1");
    })

    other_two[i].addEventListener("input", function () {
        calculateTotal("other_2", "total_other_taxes_2");
    })
}

for (var i = 0; i < credits_one.length; i++) {
    credits_one[i].addEventListener("input", function () {
        calculateTotal("credits_1", "totalCredits1");
    })

    credits_two[i].addEventListener("input", function () {
        calculateTotal("credits_2", "totalCredits2");
    })
}

for (var i = 0; i < item_one.length; i++) {
    item_one[i].addEventListener("input", function () {
        calculateTotal("item_one", "totalItemizedDeductions1");
    })

    item_two[i].addEventListener("input", function () {
        calculateTotal("item_two", "totalItemizedDeductions2");
    })
}

for (var i = 0; i < adjustment_income_one.length; i++) {
    adjustment_income_one[i].addEventListener("input", function () {
        calculateTotal("adjustment_income_one", "totalAdjustmentsIncome1");
    })

    adjustment_income_two[i].addEventListener("input", function () {
        calculateTotal("adjustment_income_two", "totalAdjustmentsIncome2");
    })
}

function change() {
    document.getElementById("input").style.display = 'none';
    document.getElementById("result").style.display = 'block';

    document.getElementById("heading_form").textContent = "TAX OVERVIEW - FORM 1040"
}

function change_back() {
    document.getElementById("input").style.display = 'block';
    document.getElementById("result").style.display = 'none';

    document.getElementById("heading_form").textContent = "PERSONAL TAX - FORM 1040"

}














jQuery(document).ready(function () {
    jQuery(".w3o-catgeory-row").click(function () {
        var $this = jQuery(this); // Store a reference to 'this'

        $this.toggleClass("w3o-plan-active");
        // Toggle the next element (you may have other code here)
        $this.next().toggle();

        // Remove the smooth transition after 1 second
        setTimeout(function () {
            $this.css({
                transition: "",
            });
        }, 3000); // 1000 milliseconds = 1 second
    });


    jQuery(".w3o-col-2").addClass("active");

    jQuery(".w3o-pt-1").click(function () {
        jQuery(".w3o-plan-tab").removeClass("active");
        jQuery(this).addClass("active");
        jQuery(".w3o-plan-cont").removeClass("active");
        jQuery(".w3o-col-2").addClass("active");
    });

    jQuery(".w3o-pt-2").click(function () {
        jQuery(".w3o-plan-tab").removeClass("active");
        jQuery(this).addClass("active");
        jQuery(".w3o-plan-cont").removeClass("active");
        jQuery(".w3o-col-3").addClass("active");
    });

    jQuery(".w3o-pt-3").click(function () {
        jQuery(".w3o-plan-tab").removeClass("active");
        jQuery(this).addClass("active");
        jQuery(".w3o-plan-cont").removeClass("active");
        jQuery(".w3o-col-4").addClass("active");
    });

    jQuery(".w3o-pt-4").click(function () {
        jQuery(".w3o-plan-tab").removeClass("active");
        jQuery(this).addClass("active");
        jQuery(".w3o-plan-cont").removeClass("active");
        jQuery(".w3o-col-5").addClass("active");
    });

    jQuery(".w3o-mt-tab.w3o-mtpt-1").click(function () {
        jQuery(this).siblings().removeClass("active");
        jQuery(this).addClass("active");
        jQuery(".w3oTabletp1").addClass("active");
        jQuery(".w3oTabletp2").removeClass("active");
        jQuery(".w3oTabletp3").removeClass("active");
    });

    jQuery(".w3o-mt-tab.w3o-mtpt-2").click(function () {
        jQuery(this).siblings().removeClass("active");
        jQuery(this).addClass("active");
        jQuery(".w3oTabletp1").removeClass("active");
        jQuery(".w3oTabletp2").addClass("active");
        jQuery(".w3oTabletp3").removeClass("active");
    });

    jQuery(".w3o-mt-tab.w3o-mtpt-3").click(function () {
        jQuery(this).siblings().removeClass("active");
        jQuery(this).addClass("active");
        jQuery(".w3oTabletp1").removeClass("active");
        jQuery(".w3oTabletp2").removeClass("active");
        jQuery(".w3oTabletp3").addClass("active");
    });

    jQuery(".w3oPlnAddon .check").click(function () {
        jQuery(this).parent().parent().toggleClass("w3oPlnAddon-active");
    });

    jQuery(".w3oPlnAddon-custom .check").click(function () {
        jQuery(this).parent().parent().toggleClass("w3oPlnAddon-custom-active");
    });

    jQuery(".eswitch .check").click(function () {
        jQuery(this).parent().parent().toggleClass("w3oPlntnr-active");
        jQuery(".w3oTabletp1 .w3o-tnr-yr").toggle();
        jQuery(".w3oTabletp1 .w3o-tnr-mn").toggle();
    });
    jQuery(".gswitch .check").click(function () {
        jQuery(this).parent().parent().toggleClass("w3oPlntnr-active");
        jQuery(".w3oTabletp2 .w3o-tnr-yr").toggle();
        jQuery(".w3oTabletp2 .w3o-tnr-mn").toggle();
    });
    jQuery(".cswitch .check").click(function () {
        jQuery(this).parent().parent().toggleClass("w3oPlntnr-active");
        jQuery(".w3oTabletp3 .w3o-tnr-yr").toggle();
        jQuery(".w3oTabletp3 .w3o-tnr-mn").toggle();
    });
});



var net1Value = sessionStorage.getItem('net1');
var net2Value = sessionStorage.getItem('net2');

var SelfEmployment1 = sessionStorage.getItem("total_tax1");
var SelfEmployment2 = sessionStorage.getItem("total_tax2");

// Display the values in file2.html
document.getElementById('businessIncome1').value = formatter.format(net1Value);
document.getElementById('businessIncome2').value = formatter.format(net2Value);
document.getElementById('total_income1').value = formatter.format(net1Value);
document.getElementById('total_income2').value = formatter.format(net2Value);



document.getElementById("selfEmploymentTaxSE1").value = formatter.format(SelfEmployment1);
document.getElementById("selfEmploymentTaxSE2").value = formatter.format(SelfEmployment2);

document.getElementById("selfEmploymentTax1").value = formatter.format((SelfEmployment1 * 0.5));
document.getElementById("selfEmploymentTax2").value = formatter.format((SelfEmployment2 * 0.5));
document.getElementById("totalAdjustmentsIncome1").value = formatter.format((SelfEmployment1 * 0.5));
document.getElementById("totalAdjustmentsIncome2").value = formatter.format((SelfEmployment2 * 0.5));

document.getElementById("total_other_taxes_1").value = formatter.format(SelfEmployment1);
document.getElementById("total_other_taxes_2").value = formatter.format(SelfEmployment2);


const credit_elements = [
    document.getElementById("child_credit1"),
    document.getElementById("child_credit2"),
    document.getElementById("child_credit_uneligible1"),
    document.getElementById("child_credit_uneligible2"),
    document.getElementById("filing_status_one"),
    document.getElementById("filing_status_two"),
    document.getElementById("foreignTaxCredit1"),
    document.getElementById("foreignTaxCredit2"),
    document.getElementById("childDependentCareCredit1"),
    document.getElementById("childDependentCareCredit2"),
    document.getElementById("educationCredits1"),
    document.getElementById("educationCredits2"),
    document.getElementById("retirementSavingsCredit1"),
    document.getElementById("retirementSavingsCredit2"),
    document.getElementById("energyCredits1"),
    document.getElementById("energyCredits2"),
    document.getElementById("total_income1"),
    document.getElementById("total_income2"),
    document.getElementById("totalAdjustmentsIncome1"),
    document.getElementById("totalAdjustmentsIncome2"),
    document.getElementById("qualified1"),
    document.getElementById("qualified2"),
    document.getElementById("wages1"),
    document.getElementById("wages2"),
];

credit_elements.forEach(element => {
    element.addEventListener('input', child_credit);
});

function child_credit() {

    var credit_c1 = document.getElementById("child_credit1");
    var credit_c2 = document.getElementById("child_credit2");
    var credit_other1 = document.getElementById("child_credit_uneligible1");
    var credit_other2 = document.getElementById("child_credit_uneligible2");
    var status_1 = document.getElementById("filing_status_one");
    var status_2 = document.getElementById("filing_status_two");

    var p1 = getValue("total_income1");
    var q1 = getValue("totalAdjustmentsIncome1");
    var p2 = getValue("total_income2");
    var q2 = getValue("totalAdjustmentsIncome2");

    var adjust1 = p1 - q1;
    var adjust2 = p2 - q2;
    console.log(tax_before_credits1,getValue("foreignTaxCredit1") , getValue("childDependentCareCredit1"), getValue("educationCredits1") , getValue("retirementSavingsCredit1") , getValue("energyCredits1") ,status_1.value, credit_c1.value, credit_other1.value, adjusted_income1);
    document.getElementById("childTaxCredit1").value = calculate_child_credit(tax_before_credits1,getValue("foreignTaxCredit1") , getValue("childDependentCareCredit1"), getValue("educationCredits1") , getValue("retirementSavingsCredit1") , getValue("energyCredits1") ,status_1.value, Number(credit_c1.value), Number(credit_other1.value), adjust1)
    document.getElementById("childTaxCredit2").value = calculate_child_credit(tax_before_credits2,getValue("foreignTaxCredit2") , getValue("childDependentCareCredit2"), getValue("educationCredits2") , getValue("retirementSavingsCredit2") , getValue("energyCredits2"), status_2.value, Number(credit_c2.value), Number(credit_other2.value), adjust2);


    console.log(getValue("childTaxCredit1") , getValue("foreignTaxCredit1"));
    document.getElementById("totalCredits1").value = formatter.format(getValue("childTaxCredit1") + getValue("foreignTaxCredit1") + getValue("childDependentCareCredit1")+ getValue("educationCredits1") + getValue("retirementSavingsCredit1") + getValue("energyCredits1")  + getValue("otherCredits1"))
    document.getElementById("totalCredits2").value = formatter.format(getValue("childTaxCredit2") + getValue("foreignTaxCredit2") + getValue("childDependentCareCredit2")+ getValue("educationCredits2") + getValue("retirementSavingsCredit2") + getValue("energyCredits2")  + getValue("otherCredits2"))

    
    calculate_result_section();
}
function calculate_child_credit(E90, E94, E95, E96, E97, E98, D8, D9, D10, E56) {
   
    const credit = (Math.abs(Math.max(
        -E90 - (E94 + E95 + E96 + E97 + E98),
        (
            (D8 === "married") ?
                Math.min(D9 * -CHILD_CREDIT + (
                (E56 > TAX_CREDIT_MARRIED_PHASE_START) ? ((Math.round(E56 / -1000) * -1000) - TAX_CREDIT_MARRIED_PHASE_START) * 0.05 : 0
                ), 0) : 0
        ) +
        (
            (D8 === "single") ?
                Math.min(D9 * -CHILD_CREDIT + (
                    (E56 > TAX_CREDIT_SINGLE_PHASE_START) ? ((Math.round(E56 / -1000) * -1000) - TAX_CREDIT_SINGLE_PHASE_START) * 0.05 : 0
                ), 0) : 0
        ) +
        (
            (D8 === "head") ?
                Math.min(D9 * -CHILD_CREDIT + (
                    (E56 > TAX_CREDIT_HEAD_PHASE_START) ? ((Math.round(E56 / -1000) * -1000) - TAX_CREDIT_HEAD_PHASE_START) * 0.05 : 0
                ), 0) : 0
        ) +
        (
            (D8 === "married") ?
                Math.min(D10 * -DEPENDENT_CREDIT + (
                    (E56 > TAX_CREDIT_MARRIED_PHASE_START) ? ((Math.round(E56 / -1000) * -1000) - TAX_CREDIT_MARRIED_PHASE_START) * 0.05 : 0
                ), 0) : 0
        ) +
        (
            (D8 === "single") ?
                Math.min(D10 * -DEPENDENT_CREDIT + (
                    (E56 > TAX_CREDIT_SINGLE_PHASE_START) ? ((Math.round(E56 / -1000) * -1000) - TAX_CREDIT_SINGLE_PHASE_START) * 0.05 : 0
                ), 0) : 0
        ) +
        (
            (D8 === "head") ?
                Math.min(D10 * -DEPENDENT_CREDIT + (
                    (E56 > TAX_CREDIT_HEAD_PHASE_START) ? ((Math.round(E56 / -1000) * -1000) - TAX_CREDIT_HEAD_PHASE_START) * 0.05 : 0
                ), 0) : 0
        )
    )));

    if(isNaN(credit)){
        return formatter.format(0);
    }
    else{
    
        return formatter.format(credit);
    }
}


// window.onload  = child_credit();
function register() {
    // Get all inputs
    const APPLICANT_REG_INFO = {
        controlNumber : getControlNumber(),
        firstName : document.forms["reg-form"]["f-name"].value,
        middleName : document.forms["reg-form"]["m-name"].value,
        lastName : document.forms["reg-form"]["l-name"].value,
        suffix : document.forms["reg-form"]["suffix"].value,
        birthDate : document.forms["reg-form"]["birthdate"].value,
        sex : getSex(),
        status : getStatus(),
        course : document.forms["reg-form"]["course"].value,
        strand : document.forms["reg-form"]["strand"].value,
        email : document.forms["reg-form"]["email"].value,
        password : matchPassword()
    };

    console.log(APPLICANT_REG_INFO);
    alert("Registration Complete!");
    location.href = "../../admission/applicant/applicant-login.html";
}

function matchPassword() {
    let a = document.getElementById("pass").value;
    let b = document.getElementById("confirm-pass").value;

    if (a != b) {
        alert("Password not matched.");
    }

    else {
        return a;
    }
}

function getControlNumber() {
    // Control Number Format : Year + number of applicants in current year+1
    // Ex.: 220001 (Year 2022 + applicant number)
    let year = new Date().getFullYear().toString();
    year = year.slice(2);

    // temporary applicant number
    let applicant_num = "0001";

    let control_number = year + applicant_num;
    return control_number;
}

function getSex() {
    let sex = undefined;

    if ( document.getElementById("sex-male").checked ) {
        sex = "Male";
    }
    else if ( document.getElementById("sex-female").checked ) {
        sex = "Female";
    }
    
    return sex;
}

function getStatus() {
    let status = undefined;

    if ( document.getElementById("freshmen").checked ) {
        status = "Freshmen";
    }
    else if ( document.getElementById("transferee").checked ) {
        status = "Transferee";
    }
    else if ( document.getElementById("returnee").checked ) {
        status = "Returnee";
    }
    else if ( document.getElementById("cross-enrollee").checked ) {
        status = "Cross-Enrolee";
    }
    else if ( document.getElementById("als").checked ) {
        status = " ALS";
    }

    return status;
} 

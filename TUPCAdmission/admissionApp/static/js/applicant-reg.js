var CSRF_TOKEN = '{{ csrf_token }}';

function register() {
    let firstName = document.forms["reg-form"]["firstName"].value
    let middleName = document.forms["reg-form"]["middleName"].value
    let lastName = document.forms["reg-form"]["lastName"].value
    let suffix = document.forms["reg-form"]["suffix"].value

    if ( suffix != '' ) {
        get_fullName = lastName + ', ' + firstName + ' ' + middleName + ' ' + suffix + '.'
    } else {
        get_fullName = lastName + ', ' + firstName + ' ' + middleName
    }
    // Get all inputs
    // const APPLICANT_REG_INFO = {
    //     control_number : getControlNumber(),
    //     fullName : get_fullName,
    //     suffix : document.forms["reg-form"]["suffix"].value,
    //     birthDate : document.forms["reg-form"]["birthdate"].value,
    //     sex : getSex(),
    //     status : getStatus(),
    //     course : document.forms["reg-form"]["course"].value,
    //     strand : document.forms["reg-form"]["strand"].value,
    //     email : document.forms["reg-form"]["email"].value,
    //     password : matchPassword(),
    //     csrfmiddlewaretoken : CSRF_TOKEN
    // };

    $.ajax({
        url: 'create_applicant/',
        type: 'POST',
        data: {
            control_number : getControlNumber(),
            fullName : get_fullName,
            suffix : document.forms["reg-form"]["suffix"].value,
            birthdate : document.forms["reg-form"]["birthdate"].value,
            sex : getSex(),
            status : getStatus(),
            course : document.forms["reg-form"]["course"].value,
            strand : document.forms["reg-form"]["strand"].value,
            email : document.forms["reg-form"]["email"].value,
            password : matchPassword(),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
    });

    // console.log(APPLICANT_REG_INFO);
    
    // location.href = "../templates/applicants/applicant-login.html";
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

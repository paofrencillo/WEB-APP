//Temporary login credentials
//Magbabago to kapag may databaese na
// Applicable din to sa ibang page na may login form
var emailAdd = "test@email.com";
var password = "123";

function validateLogin() {
    //Get the entries from the input boxes
    let a = document.forms["login-form"]['applicant-email'].value;
    let b = document.forms["login-form"]['applicant-pass'].value;

    // if credentials not matched
    if (( a != emailAdd ) || ( b != password )) {
        alert("Incorrect credentials");
        location.reload();
    }
    
    //if credentials are matched
    else if (( a == emailAdd ) && ( b == password )) {
        location.href = "../applicant/applicant-result.html";
    }
}
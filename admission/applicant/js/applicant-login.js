//Temporary login credentials

var emailAdd = "test@email.com";
var password = "123";

function validateLogin() {
    let a = document.forms["login-form"]["applicant-email"];
    let b = document.forms["login-form"]["applicant-pass"];
    if ((a == emailAdd) || (b == password)) {
        alert("Incorrect credentials");
    }
}
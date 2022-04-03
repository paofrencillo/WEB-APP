// tempo account
var emailAdd = "test@email.com";
var password = "123";

function validateLogin() {
    //get login entries from user
    let a = document.forms["login-form"]['interviewer-email'].value;
    let b = document.forms["login-form"]['interviewer-pass'].value;

    // if user entries is incorrect
    if (( a !=emailAdd) || ( b != password)) {
        alert("Incorrect credentials");
        location.reload();
    }

    // if user entries is correct
    else if (( a == emailAdd) && ( b == password)) {
        location.href = "../interviewer/interviewer-table.html"
    }

}
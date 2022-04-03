//Temporary login credentials
var emailAdd = "test@email.com";
var password = "123";

function validateLogin() {
    //Get the entries from the input boxes
    let a = document.forms["login-form"]['nurse-email'].value;
    let b = document.forms["login-form"]['nurse-pass'].value;
    // if credentials not matched
    if (( a != emailAdd ) || ( b != password )) {
        alert("Incorrect credentials");
        location.reload();
    }
    //if credentials are matched
    else if (( a == emailAdd ) && ( b == password )) {
        location.href = "../medical/nurse-table.html";
    }
}
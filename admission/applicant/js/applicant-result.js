// Syntax may change if database is available...

// Applicant Info
document.getElementById("applicant-name").innerHTML = getApplicantInfo().name;
document.getElementById("number").innerHTML = getApplicantInfo().control_number;
document.getElementById("course").innerHTML = getApplicantInfo().course;

// Entrance Exam Result
document.getElementById("exam-date").innerHTML = getExamResult().date;
document.getElementById("exam-time").innerHTML = getExamResult().time;
document.getElementById("room-assign").innerHTML = getExamResult().room;
document.getElementById("exam-result-remarks").innerHTML = getExamResult().result;

// Medical Result
document.getElementById("medical-date").innerHTML = getMedicalResult().date;
document.getElementById("medical-venue").innerHTML = getMedicalResult().venue;
document.getElementById("medical-result-remarks").innerHTML = getMedicalResult().result;

// Interview Result
document.getElementById("interview-date").innerHTML = getInterviewResult().date;
document.getElementById("interview-venue").innerHTML = getInterviewResult().venue;
document.getElementById("interview-interviewer").innerHTML = getInterviewResult().interviewer;
document.getElementById("interview-result-remarks").innerHTML = getInterviewResult().result;


// Requirements Result
document.getElementById("requirements-result-remarks").innerHTML = getRequirementsResult().result;


function getApplicantInfo() {
    /* BLOCK OF CODE TO GET
    DATA IN DATABASE */

    // TEMPORARY DATA TO USE
    let firstName = "Cardo";
    let middleName = "Unkillable";
    let lastName = "Dalisay";
    let suffix = "";
    let fullName = undefined;

    // if there is no suffix
    if (suffix == "") {
        fullName = lastName + ', ' + firstName + " " + middleName;
    }

    // else if there is suffix
    else {
        fullName = lastName + ', ' + firstName + " " + middleName + " " +
                    suffix + "."
    }

    let applicant_info = {
        name : fullName,
        control_number : "220001",
        course : "BET - Computer Engineering Technology"
    };
    
    return applicant_info;
}

function getExamResult() {
    /* BLOCK OF CODE TO GET
    DATA IN DATABASE */

    let exam_result = {
        date : "February 30, 2022",
        time : "10:00AM - 01:00PM",
        room : "Room 123",
        result : "PASSED"
    };

    if ( exam_result.result == "PASSED" ) {
        document.getElementById("exam-result-remarks").style.backgroundColor = "rgb(189, 230, 189)";
        document.getElementById("exam-result-remarks").style.border = "3px solid green";
    }

    else if ( exam_result.result == "FAILED" ) {
        document.getElementById("exam-result-remarks").style.backgroundColor = "rgb(223, 191, 191)";
        document.getElementById("exam-result-remarks").style.border = "3px solid red";
    }

    else {
        console.log("???")
    }

    return exam_result;
}

function getMedicalResult() {
    /* BLOCK OF CODE TO GET
    DATA IN DATABASE */

    let medical_result = {
        date : "February 30, 2022",
        venue : "TUP-C Court",
        result : "FAILED"
    };

    if ( medical_result.result == "PASSED" ) {
        document.getElementById("medical-result-remarks").style.backgroundColor = "rgb(189, 230, 189)";
        document.getElementById("medical-result-remarks").style.border = "3px solid green";
    }

    else if ( medical_result.result == "FAILED" ) {
        document.getElementById("medical-result-remarks").style.backgroundColor = "rgb(223, 191, 191)";
        document.getElementById("medical-result-remarks").style.border = "3px solid red";
    }

    else {
        console.log("???")
    }

    return medical_result;
}

function getInterviewResult() {
    /* BLOCK OF CODE TO GET
    DATA IN DATABASE */

    let interview_result = {
        date : "February 30, 2022",
        venue : "COET Shop",
        interviewer : "Engr. Juana Reyes",
        result : "PASSED"
    };

    if ( interview_result.result == "PASSED" ) {
        document.getElementById("interview-result-remarks").style.backgroundColor = "rgb(189, 230, 189)";
        document.getElementById("interview-result-remarks").style.border = "3px solid green";
    }

    else if ( interview_result.result == "FAILED" ) {
        document.getElementById("interview-result-remarks").style.backgroundColor = "rgb(223, 191, 191)";
        document.getElementById("interview-result-remarks").style.border = "3px solid red";
    }

    else {
        console.log("???")
    }

    return interview_result; 
}

function getRequirementsResult() {
    /* BLOCK OF CODE TO GET
    DATA IN DATABASE */

    var requirements_result = {
        card : "SUBMITTED",
        gmc : "NOT SUBMITTED",
        brgy_clearance : "NOT SUBMITTED",
        bcpsa : "NOT SUBMITTED",
        result : ""
    };

    a = Object.values(requirements_result);

    for ( const value of a ) {
        if ( value == "NOT SUBMITTED" ) {
            requirements_result["result"] = "INCOMPLETE";
            break;
        }

        else {
            requirements_result["result"] = "COMPLETE";
        }
    }

    if ( requirements_result.result == "COMPLETE" ) {
        document.getElementById("requirements-result-remarks").style.backgroundColor = "rgb(189, 230, 189)";
        document.getElementById("exam-result-remarks").style.border = "3px solid green";
    }

    else if ( requirements_result.result == "INCOMPLETE" ) {
        document.getElementById("requirements-result-remarks").style.backgroundColor = "rgb(223, 191, 191)";
        document.getElementById("requirements-result-remarks").style.border = "3px solid red";
    }

    else {
        console.log("???")
    }

    return requirements_result;
}
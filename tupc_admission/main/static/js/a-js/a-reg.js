
document.getElementById("id_first_name").value = getSavedValue("id_first_name");
document.getElementById("m_name").value = getSavedValue("m_name");
document.getElementById("id_last_name").value = getSavedValue("id_last_name");
document.getElementById("suffix").value = getSavedValue("suffix");
document.getElementById("birthdate").value = getSavedValue("birthdate")
document.getElementById("sex").value = getSavedValue("sex")
document.getElementById("status").value = getSavedValue("status")
document.getElementById("course").value = getSavedValue("course");
document.getElementById("strand").value = getSavedValue("strand");
document.getElementById("id_email").value = getSavedValue("id_email");


function saveValue(e) {
    console.log(e.id, e.value);
    var id = e.id;
    var val = e.value;
    sessionStorage.setItem(id, val);
}


function getSavedValue(v) {
    if (!sessionStorage.getItem(v)) {
        return '';
    }
    return sessionStorage.getItem(v);
}


var current_reg_page = document.getElementsByClassName("reg-container")[0].id;
function prevBtn() {
    if ( current_reg_page == 'reg-container2' ) {
        document.getElementById("prev-btn").setAttribute('disabled', '');
        document.getElementById("one-btn").style.backgroundColor = 'rgb(88, 232, 95)';
        document.getElementById("two-btn").style.backgroundColor = 'rgb(232, 88, 88)';
        document.getElementById("three-btn").style.backgroundColor = 'rgb(232, 88, 88)';
        document.getElementById("reg-container1").style.display = 'block';
        document.getElementById("reg-container2").style.display = 'none';
        document.getElementById("reg-container3").style.display = 'none';
        current_reg_page = 'reg-container1';
    } else if ( current_reg_page == 'reg-container3' ) {
        document.getElementById("next-btn").removeAttribute('disabled', '');
        document.getElementById("one-btn").style.backgroundColor = 'rgb(232, 88, 88)';
        document.getElementById("two-btn").style.backgroundColor = 'rgb(88, 232, 95)';
        document.getElementById("three-btn").style.backgroundColor = 'rgb(232, 88, 88)';
        document.getElementById("reg-container1").style.display = 'none';
        document.getElementById("reg-container2").style.display = 'block';
        document.getElementById("reg-container3").style.display = 'none';
        current_reg_page = 'reg-container2';
    } 
} 


function nextBtn() {
    let inputs_values = [
            document.getElementById('id_first_name').value,
            document.getElementById('m_name').value,
            document.getElementById('id_last_name').value,
            document.getElementById('suffix').value,
            document.getElementById('birthdate').value,
            document.getElementById('sex').value,
            document.getElementById('status').value,
            document.getElementById('course').value,
            document.getElementById('strand').value,
            document.getElementById('id_email').value,
            document.getElementById('id_username').value,
            document.getElementById('id_password1').value,
            document.getElementById('id_password2').value];

    if ( current_reg_page == 'reg-container1' ) {
        for ( let i=0; i<6; i++ ) {
            console.log(inputs_values[i]);
            if ( inputs_values[i] == '' ) {
                document.getElementById("prev-btn").setAttribute('disabled', '');
                document.getElementById("one-btn").style.backgroundColor = 'rgb(88, 232, 95)';
                document.getElementById("two-btn").style.backgroundColor = 'rgb(232, 88, 88)';
                document.getElementById("three-btn").style.backgroundColor = 'rgb(232, 88, 88)';
                document.getElementById("reg-container1").style.display = 'block';
                document.getElementById("reg-container2").style.display = 'none';
                document.getElementById("reg-container3").style.display = 'none';
                current_reg_page = 'reg-container1';
                break
            } else {
                document.getElementById("prev-btn").removeAttribute('disabled', '');
                document.getElementById("one-btn").style.backgroundColor = 'rgb(232, 88, 88)';
                document.getElementById("two-btn").style.backgroundColor = 'rgb(88, 232, 95)';
                document.getElementById("three-btn").style.backgroundColor = 'rgb(232, 88, 88)';
                document.getElementById("reg-container1").style.display = 'none';
                document.getElementById("reg-container2").style.display = 'block';
                document.getElementById("reg-container3").style.display = 'none';
                current_reg_page = 'reg-container2';
            }
        }
    } else if ( current_reg_page == 'reg-container2' ) {
        for ( let i=6; i<9; i++ ) {
            console.log(inputs_values[i]);
            if ( inputs_values[i] == '' ) {
                document.getElementById("next-btn").removeAttribute('disabled', '');
                document.getElementById("prev-btn").removeAttribute('disabled', '');
                document.getElementById("one-btn").style.backgroundColor = 'rgb(232, 88, 88)';
                document.getElementById("two-btn").style.backgroundColor = 'rgb(88, 232, 95)';
                document.getElementById("three-btn").style.backgroundColor = 'rgb(232, 88, 88)';
                document.getElementById("reg-container1").style.display = 'none';
                document.getElementById("reg-container2").style.display = 'block';
                document.getElementById("reg-container3").style.display = 'none';
                current_reg_page = 'reg-container2';
                break
            } else {
                document.getElementById("next-btn").setAttribute('disabled', '');
                document.getElementById("one-btn").style.backgroundColor = 'rgb(232, 88, 88)';
                document.getElementById("two-btn").style.backgroundColor = 'rgb(232, 88, 88)';
                document.getElementById("three-btn").style.backgroundColor = 'rgb(88, 232, 95)';
                document.getElementById("reg-container1").style.display = 'none';
                document.getElementById("reg-container2").style.display = 'none';
                document.getElementById("reg-container3").style.display = 'block';
                current_reg_page = 'reg-container3';

                document.getElementById('submit').removeAttribute('disabled', '');
                document.getElementById('submit').style.backgroundColor = 'rgb(184, 0, 18)';
            }
        }
    } 
}


$(window).resize(function() {
    let body_width = document.getElementById("body").offsetWidth;

    if ( body_width < 768 ) {
        document.getElementById("bday-container").style.marginRight = "0px";
        document.getElementById("sex-container").style.marginLeft = "0px";
        document.getElementById("bday-container").style.marginBottom = "1rem";
    } else if ( body_width >= 768 ) {
        document.getElementById("bday-container").style.marginRight = "10px";
        document.getElementById("sex-container").style.marginLeft = "10px";
        document.getElementById("bday-container").style.marginBottom = "0rem";
    }
});
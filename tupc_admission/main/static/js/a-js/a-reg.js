
document.getElementById('id_user_type').setAttribute('value', 'APPLICANT');

document.getElementById("id_first_name").value = getSavedValue("id_first_name");
document.getElementById("id_middle_name").value = getSavedValue("id_middle_name");
document.getElementById("id_last_name").value = getSavedValue("id_last_name");
document.getElementById("id_suffix").value = getSavedValue("id_suffix");
document.getElementById("id_birth_date").value = getSavedValue("id_birthdate")
document.getElementById("id_sex").value = getSavedValue("id_sex")
document.getElementById("id_status").value = getSavedValue("id_status")
document.getElementById("id_course").value = getSavedValue("id_course");
document.getElementById("id_shs_strand").value = getSavedValue("id_strand");
document.getElementById("id_email").value = getSavedValue("id_email");


function saveValue(e) {
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

        document.getElementById('submit').setAttribute('disabled', '');
        document.getElementById('submit').style.backgroundColor = 'rgb(113, 113, 113)';
    } else if ( current_reg_page == 'reg-container3' ) {
        document.getElementById("next-btn").removeAttribute('disabled', '');
        document.getElementById("one-btn").style.backgroundColor = 'rgb(232, 88, 88)';
        document.getElementById("two-btn").style.backgroundColor = 'rgb(88, 232, 95)';
        document.getElementById("three-btn").style.backgroundColor = 'rgb(232, 88, 88)';
        document.getElementById("reg-container1").style.display = 'none';
        document.getElementById("reg-container2").style.display = 'block';
        document.getElementById("reg-container3").style.display = 'none';
        current_reg_page = 'reg-container2';

        document.getElementById('submit').setAttribute('disabled', '');
        document.getElementById('submit').style.backgroundColor = 'rgb(113, 113, 113)';
    } 
} 


function nextBtn() {
    let inputs_values = [
            document.getElementById('id_first_name').value,
            document.getElementById('id_middle_name').value,
            document.getElementById('id_last_name').value,
            document.getElementById('id_suffix').value,
            document.getElementById('id_birth_date').value,
            document.getElementById('id_sex').value,
            document.getElementById('id_status').value,
            document.getElementById('id_course').value,
            document.getElementById('id_shs_strand').value,
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

                document.getElementById('submit').setAttribute('disabled', '');
                document.getElementById('submit').style.backgroundColor = 'rgb(113, 113, 113)';
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

                document.getElementById('submit').setAttribute('disabled', '');
                document.getElementById('submit').style.backgroundColor = 'rgb(113, 113, 113)';
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


function togglePass(e) {
    if ( e.id == 'togglePass1' ) {
        let pass_field = document.getElementById('id_password1');
        let eye_icon = document.getElementById('eye_icon1');
        if ( pass_field.type === 'password' ) {
            pass_field.type = 'text';
            eye_icon.removeAttribute('class', 'bi bi-eye-fill')
            eye_icon.setAttribute('class', 'bi bi-eye-slash-fill')
            
        } else if ( pass_field.type === 'text' ) {
            pass_field.type = 'password';
            eye_icon.removeAttribute('class', 'bi bi-eye-slash-fill')
            eye_icon.setAttribute('class', 'bi bi-eye-fill') 
        }
    } else if ( e.id == 'togglePass2' ) {
        let pass_field = document.getElementById('id_password2');
        let eye_icon = document.getElementById('eye_icon2');
        if ( pass_field.type === 'password' ) {
            pass_field.type = 'text';
            eye_icon.removeAttribute('class', 'bi bi-eye-fill')
            eye_icon.setAttribute('class', 'bi bi-eye-slash-fill')
        } else if ( pass_field.type === 'text' ) {
            pass_field.type = 'password';
            eye_icon.removeAttribute('class', 'bi bi-eye-slash-fill')
            eye_icon.setAttribute('class', 'bi bi-eye-fill') 
        }
    }
}


$(document).ready(function() {
    var password1_container = document.getElementById('div_id_password1');
    var password2_container = document.getElementById('div_id_password2');
    password1_container.getElementsByTagName('div')[0].setAttribute('class', 'input-group');
    password2_container.getElementsByTagName('div')[0].setAttribute('class', 'input-group');
    password1_container.getElementsByTagName('div')[0].innerHTML += 
            '<div id="togglePass1" class="input-group-append" onclick="togglePass(this)"><span class="input-group-text"><i id="eye_icon1" class="bi bi-eye-fill"></i></span></div>';
    password2_container.getElementsByTagName('div')[0].innerHTML += 
            '<div id="togglePass2" class="input-group-append" onclick="togglePass(this)"><span class="input-group-text"><i id="eye_icon2" class="bi bi-eye-fill"></i></span></div>';

    user_type_field = document.getElementById('id_user_type');
    user_type_field.removeAttribute('required', '');
});


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

// Display the image after selecting  from directory
window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.getElementById('img');
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
            img.style.display = 'block';
        }
    });
});
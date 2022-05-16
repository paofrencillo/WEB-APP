
document.getElementById("id_first_name").value = getSavedValue("id_first_name");
document.getElementById("id_middle_name").value = getSavedValue("id_middle_name");
document.getElementById("id_last_name").value = getSavedValue("id_last_name");
document.getElementById("id_suffix").value = getSavedValue("id_suffix");
document.getElementById("id_user_type").value = getSavedValue("id_user_type");
document.getElementById("id_email").value = getSavedValue("id_email");
document.getElementById("id_username").value = getSavedValue("id_username");


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
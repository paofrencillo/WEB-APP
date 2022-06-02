
function togglePass(e) {
    if ( e.id == 'togglePass' ) {
        let pass_field = document.getElementById('password');
        let eye_icon = document.getElementById('eye_icon');
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
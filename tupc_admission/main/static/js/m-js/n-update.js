

function expandSidebar() {
    let sidebar = document.getElementById("sidebar");
    let sidebar_width = sidebar.offsetWidth;
    let body_width = document.getElementById("body").offsetWidth;
  
    if ( sidebar_width == 100 ) {
        sidebar.style.width = "290px";
    } else if ( sidebar_width == 290) {
        sidebar.style.width = "100px";
    }
  
    if ( body_width <= 768 ) {
        document.getElementById("main-content").style.marginLeft = "100px";
        document.getElementById("sidebar").style.left = "-100px";   
    }
  
    if ( sidebar_width == "100" ) {
        document.getElementById("sidebar").style.width = "290px";
    
        if ( document.getElementById("sidebar").style.width == "290px" ) {
            document.getElementById("tupc-text").style.visibility= "visible";
            document.getElementById("nurse-name").style.visibility = "visible";
            document.getElementById("home-wrapper").style.justifyContent = "start";
            document.getElementById("home-text").style.visibility = "visible";
            document.getElementById("home-text").style.display = "inline";
            document.getElementById("profile-wrapper").style.justifyContent = "start";
            document.getElementById("profile-text").style.visibility = "visible";
            document.getElementById("profile-text").style.display = "inline";
            document.getElementById("download-wrapper").style.justifyContent = "start";
            document.getElementById("download-text").style.visibility = "visible";
            document.getElementById("download-text").style.display = "inline";
            document.getElementById("logout-wrapper").style.justifyContent = "start";
            document.getElementById("logout-text").style.visibility = "visible";
            document.getElementById("logout-text").style.display = "inline";
        }
    }
  
    else if ( sidebar_width == "290" ) {
        document.getElementById("sidebar").style.width = "100px";
  
        if ( document.getElementById("sidebar").style.width == "100px" ) {
            document.getElementById("tupc-text").style.visibility = "hidden";
            document.getElementById("nurse-name").style.visibility = "hidden";
            document.getElementById("home-wrapper").style.justifyContent = "center";
            document.getElementById("home-text").style.visibility = "hidden";
            document.getElementById("home-text").style.display = "none";
            document.getElementById("profile-wrapper").style.justifyContent = "center";
            document.getElementById("profile-text").style.visibility = "hidden";
            document.getElementById("profile-text").style.display = "none";
            document.getElementById("download-wrapper").style.justifyContent = "center";
            document.getElementById("download-text").style.visibility = "hidden";
            document.getElementById("download-text").style.display = "none";
            document.getElementById("logout-wrapper").style.justifyContent = "center";
            document.getElementById("logout-text").style.visibility = "hidden";
            document.getElementById("logout-text").style.display = "none";  
        }
    }
  }
  
  
  function hamburgerToggle() {
    let body_width = document.getElementById("body").offsetWidth;
    
    if ( body_width <= 768 ) {
        document.getElementById("sidebar").style.left= "0px";
    }
  
    let sidebar_width = document.getElementById("sidebar").offsetWidth;
  
    if ( sidebar_width == "100" ) {
        document.getElementById("sidebar").style.width = "290px";
    
        if ( document.getElementById("sidebar").style.width == "290px" ) {
            document.getElementById("tupc-text").style.visibility= "visible";
            document.getElementById("nurse-name").style.visibility = "visible";
            document.getElementById("home-wrapper").style.justifyContent = "start";
            document.getElementById("home-text").style.visibility = "visible";
            document.getElementById("home-text").style.display = "inline";
            document.getElementById("profile-wrapper").style.justifyContent = "start";
            document.getElementById("profile-text").style.visibility = "visible";
            document.getElementById("profile-text").style.display = "inline";
            document.getElementById("download-wrapper").style.justifyContent = "start";
            document.getElementById("download-text").style.visibility = "visible";
            document.getElementById("download-text").style.display = "inline";
            document.getElementById("logout-wrapper").style.justifyContent = "start";
            document.getElementById("logout-text").style.visibility = "visible";
            document.getElementById("logout-text").style.display = "inline";
        }
    }
  
    else if ( sidebar_width == "290" ) {
        document.getElementById("sidebar").style.width = "100px";
  
        if ( document.getElementById("sidebar").style.width == "100px" ) {
            document.getElementById("tupc-text").style.visibility = "hidden";
            document.getElementById("nurse-name").style.visibility = "hidden";
            document.getElementById("home-wrapper").style.justifyContent = "center";   
            document.getElementById("home-text").style.visibility = "hidden";
            document.getElementById("home-text").style.display = "none";
            document.getElementById("profile-wrapper").style.justifyContent = "center";   
            document.getElementById("profile-text").style.visibility = "hidden";
            document.getElementById("profile-text").style.display = "none";
            document.getElementById("download-wrapper").style.justifyContent = "center";   
            document.getElementById("download-text").style.visibility = "hidden";
            document.getElementById("download-text").style.display = "none";
            document.getElementById("logout-wrapper").style.justifyContent = "center";
            document.getElementById("logout-text").style.visibility = "hidden";
            document.getElementById("logout-text").style.display = "none";  
        }
    }
  }
  
// show/hide hamburger icon and sidebar
$(window).resize(function() {
    let body_width = document.getElementById("body").offsetWidth;
  
    if ( body_width <= 768 ) {
        document.getElementById("hamburger").style.display = "inline-block";
        document.getElementById("sidebar").style.width = "100px";
        document.getElementById("sidebar").style.left = "-100px";
    } else if ( body_width > 768 ) {
        document.getElementById("hamburger").style.display = "none";
        document.getElementById("sidebar").style.width = "100px";
        document.getElementById("sidebar").style.left = "0";
        document.getElementById("main-content").style.marginLeft = "100px";
        document.getElementById("tupc-text").style.visibility = "hidden";
        document.getElementById("nurse-name").style.visibility = "hidden";
        document.getElementById("home-wrapper").style.justifyContent = "center";
        document.getElementById("home-text").style.visibility = "hidden";
        document.getElementById("home-text").style.display = "none";
        document.getElementById("profile-wrapper").style.justifyContent = "center";
        document.getElementById("profile-text").style.visibility = "hidden";
        document.getElementById("profile-text").style.display = "none";
        document.getElementById("download-wrapper").style.justifyContent = "center";
        document.getElementById("download-text").style.visibility = "hidden";
        document.getElementById("download-text").style.display = "none";
        document.getElementById("logout-wrapper").style.justifyContent = "center";
        document.getElementById("logout-text").style.visibility = "hidden";
        document.getElementById("logout-text").style.display = "none";   
    }
});

  
$('#main-content').click(function() {
    let body_width = document.getElementById("body").offsetWidth;
    let sidebar_width = document.getElementById("sidebar").offsetWidth;
  
    if( body_width <= 768 && sidebar_width == 290 ) {
        document.getElementById("sidebar").style.width = "100px";
        document.getElementById("sidebar").style.left = "-100px";
    }  else if( body_width > 768 && sidebar_width == 290 ) {
        document.getElementById("main-content").style.marginLeft = "100px";
        document.getElementById("sidebar").style.width = "100px";
        document.getElementById("tupc-text").style.visibility = "hidden";
        document.getElementById("nurse-name").style.visibility = "hidden";
        document.getElementById("home-wrapper").style.justifyContent = "center";
        document.getElementById("home-text").style.visibility = "hidden";
        document.getElementById("home-text").style.display = "none";
        document.getElementById("profile-wrapper").style.justifyContent = "center";
        document.getElementById("profile-text").style.visibility = "hidden";
        document.getElementById("profile-text").style.display = "none";
        document.getElementById("download-wrapper").style.justifyContent = "center";
        document.getElementById("download-text").style.visibility = "hidden";
        document.getElementById("download-text").style.display = "none";
        document.getElementById("logout-wrapper").style.justifyContent = "center";
        document.getElementById("logout-text").style.visibility = "hidden";
        document.getElementById("logout-text").style.display = "none";  
    }
});
  
    
// Get the applicant ID
function getid(e) {
    let a = e.id;

    if ( a == 'update-form-medical' ) {
        let input_tags = document.getElementById('medical-form').getElementsByTagName("input");
        let select_tag = document.getElementById('medical-form').getElementsByTagName("select");

        select_tag[0].disabled = false;
        input_tags[2].removeAttribute('disabled', '');
        input_tags[3].style.display = "inline-block";
        input_tags[4].style.display = "inline-block";
    }
}
  

function hidebtn(b) {
    let a = b.parentNode.id;

    if ( a == 'medical-form' ) {
        let input_tags = document.getElementById(a).getElementsByTagName("input");
        let select_tag = document.getElementById(a).getElementsByTagName("select");

        select_tag[0].disabled = true;    
        input_tags[2].setAttribute('disabled', '');
        input_tags[3].style.display = "none";
        input_tags[4].style.display = "none";
    }
}

$('#id_medical_file').change(function() {
    var file = $('#id_medical_file')[0].files[0];
    document.getElementById("id_medical_filename").value = file.name;
});
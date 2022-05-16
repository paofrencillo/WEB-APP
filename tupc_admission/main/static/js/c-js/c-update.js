
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
          document.getElementById("coordinator-name").style.visibility = "visible";
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
          document.getElementById("coordinator-name").style.visibility = "hidden";
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
          document.getElementById("coordinator-name").style.visibility = "visible";
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
          document.getElementById("coordinator-name").style.visibility = "hidden";
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
      document.getElementById("coordinator-name").style.visibility = "hidden";
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
      document.getElementById("coordinator-name").style.visibility = "hidden";
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

    if  ( a == 'update-form-reqs' ) {
        let select_tags = document.getElementById('reqs-form').getElementsByTagName("select");
        let buttons = document.getElementById('reqs-form').getElementsByTagName("input");

        for ( let i=0; i < select_tags.length; i++ ) {
            select_tags[i].disabled = false;         
        }

        for ( let j=1; j < buttons.length; j++ ) {
            buttons[j].style.display = "inline-block";
        }

    } else if ( a == 'update-form-exam' ) {
        let input_tags = document.getElementById('exam-form').getElementsByTagName("input");
        let select_tag = document.getElementById('exam-form').getElementsByTagName("select");

        for ( let i=1; i < input_tags.length - 2; i++ ) {
             if ( i == 3 ) {
                 // pass
             } else {
                input_tags[i].removeAttribute('readonly', '');  
             }            
        }

        document.getElementById("div_id_time_taken").style.display = "block"
        document.getElementById("div_id_time_finished").style.display = "block"

        input_tags[2].type = "date";
        input_tags[6].type = "number";

        select_tag[0].disabled = false;

        for ( let j=7; j < input_tags.length; j++ ) {
            input_tags[j].style.display = "inline-block";
        }
    }
}

function hidebtn(b) {
    let btn = document.getElementsByClassName("btn");

    for ( let i = 0; i < btn.length; i++ ) {
        btn[i].style.display = 'none';
    }

    let e = b.parentNode.id;

    if  ( e == 'reqs-form' ) {
        let select_tags = document.getElementById(e).getElementsByTagName("select");

        for ( let i=0; i < select_tags.length; i++ ) {
            select_tags[i].disabled = true;         
        }

    } else if ( e == 'exam-form' ) {
        let input_tags = document.getElementById(e).getElementsByTagName("input");
        let select_tag = document.getElementById(e).getElementsByTagName("select");

        for ( let i=1; i < input_tags.length - 2; i++ ) {
             if ( i == 3 ) {
                 // pass
             } else {
                input_tags[i].setAttribute('readonly', '');  
             }            
        }

        document.getElementById("div_id_time_taken").style.display = "none"
        document.getElementById("div_id_time_finished").style.display = "none"

        input_tags[2].type = "text";
        input_tags[6].type = "text";

        select_tag[0].disabled = true;
    }
}

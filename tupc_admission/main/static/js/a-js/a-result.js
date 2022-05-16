
let remarks_boxes = document.getElementsByClassName("remarks-box");

for( let b of remarks_boxes ) {
    if( b.innerText == 'FAILED') {
        b.style.fontWeight = "1000";
        b.style.width = "fit-content";
        b.style.padding = "5px 15px 5px 15px";
        b.style.borderRadius = "10px";
        b.style.textAlign = "center";
        b.style.backgroundColor = "rgb(236, 168, 176)";
    } else if( b.innerText == 'PASSED') {
        b.style.fontWeight = "1000";
        b.style.width = "fit-content";
        b.style.padding = "5px 15px 5px 15px";
        b.style.borderRadius = "10px";
        b.style.textAlign = "center";
        b.style.backgroundColor = "rgb(133, 221, 133)";
    }
}

let results = document.getElementsByClassName("results")

for( let i=0; i < results.length - 1; i++ ) {
    if( results[i].innerText == 'PASSED' ) {
        results[i].style.fontWeight = '1000';
        results[i].style.width = 'fit-content';
        results[i].style.padding = '5px 15px 5px 15px';
        results[i].style.borderRadius = '10px';
        results[i].style.textAlign = 'center';
        results[i].style.backgroundColor = 'rgb(133, 221, 133)';
    } else if( results[i].innerText == 'FAILED' ) {
        results[i].style.fontWeight = '1000';
        results[i].style.width = 'fit-content';
        results[i].style.padding = '5px 15px 5px 15px';
        results[i].style.borderRadius = '10px';
        results[i].style.textAlign = 'center';
        results[i].style.backgroundColor = 'rgb(221, 133, 133)';
    }
    else if( results[i].innerText == 'No Result' ) {
        results[i].style.fontWeight = '1000';
        results[i].style.width = 'fit-content';
        results[i].style.padding = '5px 15px 5px 15px';
        results[i].style.borderRadius = '10px';
        results[i].style.textAlign = 'center';
        results[i].style.backgroundColor = 'rgb(200, 200, 200)';
    }
}

let rr = document.getElementById("req-result");
if( rr.innerText == 'COMPLETE' ) {
    rr.style.fontWeight = '1000';
    rr.style.width = 'fit-content';
    rr.style.padding = '5px 15px 5px 15px';
    rr.style.borderRadius = '10px';
    rr.style.textAlign = 'center';
    rr.style.backgroundColor = 'rgb(133, 221, 133)';
} else if ( rr.innerText == 'INCOMPLETE' ) {
    rr.style.fontWeight = '1000';
    rr.style.width = 'fit-content';
    rr.style.padding = '5px 15px 5px 15px';
    rr.style.borderRadius = '10px';
    rr.style.textAlign = 'center';
    rr.style.backgroundColor = 'rgb(225, 140, 133)';
}

for( let x of document.getElementsByClassName('submitted-box')) {
    if( x.innerText == ' SUBMITTED' ) {
        x.style.fontWeight = '1000';
        x.style.width = 'fit-content';
        x.style.padding = '5px 15px 5px 15px';
        x.style.borderRadius = '10px';
        x.style.textAlign = 'center';
        x.style.backgroundColor = 'rgb(164, 237, 164)';
    } else if ( x.innerText == ' NOT YET SUBMITTED' ) {
        x.style.fontWeight = '1000';
        x.style.width = 'fit-content';
        x.style.padding = '5px 15px 5px 15px';
        x.style.borderRadius = '10px';
        x.style.textAlign = 'center';
        x.style.backgroundColor = 'rgb(237, 164, 164)';
    }
}

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
            document.getElementById("applicant-name").style.visibility = "visible";
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
            document.getElementById("applicant-name").style.visibility = "hidden";
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
            document.getElementById("applicant-name").style.visibility = "visible";
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
            document.getElementById("applicant-name").style.visibility = "hidden";
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
        document.getElementById("applicant-name").style.visibility = "hidden";
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
        document.getElementById("applicant-name").style.visibility = "hidden";
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

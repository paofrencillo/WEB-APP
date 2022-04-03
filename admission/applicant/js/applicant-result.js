function hamburgerToggle() {
    let body_width = document.getElementById("body").offsetWidth;
    
    if ( body_width <= 768 ) {
        document.getElementById("sidebar").style.left= "0px";
    } else if ( body_width <= 892 ) {
        document.getElementById("fullname").style.display = "none";
    } else if ( body_width != 892 ) {
        document.getElementById("fullname").style.display = "inline";
    }


    let x = document.getElementById("sidebar").offsetWidth;

    if ( x == "100" ) {
        document.getElementById("sidebar").style.width = "290px";
        document.getElementById("main-content").style.marginLeft = "290px";
    
        if ( document.getElementById("sidebar").style.width == "290px" ) {
            document.getElementById("sidebar-brand").style.color = "white";
            document.getElementById("applicant-name-wrapper").style.whiteSpace = "normal";
            document.getElementById("applicant-name").style.color = "white";
            document.getElementById("download-text").style.color = "white";
            document.getElementById("logout-text").style.color = "white";
            
            document.getElementById("download-wrapper").style.justifyContent = "start";
            document.getElementById("logout-wrapper").style.justifyContent = "start";
            document.getElementById("download-text").style.display = "inline";
            document.getElementById("logout-text").style.display = "inline";
            
            if ( body_width <= 768 ) {
                document.getElementById("close-btn").style.display = "block";
            } 
        }
    }

    else if ( x == "290" ) {
        document.getElementById("sidebar").style.width = "100px";
        document.getElementById("main-content").style.marginLeft = "100px";

        if ( document.getElementById("sidebar").style.width == "100px" ) {
            document.getElementById("sidebar-brand").style.color = "#a7545c";
            document.getElementById("applicant-name").style.color = "#a7545c";
            document.getElementById("applicant-name-wrapper").style.whiteSpace = "nowrap";
            document.getElementById("download-text").style.color = "#a7545c";
            document.getElementById("logout-text").style.color = "#a7545c";
            document.getElementById("download-wrapper").style.justifyContent = "center";
            document.getElementById("logout-wrapper").style.justifyContent = "center";
            document.getElementById("download-text").style.display = "none";
            document.getElementById("logout-text").style.display = "none";

            if (body_width <= 768 ) {
                document.getElementById("close-btn").style.display = "none";
            }
        }
    }
}

function closeBtn() {
    let body_width = document.getElementById("main-content").offsetWidth;

    document.getElementById("sidebar").style.width = "100px";
    document.getElementById("main-content").style.marginLeft = "100px";
    document.getElementById("sidebar-brand").style.color = "#a7545c";
    document.getElementById("applicant-name").style.color = "#a7545c";
    document.getElementById("applicant-name-wrapper").style.whiteSpace = "nowrap";
    document.getElementById("download-text").style.color = "#a7545c";
    document.getElementById("logout-text").style.color = "#a7545c";
    document.getElementById("download-wrapper").style.justifyContent = "center";
    document.getElementById("logout-wrapper").style.justifyContent = "center";
    document.getElementById("download-text").style.display = "none";
    document.getElementById("logout-text").style.display = "none";
    document.getElementById("close-btn").style.display = "none"

    if ( body_width <= 768 ) {
        document.getElementById("main-content").style.marginLeft = "100px";
        document.getElementById("sidebar").style.left= "-100px";
        
    }
}

//search table
function tableSearch() {
  let input, filter, table, tr, td, txtValue;
  input = document.getElementById("search-input");
  filter = input.value.toUpperCase();
  table = document.getElementById("nurse-table");
  tr = table.getElementsByTagName('tr');

  for(let i = 0; i < tr.length; i++){
    td = tr[i].getElementsByTagName('td')[1]
    if(td) {
      txtValue = td.textContent || td.innerText;
      if(txtValue.toUpperCase().indexOf(filter) > -1){
        tr[i].style.display = "";
      }
      else {
        tr[i].style.display = "none";
      }
    }
  }
}

function hamburgerToggle() {
  let body_width = document.getElementById("body").offsetWidth;
  let sidebar_width = document.getElementById("sidebar").offsetWidth;

  if ( body_width <= 656 ) {
    document.getElementById("sidebar").style.left= "0px";
  }

  if ( sidebar_width == 100 ) {
    document.getElementById("close-btn").style.display = "inline";
    document.getElementById("sidebar").style.width = "290px";
    document.getElementById("tupc-text").style.visibility = "visible";
    document.getElementById("nurse-name").style.visibility = "visible";
    document.getElementById("download-text").style.color = "white";
    document.getElementById("logout-text").style.color = "white";
    document.getElementById("download-text").style.display = "inline";
    document.getElementById("logout-text").style.display = "inline";
    document.getElementById("download-wrapper").style.justifyContent = "start";
    document.getElementById("logout-wrapper").style.justifyContent = "start";
  }
}

function closeBtn() {
  let body_width = document.getElementById("body").offsetWidth;
  let sidebar_width = document.getElementById("sidebar").offsetWidth;
    
  if ( sidebar_width == 290 && body_width <= 656 ) {
    document.getElementById("sidebar").style.width = "100px"
    document.getElementById("sidebar").style.left = "-100px";
  }

  document.getElementById("close-btn").style.display = "none";
  document.getElementById("sidebar").style.width = "100px";
  document.getElementById("tupc-text").style.visibility = "hidden";
  document.getElementById("nurse-name").style.visibility = "hidden";
  document.getElementById("download-text").style.color = "#a7545c";
  document.getElementById("logout-text").style.color = "#a7545c";
  document.getElementById("download-text").style.display = "none";
  document.getElementById("logout-text").style.display = "none";
  document.getElementById("download-wrapper").style.justifyContent = "center";
  document.getElementById("logout-wrapper").style.justifyContent = "center";
}

//select course
var rows = $("#tabledata tr");
$("#select-course").on("change", function() {
    var selected = this.value;
    if (selected != "All") {
        rows.filter("[course=" + selected + "]").show();
        rows.not("[course=" + selected + "]").hide(); 
    } else {
        rows.show();
    }
});

//select file
$(document).ready(function() {
  $('input[type="file"]').change(function(e){
      filename = e.target.files[0].name;
  });
});

// show/hide hamburger icon
$(window).resize(function() {
  let body_width = document.getElementById("body").offsetWidth;

  if ( body_width <= 656 ) {
    document.getElementById("hamburger").style.display = "inline";
  } else if ( body_width > 656 ) {
    document.getElementById("hamburger").style.display = "none";
  }
});

// Change the modal-title when update button was clicked
$('.update-btn').on('click', function() {
  let name = this.parentNode.parentNode.childNodes[3].innerHTML;
  console.log(name);
  document.getElementById('modal-title').innerText = name;
});




let studentData = [
  {id: '1', edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)"></i>',
  name:'Frencillo, Paolo', course:'BET-COET',room:'209', date:'<input type="date" disabled>',
  time:'<div><input type="time" disabled> to <input type="time" disabled></div>',exam:'0', exresult:'passed'},
  {id: '2', edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)"></i>',
  name:'Paanod, Cefrin', course:'BET-ESET',room:'118', date:'<input type="date" disabled>',
  time:'<div><input type="time" disabled> to <input type="time" disabled></div>', exam:'0', exresult:'failed'},
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)"></i>',
  name:'Kilario, Roni', course:'BSCE',room:'159', date:'<input type="date" disabled>',
  time:'<div><input type="time" disabled> to <input type="time" disabled></div>', exam:'0', exresult:'undefined'},
  {id: '3', edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)"></i>',
  name:'Monataril, VJ', course:'BET-COET',room:'185', date:'<input type="date" disabled>', time:'<div><input type="time" disabled> to <input type="time" disabled></div>', exam:'0', exresult:'PASSED'},
];

loadTableData(studentData)
//insert data function
function loadTableData(studentData) {
  const tableBody = document.getElementById('tabledata');
  let dataHtml = '';

  for ( let student of studentData ) {
    if ( student.exresult == 'passed' ) {
      dataHtml += `<tr course = "${student.course}" id="${student.id}">
                  <td>${student.edit}</td> 
                  <td>${student.name}</td>
                  <td>${student.course}</td>
                  <td>${student.room}</td>
                  <td>${student.date}</td>
                  <td>${student.time}</td>
                  <td>${student.exam}</td>
                  <td class="passed">PASSED</td>
                  </tr>`;
    } else if ( student.exresult == 'failed' ) {
      dataHtml += `<tr course = "${student.course}" id="${student.id}">
                  <td>${student.edit}</td> 
                  <td>${student.name}</td>
                  <td>${student.course}</td>
                  <td>${student.room}</td>
                  <td>${student.date}</td>
                  <td>${student.time}</td>
                  <td>${student.exam}</td>
                  <td class="failed">FAILED</td>
                  </tr>`;
    } else if ( student.exresult == 'undefined' ) 
      dataHtml += `<tr course = "${student.course}" id="${student.id}">
                  <td>${student.edit}</td> 
                  <td>${student.name}</td>
                  <td>${student.course}</td>
                  <td>${student.room}</td>
                  <td>${student.date}</td>
                  <td>${student.time}</td>
                  <td>${student.exam}</td>
                  <td class="undefined">-</td>
                  </tr>`;
    }
  tableBody.innerHTML = dataHtml
}

var rowId = undefined;
var data = undefined;
var input_tags = undefined;
var selected_row_data  = {id: '',
                          room: '',
                          date: '',
                          time: '',
                          score: '',
                          result: ''}
// When edit icon is pressed, this will execute
function editFunction(event) {
  // Get the ID of the row
  rowId = event.target.parentNode.parentNode.id;
  data = document.getElementById(rowId).querySelectorAll("td");

  if ( event.target ) {
    // Change the border of selected row
    document.getElementById(rowId).style.border = "3px solid red";
    // Save and Cancel icons
    data[0].innerHTML='<i class="bi bi-save" data-toggle="tooltip" data-placement="top"title="Save changes"\
                      onclick="saveFunction()"></i>&nbsp&nbsp<span><i class="bi bi-x" data-toggle="tooltip"\
                      data-placement="top" title="Cancel" onclick="cancelFunction()"></i></span>';
    
    input_tags = document.getElementById(rowId).querySelectorAll("input");

    for ( var i = 0; i < input_tags.length; i++ ) {
      input_tags[i].disabled = false;
    }

    // Set the values in selected_row_data Object(dictionary)
    selected_row_data.id = rowId;
    selected_row_data.room = data[3].innerHTML;
    selected_row_data.date = input_tags[0].value;
    selected_row_data.time = input_tags[1].value + ' to ' + input_tags[2].value;
    selected_row_data.score = data[6].innerHTML;
    selected_row_data.result = data[7].id;
  
    console.log(selected_row_data);

    data[3].contentEditable = true;
    data[6].contentEditable = true;


    if ( data[7].className == 'passed' ) {
      data[7].innerHTML = '<div class="passedorfailed"><input type="button" id="passed-btn" value="PASSED" disabled>\
                          <span><i class="bi bi-x-circle" id="change-result" onclick="changeResult()"></i></span></div>';
    } else if ( data[7].className == 'failed' ) {
      data[7].innerHTML = '<div class="passedorfailed"><input type="button" id="failed-btn" value="FAILED" disabled>\
                          <span><i class="bi bi-x-circle" id="change-result" onclick="changeResult()"></i></span></div>';
    } else if ( data[7].className == 'undefined' ) {
      data[7].innerHTML = '<div class="passedorfailed"><input type="button" id="passed-btn" value="PASSED" onclick="passed()">\
                          <input type="button" id="failed-btn" value="FAILED" onclick="failed()"></div>';
    }

    // Remove the onclick attribute on other edit icon in other rows
    var rows = document.getElementsByTagName("tr");
    for ( var i = 1; i < rows.length; i++ ) {
      if ( rows[i].id != rowId ){
        rows[i].firstElementChild.firstElementChild.removeAttribute("onclick");
      }
    }
  }
}

function passed() {
  // id passed is selected, the id of the selected td will change to 'passed'
  data[7].className = 'passed';
  // selected_row_data.file = data[5].id;
  data[7].innerHTML = '<div class="passedorfailed"><input type="button" id="passed-btn" value="PASSED" disabled>\
                      <span><i class="bi bi-x-circle" id="change-result" onclick="changeResult()"></i></span></div>';
}

function failed() {
  // id passed is selected, the id of the selected td will change to 'passed'
  data[7].className = 'failed';
  // Set the values in selected_row_data Object(dictionary)
  data[7].innerHTML = '<div class="passedorfailed"><input type="button" id="failed-btn" value="FAILED" disabled>\
                      <span><i class="bi bi-x-circle" id="change-result" onclick="changeResult()"></i></span></div>';
}

function changeResult() {
  data[7].innerHTML = '<div class="passedorfailed"><input type="button" id="passed-btn" value="PASSED" onclick="passed()">\
                      <input type="button" id="failed-btn" value="FAILED" onclick="failed()"></div>';
}

function saveFunction() {
  // Get the values for data to save
  var saved_data  = {id: '',
                    room: '',
                    date: '',
                    time: '',
                    score: '',
                    result: ''}

  saved_data.id = rowId;
  saved_data.room = data[3].innerHTML;
  saved_data.date = input_tags[0].value;
  saved_data.time = input_tags[1].value + ' to ' + input_tags[2].value;
  saved_data.score = data[6].innerHTML;
  saved_data.result = data[7].className;

  // Custom buttons according to result
  if ( saved_data.result == 'passed' ) {
    data[7].innerHTML = 'PASSED';
  } else if ( saved_data.result == 'failed' ) {
    data[7].innerHTML = 'FAILED';
  } else if ( saved_data.result == 'undefined' ) {
    data[7].innerHTML = '-';
  }

  // Set the row into its default properties
  document.getElementById(rowId).style.border= "none";
  data[0].innerHTML = '<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row"\
                      onclick="editFunction(event)"></i>';

  // Disable input tags
  for ( var i = 0; i < input_tags.length; i++ ) {
    input_tags[i].disabled = true;
  }

  data[3].contentEditable = false;
  data[6].contentEditable = false;

  // Return the onclick attribute on every edit icon
  let rows = document.getElementsByTagName("tr");
  for (let i = 1; i < rows.length; i++) { 
      rows[i].firstElementChild.firstElementChild.setAttribute("onclick", "editFunction(event)");
  }
  // Set the global variable rowId to undefined and blank
  rowId = undefined;
  data = undefined;
  input_tags = undefined;
  selected_row_data  = {id: '',
                        room: '',
                        date: '',
                        time: '',
                        score: '',
                        result: ''}
  console.log(saved_data);
  saved_data  = {id: '',
                    room: '',
                    date: '',
                    time: '',
                    score: '',
                    result: ''}
}

function cancelFunction() {
  // Return stored data if user cancels the edit
  if ( selected_row_data.result == 'passed' ) {
    data[7].className = 'passed';
    data[7].innerHTML = 'PASSED';
  } else if ( selected_row_data.result == 'failed' ) {
    data[7].className = 'failed';
    data[7].innerHTML = 'FAILED';
  } else if ( selected_row_data.result == 'undefined' ) {
    data[7].className = 'undefined';
    data[7].innerHTML = '-';
  }

  // Disable the input tags
  for ( var i = 0; i < input_tags.length; i++ ) {
    input_tags[i].disabled = false;
  }

  // Return the previous id of the result table data
  data[7].className = selected_row_data.result;
  // Set the row into its default properties
  document.getElementById(rowId).style.border= "none";
  data[0].innerHTML = '<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)"></i>';

  // Return the onclick attribute on every edit icon
  let rows = document.getElementsByTagName("tr");
  for (let i = 1; i < rows.length; i++) { 
      rows[i].firstElementChild.firstElementChild.setAttribute("onclick", "editFunction(event)");
  }

  data[3].contentEditable = false;
  data[6].contentEditable = false;
  // Set the global variable rowId to undefined and blank
  rowId = undefined;
  data = undefined;
  selected_row_data  = {id: '',
                        room: '',
                        date: '',
                        time: '',
                        score: '',
                        result: ''}
}

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
$(document).ready(function(){
  $('input[type="file"]').change(function(e){
      filename = e.target.files[0].name;
  });
});

function hamburgerToggle() {
  let body_width = document.getElementById("body").offsetWidth;
  let sidebar_width = document.getElementById("sidebar").offsetWidth;

  if ( body_width <= 656 ) {
    document.getElementById("sidebar").style.left= "0px";
  }

  if ( sidebar_width == 100 ) {
    document.getElementById("close-btn").style.display = "inline";
    document.getElementById("sidebar").style.width = "290px";
    document.getElementById("sidebar-brand").style.color = "white";
    document.getElementById("coor-name").style.color = "white";
    document.getElementById("download-text").style.color = "white";
    document.getElementById("logout-text").style.color = "white";
    document.getElementById("overview-text").style.color = "white";
    document.getElementById("exam-details-text").style.color = "white";
    document.getElementById("download-text").style.display = "inline";
    document.getElementById("logout-text").style.display = "inline";
    document.getElementById("overview-text").style.display = "inline";
    document.getElementById("exam-details-text").style.display = "inline";
    document.getElementById("download-wrapper").style.justifyContent = "start";
    document.getElementById("logout-wrapper").style.justifyContent = "start";
    document.getElementById("overview-wrapper").style.justifyContent = "start";
    document.getElementById("exam-details-wrapper").style.justifyContent = "start";
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
  document.getElementById("sidebar-brand").style.color = "#a7545c";
  document.getElementById("coor-name").style.color = "#a7545c";
  document.getElementById("download-text").style.display = "none";
  document.getElementById("logout-text").style.display = "none";
  document.getElementById("overview-text").style.display = "none";
  document.getElementById("exam-details-text").style.display = "none";
  document.getElementById("download-wrapper").style.justifyContent = "center";
  document.getElementById("logout-wrapper").style.justifyContent = "center";
  document.getElementById("overview-wrapper").style.justifyContent = "center";
  document.getElementById("exam-details-wrapper").style.justifyContent = "center";
}
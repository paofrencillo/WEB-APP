
let studentData = [
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)"></i>',
  name:'Frencillo, Paolo', number:'0165', course:'BET-COET', email:'pao@gmail.com',
  mresult: 'PASSED',
  file:'<input type="file" accept=".pdf" disabled></input>'},
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)"></i>',
  name:'Paanod, Cefrin', number:'0185', course:'BET-ESET', email:'cef@gmail.com',
  mresult: 'PASSED',
  file:'<input type="file" accept=".pdf" disabled></input>'},
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)"></i>',
  name:'Montaril, Vincent Jake', number:'0175', course:'BET-PPET', email:'monta@gmail.com',
  mresult: 'undefined',
  file:'<input type="file" accept=".pdf" disabled></input>'},
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)"></i>',
  name:'Kilario, Roniel', number:'0195', course:'BSME', email:'kilario@gmail.com',
  mresult: 'undefined',
  file:'<input type="file" accept=".pdf" disabled></input>'},
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)"></i>',
  name:'Fetalbo, Dominic', number:'0155', course:'BET-COET', email:'Fetable@gmail.com',
  mresult: 'FAILED',
  file:'<input type="file" accept=".pdf" disabled></input>'}
];

loadTableData(studentData)
//insert data function
function loadTableData(studentData) {
  const tableBody = document.getElementById('tabledata');
  let dataHtml = '';

  for ( let student of studentData ) {
    if ( student.mresult == 'FAILED' ) {
      dataHtml += `<tr course = "${student.course}" id="${student.number}">
                  <td>${student.edit}</td> 
                  <td>${student.name}</td>
                  <td>${student.number}</td>
                  <td>${student.course}</td>
                  <td>${student.email}</td>
                  <td class="failed">FAILED</td>
                  <td class="inputfile">${student.file}</td>
                  </tr>`;
    }

    else if ( student.mresult == 'PASSED' ) {
      dataHtml += `<tr course = "${student.course}" id="${student.number}">
                <td>${student.edit}</td> 
                <td>${student.name}</td>
                <td>${student.number}</td>
                <td>${student.course}</td>
                <td>${student.email}</td>
                <td class="passed">PASSED</td>
                <td class="inputfile">${student.file}</td>
                </tr>`;

    } else if ( student.mresult == 'undefined' ) {
       dataHtml += `<tr course = "${student.course}" id="${student.number}">
                  <td>${student.edit}</td> 
                  <td>${student.name}</td>
                  <td>${student.number}</td>
                  <td>${student.course}</td>
                  <td>${student.email}</td>
                  <td class="undefined">-</td>
                  <td class="inputfile">${student.file}</td>
                  </tr>`;
    }
  }
  tableBody.innerHTML = dataHtml
}

var rowId = undefined;
var data = undefined;
var filename = undefined;
var pf_btns = undefined;
var selected_row_data  = {id: '',
                          result: '',
                          file: ''}

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
    
    pf_btns = data[5].querySelectorAll("input")

    for ( var i = 0; i < data[5].querySelectorAll("input").length; i++ ) {
      pf_btns[i].disabled = false;
    }
  
    data[6].childNodes[0].disabled = false;

    // Set the values in selected_row_data Object(dictionary)
    selected_row_data.id = rowId;
    selected_row_data.result = data[5].className;
    selected_row_data.file = data[6].value;
  
    console.log(selected_row_data);

    if ( data[5].className == 'passed' ) {
      data[5].innerHTML = '<div class="passedorfailed"><input type="button" id="passed-btn" value="PASSED" disabled>\
                          <span><i class="bi bi-x-circle" id="change-result" onclick="changeResult()"></i></span></div>';
    } else if ( data[5].className == 'failed' ) {
      data[5].innerHTML = '<div class="passedorfailed"><input type="button" id="failed-btn" value="FAILED" disabled>\
                          <span><i class="bi bi-x-circle" id="change-result" onclick="changeResult()"></i></span></div>';
    } else if ( data[5].className == 'undefined' ) {
      data[5].innerHTML = '<div class="passedorfailed"><input type="button" id="passed-btn" value="PASSED" onclick="passed()">\
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
  data[5].className = 'passed';
  // selected_row_data.file = data[5].id;
  data[5].innerHTML = '<div class="passedorfailed"><input type="button" id="passed-btn" value="PASSED" disabled>\
                      <span><i class="bi bi-x-circle" id="change-result" onclick="changeResult()"></i></span></div>';
}

function failed() {
  // id passed is selected, the id of the selected td will change to 'passed'
  data[5].className = 'failed';
  // Set the values in selected_row_data Object(dictionary)
  data[5].innerHTML = '<div class="passedorfailed"><input type="button" id="failed-btn" value="FAILED" disabled>\
                      <span><i class="bi bi-x-circle" id="change-result" onclick="changeResult()"></i></span></div>';
}

function changeResult() {
  data[5].innerHTML = '<div class="passedorfailed"><input type="button" id="passed-btn" value="PASSED" onclick="passed()">\
                      <input type="button" id="failed-btn" value="FAILED" onclick="failed()"></div>';
}

function saveFunction() {
  // Get the values for data to save
  saved_data = {id: '',
                result: '',
                file: ''}

  saved_data.id = rowId;
  saved_data.result = data[5].id;
  saved_data.file = filename;

  // Custom buttons according to result
  if ( saved_data.result == 'passed' ) {
    data[5].innerHTML = 'PASSED';
  } else if ( saved_data.result == 'failed' ) {
    data[5].innerHTML = 'FAILED';
  } else if ( saved_data.result == 'undefined' ) {
    data[5].innerHTML = '-';
  }

  data[6].childNodes[0].disabled = true;

  // Set the row into its default properties
  document.getElementById(rowId).style.border= "none";
  data[0].innerHTML = '<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row"\
                      onclick="editFunction(event)"></i>';

  // Return the onclick attribute on every edit icon
  let rows = document.getElementsByTagName("tr");
  for (let i = 1; i < rows.length; i++) { 
      rows[i].firstElementChild.firstElementChild.setAttribute("onclick", "editFunction(event)");
  }
  // Set the global variable rowId to undefined and blank
  rowId = undefined;
  data = undefined;
  selected_row_data  = {id: '',
                        result: '',
                        file: ''}
  console.log(saved_data);
  saved_data = {id: '',
                result: '',
                file: ''}
}

function cancelFunction() {
  // Return stored data if user cancels the edit
  if ( selected_row_data.result == 'passed' ) {
    data[5].id = 'passed';
    data[5].innerHTML = 'PASSED';
  } else if ( selected_row_data.result == 'failed' ) {
    data[5].id = 'failed';
    data[5].innerHTML = 'FAILED';
  } else if ( selected_row_data.result == 'undefined' ) {
    data[5].id = 'undefined';
    data[5].innerHTML = '-';
  }

  // Disable the input tags
  for ( var i = 0; i < data[5].querySelectorAll("input").length; i++ ) {
    pf_btns[i].disabled = false;
  }

  data[6].childNodes[0].disabled = true;

  // Return the previous id of the result table data
  data[5].id = selected_row_data.result;

  if ( selected_row_data.file == undefined ) {
    data[6].childNodes[0].disabled = true;
  } else if ( selected_row_data.file != undefined ) {
    data[6].innerHTML = '<input type="file" accept=".pdf" id="fileupload" disabled></input>';
  }
  
  // Set the row into its default properties
  document.getElementById(rowId).style.border= "none";
  data[0].innerHTML = '<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)"></i>';

  // Return the onclick attribute on every edit icon
  let rows = document.getElementsByTagName("tr");
  for (let i = 1; i < rows.length; i++) { 
      rows[i].firstElementChild.firstElementChild.setAttribute("onclick", "editFunction(event)");
  }
  // Set the global variable rowId to undefined and blank
  rowId = undefined;
  data = undefined;
  selected_row_data  = {id: '',
                        result: '',
                        file: ''}
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
    document.getElementById("nurse-name").style.color = "white";
    document.getElementById("nurse-name").style.visibilty = "visible";
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
  document.getElementById("sidebar-brand").style.color = "#a7545c";
  document.getElementById("nurse-name").style.color = "#a7545c";
  document.getElementById("nurse-name").style.visibilty = "hidden";
  document.getElementById("download-text").style.color = "#a7545c";
  document.getElementById("logout-text").style.color = "#a7545c";
  document.getElementById("download-text").style.display = "none";
  document.getElementById("logout-text").style.display = "none";
  document.getElementById("download-wrapper").style.justifyContent = "center";
  document.getElementById("logout-wrapper").style.justifyContent = "center";
}
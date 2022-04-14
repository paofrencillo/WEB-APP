
//Student Info
var studentData = [
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
  name:'Montaril, Vincent Jake', number:'190187', course:'BET-COET', date:'<input type="date" id="190187" disabled>' , 
  venue:'Industrial Department', interviewer:'Ms.Dela cruz', iresult:'PASSED',},
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
  name:'Frencillo, Paolo', number:'190666', course:'BET-COET', date:'<input type="date" id="190666" disabled>', 
  venue:'Industrial Department', interviewer:'Ms.Dela cruz', iresult:'FAILED',},
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
  name:'Paanod, Cefrin', number:'190123', course:'BET-ESET', date:'<input type="date" id="190123" disabled>',
  venue:'Vulcanizing Department', interviewer:'Ms.Nalalabuan', iresult:'FAILED',}, 
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
  name:'Kilario, Roniel', number:'190321', course:'BET-PPET', date:'<input type="date" id="190321" disabled>', 
  venue:'TBA', interviewer:'Mr.Johnny Simp', iresult:'undefined',},
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
  name:'Curry, Steph', number:'190030', course:'BSCE', date:'<input type="date" id="190030" disabled>', 
  venue:'Engineering Department', interviewer:'Ms.Sana', iresult:'undefined',},
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
  name:'James, Lebron', number:'190623', course:'BSEE', date:'<input type="date" id="190623" disabled>', 
  venue:'Engineering Department', interviewer:'Ms.Sana', iresult:'FAILED',},
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
  name:'Lapu, Lapu', number:'190543', course:'BET-ET', date:'<input type="date" id="190543" disabled>', 
  venue:'Engineering Department', interviewer:'Ms.Sana', iresult:'PASSED',},
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
  name:'Layla, Smith', number:'190777', course:'BET-CT', date:'<input type="date" id="190777" disabled>', 
  venue:'Engineering Department', interviewer:'Ms.Sana', iresult:'PASSED',},
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
  name:'Bean, Johnny', number:'190888', course:'BET-MT', date:'<input type="date" id="190888" disabled>', 
  venue:'Engineering Department', interviewer:'Ms.Sana', iresult:'FAILED',},
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
  name:'Monk, Malik', number:'190697', course:'BET-AT', date:'<input type="date" id="190697" disabled>', 
  venue:'Engineering Department', interviewer:'Ms.Sana', iresult:'undefined',},
];

loadTableData(studentData)
//insert data function
function loadTableData(studentData) {
  const tableBody = document.getElementById('tabledata');
  let dataHtml = '';

  for ( let student of studentData ) {
    if ( student.iresult == 'FAILED' ) {
      dataHtml += `<tr course="${student.course}" id="${student.number}">
                  <td>${student.edit}</td>  
                  <td>${student.name}</td>
                  <td>${student.number}</td>
                  <td>${student.course}</td>
                  <td>${student.date}</td>
                  <td>${student.venue}</td>
                  <td>${student.interviewer}</td>
                  <td class="failed">FAILED</td>
                  </tr>`;
    } else if ( student.iresult == 'PASSED' ) {
      dataHtml += `<tr course="${student.course}" id="${student.number}">
                <td>${student.edit}</td>  
                <td>${student.name}</td>
                <td>${student.number}</td>
                <td>${student.course}</td>
                <td>${student.date}</td>
                <td>${student.venue}</td>
                <td>${student.interviewer}</td>
                <td class="passed">PASSED</td>
                </tr>`;

    } else if ( student.iresult == 'undefined' ) {
       dataHtml += `<tr course="${student.course}" id="${student.number}">
                  <td>${student.edit}</td>  
                  <td>${student.name}</td>
                  <td>${student.number}</td>
                  <td>${student.course}</td>
                  <td>${student.date}</td>
                  <td>${student.venue}</td>
                  <td>${student.interviewer}</td>
                  <td class="undefined">-</td>
                  </tr>`;
    }
  }
  tableBody.innerHTML = dataHtml
}

var rowId = undefined;
var data = undefined;
var selected_row_data  = {id: '',
                          date: '',
                          venue: '',
                          interviewer: '',
                          result: ''}
// When edit icon is pressed, this will execute
function editFunction(event) {
  if ( event.target ) {
    // Get the ID of the row
    rowId = event.target.parentNode.parentNode.id;
    // Change the Bg-color and font color of selected row
    document.getElementById(rowId).style.border = "3px solid red";
    // Get the value of the specific cells
    data = document.getElementById(rowId).querySelectorAll("td");
    var date = data[4].firstElementChild.value;
    var venue = data[5].innerHTML;
    var interviewer = data[6].innerHTML;
    var result = data[7].className;

    selected_row_data.id = rowId;
    selected_row_data.date = date;
    selected_row_data.venue = venue;
    selected_row_data.interviewer = interviewer;
    selected_row_data.result = result;
    console.log("Selected Row Data: ", selected_row_data);

    // Change the icon of the selected row
    data[0].innerHTML = '<i class="bi bi-save" data-toggle="tooltip" data-placement="top" title="Save changes" \
                      onclick="saveFunction()" ></i><span><i class="bi bi-x" data-toggle="tooltip" \
                      data-placement="top" title="Cancel" onclick="cancelFunction()"></i></span>';

    // Remove the onclick attribute on other edit icon in other rows
    var rows = document.getElementsByTagName("tr");
    for ( var i = 1; i < rows.length; i++ ) {
      if ( rows[i].id != rowId ){
        rows[i].firstElementChild.firstElementChild.removeAttribute("onclick");
      }
    }
  }
  // Passed anf Failed buttons
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

  // Set the attribute value of cells to edit
  data[4].firstElementChild.disabled = false;
  data[5].contentEditable = true;
  data[6].contentEditable = true;
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
  saved_data = {id: '',
                date: '',
                venue: '',
                interviewer: '',
                result: ''}

  saved_data.id = rowId;
  saved_data.date = data[4].firstElementChild.value;
  saved_data.venue = data[5].innerHTML;
  saved_data.interviewer = data[6].innerHTML;
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
  data[4].firstElementChild.disabled = true;
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
                        date: '',
                        venue: '',
                        interviewer: '',
                        result: ''}
  console.log(saved_data);
  saved_data = {id: '',
                date: '',
                venue: '',
                interviewer: '',
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
  data[4].firstElementChild.value = '';
  data[4].firstElementChild.disabled = true;

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
                        date: '',
                        venue: '',
                        interviewer: '',
                        result: ''}
}
//search table
function tableSearch() {
  let input, filter, table, tr, td, txtValue;

  input = document.getElementById("search-input");
  filter = input.value.toUpperCase();
  table = document.getElementById("interviewer-table");
  tr = table.getElementsByTagName('tr');

  for( let i = 0; i < tr.length; i++ ){
    td = tr[i].getElementsByTagName('td')[1]

    if ( td ) {
      txtValue = td.textContent || td.innerText;

      if( txtValue.toUpperCase().indexOf(filter) > -1 ){
        tr[i].style.display = "";
      } else {
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
    document.getElementById("interviewer-name").style.color = "white";
    document.getElementById("interviewer-name").style.visibilty = "visible";
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
  document.getElementById("interviewer-name").style.color = "#a7545c";
  document.getElementById("interviewer-name").style.visibilty = "hidden";
  document.getElementById("download-text").style.color = "#a7545c";
  document.getElementById("logout-text").style.color = "#a7545c";
  document.getElementById("download-text").style.display = "none";
  document.getElementById("logout-text").style.display = "none";
  document.getElementById("download-wrapper").style.justifyContent = "center";
  document.getElementById("logout-wrapper").style.justifyContent = "center";
}
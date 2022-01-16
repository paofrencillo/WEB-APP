var rowdata = undefined;
var a = undefined;
var filelists = [];
//JS FOR NURSE TABLE

//Student Info----
let studentData = [
  {name:'Frencillo, Paolo', number:'0165', course:'BET-COET', email:'pao@gmail.com', mresult:'', 
  file:'<input type="file" accept=".jpg, .png" id="fileupload" onclick="test(event)"></input>'},
  {name:'Paanod, Cefrin', number:'0185', course:'BET-ESET', email:'cef@gmail.com', mresult:'', 
  file:'<input type="file" accept=".jpg, .png" id="fileupload" onclick="test(event)"></input>'},
  {name:'Montaril, Vincent Jake', number:'0175', course:'BET-PPET', email:'monta@gmail.com', mresult:'', 
  file:'<input type="file" accept=".jpg, .png" id="fileupload"  onclick="test(event)"></input>'},
  {name:'Kilario, Roniel', number:'0195', course:'BSME', email:'kilario@gmail.com', mresult:'', 
  file:'<input type="file" accept=".jpg, .png" id="fileupload" onclick="test(event)"></input>'},
  {name:'Fetalbo, Dominic', number:'0155', course:'BET-COET', email:'Fetable@gmail.com', mresult:'', 
  file:'<input type="file" accept=".jpg, .png" id="fileupload" onclick="test(event)"></input>'},
  {name:'Lagasca, Neil', number:'0206', course:'BSME', email:'lagasca@gmail.com', mresult:'', 
  file:'<input type="file" accept=".jpg, .png" id="fileupload" onclick="test(event)"></input>'},
  {name:'Jean, Paul', number:'0211', course:'BET-CT', email:'paulpaul@gmail.com', mresult:'', 
  file:'<input type="file" accept=".jpg, .png" id="fileupload" onclick="test(event)"></input>'},
  {name:'Quiza, James', number:'0208', course:'BSIE-ICT', email:'jamesQ@gmail.com', mresult:'', 
  file:'<input type="file" accept=".jpg, .png" id="fileupload" onclick="test(event)"></input>'},
  {name:'Honor, Ranzel', number:'0215', course:'BTTE-E', email:'Honor@gmail.com', mresult:'', 
  file:'<input type="file" accept=".jpg, .png" id="fileupload" onclick="test(event)"></input>'},
  {name:'Xqc, Felix', number:'0225', course:'BSIE-ICT', email:'pepega@gmail.com', mresult:'', 
  file:'<input type="file" accept=".jpg, .png" id="fileupload" onclick="test(event)"></input>'}
];

loadTableData(studentData)



//insert data function
function loadTableData(studentData) {
  const tableBody = document.getElementById('tabledata');
  let dataHtml = '';

  for(let student of studentData) {
    dataHtml += `<tr course = "${student.course}" id="${student.number}" onclick="selectedrow(event)">
                  <td>${student.name}</td>
                  <td>${student.number}</td>
                  <td>${student.course}</td>
                  <td>${student.email}</td>
                  <td class="row-result">${student.mresult}</td>
                  <td class="inputfile">${student.file}</td>
                </tr>`;
  }

  tableBody.innerHTML = dataHtml
}

//highlight selected
highlight_row();
function highlight_row() {
    var table = document.getElementById('mytable');
    var cells = table.getElementsByTagName('td');

    for (var i = 0; i < cells.length; i++) {
        // Take each cell
        var cell = cells[i];
        // do something on onclick event for cell
        cell.onclick = function () {
            // Get the row id where the cell exists
            var rowId = this.parentNode.rowIndex;
            var rowsNotSelected = table.getElementsByTagName('tr');
            for (var row = 0; row < rowsNotSelected.length; row++) {
                rowsNotSelected[row].style.backgroundColor = "";
                rowsNotSelected[row].classList.remove('selected');
            }
            var rowSelected = table.getElementsByTagName('tr')[rowId];
            rowSelected.className += " selected";
        }
    }
}

//choose file
function test(event) {
  var rowId2 = event.target.parentNode.parentNode.id;
  if(event.target) {
    a = rowId2;
    console.log(a);
  }
}

//selected row function
function selectedrow(event) {
    var rowId = event.target.parentNode.id;
    if ( a == undefined) {
      rowdata = rowId;
    }
    else if ( a != undefined) {
      rowdata = a;
    }
    a = undefined;
    console.log(rowdata);
}

//pass-fail function
function clickedPassed() {
  if(rowdata != undefined) {
    //this gives id of table row whose button was clicked
    var data = document.getElementById(rowdata).querySelectorAll(".row-result");
    data[0].innerHTML = "PASSED";
  }
}
function clickedFailed() {
  if(rowdata != undefined) {
  //this gives id of table row whose button was clicked
  var data = document.getElementById(rowdata).querySelectorAll(".row-result"); 
  data[0].innerHTML = "FAILED";
  }
}

//search table
function tableSearch() {
  let input, filter, table, tr, td, txtValue;

  //initializing variables
  input = document.getElementById("myinput");
  filter = input.value.toUpperCase();
  table = document.getElementById("mytable");
  tr = table.getElementsByTagName('tr');

  for(let i = 0; i < tr.length; i++){
    td = tr[i].getElementsByTagName('td')[0]
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
      var fileName = e.target.files[0].name;
      filelists.push(fileName + ", " + rowdata);
      console.log(filelists);
  });
});
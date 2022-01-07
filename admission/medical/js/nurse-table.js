var rowdata = undefined;
var a = undefined;
//JS FOR NURSE TABLE

//Student Info----
let studentData = [
  {name:'Frencillo, Paolo', number:'0165', course:'BET-COET', email:'pao@gmail.com', mresult:'', 
  file:'<input type="file" accept=".jpg, .png" id="fileupload" onclick="test(event)"></input>'},
  {name:'Paanod, Cefrin', number:'0185', course:'BET-ESET', email:'cef@gmail.com', mresult:'', 
  file:'<input type="file" accept=".jpg, .png" id="fileupload" onclick="test(event)"></input>'},
  {name:'Montaril, Vincent Jake', number:'0175', course:'BET-PPET', email:'monta@gmail.com', mresult:'', 
  file:'<input type="file" accept=".jpg, .png" id="fileupload"  onclick="test(event)"></input>'},
  {name:'Kilario, Roniel', number:'0195', course:'BSCE', email:'kilario@gmail.com', mresult:'', 
  file:'<input type="file" accept=".jpg, .png" id="fileupload" onclick="test(event)"></input>'},
  {name:'Fetalbo, Dominic', number:'0155', course:'BET-COET', email:'Fetable@gmail.com', mresult:'', 
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
                  <td>${student.file}</td>
                </tr>`;
  }

  tableBody.innerHTML = dataHtml
}

//row selected
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
           // rowSelected.style.backgroundColor = "rgb(189, 32, 49)";
            rowSelected.className += " selected";

        }
    }
}

function test(event) {
  var rowId2 = event.target.parentNode.parentNode.id;
  if(event.target) {
    a = rowId2
    console.log(a)
  }
}


function selectedrow(event) {
    var rowId = event.target.parentNode.id;
    if ( a == undefined) {
      rowdata = rowId;
    }
    else if ( a != undefined) {
      rowdata = a;
    }
    a = undefined;
  //this gives id of tr whose button was clicked
  /*returns array of all elements with 
  "row-data" class within the row with given id*/
    console.log(rowdata);
}

//pass-fail function
function clickedPassed() {
  //this gives id of tr whose button was clicked
  var data = document.getElementById(rowdata).querySelectorAll(".row-result");

  data[0].innerHTML = "PASSED";
}

function clickedFailed() {
  //this gives id of tr whose button was clicked
  var data = document.getElementById(rowdata).querySelectorAll(".row-result"); 
  data[0].innerHTML = "FAILED";

}

//search table
function tableSearch() {
  let input, filter, table, tr, td, txtValue;

  input = document.getElementById("myinput");
  filter = input.value;
  table = document.getElementById("mytable");
  tr = table.getElementsByTagName('tr');

  for(let i = 0; i < tr.length; i++){
    td = tr[i].getElementsByTagName('td')[0]
    if(td) {
      txtValue = td.textContent || td.innerText;
      if(txtValue.indexOf(filter) > -1){
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

//pdf
var doc = new jsPDF();
var specialElementHandlers = {
    '#pdf': function (element, renderer) {
        return true;
    }
};

$('#pdfclick').click(function () {
    doc.fromHTML($('#tabledata tr').html(), 15, 15, {
        'width': 150,
            'elementHandlers': specialElementHandlers
    });
    doc.save('bokpdf.pdf');
});
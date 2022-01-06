var rowdata = undefined;
var a = undefined;

//Student Info
let studentData = [
  {cb:'<input type="checkbox" id="int-cb" name="cb" value="int-cb">',
  name:'Montaril, Vincent Jake', number:'190187', course:'BET-COET', email:'monta@gmail.com', date:'11/06/2021', 
  venue:'Industrial Department', interviewer:'Ms.Dela cruz', mresult:'',},
  {cb:'<input type="checkbox" id="int-cb" name="cb" value="int-cb">',
  name:'Frencillo, Paolo', number:'190666', course:'BET-COET', email:'pao@gmail.com', date:'11/06/2021', 
  venue:'Industrial Department', interviewer:'Ms.Dela cruz', mresult:'',},
  {cb:'<input type="checkbox" id="int-cb" name="cb" value="int-cb">',
  name:'Paanod, Cefrin', number:'190123', course:'BET-ESET', email:'cef@gmail.com', date:'11/10/2021', 
  venue:'Vulcanizing Department', interviewer:'Ms.Nalalabuan', mresult:'',},
  {cb:'<input type="checkbox" id="int-cb" name="cb" value="int-cb">',
  name:'Kilario, Roniel', number:'190321', course:'BET-PPET', email:'ron@gmail.com', date:'11/15/2021', 
  venue:'TBA', interviewer:'Mr.Johnny Simp', mresult:'',},
  {cb:'<input type="checkbox" id="int-cb" name="cb" value="int-cb">',
  name:'Curry, Steph', number:'190030', course:'BSCE', email:'step@gmail.com', date:'11/20/2021', 
  venue:'Engineering Department', interviewer:'Ms.Sana', mresult:'',},
  {cb:'<input type="checkbox" id="int-cb" name="cb" value="int-cb">',
  name:'James, Lebron', number:'190623', course:'BSCE', email:'bron@gmail.com', date:'11/20/2021', 
  venue:'Engineering Department', interviewer:'Ms.Sana', mresult:'',},
  
];

loadTableData(studentData)

//insert data function
function loadTableData(studentData) {
  const tableBody = document.getElementById('tabledata');
  let dataHtml = '';

  for(let student of studentData) {
    dataHtml += `<tr course = "${student.course}" id="${student.number}" onclick="selectedrow(event)">
                  <td>${student.cb}</td>  
                  <td>${student.name}</td>
                  <td>${student.number}</td>
                  <td>${student.course}</td>
                  <td>${student.email}</td>
                  <td>${student.date}</td>
                  <td>${student.venue}</td>
                  <td>${student.interviewer}</td>
                  <td class="row-result">${student.mresult}</td>
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
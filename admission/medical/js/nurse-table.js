var rowdata = undefined;
//JS FOR NURSE TABLE

//Student Info----
let studentData = [
  {name:'Frencillo, Paolo', number:'0165', course:'BET-COET', email:'pao@gmail.com', mresult:'', 
  file:'<input type="file" name="image" id="0165" onclick="test(event)"></input>'},
  {name:'Paanod, Cefrin', number:'0185', course:'BET-ESET', email:'cef@gmail.com', mresult:'', 
  file:'<input type="file" name="image" id="0185" onclick="test(event)"></input>'},
  {name:'Montaril, Vincent Jake', number:'0175', course:'BET-PPET', email:'monta@gmail.com', mresult:'', 
  file:'<input type="file" name="image" id="0175"  onclick="test(event)"></input>'},
  {name:'Kilario, Roniel', number:'0195', course:'BS Civil Engineering', email:'kilario@gmail.com', mresult:'', 
  file:'<input type="file" name="image" id="0195" onclick="test(event)"></input>'}
];

loadTableData(studentData)



//insert data function
function loadTableData(studentData) {
  const tableBody = document.getElementById('tabledata');
  let dataHtml = '';

  for(let student of studentData) {
    dataHtml += `<tr id="${student.number}" onclick="selectedrow(event)">
                  <td>${student.name}</td>
                  <td>${student.number}</td>
                  <td id="course">${student.course}</td>
                  <td>${student.email}</td>
                  <td class="row-result">${student.mresult}</td>
                  <td class="upload-file">${student.file}</td>
                </tr>`;
  }

  tableBody.innerHTML = dataHtml
}

//row selected
var table = document.getElementById('mytable'),
   selected = table.getElementsByClassName('selected');
table.onclick = highlight;

function highlight(e) {
   if (selected[0]) selected[0].className = '';
   e.target.parentNode.className = 'selected';
}

function selectedrow(event) {
    var rowId = event.target.parentNode.id;
  //this gives id of tr whose button was clicked
  /*returns array of all elements with 
  "row-data" class within the row with given id*/
    console.log(rowId);
    rowdata = rowId;
}


//pass-fail function
function clickedPassed() {
  //this gives id of tr whose button was clicked
  var data = document.getElementById(rowdata).querySelectorAll(".row-result");
  data[0].innerHTML = "PASSED";
}

function test(event) {
  var files = event.target.parentNode.parentNode.id;
  console.log(files);
}

function clickedFailed() {
  //this gives id of tr whose button was clicked
  var data = document.getElementById(rowdata).querySelectorAll(".row-result"); 
  data[0].innerHTML = "FAILED";

}

//search table
function tableSearch() {
  let input, filter, table, tr, td, i, txtValue;

  input = document.getElementById("myinput");
  filter = input.value;
  table = document.getElementById("mytable");
  tr = table.getElementsByTagName('tr');

  for(let i = 0; i < tr.length; i++){
    td = tr[i].getElementsByTagName('td')[1]
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
function onCourseSelected() {
  var course = document.getElementById("select-course").value;
  if (course == "course"){
    document.getElementById("course").style.display = ""
    document.getElementById("course").style.display = "none"
    document.getElementById("course").style.display = "none"
  }
  else {
    document.getElementById("course").style.display = "none"
    document.getElementById("course").style.display = "none"
    document.getElementById("course").style.display = ""
  }

}
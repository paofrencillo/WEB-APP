

var rowId = undefined;
var highlightedRow = undefined;
//Student Info
var studentData = [
  {edit:'<i class="bi bi-pencil-square" onclick="editFunction(event)" ></i>',
  name:'Montaril, Vincent Jake', number:'190187', course:'BET-COET', email:'monta@gmail.com', date:'<input type="date" id="190187" disabled>' , 
  venue:'Industrial Department', interviewer:'Ms.Dela cruz', result:'',},
  {edit:'<i class="bi bi-pencil-square" onclick="editFunction(event)" ></i>',
  name:'Frencillo, Paolo', number:'190666', course:'BET-COET', email:'pao@gmail.com', date:'<input type="date" id="190666" disabled>', 
  venue:'Industrial Department', interviewer:'Ms.Dela cruz', result:'',},
  {edit:'<i class="bi bi-pencil-square" onclick="editFunction(event)" ></i>',
  name:'Paanod, Cefrin', number:'190123', course:'BET-ESET', email:'cef@gmail.com', date:'<input type="date" id="190123" disabled>',
  venue:'Vulcanizing Department', interviewer:'Ms.Nalalabuan', result:'',}, 
  {edit:'<i class="bi bi-pencil-square" onclick="editFunction(event)" ></i>',
  name:'Kilario, Roniel', number:'190321', course:'BET-PPET', email:'ron@gmail.com', date:'<input type="date" id="190321" disabled>', 
  venue:'TBA', interviewer:'Mr.Johnny Simp', result:'',},
  {edit:'<i class="bi bi-pencil-square" onclick="editFunction(event)" ></i>',
  name:'Curry, Steph', number:'190030', course:'BSCE', email:'step@gmail.com', date:'<input type="date" id="190030" disabled>', 
  venue:'Engineering Department', interviewer:'Ms.Sana', result:'',},
  {edit:'<i class="bi bi-pencil-square" onclick="editFunction(event)" ></i>',
  name:'James, Lebron', number:'190623', course:'BSCE', email:'bron@gmail.com', date:'<input type="date" id="190623" disabled>', 
  venue:'Engineering Department', interviewer:'Ms.Sana', result:'',},
];

var selectedRowData = [
  {date:'', venue:'', interviewer:'', result:'' }
]

loadTableData(studentData)

//insert data function
function loadTableData(studentData) {
  const tableBody = document.getElementById('tabledata');
  let dataHtml = '';

  for(let student of studentData) {
    dataHtml += `<tr course = "${student.course}" id="${student.number}">
                  <td>${student.edit}</td>  
                  <td>${student.name}</td>
                  <td>${student.number}</td>
                  <td>${student.course}</td>
                  <td>${student.email}</td>
                  <td>${student.date}</td>
                  <td>${student.venue}</td>
                  <td>${student.interviewer}</td>
                  <td class="row-result">${student.result}</td>
                </tr>`;
  }

  tableBody.innerHTML = dataHtml
}

function editFunction(event){
  var rowdata = event.target.parentNode.parentNode.id;
  if (event.target) {
    rowId = rowdata;
    var rowSelected = document.getElementById(rowId);
    console.log("rowId", rowId);
    rowSelected.style.backgroundColor = "rgb(189, 32, 49)";
    rowSelected.style.color = "rgb(255, 255, 255)";
    var data = document.getElementById(rowId).querySelectorAll("td");
    console.log(data);
    var date = data[5].firstElementChild.value;
    var venue = data[6].innerHTML;
    var interviewer = data[7].innerHTML;
    var result = data[8].innerHTML;
    
    selectedRowData.date = date;
    selectedRowData.venue = venue;
    selectedRowData.interviewer = interviewer;
    selectedRowData.result = result;
    console.log(selectedRowData);

    data[0].innerHTML='<i class="bi bi-save" onclick="saveFunction(event)" ></i> <span> <i class="bi bi-x" onclick="cancelFunction(event)"></i> </span>';

    if (highlightedRow != undefined) {
      var rowSelected2 = document.getElementById(highlightedRow); 
      console.log("highlightedRow", highlightedRow);
      rowSelected2.style.backgroundColor = "rgb(255, 255, 255)";
      rowSelected2.style.color = "rgb(0, 0, 0)";
      var data = document.getElementById(highlightedRow).querySelectorAll("td");
      data[0].innerHTML='<i class="bi bi-pencil-square" onclick="editFunction(event)"></i>';
      console.log(rowId);
      var edit = document.getElementById(highlightedRow).querySelectorAll("td");
      console.log(edit);
      edit[5].firstElementChild.disabled = true;

      var returnToPreviousState = document.getElementById(highlightedRow).querySelectorAll("td");
      console.log(returnToPreviousState);
      returnToPreviousState[5].firstElementChild.disabled = true;

      console.log(returnToPreviousState);
      returnToPreviousState[6].contentEditable = false;

      console.log(returnToPreviousState);
      returnToPreviousState[7].contentEditable = false;

    }

    highlightedRow = rowId;
    
  }
  //5,6,7
  var edit = document.getElementById(rowId).querySelectorAll("td");
  console.log(edit);
  edit[5].firstElementChild.disabled = false;

  console.log(edit);
  edit[6].contentEditable = true;

  console.log(edit);
  edit[7].contentEditable = true;


}
 
function saveFunction(event){
  var saveData = document.getElementById(rowId).querySelectorAll("td");
  console.log(saveData);
  saveData[5].firstElementChild.value;
  console.log(saveData[5].firstElementChild.value);

  var venue = saveData[6].innerText;
  console.log(venue);

  var interviewer = saveData[7].innerText;
  console.log(interviewer);

  var result = saveData[8].innerText;
  console.log(result);

  if (highlightedRow != undefined) {
    var rowSelected2 = document.getElementById(highlightedRow);
    console.log("highlightedRow", highlightedRow);
    rowSelected2.style.backgroundColor = "rgb(255, 255, 255)";
    rowSelected2.style.color = "rgb(0, 0, 0)";
    var data = document.getElementById(highlightedRow).querySelectorAll("td");
    data[0].innerHTML='<i class="bi bi-pencil-square" onclick="editFunction(event)"></i>';
    console.log(rowId);
    var edit = document.getElementById(highlightedRow).querySelectorAll("td");
    console.log(edit);
    edit[5].firstElementChild.disabled = true;

    
  }


}

function cancelFunction(event){
  var cancelData = document.getElementById(rowId).querySelectorAll("td");
  cancelData[5].firstElementChild.value = selectedRowData.date;
  cancelData[6].innerHTML = selectedRowData.venue;
  cancelData[7].innerHTML = selectedRowData.interviewer;
  cancelData[8].innerHTML = selectedRowData.result;

  if (highlightedRow != undefined) {
    var rowSelected2 = document.getElementById(highlightedRow);
    console.log("highlightedRow", highlightedRow);
    rowSelected2.style.backgroundColor = "rgb(255, 255, 255)";
    rowSelected2.style.color = "rgb(0, 0, 0)";
    var data = document.getElementById(highlightedRow).querySelectorAll("td");
    data[0].innerHTML='<i class="bi bi-pencil-square" onclick="editFunction(event)"></i>';
    console.log(rowId);
    var edit = document.getElementById(highlightedRow).querySelectorAll("td");
    console.log(edit);
    edit[5].firstElementChild.disabled = true;
  }
}

//pass-fail function
function clickedPassed() {
  //this gives id of tr whose button was clicked
  var data = document.getElementById(rowId).querySelectorAll("td");

  data[8].innerHTML = "PASSED";
}

function clickedFailed() {
  //this gives id of tr whose button was clicked
  var data = document.getElementById(rowId).querySelectorAll("td"); 
  data[8].innerHTML = "FAILED";

}

//search table
function tableSearch() {
  let input, filter, table, tr, td, txtValue;

  input = document.getElementById("searchInput");
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
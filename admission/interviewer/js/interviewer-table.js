var rowId = undefined;

//Student Info
var studentData = [
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
  name:'Montaril, Vincent Jake', number:'190187', course:'BET-COET', email:'monta@gmail.com', date:'<input type="date" id="190187" disabled>' , 
  venue:'Industrial Department', interviewer:'Ms.Dela cruz', result:'',},
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
  name:'Frencillo, Paolo', number:'190666', course:'BET-COET', email:'pao@gmail.com', date:'<input type="date" id="190666" disabled>', 
  venue:'Industrial Department', interviewer:'Ms.Dela cruz', result:'',},
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
  name:'Paanod, Cefrin', number:'190123', course:'BET-ESET', email:'cef@gmail.com', date:'<input type="date" id="190123" disabled>',
  venue:'Vulcanizing Department', interviewer:'Ms.Nalalabuan', result:'',}, 
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
  name:'Kilario, Roniel', number:'190321', course:'BET-PPET', email:'ron@gmail.com', date:'<input type="date" id="190321" disabled>', 
  venue:'TBA', interviewer:'Mr.Johnny Simp', result:'',},
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
  name:'Curry, Steph', number:'190030', course:'BSCE', email:'step@gmail.com', date:'<input type="date" id="190030" disabled>', 
  venue:'Engineering Department', interviewer:'Ms.Sana', result:'',},
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
  name:'James, Lebron', number:'190623', course:'BSEE', email:'bron@gmail.com', date:'<input type="date" id="190623" disabled>', 
  venue:'Engineering Department', interviewer:'Ms.Sana', result:'',},
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
  name:'Lapu, Lapu', number:'190543', course:'BET-ET', email:'lapu@gmail.com', date:'<input type="date" id="190543" disabled>', 
  venue:'Engineering Department', interviewer:'Ms.Sana', result:'',},
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
  name:'Layla, Smith', number:'190777', course:'BET-CT', email:'layla@gmail.com', date:'<input type="date" id="190777" disabled>', 
  venue:'Engineering Department', interviewer:'Ms.Sana', result:'',},
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
  name:'Bean, Johnny', number:'190888', course:'BET-MT', email:'bean@gmail.com', date:'<input type="date" id="190888" disabled>', 
  venue:'Engineering Department', interviewer:'Ms.Sana', result:'',},
  {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
  name:'Monk, Malik', number:'190697', course:'BET-AT', email:'monk@gmail.com', date:'<input type="date" id="190697" disabled>', 
  venue:'Engineering Department', interviewer:'Ms.Sana', result:'',},
];

// Selected Row Data
var selectedRowData = [
  {id : '', date:'', venue:'', interviewer:'', result:'' }
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

// When edit icon is pressed, this will execute
function editFunction(event) {
  // Get the ID of the row
  var rowdata = event.target.parentNode.parentNode.id;
  if ( event.target ) {
    rowId = rowdata;
    var rowSelected = document.getElementById(rowId);
    console.log("rowId", rowId);
    // Change the Bg-color and font color of selected row
    rowSelected.style.backgroundColor = "rgb(189, 32, 49)";
    rowSelected.style.color = "rgb(255, 255, 255)";
    // Get the value of the specific cells
    // Store first the data of cell in the object selectedRowData{}
    var data = document.getElementById(rowId).querySelectorAll("td");
    console.log(data);
    var date = data[5].firstElementChild.value;
    var venue = data[6].innerHTML;
    var interviewer = data[7].innerHTML;
    var result = data[8].innerHTML;
    selectedRowData.id = rowId;
    selectedRowData.date = date;
    selectedRowData.venue = venue;
    selectedRowData.interviewer = interviewer;
    selectedRowData.result = result;
    console.log("Selected Row Data: ", selectedRowData);

    // Change the icon of the selected row
    data[0].innerHTML='<i class="bi bi-save" data-toggle="tooltip" data-placement="top" title="Save changes" onclick="saveFunction(event)" ></i><span><i class="bi bi-x" data-toggle="tooltip" data-placement="top" title="Cancel" onclick="cancelFunction(event)"></i></span>';

    // Remove the onclick attribute on other edit icon in other rows
    var rows = document.getElementsByTagName("tr");
    for ( var i = 1; i < rows.length; i++ ) {
      if ( rows[i].id != rowId ){
        console.log("1st child", rows[i].firstElementChild.firstElementChild);
        rows[i].firstElementChild.firstElementChild.removeAttribute("onclick");
      }
    }
  }

  // Set the attribute value of cells to edit
  let edit = document.getElementById(rowId).querySelectorAll("td");
  edit[5].firstElementChild.disabled = false;
  edit[6].contentEditable = true;
  edit[7].contentEditable = true;
}
 
function saveFunction(event){
  // Get the changed data in specific cells and display it on console
  let saveData = document.getElementById(rowId).querySelectorAll("td");
  let date = saveData[5].firstElementChild.value;
  let venue = saveData[6].innerText;
  let interviewer = saveData[7].innerText;
  let result = saveData[8].innerText;
  console.log("Saved Data of ID", rowId, ": ", date, venue, interviewer, result);

  // Set the row into its default properties
  let rowId2 = document.getElementById(rowId);
  let data = document.getElementById(rowId).querySelectorAll("td");
  rowId2.style.backgroundColor = "rgb(255, 255, 255)";
  rowId2.style.color = "rgb(0, 0, 0)";
  data[0].innerHTML='<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)"></i>';
  data[5].firstElementChild.disabled = true;
  data[6].contentEditable = false;
  data[7].contentEditable = false;

  // Return the onclick attribute on every edit icon
  let rows = document.getElementsByTagName("tr");
  for (let i = 1; i < rows.length; i++) { 
      rows[i].firstElementChild.firstElementChild.setAttribute("onclick", "editFunction(event)");
  }

  // Set the global variable rowId to undefined
  rowId = undefined;
}

function cancelFunction(event) {
  // Return stored data if user cancels the edit
  let cancelData = document.getElementById(rowId).querySelectorAll("td");
  cancelData[5].firstElementChild.value = selectedRowData.date;
  cancelData[6].innerHTML = selectedRowData.venue;
  cancelData[7].innerHTML = selectedRowData.interviewer;
  cancelData[8].innerHTML = selectedRowData.result;

  // Set the row into its default properties
  let rowId2 = document.getElementById(rowId);
  let data = document.getElementById(rowId).querySelectorAll("td");
  rowId2.style.backgroundColor = "rgb(255, 255, 255)";
  rowId2.style.color = "rgb(0, 0, 0)";
  data[0].innerHTML='<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)"></i>';
  data[5].firstElementChild.disabled = true;
  data[6].contentEditable = false;
  data[7].contentEditable = false;

  // Return the onclick attribute on every edit icon
  let rows = document.getElementsByTagName("tr");
  for (let i = 1; i < rows.length; i++) { 
      rows[i].firstElementChild.firstElementChild.setAttribute("onclick", "editFunction(event)");
  }

  // Set the global variable rowId to undefined
  rowId = undefined;
}

//pass-fail function
function clickedPassed() {
  //this gives id of tr whose button was clicked
  let data = document.getElementById(rowId).querySelectorAll("td");
  data[8].innerHTML = "PASSED";
}

function clickedFailed() {
  //this gives id of tr whose button was clicked
  let data = document.getElementById(rowId).querySelectorAll("td"); 
  data[8].innerHTML = "FAILED";
}

//search table
function tableSearch() {
  let input, filter, table, tr, td, txtValue;

  input = document.getElementById("searchInput");
  filter = input.value;
  table = document.getElementById("mytable");
  tr = table.getElementsByTagName('tr');

  for( let i = 0; i < tr.length; i++ ){
    td = tr[i].getElementsByTagName('td')[1]

    if ( td ) {
      txtValue = td.textContent || td.innerText;

      if( txtValue.indexOf(filter) > -1 ){
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
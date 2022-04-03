
let studentData = [
    {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
    name:'KILARIO, RONIEL C.',sex:'M',score:'0',course:'BSCE',medical:'PASSED',interview:'PASSED',
    card:'<input type="checkbox" disabled>',
    bc:'<input type="checkbox" disabled>',
    gmc:'<input type="checkbox" disabled>',
    psa:'<input type="checkbox" disabled>'},
    {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
    name:'FRENCILLO, PAOLO, HONEYBUNCHSUGARPLUM PAMPIYAMPIYAM',sex:'M',score:'0',course:'BET-COET',medical:'PASSED',interview:'PASSED',
    card:'<input type="checkbox" disabled>',
    bc:'<input type="checkbox" disabled>',
    gmc:'<input type="checkbox" disabled>',
    psa:'<input type="checkbox" disabled>'},
    {edit:'<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)" ></i>',
    name:'MONTARIL, VINCENT JAKE',sex:'M',score:'0',course:'BET-ESET',medical:'PASSED',interview:'PASSED',
    card:'<input type="checkbox" disabled>',
    bc:'<input type="checkbox" disabled>',
    gmc:'<input type="checkbox" disabled>',
    psa:'<input type="checkbox" disabled>'},
  ];

loadTableData(studentData)

function loadTableData(studentData) {
  const tableBody = document.getElementById('tabledata');
  let dataHtml = '';
  counter = 0;

  for (let student of studentData) {
    dataHtml += `<tr course = "${student.course}" id="${counter}">
                <td>${student.edit}</td>
                <td>${student.name}</td>
                <td>${student.sex}</td>
                <td>${student.score}</td>
                <td>${student.course}</td>
                <td>${student.medical}</td>
                <td>${student.interview}</td>
                <td>${student.card}</td>
                <td>${student.bc}</td>
                <td>${student.gmc}</td>
                <td>${student.psa}</td></tr>`;
    counter++;          
  }
  tableBody.innerHTML = dataHtml
}

var rowId = undefined;
var selected_row_data  = {id: '',
                          score: '',
                          card: undefined,
                          bc: undefined,
                          gmc: undefined,
                          psa: undefined}
var saved_data = {id: '',
                  score: '',
                  card: undefined,
                  bc: undefined,
                  gmc: undefined,
                  psa: undefined}
                          
// When edit icon is pressed, this will execute
function editFunction(event) {
  // Get the ID of the row
  rowId = event.target.parentNode.parentNode.id;
  if ( event.target ) {
    row_selected = document.getElementById(rowId);
    // Change the border of selected row
    row_selected.style.border = "3px solid red";
    // Get the value of the specific cells
    // Store first the data of cell in the object selected_row_data{}
    let data = document.getElementById(rowId).querySelectorAll("td");
    // Change the icon of the selected row
    data[0].innerHTML='<i class="bi bi-save" data-toggle="tooltip" data-placement="top"title="Save changes" onclick="saveFunction(event)" ></i>&nbsp&nbsp<span><i class="bi bi-x" data-toggle="tooltip" data-placement="top" title="Cancel" onclick="cancelFunction(event)"></i></span>';
    
    let score = data[3].innerHTML;
    let card_state = data[7].childNodes[0].checked;
    let bc_state = data[8].childNodes[0].checked;
    let gmc_state = data[9].childNodes[0].checked;
    let psa_state = data[10].childNodes[0].checked;

    selected_row_data.id = rowId;
    selected_row_data.score = score;
    selected_row_data.card = card_state;
    selected_row_data.bc = bc_state
    selected_row_data.gmc = gmc_state;
    selected_row_data.psa = psa_state;

    console.log("Selected Row Data: ", selected_row_data);

    // Remove the onclick attribute on other edit icon in other rows
    var rows = document.getElementsByTagName("tr");
    for ( var i = 2; i < rows.length; i++ ) {
      if ( rows[i].id != rowId ){
        rows[i].firstElementChild.firstElementChild.removeAttribute("onclick");
      }
    }
  }
  // Set the default attribute of cells 
  let edit = document.getElementById(rowId).querySelectorAll("td");
  edit[3].setAttribute('title', 'Enter Score')
  edit[3].contentEditable = true;
  edit[7].firstElementChild.disabled = false;
  edit[8].firstElementChild.disabled = false;
  edit[9].firstElementChild.disabled = false;
  edit[10].firstElementChild.disabled = false;
}

function saveFunction() {
  // Get the changed data in specific cells and display it on console
  let saveData = document.getElementById(rowId).querySelectorAll("td");
  console.log(saveData)
  let score = saveData[3].innerText;
  let card_state = saveData[7].childNodes[0].checked;
  let bc_state = saveData[8].childNodes[0].checked;
  let gmc_state = saveData[9].childNodes[0].checked;
  let psa_state = saveData[10].childNodes[0].checked;

  saved_data.id = rowId;
  saved_data.score = score
  saved_data.card = card_state;
  saved_data.bc = bc_state;
  saved_data.gmc = gmc_state;
  saved_data.psa = psa_state;

  // Set the row into its default properties
  let data = document.getElementById(rowId);
  let row_tds = data.querySelectorAll("td")
  data.style.border= "none";
  row_tds[0].innerHTML = '<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)"></i>';
  row_tds[3].contentEditable = false;
  row_tds[7].firstElementChild.disabled = true;
  row_tds[8].firstElementChild.disabled = true;
  row_tds[9].firstElementChild.disabled = true;
  row_tds[10].firstElementChild.disabled = true;

  // Return the onclick attribute on every edit icon
  let rows = document.getElementsByTagName("tr");
  for (let i = 3; i < rows.length; i++) { 
      rows[i].firstElementChild.firstElementChild.setAttribute("onclick", "editFunction(event)");
  }
  // Set the global variable rowId to undefined
  rowId = undefined;
}

function cancelFunction() {
  // Return stored data if user cancels the edit
  let cancelData = document.getElementById(rowId).querySelectorAll("td");

  cancelData[3].innerHTML = selected_row_data.score;
  cancelData[7].childNodes[0].checked = selected_row_data.card;
  cancelData[8].childNodes[0].checked = selected_row_data.bc;
  cancelData[9].childNodes[0].checked = selected_row_data.gmc;
  cancelData[10].childNodes[0].checked = selected_row_data.psa;
  // Set the row into its default properties
  let data = document.getElementById(rowId);
  let row_tds = data.querySelectorAll("td")
  data.style.border= "none";
  row_tds[0].innerHTML = '<i class="bi bi-pencil-square" data-toggle="tooltip" data-placement="top" title="Edit Row" onclick="editFunction(event)"></i>';
  row_tds[3].contentEditable = false;
  // for ( let i = 7; i < row_tds.length; i++ ) {
  //   console.log(i);
  //   if ( row_tds[i].firstElementChild.checked == true ) {
  //     row_tds[i].innerHTML = '<i class="bi bi-check-lg"></i>';
  //     row_tds[i].firstElementChild.disabled = true;
  //   }
  // }
  row_tds[7].firstElementChild.disabled = true;
  row_tds[8].firstElementChild.disabled = true;
  row_tds[9].firstElementChild.disabled = true;
  row_tds[10].firstElementChild.disabled = true;

  // Return the onclick attribute on every edit icon
  let rows = document.getElementsByTagName("tr");
  for (let i = 3; i < rows.length; i++) { 
      rows[i].firstElementChild.firstElementChild.setAttribute("onclick", "editFunction(event)");
  }

  // Set the global variable rowId to undefined
  rowId = undefined;
}

function tableSearch() {
  let input, filter, table, tr, td, txtValue;
  input = document.getElementById("search-input");
  filter = input.value.toUpperCase();
  table = document.getElementById("coor-table");
  tr = table.getElementsByTagName('tr');

  for ( let i = 0; i < tr.length; i++ ) {
    td = tr[i].getElementsByTagName('td')[0]
    if ( td ) {
      txtValue = td.textContent || td.innerText;
      if ( txtValue.toUpperCase().indexOf(filter) > -1 ) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

$("#select-course").on("change", function() {
  let rows = $("#tabledata tr");
  let selected = this.value;

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
    document.getElementById("coor-name").style.color = "white";
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
  document.getElementById("coor-name").style.color = "#a7545c";
  document.getElementById("download-text").style.display = "none";
  document.getElementById("logout-text").style.display = "none";
  document.getElementById("download-wrapper").style.justifyContent = "center";
  document.getElementById("logout-wrapper").style.justifyContent = "center";
}
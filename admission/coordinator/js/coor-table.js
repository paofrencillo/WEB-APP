let studentData = [
    {num:'',name:'KILARIO, RONIEL C.',sex:'M',score:'0/100',course:'BSCE',medical:'PASSED',interview:'PASSED',
    card:'<input type="checkbox" id="coor-table-card" name="card" value="coor-table-card">',
    bc:'<input type="checkbox" id="coor-table-bc" name="bc" value="coor-table-bc">',
    gmc:'<input type="checkbox" id="coor-table-gmc" name="gmc" value="coor-table-gmc">',
    psa:'<input type="checkbox" id="coor-table-psa" name="psa" value="coor-table-psa">'},
    {num:'',name:'FRENCILLO, PAOLO',sex:'M',score:'0/100',course:'BET-COET',medical:'PASSED',interview:'PASSED',
    card:'<input type="checkbox" id="coor-table-card" name="card" value="coor-table-card">',
    bc:'<input type="checkbox" id="coor-table-bc" name="bc" value="coor-table-bc">',
    gmc:'<input type="checkbox" id="coor-table-gmc" name="gmc" value="coor-table-gmc">',
    psa:'<input type="checkbox" id="coor-table-psa" name="psa" value="coor-table-psa">'},
    {num:'',name:'MONTARIL, VINCENT JAKE',sex:'M',score:'0/100',course:'BET-ESET',medical:'PASSED',interview:'PASSED',
    card:'<input type="checkbox" id="coor-table-card" name="card" value="coor-table-card">',
    bc:'<input type="checkbox" id="coor-table-bc" name="bc" value="coor-table-bc">',
    gmc:'<input type="checkbox" id="coor-table-gmc" name="gmc" value="coor-table-gmc">',
    psa:'<input type="checkbox" id="coor-table-psa" name="psa" value="coor-table-psa">'},
    {num:'',name:'JABAR, ABDUL',sex:'M',score:'0/100',course:'BET-PPET',medical:'PASSED',interview:'PASSED',
    card:'<input type="checkbox" id="coor-table-card" name="card" value="coor-table-card">',
    bc:'<input type="checkbox" id="coor-table-bc" name="bc" value="coor-table-bc">',
    gmc:'<input type="checkbox" id="coor-table-gmc" name="gmc" value="coor-table-gmc">',
    psa:'<input type="checkbox" id="coor-table-psa" name="psa" value="coor-table-psa">'}
  ];
  
loadTableData(studentData)

function loadTableData(studentData) {
    const tableBody = document.getElementById('tabledata');
    let dataHtml = '';
  
    for(let student of studentData) {
      dataHtml += `<tr course = "${student.course}" id="${student.number}">
                       <td>${student.num}</td>
                       <td>${student.name}</td>
                       <td>${student.sex}</td>
                       <td contenteditable='true'>${student.score}</td>
                       <td>${student.course}</td>
                       <td>${student.medical}</td>
                       <td>${student.interview}</td>
                       <td>${student.card}</td>
                       <td>${student.bc}</td>
                       <td>${student.gmc}</td>
                       <td>${student.psa}</td></tr>`;
    }
    tableBody.innerHTML = dataHtml
  
  }



function tableSearch() {
    let input, filter, table, tr, td, i, txtValue;
  
    input = document.getElementById("search");
    filter = input.toUpperCase().value;
    table = document.getElementById("coor-table");
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
//JS FOR NURSE TABLE

//Student Info----
let studentData = [
  {radio:'<input class="radio" type="radio" name="flexRadio" id="flexRadio"></input>', 
  name:'Frencillo, Paolo', number:'0165', course:'BET-COET', email:'pao@gmail.com', result:'', 
  file:'<input type="file" name="image" id="image"></input>'},
  {radio:'<input class="radio" type="radio" name="flexRadio" id="flexRadio"></input>', 
  name:'Paanod, Cefrin', number:'0185', course:'BET-ESET', email:'cef@gmail.com', result:'', 
  file:'<input type="file" name="image" id="image"></input>'},
  {radio:'<input class="radio" type="radio" name="flexRadio" id="flexRadio"></input>', 
  name:'Montaril, Vincent Jake', number:'0175', course:'BET-PPET', email:'monta@gmail.com', result:'', 
  file:'<input type="file" name="image" id="image"></input>'},
  {radio:'<input class="radio" type="radio" name="flexRadio" id="flexRadio"></input>', 
  name:'Kilario, Roniel', number:'0195', course:'BS Civil Engineering', email:'kilario@gmail.com', result:'', 
  file:'<input type="file" name="image" id="image"></input>'}
];

loadTableData(studentData)



//insert data function
function loadTableData(studentData) {
  const tableBody = document.getElementById('tabledata');
  let dataHtml = '';

  for(let student of studentData) {
    dataHtml += `<tr><td>${student.radio}</td><td>${student.name}</td><td>${student.number}</td>
    <td>${student.course}</td><td>${student.email}</td><td>${student.result}</td><td>${student.file}</td></tr>`;
  }
  tableBody.innerHTML = dataHtml

}

//radio check
$('#mytable tr').click(function() {
  $(this).find('td input:radio').prop('checked', true);
})

//pass-fail function

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

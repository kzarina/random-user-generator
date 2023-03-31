var searchBar = document.getElementById("searchBar");
var dropDown = document.getElementById("dropDown");
var table = document.getElementById("table");
var url = "https://randomuser.me/api/?results=100";
var tableHeaders = `<tr>
<th>First name</th>
<th>Last name</th>
<th>Age</th>
<th>Gender</th>
<th>City</th>
<th>Country</th>
<th>Phone Number</th>
<th>Email</th>
</tr>`;
var results = null;
var searchTerm = "";
var numberToDisplay = 100;

searchBar.addEventListener("keyup", function (event) {
  searchTerm = event.target.value.toLowerCase();
  renderTable();
});

dropDown.addEventListener("change", function (event) {
  numberToDisplay = Number(event.target.value);
  renderTable(numberToDisplay);
});

function getUsers() {
  fetch(url)
    .then((results) => {
      return results.json();
    })
    .then((data) => {
      console.log(data);
      results = data.results;
      renderTable(results);
    });
}
getUsers();

function renderTable() {
  table.innerHTML = tableHeaders;

  var peopleToDisplay = [];
  for (person of results) {
    var name = person.name.first + " " + person.name.last;
    var lowerCaseName = name.toLowerCase();
    if (lowerCaseName.includes(searchTerm)) {
      peopleToDisplay.push(person);
    }
  }

  peopleToDisplay = peopleToDisplay.slice(0, numberToDisplay);

  for (var person of peopleToDisplay) {
    var tableRow = `<tr>
    <td>${person.name.first}</td>
    <td>${person.name.last}</td>
    <td>${person.dob.age}</td>
    <td>${person.gender}</td>
    <td>${person.location.city}</td>
    <td>${person.location.country}</td>
    <td>${person.phone}</td>
    <td>${person.email}</td>
    </tr>`;
    table.innerHTML += tableRow;
  }
}

// Get a reference to the form element with the ID "myform"
var form = document.getElementById("myform");

form.addEventListener("submit", function (e) {
  e.preventDefault(); //prevent auto submission of form

  var search = document.getElementById("search").value;

  fetch("https://api.github.com/users/" + search)
    .then((result) => {
      if (!result.ok) {
        throw new Error(`<br><br><br><p style=" text-align: center;
        color: black;
        text-transform: uppercase;
        font-family: 'Courier New', Courier, monospace;
        font-weight: bold;">Invalid Users!!</p>`);
      }
      return result.json();
    })
    .then((data) => {
      console.log(data);

       // Display user information in the "result"
      document.getElementById("result").innerHTML = `
      <link rel="stylesheet" href="style.css" />
      <br><br>
      <div class="info">
        <img src="${data.avatar_url}" alt="${data.login}" class="avatar">
        <h2>${data.login}</h2>
        <p>Name: ${data.name}</p>
        <p>Location: ${data.location || "Not specified"}</p>
        <p>Email: ${data.email}</p>
        <p>Public Repositories: ${data.public_repos}</p>
        </div>
      `;
    })
    .catch(error => {
      // Display an error message in the "result"
      document.getElementById("result").innerHTML = `<p class="error">${error.message}</p>`;
    });
});  
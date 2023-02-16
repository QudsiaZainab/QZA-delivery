var login = localStorage.getItem('email');
console.log(login);
if(login)
{
  var hiddentab = document.querySelector("#LogOut");
  hiddentab.hidden = false;
}

document.querySelector('#lgout').addEventListener('click', function(event) {
    localStorage.removeItem('email');
    hiddentab.hidden = true;
});

const signinBTN = document.querySelector('#submit');

var password;
signinBTN.onclick = function(e) {
    const emailInput = document.querySelector('#floatingInput');
    const email = emailInput.value;

    const passwordInput = document.querySelector('#floatingPassword');
    password = passwordInput.value;

    e.preventDefault();

    fetch('http://localhost:8001/search/' + email)
    .then(response => response.json())
    .then(data => validate(data['data']));
}

function validate(data)
{
    if(data.length == 0)
    {
        document.getElementById("message").innerHTML = "invalid email id";
    }
    else if(data[0].password!=password)
    {
        document.getElementById("message").innerHTML = "invalid password";
    }
    else
    {
        document.getElementById("message").innerHTML = "<span style='color: green;'>loggedin successfully</span>";

        localStorage.setItem('email',data[0].id);
    }
}
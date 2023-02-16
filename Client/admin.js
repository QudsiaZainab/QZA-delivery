document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:8001/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});




const addBtn = document.querySelector('#add-menu-btn');

addBtn.onclick = function () {

    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value;
    nameInput.value = "";
    console.log(name);

    const imageInput = document.querySelector('#image-input');
    const image = imageInput.value;
    imageInput.value = "";

    const priceInput = document.querySelector('#price-input');
    const price = priceInput.value;
    priceInput.value = "";


    const insertData = { name : name, image:image, price:price} 
    

    console.log(insertData);

    fetch('http://localhost:8001/addMenu', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(insertData)
    })
    .then(response => response.json());
    // .then(data => insertRowIntoTable(data['data']));

    
}


function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='7'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({id, name, image, price}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td><img src = "${image}"></td>`;
        tableHtml += `<td>${price}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}



const signinBTN = document.querySelector('#submit');

var password;
signinBTN.onclick = function(e) {
    const emailInput = document.querySelector('#floatingInput');
    const email = emailInput.value;

    const passwordInput = document.querySelector('#floatingPassword');
    password = passwordInput.value;

    e.preventDefault();

    fetch('http://localhost:8001/searchadac/' + email)
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





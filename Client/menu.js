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

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:8001/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
  });
  
  function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
  
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";
    data.forEach(function ({id, name, image, price}) {
        tableHtml += "<tr>";
        tableHtml += `<td id = "id" >${id}</td>`;
        tableHtml += `<td id = "name" >${name}</td>`;
        tableHtml += `<td id = "image" ><img src="${image}"></td>`;
        tableHtml += `<td id = "price" >Rs. ${price}</td>`;
        tableHtml += `<td><button  class="addtoCart"  type = "submit" data-id=${id}>Add to Cart</td>`;
        tableHtml += "</tr>";
    });
  
    table.innerHTML = tableHtml;
    console.log(data[0].image);
  }
 var quantity;
  document.querySelector('table tbody').addEventListener('click', function(event) {
    

    if (event.target.className == "addtoCart") {
      quantity = window.prompt("Enter quantity of this item (1-9)");
      while(!(quantity>=1 && quantity <= 9)){
        quantity = window.prompt("error! Enter quantity of this item (1-9)");
      }

      fetch('http://localhost:8001/getForCart/' + event.target.dataset.id)
      .then(response => response.json())
      .then(data=>addToCart(data['data'],event.target.dataset.id));

      window.open("Cart.html");
    }
});

function addToCart(data, id)
{
  const insertData = {item_id : id, quantity : quantity, price : data[0].price * quantity};
  console.log(insertData);

  fetch('http://localhost:8001/cart', {
      method: 'POST',
      body: JSON.stringify(insertData),
      headers: { 'Content-Type': 'application/json' }
      })
      .then(res => console.log(res));
}





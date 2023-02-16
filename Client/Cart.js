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
    fetch('http://localhost:8001/getinCart')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
  });

  let sum = 0;
  function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
  
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    
    let tableHtml = "";
    data.forEach(function ({cart_id, name, image, quantity, price}) {
        tableHtml += "<tr>";
        tableHtml += `<td >${cart_id}</td>`;
        tableHtml += `<td  >${name}</td>`;
        tableHtml += `<td  ><img src = "${image}"></td>`;
        tableHtml += `<td  >${quantity}</td>`;
        tableHtml += `<td >Rs. ${price}</td>`;
        sum = sum + price;
        tableHtml += `<td><button  class="delete"  type = "submit" data-id=${cart_id}>Delete</td>`;
        tableHtml += "</tr>";
    });
        tableHtml += "<tr>";
        tableHtml += `<td ><b>Total</b></td>`;
        tableHtml += `<td  ></td>`;
        tableHtml += `<td  ></td>`;
        tableHtml += `<td  ></td>`;
        tableHtml += `<td >Rs. ${sum}</td>`;
        tableHtml += `<td></td>`;
        tableHtml += "</tr>";
  
    table.innerHTML = tableHtml;
    confirm_order(data);
  }


function confirm_order(data)
{
  if(data.length>0)
  {
    var btn = document.querySelector("#confirm_order");
    btn.hidden = false;
  }
}

document.querySelector("#confirm_order").addEventListener('click',function(event)
{
  let order = {member_ID:login, total_bill : sum};
  console.log(order);

  fetch('http://localhost:8001/order', {
  method: 'POST',
  body: JSON.stringify(order),
  headers: { 'Content-Type': 'application/json' }
  })
  .then(res => console.log(res));
  alert("your order has completed successfully");
});

document.querySelector('table tbody').addEventListener('click', function(event) {
  if (event.target.className === "delete") {
      deleteRowById(event.target.dataset.id);
  }
});

function deleteRowById(id) {
  fetch('http://localhost:8001/delete/' + id, {
      method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          location.reload();
      }
  });
 
}

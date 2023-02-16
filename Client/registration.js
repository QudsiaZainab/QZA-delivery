var login = localStorage.getItem('email');

if(login)
{
  var hiddentab = document.querySelector("#LogOut");
  hiddentab.hidden = false;
}

document.querySelector('#lgout').addEventListener('click', function(event) {
    localStorage.removeItem('email');
    hiddentab.hidden = true;
});

const form = document.querySelector("#signup");

var emailError = document.getElementById('email-error');

function validateField(field)
{
  if(field.length<=0)
  {
    return false;
  }
    return true;
}


function ValidateEmail(email) 
{

  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  

  if (email.match(validRegex)) 
  {
    return true;
  } 
  else 
  {
    emailError.innerHTML = "invalid email address";
    return false;
  }

}




document.getElementById("submit").addEventListener('click',()=>{
    
  const nameInput = document.querySelector('#name');
  const Full_Name = nameInput.value;

  const emailInput = document.querySelector('#email');
  const email = emailInput.value;

  const usernameInput = document.querySelector('#username');
  const username = usernameInput.value;

  const phoneInput = document.querySelector('#phoneNumber');
  const phone_number = phoneInput.value;

  const passwordInput = document.querySelector('#password');
  const password = passwordInput.value;

  const confirm_passwordInput = document.querySelector('#confirmpassword');
  const confirm_password = confirm_passwordInput.value;

  const addressInput = document.querySelector('#address');
  const address = addressInput.value;


  const genderInput = document.querySelector('input[name="gender"]:checked') ;
  const gender = genderInput.value;
  
  const insertInAccount = {email : email, password : password};
  
  var account_id;


    


    if(!validateField(Full_Name))
    {
      alert("missing field! can't submit the form");
      event.preventDefault();
    }
    else if(!validateField(username))
    {
      alert("missing field! can't submit the form");
      event.preventDefault();
    }
    else if(!validateField(password))
    {
      alert("missing field! can't submit the form");
      event.preventDefault();
    }
    else if(!validateField(confirm_password))
    {
      alert("missing field! can't submit the form");
      event.preventDefault();
    }
    else if(!validateField(phone_number))
    {
      alert("missing field! can't submit the form");
      event.preventDefault();
    }
    else if(password!=confirm_password)
    {
      alert("password and confirm password don't match.");
      event.preventDefault();
    }
    else if(!uniqueEmail(email))
    {
      
      emailError.innerHTML = "error! This email address has already been taken.";
      event.preventDefault();
    }
    else if(ValidateEmail(email) && uniqueEmail(email))
      {

        

        fetch('http://localhost:8001/addToAccount', {
        method: 'POST',
        body: JSON.stringify(insertInAccount),
        headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json());

        fetch('http://localhost:8001/search/' + email)
        .then(response => response.json())
        .then(data=>getAccountid(data['data']));

        account_id = localStorage.getItem('account_id');

        const insertData = { Full_Name : Full_Name, username : username,  phone_number:phone_number, address: address, gender : gender, account_id : localStorage.getItem('account_id')} 


      fetch('http://localhost:8001/insert', {
      method: 'POST',
      body: JSON.stringify(insertData),
      headers: { 'Content-Type': 'application/json' }
      })
      .then(res => console.log(res));

        nameInput.value = "";
  
        emailError.innerHTML= " ";
        emailInput.value = "";
        usernameInput.value = "";
        phoneInput.value = "";
        passwordInput.value = "";
        confirm_passwordInput.value = "";
        addressInput.value = "";
        genderInput.checked = false; 

        

      alert("registered successfully");
    }
    else
    {
      event.preventDefault();
    }
  
})


function uniqueEmail(email)
{
  fetch('http://localhost:8001/search/' + email)
  .then(response => response.json())
  .then(data=>uEmail(data['data']));

  var valid;

  valid = localStorage.getItem('validem');
  console.log(valid);

  if(valid == 1)
  {
    return true;
  }
  else{
    return false;
  }
}

function uEmail(data)
{
  if (data.length===0)
  {
    
    localStorage.setItem('validem','1');
    emailError.innerHTML = "";
  }
  else if(data.length>0){
    localStorage.setItem('validem','0');
    
  }


}

function getAccountid(data)
{
  localStorage.setItem('account_id',data[0].id)
}

// if (data.length!=0)
//     {
//       emailError.innerHTML = "error! This email address has already been taken.";
//       return false;
//     }
//     else {
//       console.log("jhghg");
//       return true;
//     }});

      // fetch('http://localhost:8001/insert', {
      // method: 'POST',
      // body: JSON.stringify(insertData),
      // headers: { 'Content-Type': 'application/json' }
      // })
      // .then(res => console.log(res));
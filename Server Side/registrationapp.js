const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const registrationDBService = require('./registrationDBService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

// create
app.post('/insert', (request, response) => {
    const { Full_Name, username ,  phone_number,  address, gender, account_id } = request.body;

    const db = registrationDBService.getDbServiceInstance();
    
    const result = db.register(Full_Name, username ,  phone_number, address, gender, account_id);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

app.post('/addMenu', (request, response) => {
    const { name, image, price } = request.body;

    const db = registrationDBService.getDbServiceInstance();
    
    const result = db.addMenu(name, image, price);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

app.post('/addToAccount', (request, response) => {
    const { email, password } = request.body;

    const db = registrationDBService.getDbServiceInstance();
    
    const result = db.addToAccount( email, password );

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

app.post('/order', (request, response) => {
    const { member_ID, total_bill } = request.body;

    const db = registrationDBService.getDbServiceInstance();
    
    const result = db.order(member_ID, total_bill);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

app.get('/getAll', (request, response) => {
    const db = registrationDBService.getDbServiceInstance();

    const result = db.getAllData();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/searchadac/:email', (request, response) => {
    const { email } = request.params;
    const db = registrationDBService.getDbServiceInstance();

    const result = db.searchByadEmail(email);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});




app.get('/search/:email', (request, response) => {
    const { email } = request.params;
    const db = registrationDBService.getDbServiceInstance();

    const result = db.searchByEmail(email);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});


app.get('/getForCart/:id', (request, response) => {
    const { id } = request.params;
    const db = registrationDBService.getDbServiceInstance();

    const result = db.getFromMenu(id);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getinCart', (request, response) => {
    const db = registrationDBService.getDbServiceInstance();

    const result = db.getinCart();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.post('/cart', (request, response) => {
    const { item_id, quantity, price } = request.body;


    const db = registrationDBService.getDbServiceInstance();
    
    const result = db.addToCart(item_id, quantity, price );

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = registrationDBService.getDbServiceInstance();

    const result = db.deleteFromCart(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.listen(process.env.PORT, () => console.log('app is running'));
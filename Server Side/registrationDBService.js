const mysql = require('mysql');
let instance = null;

const connection = mysql.createConnection({  
  host     : 'localhost',
  user     : 'root',
  password : 'afazaiaN@123',
  database : 'QZADelivery'
});

connection.connect((err) => {
    if (err) {
        
    return console.error('error: ' + err.message);
    }
  console.log('Connected to the MySQL server.');
});

class registrationDBService{
  static getDbServiceInstance() {
    return instance ? instance : new registrationDBService();
}

async getAllData() {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM menu;";

            connection.query(query, (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

async getinCart() {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT cart_id, name, m.image, quantity, c.price FROM cart c, menu m where c.item_id = m.id;";

            connection.query(query, (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

async register(Full_Name, username,  phone_number,  address, gender, account_id) {
    try {
        const values = [Full_Name, username,  phone_number,  address, gender, account_id]
        
        const insertId = await new Promise((resolve, reject) => {
            const query = "INSERT INTO registered_members (Full_Name, username,  phone_number,  address, gender, account_id ) VALUES (?,?,?,?,?,?);";
  
            connection.query(query, values , (err, result) => {
                if (err) reject(new Error(err.message));
                // resolve(result.insertId);
            })
        });
        return {
            member_ID : insertId,
            Full_Name : Full_Name,
            username : username,
            phone_number : phone_number,
            address : address,
            gender : gender,
            account_id : account_id
        };
    } catch (error) {
        console.log(error);
    }
}

async addToAccount(email, password) {
    try {
        const values = [email, password]
        
        const insertId = await new Promise((resolve, reject) => {
            const query = "INSERT INTO account (email, password) VALUES (?,?);";
  
            connection.query(query, values , (err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result.insertId);
            })
        });
        return {
            id : insertId,
            email : email,
            password : password
        };
    } catch (error) {
        console.log(error);
    }
  }

async searchByEmail(email) {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM account WHERE email = ?;";

            connection.query(query, [email], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });

        return response;
    } catch (error) {
        console.log(error);
    }
}


async addToCart(item_id, quantity, price) {
    try {
        const values = [item_id, quantity, price]
        
        const insertId = await new Promise((resolve, reject) => {
            const query = "INSERT INTO cart (item_id, quantity, price) VALUES (?,?,?);";

            connection.query(query, values , (err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result.insertId);
            })
        });
        return {
            cart_id : insertId,
            item_id : item_id,
            quantity: quantity,
            price: price
        };
    } catch (error) {
        console.log(error);
    }
}

async addMenu(name, image, price) {
    try {
        const values = [name, image, price]
        
        const insertId = await new Promise((resolve, reject) => {
            const query = "INSERT INTO menu (name, image, price) VALUES (?,?,?);";

            connection.query(query, values , (err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result.insertId);
            })
        });
        return {
            id : insertId,
            name : name,
            image: image,
            price: price
        };
    } catch (error) {
        console.log(error);
    }
}

async getFromMenu(id) {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT name, price FROM menu WHERE id = ?;";

            connection.query(query, [id], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });

        return response;
    } catch (error) {
        console.log(error);
    }
}



async order(member_ID, total_bill) {
    try {
        const values = [member_ID, total_bill]
        
        const insertId = await new Promise((resolve, reject) => {
            const query = "INSERT INTO order_items (member_ID, total_bill) VALUES (?,?);";
  
            connection.query(query, values , (err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result.insertId);
            })
        });
        return {
            id : insertId,
            member_ID : member_ID,
            total_bill : total_bill
        };
    } catch (error) {
        console.log(error);
    }
  }

  async deleteFromCart(id) {
    try {
        id = parseInt(id, 10); 
        const response = await new Promise((resolve, reject) => {
            const query = "DELETE FROM cart WHERE cart_id = ?";

            connection.query(query, [id] , (err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result.affectedRows);
            })
        });

        return response === 1 ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async searchByadEmail(email) {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM admin WHERE email = ?;";

            connection.query(query, [email], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });

        return response;
    } catch (error) {
        console.log(error);
    }
}

}

module.exports = registrationDBService;

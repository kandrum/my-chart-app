const mysql = require('mysql');

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'Mou6pree@', 
    database: 'subsea'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the MySQL server:', err);
        throw err; // Consider handling this error more gracefully
    }
    console.log('Connected to the MySQL server.');
});

 function checkUser(userData) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1';
        const values = [userData.username, userData.password];

        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                reject(err); // Pass the error to the caller
            } else if (results.length > 0) {
                resolve({ checkstatus: true, username: results[0].username });
            } else {
                console.log('No user found with the given username and password.');
                resolve(null); // Indicate no user was found
            }
        });
    });
}



module.exports={checkUser};

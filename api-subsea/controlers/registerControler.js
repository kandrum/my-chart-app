const mysql = require('mysql');

// MySQL database connection
const db = mysql.createConnection({
  host: 'interestcalc.cc7dergrgvwi.us-east-2.rds.amazonaws.com',
  user: 'admin', 
  password: 'Naveen2628', 
  database: 'subsea'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the MySQL server:', err);
        throw err; // Consider handling this error more gracefully
    }
    console.log('Connected to the MySQL server.');
});

exports.registerUser = (req, res) => {
    const { username, password, role } = req.body;
  
    const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.query(query, [username, password, role], (err, results) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: "An error occurred during registration" });
        return;
      }
      res.status(201).json({ message: "Registration successful", userId: results.insertId });
    });
  };

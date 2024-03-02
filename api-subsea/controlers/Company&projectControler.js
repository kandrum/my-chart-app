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

exports.companyAndProject = (req, res) => {
    const { companyname, userid, projectName } = req.body;
    
    // Insert into company table
    const companyQuery = 'INSERT INTO company (companyname, userid) VALUES (?, ?)';
    db.query(companyQuery, [companyname, userid], (err, companyResults) => {
        if (err) {
            console.error('Error inserting company:', err);
            res.status(500).json({ message: "An error occurred during company registration" });
            return;
        }
        
        // Use the insertId of the company to associate it with the new project
        const projectId = companyResults.insertId;
        const projectQuery = 'INSERT INTO projects (name, companyid, userid) VALUES (?, ?, ?)';
        
        db.query(projectQuery, [projectName, projectId, userid], (err, projectResults) => {
            if (err) {
                console.error('Error inserting project:', err);
                res.status(500).json({ message: "An error occurred during project registration" });
                return;
            }
            res.status(201).json({
                message: "Company and Project registration successful",
                companyId: projectId,
                projectId: projectResults.insertId
            });
        });
    });
};

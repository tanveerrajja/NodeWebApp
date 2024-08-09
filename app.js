const express = require('express');
const path = require('path');
const sql = require('mssql');

const app = express();
const port = 3000;

// Database configuration
const dbConfig = {
  user: 'bootcamp',
  password: 'Pass@123',
  server: 'bootcampaug5server.database.windows.net',
  database: 'bootcampaug5db',
};

// Set up EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route for home page with navbar
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/task1', (req, res) => {
    res.render('task1');
  });

// Route for Task 2
app.get('/task2', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query('SELECT TOP (20) * FROM [SalesLT].[Customer]');
    res.render('task2', { customers: result.recordset });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error querying database');
  }
});

// Route for Task 3
app.get('/task3', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query('SELECT Name AS "Product Name", Color, Size, Weight FROM [SalesLT].[Product]');
    res.render('task3', { products: result.recordset });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error querying database');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

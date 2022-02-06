const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mysql = require('mysql');

// Parse application/json.
app.use(bodyParser.json());

// Connection.
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'RS_AQIDAH10',
    database: 'development'
});

// Connect to the database.
conn.connect((err) => {
    if (err) throw err;
    console.log('Connected...');
});

// Show all data.
app.get('/api/products', (req, res) => {
    let sql = "SELECT * FROM products";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "Status": 200,
            "Error": null,
            "Response": results
        }));
    });
});

// Get data.
app.get('/api/products/:id', (req, res) => {
    let sql = "SELECT * FROM products WHERE product_id=" + req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "Status": 200,
            "Error": null,
            "Response": results
        }));
    });
});

// Post data.
app.post('/api/products', (req, res) => {
    let data = {product_name: req.body.product_name, product_price: req.body.product_price};
    let sql = "INSERT INTO products SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "Status": 200,
            "Error": null,
            "Response": results
        }));
    });
});

// Update data.
app.put('/api/products/:id', (req, res) => {
    let sql = "UPDATE products SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "Status": 200,
            "Error": null,
            "Response": results
        }));
    });
});

// Delete data.
app.delete('/api/products/:id', (req, res) => {
    let sql = "DELETE FROM products WHERE product_id="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "Status": 200,
            "Error": null,
            "Response": results
        }));
    });
});

// Listen server.
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

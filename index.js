const csv = require('csv-parser');
const fs = require('fs');
const http = require('http');



const results = [];


fs.createReadStream('products.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log(results);

        let app = http.createServer((req, res) => {
            res.writeHead(200, {'Content-Type': 'text/plain'});
        
            res.end(JSON.stringify(results));
        });
        
        app.listen(3000, '127.0.0.1');
        console.log('Node server running on port 3000');
    });
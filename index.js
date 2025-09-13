    const express = require('express');
    const app = express();
    const port = 8080; // Or any desired port

    //app.get('/', (req, res) => {
    //  res.send('Hello World!');
    //});

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });

    app.use(express.static('site')); // Assuming your static files are in a folder named 'public'
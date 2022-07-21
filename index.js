const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();

const cors = require('cors');
app.use(cors({
    origin: ['https://getpocket.com', 'https://www.google.com/']
}));

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.send('Hello'))

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

import express from 'express'
import cors from 'cors'

const PORT = 5000;
const app = express();
app.use(cors());

app.get('/api/v1', (req, res) => {
    res.json({msg: 'bananas'});
    res.end();
})

app.listen(PORT, () => console.log(`server listening on http://localhost:${PORT}`))
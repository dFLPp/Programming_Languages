//Todos as routes realiconadas à login (só tem 1)
const express = require("express")
const router = express.Router();

router.post('/', (req, res) => {
    res.status(200).write("Handled\n")
    console.log(req.body)
    
    //pegando os dados (bussiness logic)
    const {username, password} = req.body;
    console.log(username);
    if(username){
        res.write(`Welcome ${username}`);
    }

    res.end();
})

module.exports = router;
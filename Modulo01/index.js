const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?teste=1
// Route params = /user/1
// Request body = { "name": Diego, Senha: 123 }

const users = ['Fabio', 'Lucas', 'Martins'];

//MIDDLWARE//
server.use((req, res, next)=>{
console.time('Request');
console.log(`Método: ${req.method}; URL: ${req.url}`);
next();
console.timeEnd('Request');
});

// checkar se o nome foi setado //
function checkUserExist(req, res, next) {
    if(!req.body.name){
        return res.status(400).json({ error: 'User name is required'});
    }
    return next();
}

// verificar no array se exist este usuario pelo ID //
function checkUserInArray(req, res, next){
    const user = users[req.params.index];
    if(!user){
        return res.status(400).json({ error: 'User does not exists' });
    }
    req.user = user;
    return next();
}

//LISTAR TODOS USUARIOS //
server.get('/users',(req, res)=>{
    return res.json(users);
})

// CONSULTAR PELO ID //
server.get('/users/:index', checkUserInArray, (req, res)=>{
    return res.json(req.user);
})

// CREATE //
server.post('/users', checkUserExist, (req,res)=>{
    const { name } = req.body;
    users.push(name);
    return res.json(users);
});

//  UPDATE //
server.put('/users/:index', checkUserInArray, checkUserExist, (req, res)=>{
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
});

// DELETAR //
server.delete('/users/:index',checkUserInArray,(req, res)=>{
    const { index } = req.params;

    users.splice(index,1);

    return res.json(users);
})

server.listen(2000);
const express = require('express');
const track_delhivery = require('./delhivery');
const app = express();
const track_ekart = require('./ekart');
app.get('/track',async(req,res)=>{
    const id =req.query.id;
    const service = req.query.service;
    if(!id || !service) return res.json({'err':'Some parameters are missing'});
    if(req.query.service=='Ekart'){
        let result = await track_ekart(id);
        return res.json(result);
    }
    else if(req.query.service=='Delhivery'){
        let result = await track_delhivery(id);
        return res.json(result);
    }
    
    else
    return res.json({'err':'Service not supported'});
});

app.listen(process.env.PORT|| 3000);
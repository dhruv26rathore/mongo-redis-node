const Appcrud = require("../models/appcrud");
const redis = require('redis');
require('dotenv').config();
const client = redis.createClient(
    // {
    //     host: process.env.REDIS_HOSTNAME,
    //     port: process.env.REDIS_PORT,
    //     password: process.env.REDIS_PASSWORD
    // }
6379
    );




//Create Api
exports.createapp =  (req,res) => {
    let body = req.body;
    let appcrud = new Appcrud(body);
    appcrud.save().then((appcrud) => {
    res.send({
    message: 'successfully submitted'
    })
    }).catch((err) => {
    res.send(err);
    });
    };

//Get all Api 
exports.getapps = (req,res) =>{
    Appcrud.find().then((data)=>{
        // const {name,email,password} = data;
        res.send(data)
    }).catch((err)=>{
        res.json("Something went worng" + err)
    })
}

// Get Particular App
exports.getoneapp = async (req,res)=>{
Appcrud.findById(req.params.id).then((data)=>{
    const dt = JSON.stringify(data)
    client.setex(req.params.id,100,dt);
    console.log("comming from data")
    res.send(data);
}).catch((err)=>{
    res.json("something went worng" + err)
});
}
exports.redis_cache =(req,res,next)=>{
// client.get(req.params.id, function(err, object) {
//     console.log("comming for cache")
//     // console.log(JSON.parse(object.dt));
//     if(err) res.status(400).send(err.message);
// if(object!==null&&undefined) res.status(200).send(JSON.parse(object.dt));
// else{
//     console.log("comming here next") 
//     next()};
// });
client.get(req.params.id, (err,data)=>{
    if(err) res.status(400).send(err.message);
    if(data!==null) res.status(200).send(JSON.parse(data));
    else next();
    })
}


//Update Api
exports.updateapp = (req,res)=>{
Appcrud.findByIdAndUpdate(req.params.id,req.body,(err,appcrud)=>{
    if(err){
       return res.status(500).json({message:err})
    }
    else if(!appcrud){
        return res.status(404).json({message:"Data not found"}) 
    }
    else{
        appcrud.save((err,savedApp)=>{
            if(err){
                return res.status(500).json({message:err}) 
            }
            else{
                return res.status(200).json({message:"data update successfully"})
            }
        })
    }
})
}


exports.deleteapp = (req,res)=>{
    Appcrud.findByIdAndDelete(req.params.id,(err,appcrud)=>{
        if(err){
            return res.status(500).json({message:err})
        }
        else if(!appcrud){
            return res.status(404).json({message:"App not found"})
        }
        else{
            return res.status(200).json({message:"App Deleted Successfully"})
        }
    })
}
const router = require('express').Router();
let actor = require('../models/actor.model');

router.route('/').get((req,res)=>{
actor.find().then(actors=>res.json(actors)).catch(err=>res.status(400).json('Error:'+err));
});

router.route('/add').post((req,res)=>{
    const actorname=req.body.actorname;
    const sex=req.body.sex;
    const Dob=req.body.Dob;
    const bio = req.body.bio;

    const newactor = new actor({
        actorname,
        sex,
        Dob,
        bio });

    newactor.save().then(()=> res.json('Actor Added!')).catch(err=>res.status(400).json('Error: '+ err));
});

module.exports = router;
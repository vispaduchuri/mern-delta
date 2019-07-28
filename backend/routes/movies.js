const router = require('express').Router();
let movie = require('../models/movie.model');

router.route('/').get((req,res)=>{
movie.find().then(movie=>res.json(movie)).catch(err=>res.status(400).json('Error:'+err));
});

router.route('/add').post((req,res)=>{
    const moviename=req.body.moviename;
    const yearofrelease=req.body.yearofrelease;
    const poster=req.body.poster;
    const plot = req.body.plot;
    const cast = req.body.cast;
    

    const newmovie = new movie({
        moviename,
        yearofrelease,
        poster,
        plot,
        cast,
         });

    newmovie.save().then(()=> res.json('Movie Added!')).catch(err=>res.status(400).json('Error: '+ err));
});

router.route('/:id').get((req,res)=>{
    movie.findById(req.params.id)
    .then(movie=>res.json(movie))
    .catch(err=> res.status(400).json('Error:'+err));
});
// Add this to enable Delete Option.
// router.route('/:id').delete((req, res) => {
//     movie.findByIdAndDelete(req.params.id)
//       .then(res => res.json('Movie deleted.'))
//       .catch(err => res.status(400).json('Error: ' + err));
//   });
router.route('/update/:id').post((req,res)=>{
    movie.findById(req.params.id)
    .then(movie=>{
        movie.moviename=req.body.moviename;
        movie.yearofrelease=req.body.yearofrelease;
        movie.poster=req.body.poster;
        movie.plot=req.body.plot;
        movie.cast=req.body.cast;

        movie.save()
        .then(()=>res.json('Movie Updated'))
        .catch(err=> res.status(400).json('Error:'+err));
    })
    .catch(err => res.status(400).json('Error:'+err));
});



module.exports = router;
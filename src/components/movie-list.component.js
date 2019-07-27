import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import firebase from '../config/config';


var storage = firebase.storage();
const Movie = props => (
    console.log(props),
    <tr>
        <td>
        <img alt={props.movie.moviename} src={props.movie.src} />
        </td>
      <td>{props.movie.moviename}</td>
      <td>{props.movie.yearofrelease}</td>
      <td>{props.movie.poster}</td>
      <td>{props.movie.plot}</td>
        
      <td>{props.movie.cast}</td>
      <td>
        <Link to={"/edit/"+props.movie._id}>edit</Link> | <a href="#" onClick={() => { props.deletemovie(props.movie._id) }}>delete</a>
      </td>
    </tr>
  )

export default class MovieList extends Component {
    constructor(props)
    {
        super(props);
        this.deletemovie = this.deletemovie.bind(this);

        this.state= {
            movies : [],
            src: [],
           imgurl:[],

        }
    }


    componentDidMount(){

        
        axios.get('http://localhost:5000/movies/')
        .then(res => {

            // res.forEach(doc=>{
            //     imageIds.push(doc.data().id);
            // })
            this.setState({movies : res.data}, this.getImages);
        })
        .catch(err => {console.log(err);}
        )
        
    }

    getImages(){
     
        const {movies}= this.state;
        console.log(movies)
        console.log(123)
        const imageIds = [];
        
         movies.forEach((doc )=>{
            
                imageIds.push(doc.moviename);
                // console.log(doc._id);
            })
  
         const imagePromises = [];
         movies.forEach((card,i)=>{
           console.log(imageIds[i]);
            // console.log('Image Id',imageIds[i]);
            const imageRef = storage.ref(`${imageIds[i]}`);
            // 'gs://prodet-ku.appspot.com/Products/hOb3za4XBz4EqfU8FUJF/image.png'
            imagePromises.push(imageRef.getDownloadURL());
        })

        Promise.all(imagePromises).then(imageUrls=>{
            imageUrls.forEach((imageUrl,i)=>{
                console.log(imageUrl)
                movies[i].src = imageUrl; // Setting image Link retrieved from firebase storage to src property of the product
            })
            this.setState({movies})
        })
    }



    deletemovie(id){
        axios.delete('http://localhost:5000/movies/' + id)
        .then( res => console.log(res));

        this.setState({
            movies : this.state.movies.filter(el => el._id !== id)
        })
    }

    movielist() {
        return this.state.movies.map(curmovie => {
          return <Movie movie={curmovie} deletemovie={this.deletemovie} key={curmovie._id}/>;
        })
      }
    
    render() {
        return (
           
            <div>
            <h3>Movies</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                <th>Image</th>
                  <th>Movie Name</th>
                  <th>Year of Release</th>
                  <th>Poster</th>
                  <th>Plot</th>
                  
                  <th>Cast</th>
                </tr>
              </thead>
              <tbody>
                { this.movielist() }
              </tbody>
            </table>
          </div>
        )
      }
    }
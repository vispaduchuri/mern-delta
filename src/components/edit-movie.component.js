import React, { Component } from 'react';
import axios from 'axios';
import firebase from '../config/config';
import Picky from "react-picky";
import "react-picky/dist/picky.css";



export default class EditMovie extends Component {
    constructor(props)
    {
        super(props);

        this.onChangemoviename = this.onChangemoviename.bind(this);
        // this.onChangeactorname = this.onChangeactorname.bind(this);
        this.onChangeposter = this.onChangeposter.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.onChangecast = this.onChangecast.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        
        this.state={
            
            moviename :'',
            yearofrelease:'',
            poster:'',
            plot:'',
            actor : [],
            cast:[], //Arrayvalue
            value:null,

        }
        
    }

    componentDidMount(){
        axios.get('http://localhost:5000/movies/'+ this.props.match.params.id)
        .then( res => {
            this.setState ({
                moviename : res.data.moviename,
                yearofrelease : res.data.yearofrelease,
                poster : res.data.poster,
                plot : res.data.plot,
                cast : res.data.cast,

            })
            
        })
        .catch( err => {console.log(err);
        })
    
        axios.get('http://localhost:5000/actors/')
        .then(res=>{
            if(res.data.length>0){
                this.setState ({
                    actor : res.data.map(user => user.actorname),
                    
                    
                })
            }
            console.log(res);
        })
        
        .catch((error) => {
            console.log(error);
          })
          
    }

    componentWillUnmount(){
        console.log("unmounted!");
    }

    onChangemoviename(e) {
        this.setState({
            moviename: e.target.value
        })
      }
    
      onChangeDescription(e) {
        this.setState({
            plot: e.target.value
        })
      }
    
     
    
      onChangeDate(e) {
        this.setState({
            yearofrelease: e.target.value
        })
      }

      onChangecast(e){
        this.setState({
            cast :   e
        })
    }

      onChangeposter(e){
        this.setState({
            poster : e.target.value
        })
    }


    uploadFile(event) {
        const {moviename}=this.state;
        var file = event.target.files[0];
        console.log(file);
        
        var stor = firebase.storage().ref(moviename);
        stor.put(file);
          // axios.post('/files', data)...
        }
      onSubmit(e) {
        e.preventDefault();
    
        const movies = {
            moviename: this.state.moviename,
            plot: this.state.plot,
          yearofrelease: this.state.yearofrelease,
          poster: this.state.poster,
          cast : this.state.cast,
        }
        console.log(movies);
        axios.post('http://localhost:5000/movies/update/' + this.props.match.params.id   , movies)
        .then(res => console.log(res.data));
        window.location='/';
    }

    
    render() {
        return(
        <div>
        <h3>Edit Movie List</h3>
        <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
            <label>Movie Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.moviename}
                onChange={this.onChangemoviename}
                />
          </div>

          <div className="form-group">
            <label>Year Of Release: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.yearofrelease}
                onChange={this.onChangeDate}
                />
          </div>

          <div className="form-group"> 
            <label>Description: </label>
            <textarea  type="text"
                required
                className="form-control"
                value={this.state.plot}   
                onChange={this.onChangeDescription}
                />
          </div>

          <div className="upload-group" id="file">
              <label>Upload Image : </label>
              <input type="file" className="upload-group" onChange={this.uploadFile} id="fileButton"/>
              
              
          </div>
          {/* <div className="form-group"> 
            <label>Cast: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.cast}
                onChange={this.onChangecast}
                />
          </div> */}
          <div className="form-group"> 
            <label>Box Office: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.poster}
                onChange={this.onChangeposter}
                />
          </div>
{
          <div className="form-group"> 
            <label>Actor Name: </label>
            {/* <select type="checkbox" ref="userInput"
                required
                className="form-control"
                value={this.state.cast}
                onChange={this.onChangecast}>
                {
                  this.state.actor.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select> */}

            <Picky
              value={this.state.cast}
              options={this.state.actor}
              onChange={this.onChangecast}
              
              valueKey="id"
              labelKey="name"
              multiple={true}
              
            />
            
          </div> }
          
          
          
  
          <div className="form-group">
            <input type="submit" value="Edit Movie" className="btn btn-primary" />
          </div>
        </form>
      </div>
      )
    }
}
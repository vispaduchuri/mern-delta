import React, { Component } from 'react';
import axios from 'axios';
// import DatePicker from 'react-datepicker';  Later change DOB
// import "react-datepicker/dist/react-datepicker.css";

export default class Editactor extends Component {
    constructor(props)
    {
        super(props);

        this.onChangeactorname = this.onChangeactorname.bind(this);
        this.onChangesex = this.onChangesex.bind(this);
        this.onChangebio = this.onChangebio.bind(this);
        this.onChangeDob = this.onChangeDob.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        
        this.state={
            
            actorname :'',
            sex:'',
            Dob:'',
            bio:'',

        }
        
    }

    onChangeactorname(e) {
        this.setState({
            actorname: e.target.value
        })
      }
    
      onChangebio(e) {
        this.setState({
            bio: e.target.value
        })
      }
    
     
    
      onChangeDob(e) {
        this.setState({
            Dob: e.target.value
        })
      }

      onChangesex(e){
          this.setState({
              sex : e.target.value
          })
      }

      onSubmit(e) {
        e.preventDefault();
    
        const actors = {
            actorname: this.state.actorname,
            sex: this.state.sex,
          Dob: this.state.Dob,
          bio: this.state.bio,
        }
        console.log(actors);
        axios.post('http://localhost:5000/actors/add', actors)
        .then(res => console.log(res.data));
        window.location='/';
    }

    render() {
        return (
            <div>
            <h3>Create Actor List</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
                <label>Actor Name: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.actorname}
                    onChange={this.onChangeactorname}
                    />
              </div>
    
              <div className="form-group">
                <label>Sex: </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.sex}
                    onChange={this.onChangesex}
                    />
              </div>
    
              <div className="form-group"> 
                <label>Dob: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.Dob}
                    onChange={this.onChangeDob}
                    />
              </div>

              <div className="form-group"> 
                <label>Description: </label>
                <textarea  type="text"
                    required
                    className="form-control"
                    value={this.state.bio}
                    onChange={this.onChangebio}
                    />
              </div>
    
              
              
              
              
      
              <div className="form-group">
                <input type="submit" value="Add Actor" className="btn btn-primary" />
              </div>
            </form>
          </div>
        );
    }
}



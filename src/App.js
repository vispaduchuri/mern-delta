import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Navbar from "./components/navbar.component";
import MovieList from "./components/movie-list.component";
import EditMovie from "./components/edit-movie.component";
import ActorList from "./components/actor-list.component";
import MovieAdd from "./components/movie-add-list.component";
import EditActor from "./components/edit-actor.component";

function App() {
  return (
    
    <Router>
      <div className ="container">
      <Navbar/>
      <br/>
    <Route path="/" exact component ={MovieList}/>
    <Route path="/edit/:id" exact component ={EditMovie}/>
    <Route path="/createactor" exact component ={ActorList}/>
    <Route path="/createmovie" exact component ={MovieAdd}/>
    <Route path="/actor" exact component ={EditActor}/>
    </div>
    </Router>
  );
}

export default App;

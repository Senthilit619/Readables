import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route, Switch} from 'react-router-dom'
import './index.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux'; 
import reducer from './Reducers'
import Category from './Components/Category';
import PostDetail from './Components/PostDetail';
import Create from './Components/Create';
import axios from 'axios';

const API = "http://localhost:3001";
const fetchComments = store => next => action => {  
  	switch(action.type){
      case 'SET_INITIAL_POSTS':{
        let url = `${API}/posts/`;    
        fetch(url, { headers: { 'Authorization': 'whatever-you-want',
                                'Content-Type': 'application/json'},
                     method: 'GET', 
                     }) 
          .then( (res) => { return(res.text()) })
          .then((data) => {                
              action.payload = JSON.parse(data);
              console.log("Middleware triggered:", action);            
              if(action.payload !== undefined){                
                next(action);
              }  
        });    
        break;
      }          
      case 'ADD_POST':{
        let alpha = Math.floor(Math.random() * (122 - 97 + 1) ) + 97;
        alpha = String.fromCharCode(alpha);
        let id = Math.trunc(Date.now()+Math.random())+alpha;  
        console.log(id);
        let url = `${API}/posts/`;    
          fetch(url, { headers: { 'Authorization': 'whatever-you-want',
                                  'Content-Type': 'application/json'},
                       method: 'POST', 
                       body: JSON.stringify({id:id,timestamp:Date.now(),title:action.title,body:action.body,author:action.author,category:action.category})}) 
            .then( (res) => { return(res.text()) })
            .then((data) => {  
            		console.log("Middleware triggered:", action);       
                	next(action);
          }); 
          break;
      }
      case 'EDIT_POST':{
        let url = `${API}/posts/${action.id}`;    
        fetch(url, { headers: { 'Authorization': 'whatever-you-want',
                                'Content-Type': 'application/json'},
                     method: 'PUT', 
                     body: JSON.stringify({title:action.title,body:action.body})}) 
          .then( (res) => { return(res.text()) })
          .then((data) => { 
          		console.log("Middleware triggered:", action);          		
                	next(action);
        }); 
        break;
      }
      case 'DELETE_POST':{        
        let url = `${API}/posts/${action.id}`;     
        fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
                    method:'DELETE' } )
          .then((data) => {  
            console.log(data);
          		console.log("Middleware triggered:", action);          		
              	next(action);
        });
        break;
      }
      case 'VOTE_POST':{
        let url = `${API}/posts/${action.id}`;     
        fetch(url, { headers: { 'Authorization': 'whatever-you-want',
                               'Content-Type': 'application/json'},
                    method: 'POST', 
                    body: JSON.stringify({option:action.option})})
          .then((res) => {return(res.text())})
          .then((data) => {
          		console.log("Middleware triggered:", action);
              	next(action);
        }); 
        break;
      }
      case 'FETCH_COMMENTS':{      
        console.log(action);
        let url = `${API}/posts/${action.id}/comments`;    
        fetch(url, { headers: { 'Authorization': 'whatever-you-want',
                                'Content-Type': 'application/json'},
                     method: 'GET'}) 
          .then( (res) => { return(res.text()) })
          .then((data) => {        
              action.comments = JSON.parse(data);  
              console.log("Middleware triggered:", action);
              next(action);
          });
        break;
      }
      case 'ADD_COMMENT':{
        let alpha = Math.floor(Math.random() * (90 - 65 + 1) ) + 65;
        alpha = String.fromCharCode(alpha);
        let id = Math.trunc(Date.now()+Math.random())+alpha; 
        action.cid = id;
        let url = `${API}/comments`;    
        fetch(url, { headers: { 'Authorization': 'whatever-you-want',
                                'Content-Type': 'application/json'},
                     method: 'POST', 
                     body: JSON.stringify({id:action.cid,body:action.body,author:action.author,parentId:action.pid,timestamp:Date.now()})}) 
          .then( (res) => { return(res.text()) })
          .then((data) => {                
             data = JSON.parse(data);
          	  if(data){
                let date = new Date(data.timestamp);                
                action.voteScore = data.voteScore;
                action.timestamp = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
                action.deleted = data.deleted;
                action.parentDeleted = data.parentDeleted;
              	console.log("Middleware triggered:", action);
              	next(action);
              }
          });
        break;
      }
      case 'EDIT_COMMENT':{      
        let url = `${API}/comments/${action.id}`;    
        fetch(url, { headers: { 'Authorization': 'whatever-you-want',
                                'Content-Type': 'application/json'},
                     method: 'PUT',
                   	 body:JSON.stringify({body:action.body,timestamp:Date.now()})}) 
          .then( (res) => { return(res.text()) })
          .then((data) => {             
              console.log("Middleware triggered:", action);
              next(action);
          });
        break;
      }      
      case 'DELETE_COMMENT':{      
        let url = `${API}/comments/${action.cid}`;    
        fetch(url, { headers: { 'Authorization': 'whatever-you-want',
                                'Content-Type': 'application/json'},
                     method: 'DELETE'}) 
          .then( (res) => { return(res.text()) })
          .then((data) => {                
              console.log("Middleware triggered:", action);
              next(action);
          });
        break;
      }      
      case 'VOTE_COMMENT':{
        let url = `${API}/comments/${action.cid}`;     
        fetch(url, { headers: { 'Authorization': 'whatever-you-want',
                               'Content-Type': 'application/json'},
                    method: 'POST', 
                    body: JSON.stringify({option:action.option})})
          .then((res) => {return(res.text())})
          .then((data) => {
          console.log("Middleware triggered:", action);
          next(action);
        }); 
        break;
      }
      default:{
        console.log("Middleware triggered:", action);
        next(action);
  		}  
	}
}

const store = createStore(reducer,applyMiddleware(fetchComments));

ReactDOM.render(<Provider store={store}>
                	<BrowserRouter>
                      <div>
                        <Switch>
                          <Route path="/" exact component={App} />   
                          <Route path="/create/:pid?/:title?/:body?" exact component={Create}/>
                          <Route path="/:cName" exact component={Category}/>   
                          <Route path="/:category/:id" exact component={PostDetail}/>
                                                  
                        </Switch>
                      </div>
                	</BrowserRouter>                
                </Provider>, document.getElementById('root'));
registerServiceWorker();

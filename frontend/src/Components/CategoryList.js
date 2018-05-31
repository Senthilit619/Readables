import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import {Route} from 'react-router-dom'

const API = "http://localhost:3001";

class CategoryList extends Component{

	constructor(props) {
	    super(props);
	    this.state = {
	      categories: []
	      }
  	}
	componentDidMount() {
		let url = `${API}/categories`;    
		fetch(url, { headers: { 'Authorization': 'whatever-you-want'}
		             } )
		  .then( (res) => { return(res.text()) })
		  .then((data) => {
		  	let categoryList = JSON.parse(data);
		  	this.setState({
		      categories:categoryList.categories
		    });      
		});     
  	}
	render(){
		let categories = this.state.categories;	   
		return(
			<div>
		    	<table className="table table-striped table-bordered categoryTable">
		          <thead>
		            <tr>
		              <th>Name</th>
		              <th>URL</th>
		            </tr>
		          </thead>
		          <tbody>
		      		{categories.map((c)=>(
		              <tr key={c.name}>
		              <td>{c.name}</td>
		              <td><Link to={`/${c.name}`}>{c.path}</Link></td> 
		              </tr>
		      		))}
		          </tbody>
		        </table> 
	        </div>
		)	
	}
}

export default CategoryList;
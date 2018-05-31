import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addPost,editPost} from '../Actions';
import {Link} from 'react-router-dom';
class Create extends Component{
  
    createPost(event){  
      //console.log(document.getElementById('category').value);
      let title,body,author,category;
  	event.preventDefault();  
    if(document.getElementById('category') !== null && document.getElementById('category').value === '')
      alert("Category cannot be empty. Please select one and then submit");
    else{     
      if(this.props.match.params.pid){
        title = document.getElementById('title').value;
        body = document.getElementById('body').value;
        this.props.editPost(this.props.match.params.pid,title,body);
      }
        else{
        	title = document.getElementById('title').value;
        	body = document.getElementById('body').value;
          author = document.getElementById('author').value;
        	category = document.getElementById('category').value;
          this.props.addPost(title,body,author,category);
        }     
      document.getElementById('createForm').reset();     
    }
  }
  
  render(){   
    let currentPost;
    if(this.props.match.params.pid){
      	currentPost = this.props.posts.filter((post)=>post.id === this.props.match.params.pid)[0];       	
    }
  	return(
    	<div>
      	  <form className="createForm" id="createForm">
      		<div className="form-group">
            <label htmlFor="Title">Title</label>
            <input type="text" className="form-control" id="title" defaultValue={this.props.match.params.pid && currentPost.title}/>
            </div>
            <div className="form-group">
              <label htmlFor="Body">Body</label>
              <input type="text" className="form-control" id="body" defaultValue={this.props.match.params.pid && currentPost.body}/> 
            </div> 
			{!this.props.match.params.pid && (
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Author</label>
                  <input type="text" className="form-control" id="author"/>
                </div>  
      		)}
  			{!this.props.match.params.pid && (
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Category</label>
                  <select id="category">
                  <option value="">--Select</option>
                  <option value="react">React</option>
                  <option value="redux">Redux</option>
                  <option value="udacity">Udacity</option>
                  </select>
            	</div>      
    		)}
			<Link to="/">
            	<button type="submit" className="btn btn-success btn-sm" onClick={(e)=>this.createPost(e)}>Submit</button>
			</Link>
          </form>
      	</div>   
    ) 
  } 
}
function mapStateToProps(state){
  return {
    posts:state.posts
  	}
}
function mapDispatchToProps(dispatch){
  return {
    addPost:(title,body,author,category) => dispatch(addPost(title,body,author,category)),
	editPost:(id,title,body) => dispatch(editPost(id,title,body)), 
 	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Create);
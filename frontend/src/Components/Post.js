import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Post extends Component{
	constructor(props){
      super(props);
      this.state = {             
      }
    }  
 
  componentDidMount(){ 
  }
  
  render(){   
    var date = new Date(this.props.timestamp);
  	date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    return(
    	<div className="well well-lg post">
    		<Link to={`/${this.props.category}/${this.props.id}`}>
    			<h4 onClick={()=>this.props.fetchComments(this.props.id)}>{this.props.title}</h4>
    		</Link>
    		<h5 className="post-body">{this.props.body}</h5>
        <Link to={`/create/${this.props.id}/${this.props.title}/${this.props.body}`}> 
          <button type="button" className="btn btn-primary btn-sm">Edit</button>
        </Link>
        <button  type="button" className="btn btn-danger btn-sm" onClick={()=>this.props.onDelete(this.props.id)}>Delete</button>
		    <button type="button" className="btn btn-info btn-sm" onClick={()=>this.props.onVote("upVote",this.props.id)}>Like</button>
  		  <button type="button" className="btn btn-warning btn-sm" onClick={()=>this.props.onVote("downVote",this.props.id)}>Dislike</button>
    		<hr/>
        <div className="post-props">
          <span>Author:</span><span>{this.props.author}</span> |
  		    <span>Category:</span><span>{this.props.category}</span> |
          <span>Time:</span><span>{date}</span> |
          <span>Votes:</span><span>{this.props.voteScore}</span> |
          <span>Deleted:</span><span>{String(this.props.deleted)}</span>
        </div>			            
      </div>
    )    
  };
}
function mapStateToProps(state){
	return{	
		}
}
function mapDispatchToProps(dispatch){
	return{	
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Post);
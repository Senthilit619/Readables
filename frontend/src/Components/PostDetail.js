import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {votePost,deletePost,voteComment,deleteComment,addComment,editComment,fetchComments} from '../Actions';
import Modal from'react-modal';
import EmptyMessage from './EmptyMessage';
import CategoryList from './CategoryList';
class PostDetail extends Component{
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      comments:[]
      }
  }
  createComment(event){  
    let body,author,parentId;
  	event.preventDefault();       
    if(this.state.action === 'Edit'){      
      body = document.getElementById('comment-body').value;      
      this.setState(() => ({ body:body }));
      this.props.editComment(this.state.cid,body);
    }
    else{
      	body = document.getElementById('comment-body').value;
        author = document.getElementById('comment-author').value;
        parentId = this.props.match.params.id;        
        this.setState(() => ({ body:body,author:author,parentId:parentId }))
        this.props.addComment(parentId,body,author);
      }     
    document.getElementById('commentForm').reset();     
  }  
openModal = (action,cid,body) => { 
  this.setState(() => ({ modalOpen: true,action:action,body:body,cid:cid})) 
}
closeModal = () => this.setState(() => ({ modalOpen: false,action:'null' }))

componentWillMount(){  
  this.props.fetchComments(this.props.match.params.id);
}
componentDidMount(){   
  Modal.setAppElement('#postdetails');  
}  
  render(){    
    var comments;
    let postDetails = this.props.posts.filter((post)=>post.id === this.props.match.params.id)[0];
    if(postDetails){
      var date = new Date(postDetails.timestamp);
      date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  		if(postDetails.comments){
      		comments = postDetails.comments
  		}      
	  }
    
  return(
  	<div id="postdetails">
    <CategoryList/>
    	{(postDetails !== undefined && !postDetails.deleted) && 
    	<div className="well well-lg post">
      		<h4 className="post-title">{postDetails.title}</h4>
    		<h5 className="post-body">{postDetails.body}</h5>    		      			            
            <Link to={`/create/${postDetails.id}/${postDetails.title}/${postDetails.body}`}> 
            	<button type="button" className="btn btn-primary btn-sm">Edit</button>
            </Link>
            <button type="button" className="btn btn-danger btn-sm" onClick={()=>this.props.deletePost(postDetails.id)}>Delete</button>
    		<button type="button" className="btn btn-success btn-sm" onClick={()=>this.openModal("Add")}>Add Comment</button> 
			<button type="button" className="btn btn-info btn-sm" 
					onClick={()=>this.props.vote("upVote",postDetails.id)}>Like</button>
    		<button type="button" className="btn btn-warning btn-sm"
					onClick={()=>this.props.vote("downVote",postDetails.id)}>Dislike</button>
      		<hr/>
            <div className="post-props"> 
              <span>Author:</span><span>{postDetails.author}</span> |
      		  <span>Category:</span><span>{postDetails.category}</span> |
              <span>Time:</span><span>{date}</span> |
              <span>Votes:</span><span>{postDetails.voteScore}</span> |
              <span>Deleted:</span><span>{String(postDetails.deleted)}</span>
            </div> 
    		<hr/>
            <ul> 
              {comments && comments.map((c)=>(
                  <li key={c.id}>
    				<div className="well well-lg comment">
    					<h6 className="comment-body">{c.body}</h6>
    					<div className="comment-props">
                          <span>Author:</span><span>{c.author}</span> |
                          <span>Time:</span><span>{c.timestamp}</span> |
                          <span>Votes:</span><span>{c.voteScore}</span> |
                          <span>Deleted:</span><span>{String(c.deleted)}</span> |
    					  <span>Parent Deleted:</span><span>{String(c.parentDeleted)}</span>
                        </div>                  
                        <button type="button" className="btn btn-primary btn-sm" onClick={()=>this.openModal("Edit",c.id,c.body)}>Edit</button> 
            			<button type="button" className="btn btn-danger btn-sm" 
							onClick={()=>this.props.deleteComment(postDetails.id,c.id)}>Delete</button> 
    					<button type="button" className="btn btn-info btn-sm" onClick={()=>this.props.voteComment("upVote",postDetails.id,c.id)}>Like</button> 
    					<button type="button" className="btn btn-warning btn-sm" onClick={()=>this.props.voteComment("downVote",postDetails.id,c.id)}>Dislike</button> 
    				</div>
    			  </li>
              ))}
            </ul>
        </div>
		}
    {(postDetails === undefined || postDetails.deleted) && <EmptyMessage/>}
		<Modal isOpen={this.state.modalOpen} onRequestClose={this.closeModal} ariaHideApp={false}>
		<form className="commentForm" id="commentForm">
            <div className="form-group">
              <label htmlFor="Body">Body</label>
              <input type="text" className="form-control" id="comment-body" defaultValue={this.state.body && this.state.body}/> 
            </div> 
			{this.state.action==='Add' && (
                <div className="form-group">
                  <label htmlFor="author">Author</label>
                  <input type="text" className="form-control" id="comment-author"/>
                </div>  
      		)}
            <button type="submit" className="btn btn-success btn-sm" onClick={(e)=>{this.closeModal();this.createComment(e)}}>Submit</button>
          </form>
		</Modal>
    </div> 
  )}

}

function mapStateToProps(state,ownProps){
  return{
	posts:state.posts
  }
}
function mapDispatchToProps(dispatch){
	return {
		vote:(option,id) => dispatch(votePost(option,id)),
		deletePost:(id) => dispatch(deletePost(id)),
		voteComment:(option,pid,cid)=>dispatch(voteComment(option,pid,cid)),
		deleteComment:(pid,cid)=>dispatch(deleteComment(pid,cid)),
		addComment:(pid,body,author)=>dispatch(addComment(pid,body,author)),
		editComment:(cid,body)=>dispatch(editComment(cid,body)),
    fetchComments:(id)=>dispatch(fetchComments(id))
 	}
}
export default connect(mapStateToProps,mapDispatchToProps)(PostDetail);
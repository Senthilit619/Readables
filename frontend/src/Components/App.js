import React, { Component } from 'react';
import './app.css';
import {Link} from 'react-router-dom'
import Post from './Post';
import {connect} from 'react-redux';
import CategoryList from './CategoryList';
import {votePost,addPost,setInitialPosts,sort,fetchComments,deletePost} from '../Actions';
class App extends Component {
  
  constructor(props) {
    super(props);    
    this.state = {      
    }
  }
  componentWillMount(){ 
      this.props.setInitialPosts();     
  }
  render() {	  
      let posts = this.props.posts;           
    return (
      <div className="App">      
      <div>
    	  <CategoryList/>
    		<select onChange={(event)=>this.props.sort(event.target.value)}>
    			<option value="">--Select--</option>
    			<option value="voteScore">VoteScore</option>
    			<option value="timestamp">Time</option> 
    		</select>	
        {posts.map((c)=>(                  
        <Post key={c.id} id={c.id} title={c.title} author={c.author} 
              deleted={c.deleted} timestamp={c.timestamp} body={c.body} voteScore={c.voteScore}              
              category={c.category} 
              onVote={(option,id)=>{this.props.vote(option,id)}}               
              onDelete={(id)=>{this.props.deletePost(id)}}
              fetchComments={(id)=>{this.props.fetchComments(id)}} >
    	  </Post>        
        ))}
		    <Link to="/create">
          <button type="button" className="btn btn-primary btn-sm post-btn">Add Post</button>
        </Link>
       	</div>        
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
    deletePost:(id) => dispatch(deletePost(id)),
		setInitialPosts:(posts) => dispatch(setInitialPosts(posts)),
		vote:(option,id) => dispatch(votePost(option,id)),
		addPost:(post) => dispatch(addPost(post)),
		sort:(attr) => dispatch(sort(attr)),
		fetchComments:(id)=>dispatch(fetchComments(id))
 	}
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

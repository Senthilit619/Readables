import React,{Component} from 'react'
import Post from './Post';
import {Link} from 'react-router-dom'; 
import {connect} from 'react-redux';
import {votePost,sort,deletePost,fetchComments} from '../Actions'; 
import CategoryList from './CategoryList';
class Category extends Component{
	constructor(props){
      super(props);
      this.state = {
        posts: []
      }
    }  
    componentDidMount(){       
    }
  render(){  	
    let posts = this.props.posts.filter((post)=>(post.category === this.props.match.params.cName));
  return(  	
    <div>
    <CategoryList/>
    	<select onChange={(event)=>this.props.sort(event.target.value)}>
  			<option value="">--Select--</option>
  			<option value="voteScore">VoteScore</option>
  			<option value="timestamp">Time</option> 
  		</select>	
    	{posts.map((c)=>(                       
         <Post  key={c.id} id={c.id} title={c.title}
                author={c.author} deleted={c.deleted} timestamp={c.timestamp} 
                body={c.body} voteScore={c.voteScore} category={c.category}
                countScore={c.countScore} 
                onVote={(option,id)=>{this.props.vote(option,id)}}
                onDelete={(id)=>{this.props.deletePost(id)}}
                fetchComments={(id)=>{this.props.fetchComments(id)}}>
    	 </Post>   
  		))}
		<Link to="/create">
        	<button type="button" className="btn btn-primary btn-sm post-btn">Add Post</button>
        </Link>
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
		vote:(option,id) => dispatch(votePost(option,id)),      
		sort:(attr) => dispatch(sort(attr)),
    fetchComments:(id)=>dispatch(fetchComments(id))
 	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Category);
import {combineReducers} from 'redux';
import {VOTE_POST,SET_INITIAL_POSTS,DELETE_POST,EDIT_POST,ADD_POST,SORT,FETCH_COMMENTS,VOTE_COMMENT,DELETE_COMMENT,ADD_COMMENT,EDIT_COMMENT} from '../Actions'

function post(state = [],action){  
  switch(action.type){      
    case SET_INITIAL_POSTS:{      
      if(action.payload)
      	return action.payload
      else
        return null
    }  
    case ADD_POST:{
      let newPost = {
      	id:action.id,
        timestamp:Date.now(),
        title:action.title,
        body:action.body,
        author:action.author,
        category:action.category
      }      
      state.push(newPost);
      return state;
    }
    case EDIT_POST:{      	
    	return state.map((post)=>{
        	if(post.id === action.id){
              post.title = action.title;
              post.body = action.body;
              post.timestamp = Date.now();  
            }
          return post;
        });      
    }
    case DELETE_POST:{
      return state.filter((post)=>post.id !== action.id);
    }
    case VOTE_POST:{        
      let newState = state.map((post)=>{
      	if(post.id === action.id){
          if(action.option === 'upVote')
            post.voteScore += 1;
          else if (action.option === 'downVote')
            post.voteScore -= 1;       	   
          return post;
      	}
        else
          return post;
    	}   
    )     
      return newState;
    }      
    case SORT:{      
      let newState = state.slice(0);
      newState.sort(function (a, b) {          
        return a[action.attr] - b[action.attr];
      })      
      return newState;        
    }
    case FETCH_COMMENTS:{        
      return state.map((post)=>{
        if(post.id === action.id){            
          let comments = action.comments.map((comment)=>{
            let date = new Date(comment.timestamp);
            comment.timestamp = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
            return comment
          });
          post.comments = comments; 
          return post;
        }
        else
          return post;
      })     
    }   
    case ADD_COMMENT:{      
      let newComment = {
      	id:action.cid,
        timestamp:action.timestamp,
        body:action.body,
        author:action.author,
        parentId:action.pid,
        deleted:action.deleted,
        parentDeleted:action.parentDeleted,
        voteScore:action.voteScore
      }     
      let newState =  state.map(post=>{
        if(post.id === action.pid){
          	post.comments.push((newComment));
          	return post;
        }
        else
          return post;
      })      
      return newState;
    } 
    case EDIT_COMMENT:{     
      let newState = state.map((post)=>{        
        if(post.comments){
          post.comments.map((comment)=>{
            if(comment.id === action.id){
              comment.body = action.body;
              let date = new Date();
              date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
              comment.timestamp = date;
            }
            return comment;
          })
        }
        return post;
      });           
      return newState;
    }        
    case DELETE_COMMENT:{     
    	return state.map((post)=>{
          if(post.comments)
          	return {...post,comments:post.comments.filter((comment)=>comment.id !== action.cid)}
          else
            return post;
        });
    }  
    case VOTE_COMMENT:{        
      let newState = state.map((post)=>{
        if(post.id === action.pid){
          post.comments.map((comment)=>{
            if(comment.id === action.cid){
              if(action.option === 'upVote')
                comment.voteScore += 1;
              else if (action.option === 'downVote')
                comment.voteScore -= 1;  
            }
            return comment;
          })
          return post;
        }
        else
          return post;
      })      
      return newState;
    }
    default:{    
          return state;
    }
    }  
}
export default combineReducers({ 
  posts:post
})


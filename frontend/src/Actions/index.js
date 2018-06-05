export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const SET_INITIAL_POSTS = 'SET_INITIAL_POSTS'
export const EDIT_POST = 'EDIT_POST'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const VOTE_POST = 'VOTE_POST'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const SORT = 'SORT'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const DELETE_POST = 'DELETE_POST'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function setInitialPosts(){   
  return {
    type: SET_INITIAL_POSTS
  }
}
export function addPost(title,body,author,category){  
  return {
    type: ADD_POST,
    title,body,author,category
  }
}
export function editPost(id,title,body){ 
  return{
	type: EDIT_POST,
    id,
    title,
    body
  }
}
export function deletePost(id){    
  return{
	type: DELETE_POST,
    id
  }
}
export function votePost(option,id){ 
  return{
	type: VOTE_POST,
    option,
    id,
  }
}
export function sort(attr){
  return {
    type: SORT,
    attr
  }
}
export function fetchComments(id){    
  return {
    type: FETCH_COMMENTS,
    id
  }
}
export function addComment(pid,body,author){  
  return {
    type: ADD_COMMENT,    
    pid,
    body,
    author
  }
}
export function editComment(id,body){
  return{
	type: EDIT_COMMENT,
    id,
    body
  }
}
export function deleteComment(pid,cid){
  return{
	type: DELETE_COMMENT,
    pid,
    cid
  }
}
export function voteComment(option,pid,cid){    
  return{
	type: VOTE_COMMENT,
    option,
    pid,
    cid
  }
}

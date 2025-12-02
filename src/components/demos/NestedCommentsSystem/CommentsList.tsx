'use client'

import React, { useState, useCallback } from 'react'
import "./style.css"
import Comments from './components/Comments'
import { comments as commentsData } from './data/data'


export default function CommentsList() {

  const [comments, setComments] = useState(commentsData);

  // Recursively add a new comment as a child of the comment with matching id
  function addCommentRecursive(commentList: any[], newComment: any, parentId: number): any[] {
    return commentList.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          children: [...comment.children, newComment],
        };
      }
      if (comment.children && comment.children.length > 0) {
        return {
          ...comment,
          children: addCommentRecursive(comment.children, newComment, parentId),
        };
      }
      return comment;
    });
  }

  function deleteCommentRecursive(commentList: any[], targetId: number): any[] {
    return commentList
      .filter(comment => comment.id !== targetId)              // remove the target if found at this level
      .map(comment => {
        if (comment.children && comment.children.length > 0) {
          return {
            ...comment,
            children: deleteCommentRecursive(comment.children, targetId) // recursively clean children
          };
        }
        return comment;
      });
  }


  const handleAddComment = useCallback((newComment: any, id: number) => {
    setComments(prev => addCommentRecursive(prev, newComment, id))
  }, []);


  const handleDeleteComment =  useCallback((id: number) => {
    setComments(prev => deleteCommentRecursive(prev, id));
  }, []);


  return (
    <div className='root'>CommentsList
      {
        comments.map((comment) => (
          <Comments key={comment.id} comment={comment}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
          />
        ))
      }
    </div>
  )
}

'use client';

import { useState, memo } from 'react'
import "../style.css"

interface Comment {
    id: number;
    text: string;
    children: Comment[];
}

interface CommentsProps {
    comment: Comment;
    onAddComment: (newComment: Comment, id: number) => void;
    onDeleteComment: (id: number) => void;
}

const Comments = memo(({ comment, onAddComment, onDeleteComment }: CommentsProps) => {
    const { id, text, children } = comment;
    const [isReplying, setIsReplying] = useState(false);
    const [checkReply, setCheckReply] = useState(false);
    const [newComment, setNewComment] = useState('');

    const handleDeleteComment = (id : number) => {
        onDeleteComment(id);
    }

    const handleAddComment = (id: number, newComment: string) => {
        if (!newComment.trim()) return;
        
        setNewComment('');
        const newCommentObject: Comment = {
            id: Date.now(),
            text: newComment,
            children: []
        }

        onAddComment(newCommentObject, id);
        setIsReplying(false);
    }

    return (
        <div className="comment-root">
            <div className='comment-text'>{text}</div>
            <div className='comment-actions'>
                <button onClick={() => setIsReplying(prev => !prev)}>{isReplying ? 'Cancel' : 'Reply'}</button>
                <button onClick={() => handleDeleteComment(+id)}>Delete</button>
            </div>

             {
                isReplying && (
                    <div className='comment-reply'>
                        <input 
                            type="text" 
                            placeholder='Add a comment' 
                            value={newComment} 
                            onChange={(e) => setNewComment(e.target.value)}
                            autoFocus
                        />
                        <button onClick={() => handleAddComment(+id, newComment)}>Add Comment</button>
                    </div>
                )
            }
            {
                children && children?.length > 0 && (
                    <div className='comment-expand'>
                        <button onClick={() => setCheckReply(prev => !prev)}>{checkReply ? 'Collapse' : 'Expand'}  {children?.length} replies</button>
                    </div>
                )
            }
           
            {
                !!children && checkReply && children?.map((child: Comment) => (
                    <Comments key={child.id} comment={child}
                        onAddComment={onAddComment}
                        onDeleteComment={onDeleteComment}
                    />
                ))
            }
        </div>
    )
});

Comments.displayName = 'Comments';

export default Comments;

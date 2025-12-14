'use client';

import { useState, memo } from 'react'
import "../style.css"
import { Button } from '@repo/ui';
import { ButtonVariant, ButtonSize } from '@/types/types';

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
                <Button 
                    onClick={() => setIsReplying(prev => !prev)}
                    variant={ButtonVariant.GHOST}
                    size={ButtonSize.SM}
                    className="bg-grey border-2 border-green rounded-[5px] px-[2px] text-black"
                >
                    {isReplying ? 'Cancel' : 'Reply'}
                </Button>
                <Button 
                    onClick={() => handleDeleteComment(+id)}
                    variant={ButtonVariant.GHOST}
                    size={ButtonSize.SM}
                    className="bg-grey border-2 border-green rounded-[5px] px-[2px] text-black"
                >
                    Delete
                </Button>
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
                        <Button 
                            onClick={() => handleAddComment(+id, newComment)}
                            variant={ButtonVariant.GHOST}
                            size={ButtonSize.SM}
                            className="bg-grey border-2 border-green rounded-[5px] px-[3px] text-black"
                        >
                            Add Comment
                        </Button>
                    </div>
                )
            }
            {
                children && children?.length > 0 && (
                    <div className='comment-expand'>
                        <Button 
                            onClick={() => setCheckReply(prev => !prev)}
                            variant={ButtonVariant.GHOST}
                            size={ButtonSize.SM}
                            className="rounded-[5px]"
                        >
                            {checkReply ? 'Collapse' : 'Expand'}  {children?.length} replies
                        </Button>
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

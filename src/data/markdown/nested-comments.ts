export const NESTED_COMMENTS_MD = `
# Nested Comments System

Design a component that renders a tree of comments. 
Each comment can have replies, and those replies can have replies (n-levels deep). 
There will an option to add a new comment and also delete a comment.

## High level idea

-> It is essentialy a tree
-> each comment can have zero or more children
-> when you reply a new node is added to the tree
-> and deleting a comment removes the node from the tree


## Implementation Strategy


### Step 1 : Let's design the architecture of the component

-> Let's store the comments in a tree like structure
    -> each comment has : id, text and children
-> the entire comment list is an array list of root level comments
-> each comment may contain nested levels of comments


So basically we will maintain the comments as a tree of objects, where each node represents
a comment and contains an array of replies


sample data structure :
\`\`\`js

  const comments = [
    {
      id: 1,
      text: 'Hello, how are you?',
      children: []
    },
    {
      id: 2,
      text: 'I am fine, thank you!',
      children: [
        {
          id: 3,
          text: 'I am good, thank you!',
          children: []
        }
      ]
    }
  ];

\`\`\`


### Step 2 : Let's create the component

1. Comment list component to handle the top level of comments
2. comment item component to handle the individual comment. this renders 
a single comment 
    - the comment text
    - reply button to add a new reply
    - delete button to delete the comment
    - children comments recursively
    - conditionally a reply input field when user clicks reply

Components :
- CommentList
- Comment


### Step 3 : data flow

 -> there are three flows
  : reply flow
  : delete flow
  : rendering flow


  reply flow :
    - user clicks on the reply button
    - a new comment input field is shown
    - when user submits the comment
     - a new comment object is created
     - gets inserted in the parent.children
     - state gets updated
    - ui re-renders to show the new comment

  delete flow :
    - user clicks on the delete button
    - the comment is removed from the tree
    - state gets updated
    - ui re-renders to remove the comment

  rendering flow :
    - CommentList renders the top-level comments.
    - Each Comment renders itself and recursively renders children.
    - React handles updates automatically
`;



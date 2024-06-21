let express=require('express');
let {checkTcken} =require('../Auth/auth.middleware.js')
const { comments, getCommentByUser, updateComment, deleteComment, replyByUser, createUser } = require('../controller/user.controller');
let router=express.Router()


// Create a new user
router.post('/users',checkTcken, createUser);


//COmment by user
router.post('/comment',checkTcken, comments);


//reply by user
router.post('/comments/:commentId/replies',checkTcken,  replyByUser);

//get a comment by reply
router.get('/comments/:commentId',checkTcken, getCommentByUser);

//update a comment
router.put('/comments/:id',checkTcken, updateComment);

//delete a comment
router.delete('/comments/:id',checkTcken, deleteComment);













module.exports=router
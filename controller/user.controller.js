let Comment=require('../model/comment.model')
let User=require('../model/user.model')


exports.createUser=async (req, res) => {
    try {
        const { name, email, gender } = req.body;
        const newUser = await User({ name, email, gender });
        const savedData=await newUser.save()
       return res.status(201).json(savedData);
    } catch (err) {
      return  res.status(400).json({ error: err.message });
    }
}

exports.comments=async (req, res) => {
    try {
        const { text, authorId } = req.body;
    const commentData = new Comment({ text, author: authorId });;
    const savedData = await commentData.save();
        res.status(201).json(savedData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


exports.replyByUser= async (req, res) => {
    try {
        const { text, authorId } = req.body;
        console.log(text, authorId, req.params.commentId)
        const parentComment = await Comment.findById(req.params.commentId);
        
        if (!parentComment) {
            return res.status(404).json({ error: 'Parent comment not found' });
        }

        const newReply = await Comment.create({ text, author: authorId });

        parentComment.replies.push(newReply._id);
        await parentComment.save();

        res.status(201).json(newReply);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.getCommentByUser= async (req, res) => {
    try {
        
        console.log(req.params.commentId)
        const comment = await Comment.findById(req.params.commentId).populate('author replies');
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.json(comment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.updateComment=async (req, res) => {
    try {
        const {text } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, { text }, { new: true });
        if (!updatedComment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.json(updatedComment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.deleteComment=async (req, res) => {
    try {
         
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
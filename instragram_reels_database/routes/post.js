const { connection } = require("mongoose");

postRouter.get("/mypost/:id", authMiddleware, (req, res) => { 
    const id= req.params.id;
    connection.query("select fullname, email,profile_pic,video_url from posts inner join users on users.id = posts.user_id where users.id=?",
     (err, result) => {
    if (err) {
    res.json({
    success: 0,
    error: err.message
    })
    }
     else {
    
    if (result.length > 0) {
    
    res.json({
    
    result: result
    
    })
}
     else {
    res.json({
    success: 0,
    error: "User not found or invalid user id."
    })
}
     
    
// do like
postRouter.post("/dolike/:id", authMiddleware, (req, res) => {
    const id=req.params.id;
    jwt.verify(token, secret, (err, user) => {
    if (err) {
    res.send({
    success: 0,
    error: "Auth failed.."
    })
}
    
    else {
    connection.query("insert into likes(user_id,post_id) values(?,?)",[user.id,id],(err,result)=>{
        if (err) {
            res.send({
                success: 0,
                error:err.message
            })
        }
        else{
            res.json({
            success:0
        })
    }
  } 
})
    
    // do not like
    postRouter.post("/dontlike/:id", authMiddleware, (req, res) => {
        const id=req.params.id;
        jwt.verify(token, secret, (err, user) => {
            if (err) {
            res.send({
            success: 0,
            error: "Auth failed.."
            })
        }
            
            else {
            connection.query("insert into likes(user_id,post_id) values(?,?)",[user.id,id],(err,result)=>{
                if (err) {
                    res.send({
                        success: 0,
                        error:err.message
                    })
                }
                else{res.json({
                    success:0
                })
            }
            
            
            }
            
            
        })

//check like
postRouter.get("/checklike/:id", authMiddleware, (req, res) => {
    const id =req.params.id;
    const authHeadder =req.headers['authorization'];
    const token= authHeadder && authHeadder.split(" ")[1];
   
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            res.send({
                success: 0,
                error: "Auth failed.."
            })
        }
        else {
            connection.query("select from likes where user_id? and post id=?", [user.id,id],(err,result)=>{
                if (err) {
                    res.json({
                        success:0,
                        error:err.message
                    })
                } else{
                    if (result.length>0){
                        res.json({
                            success:1
                        })
                    } else{
                        res.json({
                            success:0
                        })
                    }
                }
            })
        }
    })
})

//count likes
postRouter.get("/countlikes/:id", authMiddleware,(req,res)=>{
    const id=req.params.id;
    connection.query("select count(*) as count from likes where post_id=?",[id], (err,result)=>{
        if (err){
            res.json({
                success:0,
                error:err.message
            })
        } else{
            if(result.length>0){
                res.json({
                    result:result[0]
                })
            }
        }
    })
})

//do comment
postRouter.post("/comment/:id", authMiddleware, (req, res) => {
    const id =req.params.id;
    const text=req.params.text;
    const authHeadder = req.headers['authorization'];
    const token= authHeadder && authHeadder.split(" ")[1];
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            res.send({
                success: 0,
                error: "Auth failed.."
            })
        }
        else {
            connection.query("insert into comment(user_id,post_id,text) values(?,?,?)", [user.id, id], (err, result) => {
                if (err){
                    res.json({
                        success: 0,
                        error: err.message
                    })
                } else {
                    res.json({
                        success: 0
                        })
                }
            })
        }
    })
})

//delete comment
postRouter.delete("/deletecomment/:id", authMiddleware, (req, res) => {
    const id =req.params.id;
    connection.query("delete from comment where id= ?", [id], (err, result) => {
        if (err) {
            res.json({
                success: 0,
                error: err.message
            })
        } else {
            res.json({
                success: 1
            })
        }
    })
})
    
//update comment
postRouter.put("/updatecomment/:id", authMiddleware, (req, res)=>{
    const id= req.params.id; 
    const text =req.body.text;
    connection.query("update comment set text = ? where id= ?", [text, id], (err, result) => { 
        if (err) {
            res.json({
                success: 0,
                error: err.message
            })
        } else {
            res.json({
                success: 1
            })
        }
    })
})

//get comments
postRouter.get("/getcomments/:id", authMiddleware, (req, res)=>{
    const id= req.params.id; 
    connection.query("select fullname,text,post_id,comment.id from comment inner join users on comment.user_id=user.id where comment.post_id= ?", [id], (err, result) => { 
        if (err) {
            res.json({
                success: 0,
                error: err.message
            })
        } else {
            res.json({
                success: 1,
                result:result
            })
        }
    });

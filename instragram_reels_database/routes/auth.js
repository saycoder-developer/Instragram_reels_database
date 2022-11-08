router.post('/signup, async (req, res) => {
let { emailid, password, profile_pic, fullname} = req.body
password= await bcrypt.hash (password, 10);
connection.query('INSERT INTO users (emailid, password, profile_pic, fullname) VALUES (?, ?, ?, ?)',
 [emailid, password, profile_pic, fullname], (err, results) => {
if (err) {
res.status(500).send(err.message);
} 
else {
connection.query('SELECT * FROM users WHERE emailid = ?', [emailid], (err, results) => {

if (err) {
res.status(500).send(err);
} 
else { 
    delete results[0].password;
res.set(
'Set-Cookie',
cookie.serialize('user', JSON.stringify(results[0]), { 

httpOnly: true,
sameSite: 'strict',
maxAge: 3600,
path: '/',
})
)
res.status(200).json (results[0]);
}

});
}
}
};


router.post('/login', (req, res) => {

    const { email, password } = req.body; console.log(email, password);
    
    connection.query("SELECT FROM users WHERE emailid ?", [email], async (err, results) ->
    
    console.log(results);
    
    if (err) {
    
    res.status(500).send(err);
    
    } else {
    
    if (results.length > 0) {
    
    // check if the password is correct let ans await bcrypt.compare (password, results[0].password);
    
    if (ans) { delete results[0].password;
    
    res.set(
    
    'Set-Cookie',
    
    cookie.serialize('user', JSON.stringify(results[0]), {
    
    httpOnly: true,
    
    sameSite: 'strict', maxAge: 3600,
    
    path: '/',
    
    })
    
    results[0].token await jsonwebtoken.sign({ ...results[0] }, SECRET, { expiresIn: '10h }); res.status(200).json(results[0]);
    
    else {
    
    res.status(400).send('Incorrect password');
    
    } } else {
    
    res.status(400).send('Incorrect email');
    }}}}}}


    postRouter.get("/:id", authMiddleware, (req, res)=>{
        const id= req.params.id; 
        connection.query("select * from posts inner join users on users.id= posts.user_id where user_id=?",[id], 
        (err,result)=>{
        if (err){
        res.json({
        success:0,  
        error:err.message
        })
    }
        else{
        if(result.length>0){
        res.json({
        result: result[0]
        })
        }else{
        res.json({
        success:0, 
        error: "post not found or invalid id"
        })
    }
}

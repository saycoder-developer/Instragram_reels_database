import express from 'express';
import jwt from 'jsomwebtoken';
import connection from '../db.js';
import authMiddleware from '../middleware/authMiddleware.js';

const friendsrouter= express.Router();

friendsrouter.post('/sendrequest', authMiddleware, (req, res) => {
    const { friendId } = req.body;
    const authHeadder = req.headers['authorization'];
    const token = authHeadder && authHeadder.split(" ")[1];
    jwt.verify(token, secret, (err, user) => {
        if (err){
            res.send({
                success: 0,
                error: "Auth failed.."
            })
        } else {
            connection.query("insert into friends(sender_id, receiver_id) values (7,7)", (user.id, friendid),(err,result){
                if (err){
                    res.send({
                        success: 0,
                        error:err.message
                    })
                } else{
                    if (result){
                        res.json({
                            success:1
                        })
                    }
                }
            })
        }
    })
})

friendsrouter.post('/acceptrequest', authMiddleware, (req, res) => {
    const authHeadder= req.headers['authorization'];
    const token =authHeadder && MauthHeadder.split(" ")[1];
    const {friendId}= req.body;
    jwt.verify(token, secret, (err, user)=>{
        connection.query("update friends set status-1 where sender_ide? and receiver_id=?", [friendid, user.id],(err,result){
            if (err) {
                res.send({
                    success: 0,
                    error: err.message
                }) 
            }
                else {
                    if (result) {
                        res.json({
                            success: 1
                        })
                    }
                }
            }
        })
    } 
})

friendsrouter.delete('/reject request/:id', authMiddleware, (req, res) => {
    const {friendId} = req.params;
    connection.query("delete from friends where id= ?", [id], (err, result) => {
    if (err){
        res.send({
            success: 0,
            error: err.message
        }) 
    }else {
            if (result) {
                res.json({
                    success: 1
                })
            }
        }
    })
})

friendsrouter.get('/myfriends', authMiddleware, (req, res) => {
    const authHeadder =req.headers['authorization'];
    const token =authHeadder && authHeadder.split(" ")[1];
    jwt.verify(token, secret, (err, user) => {
        connection.query(
            "select * from friends where receiver_id=? and status=0", like '%${query}%'',[user.id],(err,result)=>{
                if (err) {
                    res.send({
                        success: 0,
                        error: err.message
                    })
                } else {
                    if (result) {
                        res.json({
                        success: 1
                    })
                }}
            }
        )
    })
})

export default friendsrouter;
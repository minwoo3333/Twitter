
import { useVirtualId } from '../db/database.js';
import * as AuthRepository from './auth.js'


import Mongoose from 'mongoose';


const tweetSchema = new Mongoose.Schema({
    text: { type: String, required: true },
    userId: { type: String, require:true},
    name: {type: String, require:true},
    username: { type: String, required: true },
    url: String,},
    {timestamps: true}
);

useVirtualId(tweetSchema);
const Tweet = Mongoose.model('Tweet', tweetSchema);




// 모든 트윗을 리턴
export async function getAll() {
    return Tweet.find().sort({ createdAt: -1});
}


// 해당 아이디에 대한 트윗을 리턴
export async function getAllByUsername(username){
    return Tweet.find({ username }).sort({ createdAt: -1 });
}


// 글번호에 대한 트윗을 리턴
export async function getById(id){
    return Tweet.findById(id);
}




// 트윗 생성
export async function create(text, userId) {
    return AuthRepository.findById(userId).then((user) =>new Tweet({
        text,
        userId: user._id,
        username: user.username,
        url: user.url
    }).save())
}


    
// 트윗을 변경
export async function update(id, text){
    return Tweet.findByIdAndUpdate(id, { text }, { returnDocument: "after" });
}



export async function remove(id){
    return Tweet.findByIdAndDelete(id);
}




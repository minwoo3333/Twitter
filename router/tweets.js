import express from "express";
import * as tweetController from '../controller/tweet.js'
import {body} from 'express-validator'
import { validate } from "../middleware/validator.js"
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

/*
    문제
    Post, Put에 text에 대해 빈문자열을 없애고, 최소 3자 이상 입력해야 데이터를 저장하도록 API에 적용
*/
const validateTweet = [
    body('text').trim().isLength({min:3}).withMessage('최소 3자 이상 입력'), validate
]





// 해당 아이디에 대한 트윗 가져오기
// GET
// http://localhost:8080/tweets?username=:username
// router.get('/', (req, res, next) => {
//     const username = req.query.username;
//     const data = username
//         ? tweets.filter((tweet) => tweet.username == username)
//         : tweets;
//     res.status(200).json(data);
// });

router.get('/', isAuth,tweetController.getTweets);


// 글번호에 대한 트윗 가져오기
// GET
// http://localhost:8080/tweets/:id
// router.get('/:id', (req, res, next) => {
//     const id = req.params.id;
//     const tweet = tweets.find((tweet) => tweet.id === id);
//     if(tweet){
//         res.status(200).json(tweet);
//     }else{
//         res.status(404).json({message: `${id}의 트윗이 없습니다`});
//     }
// });

router.get('/:id', isAuth,tweetController.getTweet);




// 트윗하기
// POST
// http://localhost:8080/tweets
// name, username, text
// json 형태로 입력 후 추가된 데이터까지 모두 json으로 출력
// router.post('/', (req, res, next) => {
//     const { text, name, username } = req.body;
//     const tweet = {
//         id: '10',
//         text: text,
//         createdAt: Date.now().toString(),
//         name: name,
//         username: username,
//         url: 'https://www.logoyogo.com/web/wp-content/uploads/edd/2021/02/logoyogo-1-45.jpg'
//     };
//     tweets = [tweet, ...tweets];
//     res.status(201).json(tweets);
// });

router.post('/',isAuth, validateTweet, tweetController.createTweet);



// 트윗 수정하기
// PUT
// http://localhost:8080/tweets/:id
// id, username, text
// json 형태로 입력 후 변경된 데이터까지 모두 json으로 출력
// router.put('/:id', (req, res, next) => {
//     const id = req.params.id;
//     const text = req.body.text;
//     const tweet = tweets.find((tweet) => tweet.id === id);
//     if(tweet){
//         tweet.text = text;
//         res.status(201).json(tweet);
//     }else{
//         res.status(404).json({message: `${id}의 트윗이 없습니다`});
//     }
// });


router.put('/:id', validateTweet,isAuth, tweetController.updateTweet);




// 트윗 삭제하기
// DELETE
// http://localhost:8080/tweets/:id
// router.delete('/:id', (req, res, next) => {
//     const id = req.params.id;
//     tweets = tweets.filter((tweet) => tweet.id !== id);
//     res.status(204)
// });
// export default router;

router.delete('/:id',isAuth, tweetController.deleteTweet);

export default router;
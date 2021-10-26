"use strict";
const aws=require('aws-sdk');
const db=new aws.DynamoDB.DocumentClient({apiVersion:'2012-08-10'});
const posttable=process.env.post_table;
// const uuid=require('uuid');
// uuid.v4();
const { v4: uuidv4 } = require('uuid');
uuidv4(); 

function response(statusCode,message){
  return{
    statuscode:statusCode,
    body:JSON.stringify(message)
  };
}
module.exports.hello = async (event,context,callback) => {
const reqbody=JSON.parse(event.body);


const post={
id:uuidv4(),
createdAt:new Date().toISOString(),
userId:1,
title:reqbody.title,
body:reqbody.body,
};
return db.put({
  TableName:posttable,
  Item: post
}).promise().then(()=>{
  response(200,success)
})
.catch(err=>response(null,response(err.statusCode,err)));
}

module.exports.getpost=async (event,context,callback)=>{
  return db.scan({
    TableName:posttable
  }).promise().then(res =>{
    callback(null,response(200,res.Items))
  }).catch(err => callback(null,response(err.statusCode,err)))
}
import {useEffect,useState}from 'react';
export const getPosts = async()=>{
    const response2 = await fetch("http://webshop-dev-env.eba-v7q5pntk.eu-central-1.elasticbeanstalk.com/api/products",{
        
        // method:"GET",
    });
   
    let data= await response2.json();
    //   console.log("i am in Index");
    //   console.log(data);
    //   TesTing(data);
    return  data;
};
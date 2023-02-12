'use client'
import axios from "axios";
import { useEffect } from "react";
import { json } from "stream/consumers";

const Test = () => {
  useEffect(() => {
    const body = {
      wallet_addresss: '0x123456',
      name: 'test',
      user_name: 'test_username6',
      profile_image: 'test_profile_image',
      followers_count: 0,
      online_status: true,
    }
    try{
      axios.post('http://localhost:3000/api/createUser', body).then((res) => {
        //console.log(res.data);
      })
    }catch(error){
      console.log(error)
    }
   
  }, []);

  return <div>Test</div>;
};

export default Test;

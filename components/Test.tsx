'use client'
import axios from "axios";
import { useEffect } from "react";

const Test = () => {
  useEffect(() => {
    const body = {
      wallet_address: '0x123',
      name: 'test',
      user_name: 'test_username',
      profile_image: 'test_profile_image',
    }
    axios.post('http://localhost:3000/api/createUser', body).then((res) => {
      console.log(res.data);
    })
  }, []);

  return <div>Test</div>;
};

export default Test;

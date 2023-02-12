'use client'
import Head from "@/app/head";
import axios from "axios";
import { useEffect } from "react";
import { json } from "stream/consumers";

const Test = () => {
  // useEffect(() => {
  //   const body = {
  //     wallet_addresss: '0x123456',
  //     name: 'test',
  //     user_name: 'test_username6',
  //     profile_image: 'test_profile_image',
  //     followers_count: 10,
  //     online_status: false,
  //     type: 'onlineStatus'
  //   }
  //   try{
  //     axios.post('http://localhost:3000/api/updateUserData', body).then((res) => {
  //       console.log(res.data);
  //     })
  //   }catch(error){
  //     console.log(error)
  //   }
   
  // }, []);


  useEffect(() => {
    const body = {
      nft_address : 'testAddress1',
      mint_price : 1.2,
      nft_quantity: 30,
      nft_title: "New NFT",
      nft_base_uri: "base Uri",
      nft_image_uri: "imageUri",
      nft_symbol: "nft symbol",
      nft_owner_address: "0x123",
      nft_sold_count: 0,
      nft_count: 1
    }
    try{
      axios.post('http://localhost:3000/api/updateNft', body).then((res) => {
          console.log(res.data);
        })
    }catch(error){
      console.log(error)
    }
  }, []);

  return <div>Test</div>;
};

export default Test;

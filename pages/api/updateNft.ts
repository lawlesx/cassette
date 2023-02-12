import { supabase } from "@/lib/supabaseClient";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: any
    error: any
}

//in body:
//nft_addresss
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    // console.log(req.method)
    // if(req.method === 'OPTIONS'){
    //     res.setHeader('Access-Control-Allow-Origin', '*');
    //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    //     console.log("duplicate")
    //     return res.status(204).end();
    // }
        const checkQuant =  await checkQuntityleft(req.body.nft_address)
        if(checkQuant){
            const result = await updateNftSoldCount(req.body.nft_address)
            if(result){
                res.status(200).json({ name: 'success', error: false })
            }
            else{
                res.status(200).json({name: 'fail', error: true})
            }
        }
        else{
            res.status(200).json({name: 'soldOut', error: true})
        }
}

async function updateNftSoldCount(nft_address: any): Promise<boolean>{
    try{
        await supabase.rpc('inceremnt',{nft_address})
        return true
    }catch(error){
        return false
    }
}

async function checkQuntityleft(nft_address:any):Promise<boolean> {
    let result = false
    const body = {
        nft_address: nft_address
    }
    try{
        await axios.post('http://localhost:3000/api/fetchNft', body).then((res) => {
          if(res.data.name[0].nft_quantity > res.data.name[0].nft_sold_count+1){
            result = true
          }else{
            result = false
          }
        })
    }catch(error){
        result = false
    }
    return result
}


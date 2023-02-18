/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: any
  error: any
}

//fetch user data based on wallet address
//pass nft address in body
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // console.log(req.method)
  // if(req.method == 'OPTIONS'){
  //     res.setHeader('Access-Control-Allow-Origin', '*');
  //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  //     return res.status(204).end();
  // }
  try {
    const { data } = await supabase.from('tbl_nft').select().eq('nft_address', req.body.nft_address)
    res.status(200).json({ name: data, error: false })
    //console.log(data)
  } catch (error) {
    res.status(200).json({ name: 'nftDataNotFound', error: true })
  }
}

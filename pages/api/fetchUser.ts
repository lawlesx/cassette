import { supabase } from "@/lib/supabaseClient";
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: any
  error: any
}

//fetch user data based on wallet address
//pass walllet address in body
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    try{
        const {data, error} = await supabase.from('tbl_creator').select().eq('wallet_addresss', req.body.wallet_addresss)

        res.status(200).json({ name: data, error: false })
        console.log(data)
    }catch(error){
        res.status(200).json({ name: 'userDataNotFound', error: true })
    }
}
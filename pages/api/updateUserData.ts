import { supabase } from "@/lib/supabaseClient";
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: any
    error: any
}

//in body:
//wallet_addresss
//type of data to be updated (eg type: 'followerCount' or type:'onlineStatus')
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if(req.body.type == 'followerCount'){
        const result = await updateFollowerCount(req.body.wallet_addresss,req.body.followers_count)
        if(result){
            res.status(200).json({ name: 'success', error: false })
        }
        else{
            res.status(200).json({name: 'fail', error: true})
        }
    }
    if(req.body.type == 'onlineStatus'){
        const result = await updateOnlineStatus(req.body.wallet_addresss,req.body.online_status)
        if(result){
            res.status(200).json({ name: 'success', error: false })
        }
        else{
            res.status(200).json({name: 'fail', error: true})
        }
    }

}

async function updateFollowerCount(wallet_addresss: any, follower_count: any): Promise<boolean>{
    try{
        const {data,error} = await supabase.from('tbl_creator').update({'followers_count': follower_count}).eq('wallet_addresss',wallet_addresss)
        if(error){
            return false
        }
        else{
            return true
        }
    }catch(error){
        return false
    }
}

async function updateOnlineStatus(wallet_addresss: any, onlineStatus: any): Promise<boolean>{

    try{
        const {data,error} = await supabase.from('tbl_creator').update({'online_status':onlineStatus}).eq('wallet_addresss',wallet_addresss)
        if(error){
            return false
        }
        else{
            return true
        }
    }catch(error){
        return false
    }
    
}
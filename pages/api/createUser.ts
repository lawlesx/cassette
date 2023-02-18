/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: any
  error: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // Change this to get data from your table'
  //console.log(supabase)

  console.log(req.body)

  console.log('Wallet Address', req.body.wallet_addresss)

  const checkWalletAddress = await checkIfUserExist(req.body.wallet_addresss)

  if (!checkWalletAddress) {
    const userName = await checkUserNameAvailable(req.body.user_name)
    if (!userName) {
      try {
        const { data, error } = await supabase.from('tbl_creator').insert([req.body]).select()
        if (data) {
          res.status(200).json({ name: data, error: false })
        }
        if (error) {
          throw error
        }
      } catch (error) {
        console.log(error)
        res.status(200).json({ name: null, error: true })
      }
    } else {
      console.log('UserName exists')
      res.status(200).json({ name: 'userNameError', error: true })
    }
  } else {
    console.log('Already exists')
    res.status(200).json({ name: null, error: true })
  }
}

async function checkIfUserExist(wallet_address: any): Promise<boolean> {
  try {
    const { data } = await supabase.from('tbl_creator').select().eq('wallet_addresss', wallet_address)
    if (data?.toString() != '') {
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}

async function checkUserNameAvailable(user_name: any): Promise<boolean> {
  try {
    const { data } = await supabase.from('tbl_creator').select().eq('user_name', user_name)
    if (data?.toString() != '') {
      return true
    } else {
      return false
    }
  } catch (error) {
    return true
  }
}

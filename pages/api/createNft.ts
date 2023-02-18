/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: any
  error: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const checkIfNFTExists = await checkIfNFTExist(req.body.nft_address)

  if (!checkIfNFTExists) {
    try {
      const { data, error } = await supabase.from('tbl_nft').insert([req.body]).select()
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
    console.log('Already exists')
    res.status(200).json({ name: null, error: true })
  }
}

async function checkIfNFTExist(nft_address: any): Promise<boolean> {
  try {
    const { data } = await supabase.from('tbl_nft').select().eq('nft_address', nft_address)
    console.log(data)
    if (data?.toString() != '') {
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}

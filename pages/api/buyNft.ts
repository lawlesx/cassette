/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabaseClient'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: any
  error: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const data = await updateNftTable(req.body.bought_nft_address)
  if (data) {
    try {
      const { data, error } = await supabase.from('tbl_watcher').insert([req.body]).select()
      if (error) {
        res.status(200).json({ name: null, error: true })
        throw error
      } else {
        res.status(200).json({ name: data, error: false })
      }
    } catch (error) {
      console.log(error)
      res.status(200).json({ name: 'error', error: true })
    }
  } else {
    res.status(200).json({ name: 'soldOut', error: true })
  }
}

async function updateNftTable(nft_address: any): Promise<boolean> {
  let result = false
  const body = {
    nft_address: nft_address,
  }
  try {
    await axios.post('http://localhost:3000/api/updateNft', body).then((res) => {
      console.log(res.data.name)
      if (res.data.name == 'soldOut') {
        result = false
      } else if (res.data.name == 'success') {
        result = true
      } else {
        result = false
      }
    })
  } catch (error) {
    console.log(error)
    result = false
  }
  return result
}

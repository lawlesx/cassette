/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: any
  error: any
}

//fetch user data based on stream key
//pass stream key in body
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const { data } = await supabase.from('tbl_stream').select().eq('stream_key', req.body.stream_key)
    res.status(200).json({ name: data, error: false })
  } catch (error) {
    res.status(200).json({ name: 'streamDataNotFound', error: true })
  }
}

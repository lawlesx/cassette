/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: any
  error: any
}

//fetch user data based on stream key
//pass stream key in body
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log('In fetchStream.ts')

  try {
    const { stream_key } = req.query
    const { data } = await supabase.from('tbl_stream').select().eq('stream_key', stream_key)
    res.status(200).json({ data: data?.[0], error: false })
  } catch (error) {
    res.status(200).json({ data: 'streamDataNotFound', error: true })
  }
}

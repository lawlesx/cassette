/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: any
  error: any
}

//in body:
//stream_key
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const stream_key = req.body.stream_key
  try {
    await supabase.rpc('stop_stream', { stream_key })
    const data = 'stream_stopped'
    res.status(200).json({ data: data, error: false })
  } catch (error) {
    res.status(200).json({ data: null, error: true })
  }
}

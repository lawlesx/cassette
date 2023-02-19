/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: any
  error: any
}

//fetch user data based on stream key
//pass stream key as params
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'GET') {
    res.status(405).json({ data: 'methodNotAllowed', error: true })
  }

  const { stream_key } = req.query as { stream_key: string }

  if (!stream_key) {
    res.status(400).json({ data: 'streamKeyRequired', error: true })
  }

  try {
    const { data } = await supabase.from('tbl_stream').select().eq('stream_key', stream_key)
    res.status(200).json({ data: data?.[0], error: false })
  } catch (error) {
    res.status(200).json({ data: 'streamDataNotFound', error: true })
  }
}

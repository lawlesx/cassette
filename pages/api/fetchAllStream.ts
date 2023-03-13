/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: any
  error: any
}

/**
 * @deprecated use supabaseinstead
 * @param req { stream_key: string }
 * @param res stream data based on stream key
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'GET') {
    res.status(405).json({ data: 'methodNotAllowed', error: true })
  }

  try {
    const { data } = await supabase.from('tbl_stream').select()
    res.status(200).json({ data: data, error: false })
  } catch (error) {
    res.status(200).json({ data: 'streamDataNotFound', error: true })
  }
}

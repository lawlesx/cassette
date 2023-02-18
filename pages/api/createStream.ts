/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: any
  error: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // Change this to get data from your table'
  //console.log(supabase)

  console.log(req.body)

  const checkStreamExists = await checkStreamKey(req.body.stream_key)

  if (!checkStreamExists) {
    try {
      const { data, error } = await supabase.from('tbl_stream').insert([req.body]).select()
      if (data) {
        res.status(200).json({ data: data[0], error: false })
      }
      if (error) {
        throw error
      }
    } catch (error) {
      console.log(error)
      res.status(200).json({ data: null, error: true })
    }
  } else {
    console.log('Already exists')
    res.status(200).json({ data: null, error: true })
  }
}

async function checkStreamKey(stream_key: any): Promise<boolean> {
  try {
    const { data } = await supabase.from('tbl_stream').select().eq('stream_key', stream_key)
    if (data?.toString() != '') {
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}

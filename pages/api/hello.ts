/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // Change this to get data from your table'
  //console.log(supabase)
  const { data } = await supabase.from('tbl_temp').select('*')

  console.log(data)

  res.status(200).json({ name: data })
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabase } from '@/lib/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  
) {
  // Change this to get data from your table'
  //console.log(supabase)
  const {wallet_address} = req.body
  const { data } = await supabase.from('tbl_temp').insert(wallet_address)

  console.log(data)

  res.status(200).json({ name: data })
}

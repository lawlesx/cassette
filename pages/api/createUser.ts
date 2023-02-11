// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabase } from '@/lib/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // Change this to get data from your table'
  //console.log(supabase)

  console.log(req.body)

  const { wallet_address } = req.body
  console.log('Wallet Address', wallet_address)

  const { data } = await supabase.from('tbl_creator').insert(req.body)

  console.log(data)

  res.status(200).json({ name: data })
}

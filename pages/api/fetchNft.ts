/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: any
  error: any
}

/**
 *
 * @param req { nft_address: string }
 * @param res user data based on wallet address
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'GET') {
    res.status(405).json({ data: 'methodNotAllowed', error: true })
  }

  const { nft_address } = req.query as { nft_address: string }

  if (!nft_address) {
    res.status(400).json({ data: 'nftAddressRequired', error: true })
  }
  try {
    const { data } = await supabase.from('tbl_nft').select().eq('nft_address', nft_address)
    res.status(200).json({ data: data?.[0], error: false })
    //console.log(data)
  } catch (error) {
    res.status(200).json({ data: 'nftDataNotFound', error: true })
  }
}

import { supabase } from 'utils/initSupabase'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  name: string;
  email: string;
}

const signUp = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.body;
  if (user?.role !== 'authenticated') {
    throw Error('unauthorized')
  }

  const payload: Data = req.body

  const { data, error } = await supabase.from('users').insert([
    {
      name: payload.name,
      email: payload.email,
    },
  ])

  if (data) return res.status(200).json(data)
  else return res.status(500).json(error)
}

export default signUp

import { supabase } from 'utils/initSupabase'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
    id: string
}

const getUserById = async (req: NextApiRequest, res: NextApiResponse) => {
    const { user } = await supabase.auth.api.getUserByCookie(req);

    if (user?.role !== 'authenticated') {
        return res.status(500).json({ error: 'unauthorized' })
    }

    const { id }: Data = req.body

    if (!id || id === 'undefined') {
        return res.status(500).json({ error: 'unauthorized' })
    }

    let { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', id)

    if (users) {
        return res.status(200).json(users[0])
    } else {
        return res.status(500).json({ error })
    }
}

export default getUserById

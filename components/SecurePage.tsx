import { useEffect } from 'react'
import { supabase } from 'utils/initSupabase'
import { useRouter } from 'next/router'
import { UserData } from 'hooks/useUser'

type Props = {
    children: any
}

const SecurePage = ({ children }: Props) => {
    let userData = UserData.useContainer()
    const sUser = supabase.auth.user()
    const { user, loading } = userData
    const router = useRouter()

    useEffect(() => {
        if (!sUser) router.push('/please-login')
    }, [sUser, router])

    return <>{!loading && user && children}</>
}

export default SecurePage

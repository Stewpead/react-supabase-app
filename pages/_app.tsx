import Layout from '@/components/Layout'
import { UserData } from 'hooks/useUser'
import type { AppProps } from 'next/app'
import xhrHeader from '@/constants/xhrHeader'
import { supabase } from '@/utils/initSupabase'

import '@/styles/globals.css'
import { useEffect } from 'react'
export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: any, session: any) => {
        await fetch('/api/set-auth-cookie', {
          ...xhrHeader,
          body: JSON.stringify({ session, event }),
        })
      }
    )

    return () => {
      authListener?.unsubscribe()
    }
  }, [])
  return (
    <UserData.Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserData.Provider>
  )
}

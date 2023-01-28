import { useState, useEffect } from 'react'
import { createContainer } from 'unstated-next'
import { supabase } from 'utils/initSupabase'
import xhrHeader from 'constants/xhrHeader'

export interface User {
  email: string
  name: string
}

const useUser = () => {
  const [loginAttempt, setLoginAttempt] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [sessionUser, setSessionUser] = useState<any>()
  const [user, setUser] = useState<User | null>({
    email: '',
    name: '',
  })

  useEffect(() => {
    ( async () => {
      setSessionUser(await supabase.auth.user())
      if (sessionUser) {
        setLoading(true)
          await fetch('/api/getUserById', {
            ...xhrHeader,
            body: JSON.stringify({ id: sessionUser.id }),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.error === 'unauthorized') {
                if (loginAttempt < 3) {
                  setLoginAttempt(loginAttempt + 1);
                  console.log('error trying again')
                } else {
                  console.log('signing out');
                  supabase.auth.signOut();
                  setLoading(false)
                }
              } else {
                if (res) {
                  setUser({
                    ...res,
                  })
                  setLoading(false)
                }
              }
            }).catch((err) => {
            setUser(null)
            setLoading(false)
          })
      } else {
        setUser(null)
        setLoading(false)
      }
    })()
  }, [sessionUser, loginAttempt])

  return { user, loading }
}

export let UserData = createContainer(useUser)

export default useUser

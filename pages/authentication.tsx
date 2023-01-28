import { useEffect, useState } from 'react'
import { supabase } from 'utils/initSupabase'
import { useRouter } from 'next/router'
import { UserData } from 'hooks/useUser'

import styles from '@/styles/Home.module.css'
import xhrHeader from '@/constants/xhrHeader'
interface AuthDetails {
    email: string
    name: string
    password: string
    confirmPassword: string
}

const Authentication = () => {
    const [authDetails, setAuthDetails] = useState<AuthDetails>({
        email: "",
        name: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState<string[]>([]);
    const router = useRouter();
    const sUser = supabase.auth.user()
    const [registered, setRegistered] = useState<boolean>(false)

    const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { name, email, password, confirmPassword } = authDetails;
        if (password!== confirmPassword) {
            setErrors(errors.concat('Password does not match'))
            return
        } else {
            setErrors([])
        }

        const payload = {
            email,
            name
        }

        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (!error && user) {
            console.log(user)
            try {
                const res = await fetch('/api/signUp', {
                    ...xhrHeader,
                    credentials: 'same-origin',
                    body: JSON.stringify({...payload, user})
                })
                if(res.ok) {
                    console.log('registered')
                    router.push('/')
                } else {
                    alert('Something went wrong')
                }
            } catch(error) {
                console.log(error)
            }
        }
    }

    useEffect( () => {
        sUser ? setRegistered(true) : setRegistered(false)
    },[])

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', paddingTop: 150}}>
                <div style={{
                    minHeight: registered ? 310 : 450, 
                    width: 450, 
                    borderRadius: 9,
                    backgroundColor: '#32333D',
                    margin: 'auto',
                    }}>
                        {
                            registered ? (
                                <>
                                    <form onSubmit={handleSignin}
                                        style={{display: 'flex', flexDirection: 'column', padding: 30}}
                                    >
                                        <h2>
                                            Sign in
                                        </h2>
                                        <input 
                                            type="text"
                                            placeholder="Username"
                                            style={{marginTop: 30}}
                                            className={styles.inputText}
                                        />
                                        <input 
                                            type="password"
                                            placeholder="Password"
                                            className={styles.inputText}
                                        />
                                        <p onClick={() => setRegistered(false)} style={{cursor: 'pointer'}}>
                                            Doesnt have an account? Sign up
                                        </p>
                                        <input 
                                            type="submit"
                                            alt="Sign in"
                                            style={{marginTop: 30}}
                                            className={styles.navBtn}
                                        />
                                    </form>
                                </>
                            ) : (
                                <>
                                    <form onSubmit={handleSignup}
                                        style={{display: 'flex', flexDirection: 'column', padding: 30}}
                                    >
                                        <h2>
                                            Please register first
                                        </h2>
                                        <p>
                                            to expore this simple app
                                        </p>
                                        <input 
                                            type="text"
                                            placeholder="Name"
                                            style={{marginTop: 30}}
                                            className={styles.inputText}
                                            value={authDetails.name}
                                            onChange={(e: React.FormEvent<HTMLInputElement>)=>{
                                                setAuthDetails({ ...authDetails, name: e.currentTarget.value})
                                            }}
                                        />
                                        <input 
                                            type="text"
                                            placeholder="Username"
                                            style={{marginTop: 30}}
                                            className={styles.inputText}
                                            value={authDetails.email}
                                            onChange={(e: React.FormEvent<HTMLInputElement>)=>{
                                                setAuthDetails({ ...authDetails, email: e.currentTarget.value})
                                            }}
                                        />
                                        <input 
                                            type="password"
                                            placeholder="Password"
                                            className={styles.inputText}
                                            value={authDetails.password}
                                            onChange={(e: React.FormEvent<HTMLInputElement>)=>{
                                                setAuthDetails({ ...authDetails, password: e.currentTarget.value})
                                            }}
                                        />
                                        <input 
                                            type="password"
                                            placeholder="Confirm Password"
                                            className={styles.inputText}
                                            value={authDetails.confirmPassword}
                                            onChange={(e: React.FormEvent<HTMLInputElement>)=>{
                                                setAuthDetails({ ...authDetails, confirmPassword: e.currentTarget.value})
                                            }}
                                        />
                                        { errors.map((error, key) => (
                                            <p key={key}>
                                                {error}
                                            </p>
                                        ))}
                                        <p onClick={() => setRegistered(true)} style={{cursor: 'pointer'}}>
                                            Already have an account? Sign in
                                        </p>
                                        <input 
                                            type="submit"
                                            alt="Sign up"
                                            placeholder='Sign up'
                                            style={{marginTop: 30}}
                                            className={styles.navBtn}
                                        />
                                    </form>
                                </>
                                )
                        }
                        
                </div>
            </div>
        </>
    )
}

export default Authentication;
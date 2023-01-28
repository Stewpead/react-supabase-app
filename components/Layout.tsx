
import styles from '@/styles/Home.module.css'
import { supabase } from '@/utils/initSupabase';
import { useRouter } from 'next/router';


const Layout = ({ children }: any) => {
    const router = useRouter()
    const sUser = supabase.auth.user()

    return (
        <>      
        <div className={styles.header}>
            <div style={{cursor: 'pointer'}} onClick={() => router.push('/')}>
                <h1>RJay</h1>
            </div>
            <div className={styles.navigation}>
                <div 
                    className={styles.navMenu}
                    onClick={() => router.push('/about')}
                >About</div>
                <div 
                    className={styles.navMenu}
                    onClick={() => router.push('/portfolio')}
                >Portfolio</div>
                {
                    sUser ? (
                        <button 
                    className={styles.navBtn}
                    onClick={ async () => {
                        await supabase.auth.signOut()
                        router.push('/')
                    }}
                    >Sign out</button>
                    ) : (
                        <button 
                    className={styles.navBtn}
                    onClick={() => router.push('/authentication')}
                    >Sign in</button>
                    )
                }
            </div>
        </div>
            {children}
        </>
    )
}

export default Layout;

import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const PleaseLoginPage = () => {

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{margin: 'auto', paddingTop: 200}}>
                    <main style={{justifyContent: 'center'}}>
                        <p>
                            Sorry
                        </p>
                        <div style={{marginTop: 20}}>
                            <div>
                                <h3>
                                    You must be logged in to view this page
                                </h3>
                                <p>
                                    Please login or create an account to view this page.
                                </p>
                            </div>
                            <div  style={{marginTop: 20, minWidth: 300, display: 'flex', flexDirection: 'row'}}>
                            <Link href="/" style={{paddingRight: 20}}>
                                <button className={styles.navBtn}>
                                    Go back home
                                </button>
                            </Link>
                            <Link href="/authentication">
                                <button className={styles.navBtn}>
                                    Sign in
                                </button>
                            </Link>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default PleaseLoginPage

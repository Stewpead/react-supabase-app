
import SecurePage from '@/components/SecurePage'
import { useRouter } from 'next/router'

export default function Portfolio() {
    const router = useRouter()
  return (
    <>
        <SecurePage>
            <h1>Welcome to about page</h1>
            <button onClick={() => {
                router.push('/home')
            }}></button>
        </SecurePage>
    </>
  )
}

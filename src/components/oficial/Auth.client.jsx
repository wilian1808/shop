import { useNavigate } from '@shopify/hydrogen'
import { useEffect } from 'react'
import supabase from '../../libs/supabase'

export default function Auth ({ children }) {
  const navigate = useNavigate()

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(async (event, session) => {
      // await fetch('/api/auth', {
      //   method: 'POST',
      //   headers: new Headers({
      //     'Content-Type': 'application/json'
      //   }),
      //   credentials: 'same-origin',
      //   body: JSON.stringify({ event, session })
      // })

      // if (event === 'SIGNED_IN') router.push('/')
      if (event === 'SIGNED_OUT') navigate('/login')
    })

    // console.log('%c useEffect', 'color:orange')

    return () => {
      subscription?.unsubscribe()
    }
  }, [navigate])

  return (
    <>
      {children}
    </>
  )
}

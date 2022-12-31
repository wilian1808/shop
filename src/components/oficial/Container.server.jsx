import { Suspense } from 'react'
import HeaderOficial from './Header.client'
import Auth from './Auth.client'

export default function Container ({ children }) {
  return (
    <Suspense>
      <Auth>
        <HeaderOficial />
        <main className='block w-full min-h-screen bg-dark'>
          {children}
        </main>
      </Auth>
    </Suspense>
  )
}

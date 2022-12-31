import { useEffect, useState } from 'react'
import supabase from '../../libs/supabase'
import CartIcon from '../../ui/CartIcon.client'
import ButtonLink from './ButtonLink.client'
import Dropdown from './Dropdown.client'

export default function NavBar ({ number, openDrawer }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(supabase.auth.user())

    const { data: subscription } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') setUser(null)
      if (event === 'SIGNED_IN') setUser(supabase.auth.user())
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [user])

  return (
    <nav>

      <li className={`flex gap-[1.4rem] items-center ${!user ? 'flex' : 'hidden'}`}>
        <ButtonLink type='secondary' path='/login'>
          login
        </ButtonLink>

        <ButtonLink type='primary' path='/register'>
          register
        </ButtonLink>
      </li>

      <li className={`flex gap-[1.4rem] items-center ${user ? 'flex' : 'hidden'}`}>
        <button onClick={openDrawer} className='flex items-center justify-center bg-gray w-[2.26rem] h-[2.26rem] cursor-pointer rounded-[.3rem] relative'>
          { number !== 0 &&
            <span className='flex items-center justify-center w-[.9rem] h-[.9rem] bg-lime text-dark rounded-[50%] font-urbanist font-extrabold text-[.66rem] absolute top-[-.2rem] right-[-.2rem]'>
              {number}
            </span>
          }
          <CartIcon className='w-4 fill-white' />
        </button>

        <Dropdown />
      </li>

    </nav>
  )
}

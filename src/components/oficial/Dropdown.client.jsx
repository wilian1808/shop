import { Menu, Transition } from '@headlessui/react'
import { Link } from '@shopify/hydrogen'
import { Fragment, useContext, useEffect, useState } from 'react'
import { ProfileContext } from '../../context/profile.client'
import useDownloadImage from '../../hooks/useDownloadImage'
import useTemporalName from '../../hooks/useTemporalName'
import supabase from '../../libs/supabase'

export default function Dropdown () {
  const [username, setUsername] = useState('')
  const { temporalName } = useTemporalName(username)
  const { profile } = useContext(ProfileContext)
  const { pathname } = useDownloadImage(profile?.avatar, 'avatars')
  const user = supabase.auth.user()

  useEffect(() => {
    if (user) {
      if (user.app_metadata.provider === 'email') {
        setUsername(user.email.slice(0, 2).toUpperCase())
      } else {
        const res = user.user_metadata.full_name
          .split(' ')
          .at(0)
          .slice(0, 2)
          .toUpperCase()

        setUsername(res)
      }
    }
  }, [user])

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button data-label={temporalName} className='flex items-center justify-center w-[2.26rem] h-[2.26rem] relative rounded-[.3rem] cursor-pointer bg-gray after:absolute after:content-[attr(data-label)] after:block after:font-urbanist after:font-semibold after:tracking-[.6px] after:text-[.84rem] after:uppercase after:text-lime'>
        { pathname &&
          <img
            className='block cursor-pointer z-10 rounded-[.3rem]'
            src={pathname}
            alt='user avatar image'
          />
        }
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >

        <Menu.Items className="mt-2 p-2 grid gap-3 absolute right-0 origin-top-right rounded-[.3rem] bg-gray w-[8rem]">
          <Menu.Item>
            <Link to='/profile' className='flex gap-4 items-center text-white font-urbanist tracking-[.6px] text-[.86rem] hover:text-green'>
              <ProfileIcon className='w-4' />
              profile
            </Link>
          </Menu.Item>
          <Menu.Item>
            <button onClick={() => signOut()} className='flex gap-4 items-center text-white font-urbanist tracking-[.6px] text-[.86rem] hover:text-red'>
              <LogoutIcon className='w-4' />
              log out
            </button>
          </Menu.Item>
        </Menu.Items>

      </Transition>
    </Menu>
  )
}

const ProfileIcon = props => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
    </svg>
  )
}

const LogoutIcon = props => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z" clipRule="evenodd" />
    </svg>
  )
}

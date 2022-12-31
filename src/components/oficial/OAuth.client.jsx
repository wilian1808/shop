import supabase from '../../libs/supabase'
import GoogleIcon from '../../ui/GoogleIcon.client'
import SpotifyIcon from '../../ui/SpotifyIcon.client'

export default function OAuth () {
  const signInWithOAuth = async provider => {
    try {
      const { error } = await supabase.auth.signIn({ provider })
      if (error) throw error
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='grid grid-cols-2 w-[90%] max-w-[340px] mx-auto gap-[1.4rem]'>
      <button onClick={() => signInWithOAuth('google')} className='flex items-center justify-center gap-4 text-[.9rem] font-urbanist py-[.6rem] px-4 rounded-[.3rem] font-medium cursor-pointer capitalize relative text-white tracking-[.6px] bg-transparent border border-gray'>
        <GoogleIcon className='block w-4' />
        google
      </button>
      <button onClick={() => signInWithOAuth('spotify')} className='flex items-center justify-center gap-4 text-[.9rem] font-urbanist py-[.6rem] px-4 rounded-[.3rem] font-medium cursor-pointer capitalize relative text-white tracking-[.6px] bg-transparent border border-gray'>
        <SpotifyIcon className='block w-4' />
        spotify
      </button>
    </section>
  )
}

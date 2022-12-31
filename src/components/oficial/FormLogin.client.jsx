import Label from './Label.client'
import Input from './Input.client'
import { useState } from 'react'
import supabase from '../../libs/supabase'
import Message from './Message.client'

export default function FormLogin () {
  const [loading, setLoading] = useState(false)
  const [invalid, setinvalid] = useState(false)
  const [message, setMessage] = useState('')

  const signInWithEmailAndPassword = async event => {
    event.preventDefault()

    try {
      setLoading(true)
      setinvalid(false)
      const email = event.target.email.value
      const password = event.target.password.value

      const { error } = await supabase.auth.signIn({ email, password })

      if (error) {
        setinvalid(true)
        setMessage(error?.message)
        throw error
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={signInWithEmailAndPassword} autoComplete='off' className='grid gap-[1.4rem] w-[90%] max-w-[340px] mx-auto'>

      <Label name='email' required={true}>
        <Input type='email' name='email' placeholder='Email' required autoFocus />
      </Label>

      <Label name='password' required={true}>
        <Input type='password' name='password' placeholder='Password' required />
      </Label>

      { invalid && <Message type='error'>{ message }</Message> }

      <button type='submit' disabled={loading} className='flex items-center justify-center w-full gap-4 text-[.9rem] font-urbanist tracking-[.6px] py-[.6rem] px-4 rounded-[.3rem] font-medium capitalize relative cursor-pointer text-gray bg-lime border border-lime' >
        Log In
      </button>
    </form>
  )
}

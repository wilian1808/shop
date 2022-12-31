import { useState } from 'react'
import supabase from '../../libs/supabase'
import Input from './Input.client'
import Label from './Label.client'
import Message from './Message.client'

export default function FormRegister () {
  const [loading, setLoading] = useState(false)
  const [valid, setValid] = useState(false)
  const [success, setSuccess] = useState(false)
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('the password does not match')

  const validatePassword = event => {
    setValid(true)
    setMessage('the password does not match')
    if (password === event.target.value) {
      setValid(false)
    }
  }

  const signUPWithEmailAndPassword = async event => {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value
    const confirm = event.target.confirm.value

    try {
      setLoading(true)
      setValid(false)
      setSuccess(false)

      if (password !== confirm) throw new Error('las contraseñas no coinciden')
      const { user, error } = await supabase.auth.signUp({ email, password })

      if (error) throw error

      if (user.identities.length === 0) {
        setMessage('email already used')
        setValid(true)
        throw new Error('email already used')
      }

      if (user.identities.length === 1) {
        event.target.email.value = ''
        event.target.confirm.value = ''
        setPassword('')
        setMessage('confirm your email')
        setSuccess(true)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={signUPWithEmailAndPassword} autoComplete='off' className='grid gap-[1.4rem] w-[90%] max-w-[340px] mx-auto'>
      <Label name='email' required={true}>
        <Input type='email' name='email' placeholder='Email' required autoFocus />
      </Label>

      <Label name='password' required={true}>
        <Input value={password} onChange={e => setPassword(e.target.value)} type='password' name='password' placeholder='Password' required />
      </Label>

      <Label name='confirm password' required={true}>
        <Input onKeyUp={validatePassword} type='password' name='confirm' placeholder='Confirm password' required />
      </Label>

      { valid && <Message type='error'>{ message }</Message> }
      { success && <Message type='success'>{message}</Message> }

      <button type='submit' disabled={loading} className='flex items-center justify-center w-full gap-4 text-[.9rem] font-urbanist tracking-[.6px] py-[.6rem] px-4 rounded-[.3rem] font-medium capitalize relative cursor-pointer text-gray bg-lime border border-lime' >
        register
      </button>
    </form>
  )
}

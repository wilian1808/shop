import { useEffect, useState } from 'react'
import supabase from '../../libs/supabase'
import Input from './Input.client'
import Label from './Label.client'

export default function ChangeEmail () {
  const [email, setEmail] = useState('')

  useEffect(() => {
    const user = supabase.auth.user()
    setEmail(user?.email)
  }, [])

  const updateEmail = async event => {
    event.preventDefault()

    try {
      const { user, error } = await supabase.auth.update({ email })
      console.log(user)
      if (error) throw error
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className='grid gap-4' autoComplete='off' onSubmit={updateEmail}>
      <Label>
        <Input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type='email'
          name='email'
          placeholder='Email'
          spellCheck={false}
          required
        />
      </Label>

      <div>
        <button type='submit' className='block px-4 py-[.6rem] rounded-[.3rem] bg-lime text-dark tracking-[.6px] font-urbanist text-[.88rem] font-medium border border-lime'>
          update
        </button>
      </div>

    </form>
  )
}

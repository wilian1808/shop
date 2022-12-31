import { useContext, useState } from 'react'
import { ProfileContext } from '../../context/profile.client'
import supabase from '../../libs/supabase'
import Input from './Input.client'
import Label from './Label.client'

export default function ChangeProfile () {
  const [loading, setLoading] = useState(false)
  const { profile: data } = useContext(ProfileContext)

  const updateDataProfile = async event => {
    event.preventDefault()

    const fullname = event.target.names.value
    const surnames = event.target.surnames.value
    const cellphone = event.target.cellphone.value
    const address = event.target.address.value
    const birth = event.target.birth.value
    const gender = event.target.gender.value

    try {
      setLoading(true)
      const user = supabase.auth.user()

      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        fullname,
        surnames,
        cellphone,
        address,
        birth,
        gender,
        updated_at: new Date()
      })

      if (error) throw error
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className='grid gap-[1.4rem]' autoComplete='off' onSubmit={updateDataProfile}>
      <Label name='names' required={true}>
        <Input type='text' name='names' placeholder='Names' defaultValue={data?.fullname} required />
      </Label>

      <Label name='surnames' required={true}>
        <Input type='text' name='surnames' placeholder='Surnames' defaultValue={data?.surnames} required />
      </Label>

      <Label name='cellphone' required={true}>
        <Input type='text' name='cellphone' placeholder='Cellphones' defaultValue={data?.cellphone} required />
      </Label>

      <Label name='address' required={true}>
        <Input type='text' name='address' placeholder='Address' defaultValue={data?.address} required />
      </Label>

      <Label name='birth' required={true}>
        <Input type='text' name='birth' placeholder='Birth' defaultValue={data?.birth} required />
      </Label>

      <Label name='gender' required={true}>
        <Input type='text' name='gender' placeholder='Gender' defaultValue={data?.gender} required />
      </Label>

      <div>
        <button type='submit' className='block px-4 py-[.6rem] rounded-[.3rem] bg-lime text-dark tracking-[.6px] font-urbanist text-[.88rem] font-medium border border-lime'>
          { loading ? 'updating...' : 'update data'}
        </button>
      </div>
    </form>
  )
}

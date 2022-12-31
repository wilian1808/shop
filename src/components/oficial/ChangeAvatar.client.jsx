import { useContext, useState } from 'react'
import { ProfileContext } from '../../context/profile.client'
import useDownloadImage from '../../hooks/useDownloadImage'
import supabase from '../../libs/supabase'
import ImageIcon from '../../ui/ImageIcon.client'

export default function ChangeAvatar () {
  const [removing, setRemoving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { profile, setProfile } = useContext(ProfileContext)
  const { pathname } = useDownloadImage(profile?.avatar, 'avatars')

  const sendFile = async update => {
    try {
      const { error, data } = await supabase.from('profiles').upsert(update)
      if (error) throw error
      if (data) setProfile(data.at(0))
    } catch (error) {
      console.log(error)
    }
  }

  const updatePhoto = async event => {
    try {
      const user = supabase.auth.user()
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('you must select an image to upload')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (error) throw error

      const data = { id: user.id, avatar: filePath, updated_at: new Date() }
      sendFile(data)
    } catch (error) {
      console.log(error)
    } finally {
      setUploading(false)
    }
  }

  const removePhoto = async path => {
    try {
      setRemoving(true)
      const user = supabase.auth.user()

      const { error } = await supabase.storage
        .from('avatars')
        .remove([path])

      if (error) throw error

      const data = {
        id: user.id,
        avatar: null,
        updated_at: new Date()
      }

      sendFile(data)
    } catch (error) {
      console.log(error)
    } finally {
      setRemoving(false)
    }
  }

  return (
    <div className='grid grid-cols-[7rem_auto] items-end gap-[1.4rem]'>
      <picture className='overflow-hidden flex items-center rounded-[.3rem] justify-center w-full bg-gray aspect-square'>
        { pathname
          ? <img src={pathname} alt="image avatar user" className='aspect-square' />
          : <ImageIcon className='fill-[#acacac] w-[1.4rem]' />
        }
      </picture>
      <div className='flex gap-[1.4rem] flex-wrap'>
        <label onChange={updatePhoto} className='block cursor-pointer font-urbanist text-green text-[.84rem] font-medium tracking-[.6px] border-none py-[.6rem] px-4 rounded-[.3rem] bg-gray'>
          {uploading ? 'uploading ...' : 'upload photo'}
          <input type="file" name="" id="" className='hidden' />
        </label>
        <button onClick={() => removePhoto(profile?.avatar)} className='block cursor-pointer px-4 py-[.6rem] rounded-[.3rem] text-red font-urbanist text-[.84rem] tracking-[.6px] font-medium bg-gray border-none'>
          { removing ? 'removing...' : 'remove photo' }
        </button>
      </div>
    </div>
  )
}

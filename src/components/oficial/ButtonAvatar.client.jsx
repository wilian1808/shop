import { Image } from '@shopify/hydrogen'
import { useContext, useEffect } from 'react'
import { ProfileContext } from '../../context/profile.client'
import useDownloadImage from '../../hooks/useDownloadImage'
import useTemporalName from '../../hooks/useTemporalName'
import supabase from '../../libs/supabase'

export default function ButtonAvatar () {
  const { temporalName } = useTemporalName('mario')
  const image = null

  console.log(supabase.auth.user())

  useEffect(() => {})

  return (
  // <button data-label={temporalName} className='flex items-center justify-center w-[2.26rem] h-[2.26rem] relative rounded-[.3rem] cursor-pointer overflow-hidden bg-lime after:content-[attr(data-label)] after:block after:font-urbanist after:font-semibold after:tracking-[.6px] after:text-[.84rem] after:uppercase'>
      <button>
      {/* { image && <Image src='pathname' alt='avatar user' /> } */}
      awerew
    </button>
  )
}

import { createContext, useEffect, useState } from 'react'
import supabase from '../libs/supabase'

export const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    if (supabase.auth.user()) {
      getDataProfile()
    }
  }, [])

  const getDataProfile = async () => {
    try {
      const user = supabase.auth.user()

      const { error, status, data } = await supabase
        .from('profiles')
        .select('username, fullname, avatar, cellphone, address, birth, gender, surnames')
        .eq('id', user.id)
        .single()

      if (error && status !== 406) throw error
      if (data) setProfile(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ProfileContext.Provider value={{ profile, setProfile }} >
      { children }
    </ProfileContext.Provider>
  )
}

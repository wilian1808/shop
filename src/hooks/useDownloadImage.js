import { useState, useEffect } from 'react'
import supabase from '../libs/supabase'

const useDownloadImage = (path, storage) => {
  const [pathname, setPathname] = useState(null)

  useEffect(() => {
    downloadPhoto(path, storage)
  }, [path, storage])

  const downloadPhoto = async (path, storage) => {
    if (path) {
      try {
        const { data, error } = await supabase.storage
          .from(storage)
          .download(path)

        if (error) throw error
        setPathname(URL.createObjectURL(data))
      } catch (error) {
        console.log(error)
      }
    } else {
      setPathname(null)
    }
  }

  return { pathname }
}

export default useDownloadImage

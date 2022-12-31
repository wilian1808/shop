import { useEffect, useState } from 'react'

const useTemporalName = username => {
  const [temporalName, setTemporalName] = useState('')

  useEffect(() => {
    const res = username.slice(0, 2).toUpperCase()
    setTemporalName(res)
  }, [username])

  return { temporalName }
}

export default useTemporalName

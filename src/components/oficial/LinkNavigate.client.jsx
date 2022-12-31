import { Link } from '@shopify/hydrogen'

export default function LinkNavigate ({ path, children }) {
  return (
    <Link to={path} className='block w-[90%] max-w-[340px] py-[2rem] mx-auto text-center font-urbanist tracking-[.6px] text-[.84rem] font-medium cursor-pointer capitalize text-lime'>
      { children }
    </Link>
  )
}

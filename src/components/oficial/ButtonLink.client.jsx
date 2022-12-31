import { Link } from '@shopify/hydrogen'

export default function ButtonLink ({ path, children, type = 'primary' }) {
  return (
    <Link
      to={path}
      className={
        `block cursor-pointer font-urbanist tracking-[.6px] text-[.9rem] font-500 py-[.6rem] px-4 capitalize rounded-[.3rem] 
        ${type === 'primary' && 'bg-lime text-dark'}
        ${type === 'secondary' && 'bg-dark text-white'}`
      }
    >
      { children }
    </Link>
  )
}

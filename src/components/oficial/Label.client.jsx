export default function Label ({ name, required, children }) {
  return (
    <label className='block font-urbanist tracking-[.6px] text-[.9rem] text-white capitalize'>
      { name }
      {required &&
        <span className='inline-block text-lime ml-[.4rem] mb-[.6rem]'>
          *
        </span>
      }
      { children }
    </label>
  )
}

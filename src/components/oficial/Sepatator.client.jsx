export default function Sepatator ({ children }) {
  return (
    <div className='block text-white w-[90%] max-w-[340px] mx-auto font-protomoOutline tracking-[.6px] text-center my-[2rem] uppercase text-[1.1rem] relative after:block after:content-[""] after:absolute after:h-[1px] after:w-[44%] after:bg-gray after:top-[50%] after:translate-y-[-50%] after:right-0 before:block before:content-[""] before:absolute before:h-[1px] before:w-[44%] before:bg-gray before:top-[50%] before:translate-y-[-50%] before:left-0' >
      { children }
    </div>
  )
}

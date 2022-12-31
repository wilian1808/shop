export default function ButtonIcon ({ children, number }) {
  return (
    <button className='flex items-center justify-center bg-gray w-[2.26rem] h-[2.26rem] cursor-pointer rounded-[.3rem] relative'>
      { number &&
        <span className='flex items-center justify-center w-[.9rem] h-[.9rem] bg-lime text-dark rounded-[50%] font-urbanist font-extrabold text-[.66rem] absolute top-[-.2rem] right-[-.2rem]'>
          {number}
        </span>
      }
      { children }
    </button>
  )
}

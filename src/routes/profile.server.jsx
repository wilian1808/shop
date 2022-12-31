import ChangeAvatar from '../components/oficial/ChangeAvatar.client'
import ChangeEmail from '../components/oficial/ChangeEmail.client'
import ChangeProfile from '../components/oficial/ChangeProfile.client'

const Title = ({ children }) => {
  return (
    <h3 className='block font-urbanist text-[.86rem] font-medium text-[#cbcbcb] tracking-[.6px] capitalize'>
      {children}
    </h3>
  )
}

export default function ProfilePage () {
  return (
    <section className='w-full'>
      <article className='block border-b border-gray'>
        <div className='grid items-start grid-cols-2 w-[90%] max-w-[1024px] mx-auto py-[1.4rem]'>
          <Title>change avatar</Title>
          <ChangeAvatar />
        </div>
      </article>

      <article className='block border-b border-gray'>
        <div className='grid items-start grid-cols-2 w-[90%] max-w-[1024px] mx-auto py-[1.4rem]'>
          <Title>change Email</Title>
          <ChangeEmail />
        </div>
      </article>

      <article className='block border-b border-gray'>
        <div className='grid items-start grid-cols-2 w-[90%] max-w-[1024px] mx-auto py-[1.4rem]'>
          <Title>change Profile info</Title>
          <ChangeProfile />
        </div>
      </article>
    </section>
  )
}

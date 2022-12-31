import FormRegister from '../components/oficial/FormRegister.client'
import LinkNavigate from '../components/oficial/LinkNavigate.client'
import OAuth from '../components/oficial/OAuth.client'
import Sepatator from '../components/oficial/Sepatator.client'
import TitlePage from '../components/oficial/TitlePage.client'

export default function Register () {
  return (
    <>
      <TitlePage>Sign Up</TitlePage>
      <FormRegister />
      <Sepatator>or</Sepatator>
      <OAuth />
      <LinkNavigate path='/login'>
        Already have an account? Login
      </LinkNavigate>
    </>
  )
}

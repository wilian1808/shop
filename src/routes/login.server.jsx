import FormLogin from '../components/oficial/FormLogin.client'
import LinkNavigate from '../components/oficial/LinkNavigate.client'
import OAuth from '../components/oficial/OAuth.client'
import Sepatator from '../components/oficial/Sepatator.client'
import TitlePage from '../components/oficial/TitlePage.client'

export default function Login () {
  return (
    <>
      <TitlePage>Log In</TitlePage>
      <FormLogin />
      <Sepatator>or</Sepatator>
      <OAuth />
      <LinkNavigate path='/register'>
        new? sign up
      </LinkNavigate>
    </>
  )
}

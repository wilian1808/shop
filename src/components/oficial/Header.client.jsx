import { Link, useCart } from '@shopify/hydrogen'
import ShopIcon from '../../ui/ShopIcon.client'
import NavBar from './NavBar.client'
import { DrawerOficial, useDrawerOficial } from './DrawerOficial.client'
import { CartDetails } from '../CartDetails.client'

export default function HeaderOficial () {
  const { totalQuantity } = useCart()
  const { isOpen, openDrawer, closeDrawer } = useDrawerOficial()

  return (
    <>
      <DrawerOficial open={isOpen} onClose={closeDrawer}>
        <CartDetails onClose={closeDrawer} />
      </DrawerOficial>

      <header className='sticky top-0 z-10 block w-full border-b bg-dark border-gray' >
        <div className='flex w-[90%] h-[5rem] max-w-[1024px] mx-auto my-0 items-center justify-between'>

          <Link to='/' className='flex items-center font-protomoOutline text-white text-[1.2rem] tracking-[.6px] font-400 gap-[.4rem]'>
            <ShopIcon className='w-[1rem] fill-lime' />
            shop
          </Link>

          <NavBar number={totalQuantity} openDrawer={openDrawer} />
        </div>
      </header>
    </>
  )
}

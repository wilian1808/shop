import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import CloseIcon from '../../ui/CloseIcon.client'

function DrawerOficial ({ open, onClose, children }) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-20' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-200'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-white bg-opacity-20' />
        </Transition.Child>

        <section className='fixed inset-0 w-full min-h-screen'>
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-200"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-200"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className='bg-dark absolute w-[480px] min-h-full top-0 bottom-0 right-0'>
                <header className='px-[1.4rem] h-[5rem] flex items-center justify-between'>
                  <h3 className='text-white font-protomoOutline text-[1.1rem] tracking-[.6px]'>
                    Cart
                  </h3>
                  <button onClick={onClose} className='flex items-center justify-center bg-gray w-[2.26rem] h-[2.26rem] cursor-pointer rounded-[.3rem]'>
                    <CloseIcon className='w-[1.2rem] fill-white' />
                  </button>
                </header>
                <section>
                  { children }
                </section>
              </Dialog.Panel>
            </Transition.Child>
        </section>
      </Dialog>
    </Transition>
  )
}

DrawerOficial.Title = Dialog.Title

export { DrawerOficial }

export const useDrawerOficial = (openDefault = false) => {
  const [isOpen, setIsOpen] = useState(openDefault)

  const openDrawer = () => setIsOpen(true)
  const closeDrawer = () => setIsOpen(false)

  return { isOpen, openDrawer, closeDrawer }
}

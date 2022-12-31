import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

function Drawer ({ open, onClose, children }) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" onClose={onClose} >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 left-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white bg-opacity-25 z-[100000000] " ></div>
        </Transition.Child>

        {/*
        <section className='fixed inset-0 w-full min-h-screen'>
          <article className='absolute inset-0 overflow-hidden'>
            <div className='fixed inset-y-0 right-0 w-full max-w-[460px] bg-[yellow]'>
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel>
                  <header className="sticky top-0 flex items-center justify-between h-24 px-4 sm:px-8 md:px-12">
                      <h2
                        id="cart-contents"
                        className="text-lg font-bold whitespace-pre-wrap max-w-prose"
                      >
                        Cart
                      </h2>
                      <button
                        type="button"
                        className="p-4 -m-4 transition text-primary hover:text-primary/50"
                        onClick={onClose}
                      >
                        <IconClose aria-label="Close panel" />
                      </button>
                    </header>
                    {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </article>
        </section> */}

        {/*
        <div className="fixed inset-0 z-[100000000]">
          <div className="absolute inset-0 overflow-hidden">

            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 bg-[yellow]">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="max-w-lg antialiased text-left align-middle transition-all transform shadow-xl bg-neutral-50">
                  <header className="sticky top-0 flex items-center justify-between h-24 px-4 sm:px-8 md:px-12">
                    <h2
                      id="cart-contents"
                      className="text-lg font-bold whitespace-pre-wrap max-w-prose"
                    >
                      Cart
                    </h2>
                    <button
                      type="button"
                      className="p-4 -m-4 transition text-primary hover:text-primary/50"
                      onClick={onClose}
                    >
                      <IconClose aria-label="Close panel" />
                    </button>
                  </header>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>

          </div>
        </div> */}
      </Dialog>
    </Transition>
  )
}

Drawer.Title = Dialog.Title

export { Drawer }

export const useDrawer = (openDefault = false) => {
  const [isOpen, setIsOpen] = useState(openDefault)

  const openDrawer = () => setIsOpen(true)
  const closeDrawer = () => setIsOpen(false)

  return { isOpen, openDrawer, closeDrawer }
}

const IconClose = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-5 h-5" >
      <line x1="4.44194" y1="4.30806" x2="15.7556" y2="15.6218" stroke="currentColor" strokeWidth="1.25" />
      <line y1="-0.625" x2="16" y2="-0.625" transform="matrix(-0.707107 0.707107 0.707107 0.707107 16 4.75)" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

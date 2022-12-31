import { useCart, useCartLine, CartLineProvider, CartShopPayButton, CartLineQuantityAdjustButton, CartLinePrice, CartLineQuantity, Image, Link, Money } from '@shopify/hydrogen'
import TrashIcon from '../ui/TrashIcon.client'

export function CartDetails ({ onClose }) {
  const { lines } = useCart()

  if (lines.length === 0) {
    return <CartEmpty onClose={onClose} />
  }

  return (
    <form className='flex flex-col w-full h-[calc(100vh-5rem)]'>
      <section className='grid gap-[1.4rem] w-full p-[1.4rem] overflow-y-scroll'>
        {
          lines.map(line => (
            <CartLineProvider key={line.id} line={line}>
              <CartLineItem />
            </CartLineProvider>
          ))
        }
      </section>

      <section className='mt-auto p-[1.4rem] border-t border-gray'>
        <OrderSummary />
        <CartCheckoutActions />
      </section>
    </form>
  )
}

const CartEmpty = ({ onClose }) => {
  return (
    <section className='h-[calc(100vh-5rem)] grid place-content-center w-full'>
      <div className='grid gap-[1.4rem]'>
        <h2 className='text-white text-center font-protomoOutline tracking-[.6px] text-[1.2rem] font-medium'>
          Your cart is empty
        </h2>
        <button onClick={onClose} className='block bg-lime border border-lime rounded-[.3rem] text-dark font-urbanist tracking-[.6px] text-[.9rem] font-medium py-[.6rem] px-[1rem]' >
          continue shopping
        </button>
      </div>
    </section>
  )
}

const CartCheckoutActions = () => {
  const { checkoutUrl } = useCart()

  return (
    <div className='grid grid-cols-2 gap-4'>
      <Link to={checkoutUrl} className='block w-full border border-lime bg-lime text-dark font-urbanist tracking-[.6px] cursor-pointer text-center py-[.6rem] px-4 rounded-[.3rem] text-[.9rem] font-medium'>
        continue to checkout
      </Link>
      <CartShopPayButton className="flex w-full items-center justify-center rounded-[.3rem] bg-[#5a31f4]" />
    </div>
  )
}

const OrderSummary = () => {
  const { cost } = useCart()

  return (
      <section className='grid gap-1 mb-4'>
        <article className='flex items-center justify-between'>
          <span className='text-white font-urbanist tracking-[.6px] text-[.88rem] font-medium'>
            subtotal
          </span>
          <span className='text-white font-urbanist text-[.92rem] tracking-[.6px] font-medium'>
            {
              cost?.subtotalAmount?.amount
                ? <Money data={cost?.subtotalAmount} />
                : '-'
            }
          </span>
        </article>
        <article className='flex items-center justify-between'>
          <span className='text-white font-urbanist tracking-[.6px] text-[.88rem] font-medium'>
            Shipping estimate
          </span>
          <span className="text-green font-urbanist tracking-[.6px] text-[.92rem]">
            Free
          </span>
        </article>
      </section>
  )
}

export const CartLineItem = () => {
  const { linesRemove } = useCart()
  const { id: lineId, quantity, merchandise } = useCartLine()

  return (
    <article key={lineId} className='grid items-center gap-4 grid-cols-[80px_1fr_auto]'>
      <Image
        alt='image product'
        className='block rounded-[.3rem]'
        data={merchandise.image}
      />

      <div>
        <div className='flex items-start justify-between'>
          <Link
            className='text-green font-urbanist tracking-[.6px] text-[.82rem] font-medium'
            to={`/products/${merchandise.product.handle}`}
            >
            {merchandise.product.title}
          </Link>
          <CartLinePrice as="span" className='text-white font-urbanist tracking-[.6px] text-[.82rem] font-medium' />
        </div>

        <section className='grid mt-2'>
          {
            (merchandise?.selectedOptions || []).map(option => (
              <article key={option.name} className='font-urbanist tracking-[.6px] flex gap-3 items-center'>
                <span className='text-[#acacac] font-semibold text-[.8rem]'>
                  {option.name}:
                </span>
                <span className='text-[#acacac] text-[.8rem]'>
                  {option.value}
                </span>
              </article>
            ))
          }
        </section>
      </div>

      <div className='flex flex-col items-end gap-2'>
        <button type='button' onClick={() => linesRemove(lineId)} className='inline-flex items-center justify-center bg-gray w-[2.26rem] h-[2.26rem] cursor-pointer rounded-[.3rem]'>
          <TrashIcon className='w-4 fill-red' />
        </button>
        <CartLineQuantityAdjust
          lineId={lineId}
          quantity={quantity}
          linesRemove={linesRemove}
        />
      </div>
    </article>
  )
}

const CartLineQuantityAdjust = ({ lineId, quantity }) => {
  return (
    <div className='rounded-[.3rem] flex gap-2 items-center'>

      <CartLineQuantityAdjustButton
        adjust='decrease'
        aria-label='Decrease quantity'
        className='p-1 flex items-center justify-center cursor-pointer rounded-[.3rem] disabled:pointer-events-all disabled:cursor-wait'
      >
        <MinusCircleIcon className='w-5 fill-white' />
      </CartLineQuantityAdjustButton>

      <CartLineQuantity
        as="div"
        className='font-medium text-white font-urbanist text-[.94rem] tracking-[.6px]'
      />

      <CartLineQuantityAdjustButton
        adjust="increase"
        aria-label="Increase quantity"
        className='p-1 flex items-center justify-center cursor-pointer rounded-[.3rem] disabled:pointer-events-all disabled:cursor-wait'
      >
        <PlusCircleIcon className='w-5 fill-white' />
      </CartLineQuantityAdjustButton>
    </div>
  )
}

const MinusCircleIcon = props => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z" clipRule="evenodd" />
    </svg>
  )
}

const PlusCircleIcon = props => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
    </svg>
  )
}

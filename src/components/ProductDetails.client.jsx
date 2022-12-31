import { ProductOptionsProvider, MediaFile, useProductOptions, ProductPrice, BuyNowButton, AddToCartButton } from '@shopify/hydrogen'
import { useEffect, useState } from 'react'
import supabase from '../libs/supabase'

export default function ProductDetails ({ product }) {
  return (
    <ProductOptionsProvider data={product}>
      <section className='grid w-[90%] bg-dark max-w-[1024px] mx-auto py-[1.4rem] grid-cols-3 gap-[1.4rem]'>
        <div className='block col-start-1 col-end-3 bg-dark'>
          <ProductGallery media={product.media.nodes} />
        </div>

        <div className='block sticky top-[6.4rem]'>
          <div className='grid gap-3 mb-[1.6rem]'>
            <h1 className='block font-protomoOutline text-white text-[1.2rem] tracking-[.6px] font-normal'>
              {product.title}
            </h1>
            <span className='block text-white font-urbanist tracking-[.6px] text-[.88rem]'>
              {product.vendor}
            </span>
          </div>

          <ProductForm product={product} />

          <div
            className='border-t border-gray pt-[1.4rem] font-urbanist tracking-[.6px] text-[#acacac] text-[.92rem] leading-[200%]'
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          ></div>

        </div>
      </section>
    </ProductOptionsProvider>
  )
}

const ProductForm = ({ product }) => {
  const { options, selectedVariant } = useProductOptions()

  return (
    <form className="grid gap-[1.4rem]">
      {
        <div className="grid gap-4">
          {
            options.map(({ name, values }) => {
              if (values.length === 1) return null

              return (
                <div key={name} className='flex flex-wrap items-baseline justify-start gap-6' >
                  <legend className='text-lime font-urbanist tracking-[.6px] text-[.84rem] font-medium'>
                    {name}
                  </legend>
                  <OptionRadio name={name} values={values} />
                </div>
              )
            })
          }
        </div>
      }

      <div className='flex gap-[1.4rem]'>
        <ProductPrice
          className="text-white font-urbanist tracking-[.6px] font-semibold text-[1rem] line-through opacity-50"
          priceType="compareAt"
          variantId={selectedVariant.id}
          data={product}
        />
        <ProductPrice
          className='text-white font-urbanist tracking-[.6px] font-semibold text-[1rem]'
          variantId={selectedVariant.id}
          data={product}
        />
      </div>
      <PurchaseMarkup />
    </form>
  )
}

const PurchaseMarkup = () => {
  const { selectedVariant } = useProductOptions()
  const isOutOfStock = !selectedVariant?.availableForSale || false
  const isUser = !!supabase.auth.user()
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    isDisabled()
  }, [])

  const isDisabled = () => {
    if (isUser) {
      if (isOutOfStock) {
        return setDisabled(true)
      }
      return setDisabled(false)
    }
    return setDisabled(true)
  }

  return (
    <div className='grid w-full  gap-[1.4rem] bg-dark mb-[1.4rem]'>
      <AddToCartButton
        type="button"
        variantId={selectedVariant.id}
        quantity={1}
        accessibleAddingToCartLabel="Adding item to your cart"
        disabled={disabled}
        className='disabled:cursor-not-allowed'
      >
        <span className='block w-full bg-transparent border border-gray rounded-[.3rem] text-white font-urbanist tracking-[.6px] text-[.9rem] font-medium py-[.6rem] px-[1rem] '>
          {isOutOfStock ? 'Sold out' : 'Add to cart'}
        </span>
      </AddToCartButton>
      { isOutOfStock
        ? <span className="px-6 py-3 leading-none text-center text-black border rounded-sm ">
            Available in 2-3 weeks
          </span>
        : <BuyNowButton variantId={selectedVariant.id}>
            <span className='block bg-lime border border-lime rounded-[.3rem] text-dark font-urbanist tracking-[.6px] text-[.9rem] font-medium py-[.6rem] px-[1rem]'>
              Buy it now
            </span>
          </BuyNowButton>
        }
    </div>

  )
}

const OptionRadio = ({ values, name }) => {
  const { selectedOptions, setSelectedOption } = useProductOptions()

  return (
    <div className='flex flex-wrap items-baseline gap-x-[1.4rem] gap-y-4'>
      {
        values.map(value => {
          const checked = selectedOptions[name] === value
          const id = `option-${name}-${value}`

          return (
            <label key={id} htmlFor={id}>
              <input
                className="sr-only"
                type="radio"
                id={id}
                name={`option[${name}]`}
                value={value}
                checked={checked}
                onChange={() => setSelectedOption(name, value)}
              />
              <p
                className={
                  `cursor-pointer leading-none font-urbanist tracking-[.6px] text-[.9rem]
                  ${checked ? 'text-white border-b' : 'text-white opacity-50'}`
                }
              >
                {value}
              </p>
            </label>
          )
        })
      }
    </div>
  )
}

const ProductGallery = ({ media }) => {
  if (!media.length) {
    return null
  }

  return (
    <div className={'grid gap-4 overflow-x-scroll grid-flow-col md:grid-flow-row  md:p-0 md:overflow-x-auto md:grid-cols-2 w-screen md:w-full lg:col-span-2'}>
      {media.map((med, i) => {
        let extraProps = {}

        if (med.mediaContentType === 'MODEL_3D') {
          extraProps = {
            interactionPromptThreshold: '0',
            ar: true,
            loading: 'eager',
            disableZoom: true
          }
        }

        const data = {
          ...med,
          image: {
            ...med.image,
            altText: med.alt || 'Product image'
          }
        }

        return (
          <div
            className={`${
              i % 3 === 0 ? 'md:col-span-2' : 'md:col-span-1'
            } snap-center card-image bg-white aspect-square md:w-full w-[80vw] shadow-sm rounded`}
            key={med.id || med.image.id}
          >
            <MediaFile
              tabIndex="0"
              className={'w-full h-full aspect-square object-cover'}
              data={data}
              options={{
                crop: 'center'
              }}
              {...extraProps}
            />
          </div>
        )
      })}
    </div>
  )
}

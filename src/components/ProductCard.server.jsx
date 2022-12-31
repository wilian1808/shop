import { Link, Image, Money } from '@shopify/hydrogen'

export default function ProductCard ({ product }) {
  const { priceV2: price, compareAtPriceV2: compareAtPrice } = product.variants?.nodes[0] || {}
  const isDiscounted = compareAtPrice?.amount > price?.amount

  return (
    <Link to={`/products/${product.handle}`} className='border border-dashed border-gray rounded-[1rem] p-[.8rem]'>
      <figure className='relative block aspect-[4/5] rounded-[.6rem] overflow-hidden'>
        <Image
          className='block aspect-[4/5]'
          data={product.variants.nodes[0].image}
          alt="Alt Tag"
        />
        { isDiscounted &&
          <span className="bg-red/20 absolute px-[.4rem] rounded-md tracking-[.6px] text-[.74rem] font-medium top-0 right-0 m-4 font-urbanist text-red">
            sale
          </span>
        }
      </figure>
      <div>
        <h3 className='my-[.8rem] font-normal text-center text-lime font-urbanist tracking-[.6px] text-[.86rem]'>
          {product.title}
        </h3>
        <div className='flex gap-[1.4rem] justify-center items-center'>
          <Money
            className='text-white font-urbanist tracking-[.6px] text-[.9rem]'
            withoutTrailingZeros
            data={price}
          />
          { isDiscounted &&
            <Money
              className="text-white font-urbanist tracking-[.6px] text-[.9rem] line-through opacity-50"
              withoutTrailingZeros
              data={compareAtPrice}
            />
          }
        </div>
      </div>
    </Link>
  )
}

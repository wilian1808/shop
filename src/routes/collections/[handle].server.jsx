import { gql, useShopQuery, useRouteParams, useServerAnalytics, ShopifyAnalyticsConstants, Seo } from '@shopify/hydrogen'
import ProductCard from '../../components/ProductCard.server'
import { Suspense } from 'react'

export default function Collection () {
  const { handle } = useRouteParams()
  const { data: { collection } } = useShopQuery({ query, variables: { handle } })

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.collection,
      resourceId: collection.id
    }
  })

  return (
    <>
      <Suspense>
        <Seo type="collection" data={collection} />
      </Suspense>

      <div className='w-[90%] max-w-[1024px] mx-auto py-[2.4rem]'>
        <h1 className='block text-lime capitalize font-protomoOutline text-[1.4rem] tracking-[.6px] mb-[1.4rem]'>
          {collection.title}
        </h1>
        <p className='block text-[.9rem] font-urbanist tracking-[.6px] text-white max-w-lg'>
          {collection?.description}
        </p>
      </div>

      <div className='block text-white w-[90%] max-w-[1024px] mx-auto font-protomoOutline tracking-[.6px] text-center my-[2rem] uppercase text-[1.1rem] relative after:block after:content-[""] after:absolute after:h-[1px] after:w-[42%] after:bg-gray after:top-[50%] after:translate-y-[-50%] after:right-0 before:block before:content-[""] before:absolute before:h-[1px] before:w-[42%] before:bg-gray before:top-[50%] before:translate-y-[-50%] before:left-0' >
        Products
      </div>

      <section className='w-[90%] max-w-[1024px] mx-auto grid grid-cols-4 gap-[2.1rem]'>
        {
          collection.products.nodes.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </section>

    </>
  )
}

const query = gql`
  query CollectionDetails($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(first: 8) {
        nodes {
          id
          title
          publishedAt
          handle
          variants(first: 1) {
            nodes {
              id
              image {
                url
                altText
                width
                height
              }
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`

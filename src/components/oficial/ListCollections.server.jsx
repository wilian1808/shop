import { Link, Image, gql, useShopQuery, CacheLong } from '@shopify/hydrogen'
import TitlePage from './TitlePage.client'

export default function ListCollections () {
  const { data: { collections } } = useShopQuery({ query, cache: CacheLong() })

  return (
    <div className="">
      <TitlePage>Collections</TitlePage>

      <section className='grid w-[90%] max-w-[1024px] mx-auto grid-cols-3 gap-[4.2rem]'>
        {
          collections.nodes.map(collection => (
            <Link className='block rounded-[1rem] p-[.8rem] border border-dashed border-gray' key={collection.id} to={`/collections/${collection.handle}`}>
              <figure className='block'>
                { collection?.image &&
                  <Image
                    className='block w-full rounded-[.6rem]'
                    width='100%'
                    height='100%'
                    alt={`Image of ${collection.title}`}
                    data={collection.image}
                  />
                }
              </figure>
              <div>
                <h2 className='mt-[.8rem] font-normal text-center text-lime font-urbanist tracking-[.6px] text-[.86rem]'>
                  {collection.title}
                </h2>
              </div>
            </Link>
          ))
        }
      </section>
    </div>
  )
}

const query = gql`
  query FeaturedCollections {
    collections(first: 3, query: "collection_type:smart", sortKey: UPDATED_AT) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`

import renderHydrogen from '@shopify/hydrogen/entry-server'
import { Router, FileRoutes, ShopifyProvider, CartProvider } from '@shopify/hydrogen'
import { Suspense } from 'react'
import { ProfileProvider } from './context/profile.client'
import Container from './components/oficial/Container.server'

function App ({ routes }) {
  return (
    <Suspense fallback={null}>
      <ShopifyProvider>
        <CartProvider>
          <ProfileProvider>
            <Router>
              <Container>
                <FileRoutes routes={routes} />
              </Container>
            </Router>
          </ProfileProvider>
        </CartProvider>
      </ShopifyProvider>
    </Suspense>
  )
}

export default renderHydrogen(App)

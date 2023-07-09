'use client'

/* Components */
import { Providers } from '@/lib/providers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

/* Instruments */
import styles from './styles/layout.module.css'
import './styles/globals.css'

const queryClient = new QueryClient();

export default function RootLayout(props: React.PropsWithChildren) {
  return (
        <html lang="en">
          <body>
            <QueryClientProvider client={queryClient}>
              <Providers>
                <section className={styles.container}>
                  <main className={styles.main}>{props.children}</main>
                </section>
              </Providers>
            </QueryClientProvider>
          </body>
        </html>
  )
}

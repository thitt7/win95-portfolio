import './styles/globals.scss';
import Providers from './theme-provider';
import { Desktop } from './components/desktop';

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <>
    <Providers>
        <html lang="en">
          <body>
            <Desktop></Desktop>
            {children}
          </body>
        </html>
      </Providers>
    </>
  )
}

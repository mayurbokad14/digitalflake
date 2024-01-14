// import { Inter } from 'next/font/google'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DigitalFlake Admin',
  description: 'Digital Flake Admin App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{margin:0}}>{children}</body>
    </html>
  )
}

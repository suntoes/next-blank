import 'lib/styles/globals.css'

export { RootLayout as default, type RootLayoutProps }

interface RootLayoutProps {
    children: React.ReactNode
}

async function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang='en'>
            <head>
                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                <link rel='manifest' href='/site.webmanifest' />
                <meta name='theme-color' content='#ffffff' />
                <meta name='description' content='next-blank-description' />
                <meta name='author' content='next-blank' />
                <link rel='apple-touch-icon' href='%PUBLIC_URL%/apple-touch-icon.png' />
                <link rel='shortcut icon' href='%PUBLIC_URL%/favicon.ico' type='image/x-icon' />
                <link rel='icon' href='%PUBLIC_URL%/favicon.ico' />
                <meta name='twitter:title' content='next-blank' />
                <meta name='twitter:card' content='summary_large_image' />
                <meta name='twitter:site' content='next-blank' />
                <meta name='twitter:creator' content='next-blank' />
                <meta name='twitter:image' content='%PUBLIC_URL%/card.png' />
                <meta property='og:site_name' content='next-blank' />
                <meta name='og:title' content='next-blank' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content='%PUBLIC_URL%/card.png' />
            </head>

            <body>{children}</body>
        </html>
    )
}

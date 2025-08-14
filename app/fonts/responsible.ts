import localFont from 'next/font/local'

export const responsible = localFont({
  src: [
    { path: '../../public/fonts/responsible-intelligence/ResponsibleIntelligence.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/responsible-intelligence/ResponsibleIntelligence.woff',  weight: '400', style: 'normal' }
  ],
  display: 'swap',
  variable: '--font-responsible'
})

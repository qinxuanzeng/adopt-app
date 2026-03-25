import type { Metadata } from 'next'
import { Inter, Noto_Sans_SC } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const notoSansSC = Noto_Sans_SC({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto'
})

export const metadata: Metadata = {
  title: '遇见 TA - 认养你的专属 AI 恋人',
  description: '认养你的专属 AI 男/女友，TA 会陪你聊天、为你写日记，和你一起成长，从此不再孤单。',
  keywords: ['AI', '虚拟恋人', '陪伴', '养成', '聊天机器人'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} ${notoSansSC.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}

import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  ogType?: string
  article?: {
    publishedTime?: string
    modifiedTime?: string
    authors?: string[]
    tags?: string[]
  }
  canonical?: string
}

export default function SEO({
  title,
  description,
  keywords = [],
  ogImage,
  ogType = 'website',
  article,
  canonical,
}: SEOProps) {
  const siteName = 'Қарлығаш'
  const defaultTitle = 'Қарлығаш - Психологический журнал'
  const defaultDescription = 'Научные статьи, обзоры и отчеты о фундаментальных и прикладных исследованиях в области психологии'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://karlygash.kz'
  
  const finalTitle = title ? `${title} | ${siteName}` : defaultTitle
  const finalDescription = description || defaultDescription
  const finalOgImage = ogImage || `${siteUrl}/og-image.jpg`
  const finalCanonical = canonical || siteUrl

  return (
    <>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <link rel="canonical" href={finalCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />

      {/* Article specific */}
      {article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.authors?.map((author, i) => (
            <meta key={i} property="article:author" content={author} />
          ))}
          {article.tags?.map((tag, i) => (
            <meta key={i} property="article:tag" content={tag} />
          ))}
        </>
      )}
    </>
  )
}


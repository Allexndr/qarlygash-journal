interface StructuredDataProps {
  type: 'Article' | 'Organization' | 'WebSite'
  data: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://karlygash.kz'
    
    switch (type) {
      case 'Article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.title,
          description: data.description || data.excerpt,
          image: data.image || `${baseUrl}/og-image.jpg`,
          datePublished: data.publishedAt,
          dateModified: data.updatedAt || data.publishedAt,
          author: {
            '@type': 'Person',
            name: data.author?.name,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Қарлығаш',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/logo.svg`,
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/articles/${data.slug}`,
          },
        }
      
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Қарлығаш',
          url: baseUrl,
          logo: `${baseUrl}/logo.svg`,
          description: 'Психологический журнал',
        }
      
      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Қарлығаш',
          url: baseUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}/articles?search={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        }
      
      default:
        return {}
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
    />
  )
}


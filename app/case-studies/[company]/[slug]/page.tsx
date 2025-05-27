import { getCaseStudyBySlug, getCaseStudies } from '../../utils.server'
import { notFound } from 'next/navigation'
import AnimatedWrapper from 'app/components/animatedwrapper'
import Image from 'next/image'
import Breadcrumb from 'app/components/breadcrumb'
import { CustomMDX } from 'app/components/mdx'
import styles from 'app/components/mdx.module.css'
import { baseUrl } from 'app/sitemap'


export async function generateMetadata({ params }: { params: { company: string, slug: string } }) {
  const { company, slug } = params;
  const caseStudy = await getCaseStudyBySlug(company, slug)
  
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
      description: 'The requested case study could not be found.'
    }
  }
  
  const { title, summary: description, image } = caseStudy.metadata;
  const ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${baseUrl}/case-studies/${company}/${slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies()
  
  return caseStudies.map((caseStudy) => ({
    company: caseStudy.companySlug,
    slug: caseStudy.slug,
  }))
}

export default async function CaseStudyPage({ params }: { params: { company: string, slug: string } }) {
  const { company, slug } = params;
  const caseStudy = await getCaseStudyBySlug(company, slug)
  
  if (!caseStudy) {
    notFound()
  }
  
  // Convert company slug to display format (e.g., "navro" -> "Navro")
  const companyDisplay = caseStudy.companySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  
  return (
    <AnimatedWrapper>
      <section className="container">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: caseStudy.metadata.title,
              description: caseStudy.metadata.summary,
              image: caseStudy.metadata.image
                ? `${baseUrl}${caseStudy.metadata.image}`
                : `/og?title=${encodeURIComponent(caseStudy.metadata.title)}`,
              url: `${baseUrl}/case-studies/${company}/${slug}`,
              author: {
                '@type': 'Person',
                name: 'Ana Fernandes Rodrigues',
              },
            }),
          }}
        />
        <Breadcrumb 
          title={caseStudy.metadata.title} 
          href="/" 
          linkText="Return to home" 
        />
        
        <h1 className={styles.h1}>{caseStudy.metadata.title}</h1>
        <p className="monoSm">
          {caseStudy.metadata.role && `${caseStudy.metadata.role} · `}
          {companyDisplay}
        </p>
        
        <div className={styles.postHero}>         
          {caseStudy.metadata.image && (
            <figure className={styles.imgWrapper}>
              <Image 
                src={caseStudy.metadata.image}
                alt={caseStudy.metadata.alt || caseStudy.metadata.title} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={true}
                quality={80}
                style={{ objectFit: 'cover' }} 
              />
            </figure>
          )}
          {caseStudy.metadata.alt && (
            <figcaption className={`paragraphSm ${styles.figcaption}`}>{caseStudy.metadata.alt}</figcaption>
          )}
        </div>
        
        <div>
          {caseStudy.content ? (
            <CustomMDX source={caseStudy.content} />
          ) : (
            <div className="error">No content available for this case study</div>
          )}
        </div>
      </section>
    </AnimatedWrapper>
  )
}

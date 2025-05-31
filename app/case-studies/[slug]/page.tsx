import { getCaseStudyBySlug, getCaseStudies } from '../utils.server'
import { notFound } from 'next/navigation'
import AnimatedWrapper from 'app/components/animatedwrapper'
import Breadcrumb from 'app/components/breadcrumb'
import { CustomMDX } from 'app/components/mdx'
import { baseUrl } from 'app/sitemap'
import CaseStudyHero from 'app/components/casestudyhero'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const caseStudy = await getCaseStudyBySlug(slug)
  
  if (!caseStudy) {
    return {
      title: 'Case study not found',
      description: 'The requested case study could not be found.'
    }
  }
  
  const { title, summary: description, image } = caseStudy.metadata
  const ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${baseUrl}/case-studies/${slug}`,
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
    slug: caseStudy.slug,
  }))
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const caseStudy = await getCaseStudyBySlug(slug)
  
  if (!caseStudy) {
    notFound()
  }
  
  // Get company name from metadata
  const companyName = caseStudy.metadata.company || ''
  
  return (
    <AnimatedWrapper>
      <section className="container">
        <Breadcrumb 
          title={caseStudy.metadata.title}
          href="/#experience"
          linkText="Return to home"
        />
        
        <CaseStudyHero
          title={caseStudy.metadata.title}
          summary={caseStudy.metadata.summary}
          company={companyName}
          client={caseStudy.metadata.client}
          role={caseStudy.metadata.role}
          year={caseStudy.metadata.year}
          image={caseStudy.metadata.image}
          imageAlt={caseStudy.metadata.alt}
        />
        
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

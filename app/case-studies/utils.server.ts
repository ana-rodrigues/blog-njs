import fs from 'fs'
import path from 'path'

export type CaseStudyMetadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
  alt?: string
  client?: string
  duration?: string
  technologies?: string[]
  role?: string
  company?: string
  year?: string
  goal?: string
}

export type CaseStudy = {
  slug: string
  metadata: CaseStudyMetadata
  content: string
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)
  const frontMatterBlock = match![1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  const frontMatterLines = frontMatterBlock.trim().split('\n')
  const metadata: Partial<CaseStudyMetadata> = {}

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    
    // Handle arrays (like technologies)
    if (key.trim() === 'technologies' && value.startsWith('[') && value.endsWith(']')) {
      const techArray = value.slice(1, -1).split(',').map(item => item.trim())
      metadata[key.trim() as keyof CaseStudyMetadata] = techArray as any
    } else {
      // Ensure we're not trying to assign a string to a string[] property
      const trimmedKey = key.trim() as keyof CaseStudyMetadata
      if (trimmedKey === 'technologies') {
        metadata[trimmedKey] = [value] as any // Convert single value to array
      } else {
        metadata[trimmedKey] = value as any
      }
    }
  })

  return { metadata: metadata as CaseStudyMetadata, content }
}

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    return []
  }
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir: string): CaseStudy[] {
  const files = getMDXFiles(dir)
  return files.map(file => {
    const filePath = path.join(dir, file)
    const { metadata, content } = readMDXFile(filePath)
    const slug = file.replace(/\.mdx$/, '')
    
    return {
      slug,
      metadata,
      content
    }
  })
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const caseStudiesDir = path.join(process.cwd(), 'app', 'case-studies', 'posts')
  return getMDXData(caseStudiesDir)
}

export async function getCaseStudiesByCompany(company: string): Promise<CaseStudy[]> {
  const allCaseStudies = await getCaseStudies()
  return allCaseStudies.filter(study => 
    study.metadata.company && 
    study.metadata.company.toLowerCase() === company.toLowerCase()
  )
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const allCaseStudies = await getCaseStudies()
  return allCaseStudies.find(study => study.slug === slug) || null
}

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
}

export type CaseStudy = {
  slug: string
  metadata: CaseStudyMetadata
  content: string
  companySlug: string
}

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match![1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<CaseStudyMetadata> = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
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
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir: string, companySlug: string): CaseStudy[] {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
      companySlug
    }
  })
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const caseStudiesDir = path.join(process.cwd(), 'app', 'case-studies', 'posts')
  const companyDirs = fs.readdirSync(caseStudiesDir)
  
  let allCaseStudies: CaseStudy[] = []
  
  for (const companyDir of companyDirs) {
    const companyPath = path.join(caseStudiesDir, companyDir)
    if (fs.statSync(companyPath).isDirectory()) {
      const caseStudies = getMDXData(companyPath, companyDir)
      allCaseStudies = [...allCaseStudies, ...caseStudies]
    }
  }
  
  return allCaseStudies
}

export async function getCaseStudiesByCompany(company: string): Promise<CaseStudy[]> {
  const companyPath = path.join(process.cwd(), 'app', 'case-studies', 'posts', company)
  if (!fs.existsSync(companyPath)) {
    return []
  }
  
  return getMDXData(companyPath, company)
}

export async function getCaseStudyBySlug(company: string, slug: string): Promise<CaseStudy | null> {
  const companyStudies = await getCaseStudiesByCompany(company)
  return companyStudies.find(study => study.slug === slug) || null
}

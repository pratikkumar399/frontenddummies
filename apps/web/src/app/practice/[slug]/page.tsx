import { getChallengeBySlug, getAllSlugs } from '@/lib/challenges';
import { loadEditorialMdx } from '@/lib/content-loader';
import { notFound } from 'next/navigation';
import { PracticeClient } from '@/components/practice/PracticeClient';
import { Metadata } from 'next';
import { generateTemplateMetadata, generateSoftwareAppStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs
    .map((slug) => {
      const template = getChallengeBySlug(slug);
      // Only generate params for templates with starter code
      if (template?.starterCode) {
        return { slug };
      }
      return null;
    })
    .filter((item): item is { slug: string } => item !== null);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getChallengeBySlug(slug);

  if (!template || !template.starterCode) {
    return {
      title: 'Practice Not Found',
    };
  }

  return generateTemplateMetadata(template, 'practice');
}

export default async function PracticePage({ params }: PageProps) {
  const { slug } = await params;
  const template = getChallengeBySlug(slug);

  if (!template || !template.starterCode) {
    return notFound();
  }

  const editorial = await loadEditorialMdx(slug);
  const structuredData = generateSoftwareAppStructuredData(template);
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'Design', url: `https://frontenddummies.com/design/${slug}` },
    { name: 'Practice', url: `https://frontenddummies.com/practice/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <PracticeClient slug={slug} editorial={editorial} />
    </>
  );
}


import type { Metadata } from "next";
import { getChallengeBySlug, getAllSlugs } from '@/lib/challenges';
import { generateTemplateMetadata } from '@/lib/seo';

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const template = getChallengeBySlug(slug);

  if (!template || !template.starterCode) {
    return {
      title: 'Practice Not Found',
      description: 'The requested practice challenge could not be found.',
    };
  }

  return generateTemplateMetadata(template, 'practice');
}

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


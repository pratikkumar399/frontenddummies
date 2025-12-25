import type { Metadata } from "next";
import { getChallengeBySlug, getAllSlugs } from '@/lib/challenges';
import { generateTemplateMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs
    .map((slug) => {
      const template = getChallengeBySlug(slug);
      // Only generate params for templates with snippets
      if (template?.snippets && template.snippets.length > 0) {
        return { slug };
      }
      return null;
    })
    .filter((item): item is { slug: string } => item !== null);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const template = getChallengeBySlug(slug);

  if (!template || !template.snippets || template.snippets.length === 0) {
    return {
      title: 'Snippet Practice Not Found',
      description: 'The requested snippet practice could not be found.',
    };
  }

  return generateTemplateMetadata(template, 'snippet-practice');
}

export default function SnippetPracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


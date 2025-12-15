import { getChallengeBySlug } from '@/lib/challenges';
import { loadEditorialMdx } from '@/lib/content-loader';
import { notFound } from 'next/navigation';
import { PracticeClient } from '@/components/practice/PracticeClient';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PracticePage({ params }: PageProps) {
  const { slug } = await params;
  const template = getChallengeBySlug(slug);

  if (!template) {
    return notFound();
  }

  const editorial = await loadEditorialMdx(slug);

  // JSON-LD Structured Data (kept on server for SEO)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `${template.name} - Interactive Code Editor`,
    "description": template.shortDescription,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "250"
    },
    "author": {
      "@type": "Person",
      "name": template.author
    },
    "url": `https://frontenddummies.com/practice/${template.slug}`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PracticeClient slug={slug} editorial={editorial} />
    </>
  );
}


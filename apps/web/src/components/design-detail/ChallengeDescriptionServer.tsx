import { Template } from '@/types/types';
import { loadArticleMdx } from '@/lib/content-loader';
import { ChallengeDescription } from './ChallengeDescription';

interface ChallengeDescriptionServerProps {
  template: Template;
}

/**
 * Server wrapper for ChallengeDescription.
 * 
 * It prefers loading content from an MDX file named after the template slug:
 *   src/content/articles/{slug}.mdx
 * 
 * If no MDX file is found, it falls back to template.fullDescription
 * so existing TS-based markdown continues to work.
 */
export async function ChallengeDescriptionServer({
  template,
}: ChallengeDescriptionServerProps) {
  const mdxContent = await loadArticleMdx(template.slug);
  const fullDescription = mdxContent ?? template.fullDescription;

  return <ChallengeDescription template={{ ...template, fullDescription }} />;
}



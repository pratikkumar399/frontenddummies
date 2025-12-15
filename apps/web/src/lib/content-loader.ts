import fs from 'fs/promises';
import path from 'path';

const ARTICLES_DIR = path.join(process.cwd(), 'src', 'content', 'articles');
const EDITORIALS_DIR = path.join(process.cwd(), 'src', 'content', 'editorials');

/**
 * Load article content from an MDX file by slug.
 *
 * This returns the raw MDX/markdown string. It is meant to be passed to
 * existing markdown renderers like ReactMarkdown, not compiled as MDX.
 */
export async function loadArticleMdx(slug: string): Promise<string | null> {
    const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);

    try {
        const content = await fs.readFile(filePath, 'utf-8');
        return content;
    } catch {
        // If file doesn't exist or can't be read, gracefully fall back
        return null;
    }
}

/**
 * Load editorial content from an MDX file by slug.
 *
 * Files are expected at: src/content/editorials/{slug}.mdx
 */
export async function loadEditorialMdx(slug: string): Promise<string | null> {
    const filePath = path.join(EDITORIALS_DIR, `${slug}.mdx`);

    try {
        const content = await fs.readFile(filePath, 'utf-8');
        return content;
    } catch {
        return null;
    }
}



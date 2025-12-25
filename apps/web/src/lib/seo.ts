import { Metadata } from 'next';
import { Template } from '@/types/types';

const BASE_URL = 'https://frontenddummies.com';
const SITE_NAME = 'Frontend Dummies';
const DEFAULT_DESCRIPTION = 'A comprehensive platform for mastering frontend coding skills, system design, and building real-world projects.';

/**
 * Generate canonical URL for a page
 */
export function getCanonicalUrl(path: string): string {
    return `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Generate Open Graph image URL
 */
export function getOgImageUrl(imageUrl?: string, title?: string): string {
    if (imageUrl && !imageUrl.startsWith('http')) {
        return `${BASE_URL}${imageUrl}`;
    }
    return imageUrl || `${BASE_URL}/og-image.png`;
}

/**
 * Generate metadata for a template/challenge page
 */
export function generateTemplateMetadata(
    template: Template | undefined,
    type: 'blog' | 'design' | 'practice' | 'snippet-practice' = 'design'
): Metadata {
    if (!template) {
        return {
            title: 'Page Not Found',
            description: DEFAULT_DESCRIPTION,
        };
    }

    const path = `/${type}/${template.slug}`;
    const canonicalUrl = getCanonicalUrl(path);
    const ogImage = getOgImageUrl(template.imageUrl, template.name);
    const keywords = [...template.tags, ...template.techStack].join(', ');

    const metadata: Metadata = {
        title: template.name,
        description: template.shortDescription || DEFAULT_DESCRIPTION,
        keywords: keywords,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: template.name,
            description: template.shortDescription || DEFAULT_DESCRIPTION,
            url: canonicalUrl,
            siteName: SITE_NAME,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: template.name,
                },
            ],
            type: type === 'blog' ? 'article' : 'website',
            ...(type === 'blog' && {
                publishedTime: template.createdAt,
                authors: [template.author],
            }),
        },
        twitter: {
            card: 'summary_large_image',
            title: template.name,
            description: template.shortDescription || DEFAULT_DESCRIPTION,
            images: [ogImage],
            creator: '@pratikrai',
        },
    };

    return metadata;
}

/**
 * Generate structured data (JSON-LD) for a blog post
 */
export function generateBlogStructuredData(template: Template) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: template.name,
        description: template.shortDescription,
        image: getOgImageUrl(template.imageUrl, template.name),
        datePublished: template.createdAt,
        dateModified: template.createdAt,
        author: {
            '@type': 'Person',
            name: template.author,
        },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/og-image.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': getCanonicalUrl(`/blog/${template.slug}`),
        },
        keywords: template.tags.join(', '),
        articleBody: template.fullDescription || template.shortDescription,
        inLanguage: 'en-US',
    };
}

/**
 * Generate structured data for a course/challenge
 */
export function generateCourseStructuredData(template: Template) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: template.name,
        description: template.shortDescription,
        provider: {
            '@type': 'Organization',
            name: SITE_NAME,
            sameAs: BASE_URL,
        },
        educationalLevel: template.tags.find((t) => ['Easy', 'Medium', 'Hard'].includes(t)) || 'Intermediate',
        teaches: template.techStack,
        keywords: template.tags.join(', '),
        datePublished: template.createdAt,
        author: {
            '@type': 'Person',
            name: template.author,
        },
        image: getOgImageUrl(template.imageUrl, template.name),
        url: getCanonicalUrl(`/design/${template.slug}`),
        hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'online',
            courseWorkload: 'PT45M',
        },
        inLanguage: 'en-US',
    };
}

/**
 * Generate structured data for a quiz/snippet practice
 */
export function generateQuizStructuredData(template: Template) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Quiz',
        name: template.name,
        description: template.shortDescription,
        educationalLevel: template.tags.find((t) => ['Easy', 'Medium', 'Hard'].includes(t)) || 'Intermediate',
        teaches: template.techStack,
        author: {
            '@type': 'Person',
            name: template.author,
        },
        datePublished: template.createdAt,
        numberOfQuestions: template.snippets?.length || 0,
        url: getCanonicalUrl(`/snippet-practice/${template.slug}`),
        inLanguage: 'en-US',
        interactivityType: 'active',
    };
}

/**
 * Generate structured data for a software application (practice page)
 */
export function generateSoftwareAppStructuredData(template: Template) {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: `${template.name} - Interactive Code Editor`,
        description: template.shortDescription,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web Browser',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '250',
        },
        author: {
            '@type': 'Person',
            name: template.author,
        },
        url: getCanonicalUrl(`/practice/${template.slug}`),
    };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

/**
 * Generate collection page structured data
 */
export function generateCollectionStructuredData(
    name: string,
    description: string,
    items: Array<{ name: string; description: string; url: string }>,
    url: string
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name,
        description,
        url: getCanonicalUrl(url),
        mainEntity: {
            '@type': 'ItemList',
            numberOfItems: items.length,
            itemListElement: items.slice(0, 10).map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@type': 'Course',
                    name: item.name,
                    description: item.description,
                    url: item.url,
                },
            })),
        },
        breadcrumb: generateBreadcrumbStructuredData([
            { name: 'Home', url: BASE_URL },
            { name, url: getCanonicalUrl(url) },
        ]),
    };
}

/**
 * Generate website structured data
 */
export function generateWebsiteStructuredData() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        url: BASE_URL,
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${BASE_URL}/explore?search={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/og-image.png`,
            },
        },
    };
}

/**
 * Generate organization structured data
 */
export function generateOrganizationStructuredData() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: BASE_URL,
        logo: `${BASE_URL}/og-image.png`,
        sameAs: ['https://github.com/pratikkumar399/frontendfordummies'],
        description: DEFAULT_DESCRIPTION,
    };
}


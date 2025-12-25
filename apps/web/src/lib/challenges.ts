import { INITIAL_TEMPLATES } from '@/lib/constants';
import { Template, Category } from '@/types/types';

export const getChallengeBySlug = (slug: string): Template | undefined => {
    return INITIAL_TEMPLATES.find((t) => t.slug === slug);
};

export const getAllChallenges = (): Template[] => {
    return INITIAL_TEMPLATES;
};

/**
 * Get related challenges based on category, tags, and tech stack
 * Prioritizes challenges with similar tags and same category
 */
export const getRelatedChallenges = (
    currentSlug: string,
    limit: number = 3
): Template[] => {
    const current = getChallengeBySlug(currentSlug);
    if (!current) {
        return INITIAL_TEMPLATES
            .filter(t => t.slug !== currentSlug)
            .slice(0, limit);
    }

    // Score challenges based on relevance
    const scored = INITIAL_TEMPLATES
        .filter(t => t.slug !== currentSlug)
        .map(template => {
            let score = 0;

            // Same category gets high priority
            if (template.category === current.category) {
                score += 10;
            }

            // Shared tags increase score
            const sharedTags = template.tags.filter(tag =>
                current.tags.includes(tag)
            );
            score += sharedTags.length * 3;

            // Shared tech stack increases score
            const sharedTech = template.techStack.filter(tech =>
                current.techStack.includes(tech)
            );
            score += sharedTech.length * 2;

            return { template, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.template);

    return scored;
};

/**
 * Get challenges by category
 */
export const getChallengesByCategory = (category: Category): Template[] => {
    return INITIAL_TEMPLATES.filter(t => t.category === category);
};

/**
 * Get challenges by tag
 */
export const getChallengesByTag = (tag: string): Template[] => {
    return INITIAL_TEMPLATES.filter(t =>
        t.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
};

/**
 * Get all unique tags from all challenges
 */
export const getAllTags = (): string[] => {
    const tagSet = new Set<string>();
    INITIAL_TEMPLATES.forEach(template => {
        template.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
};

/**
 * Get all unique categories
 */
export const getAllCategories = (): Category[] => {
    const categorySet = new Set<Category>();
    INITIAL_TEMPLATES.forEach(template => {
        categorySet.add(template.category);
    });
    return Array.from(categorySet);
};

/**
 * Get static paths for all dynamic routes
 */
export const getAllSlugs = (): string[] => {
    return INITIAL_TEMPLATES.map(t => t.slug);
};


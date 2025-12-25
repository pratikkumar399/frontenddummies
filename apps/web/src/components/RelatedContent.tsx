import { Template } from '@/types/types';
import { TemplateCard } from './TemplateCard';
import { TemplateListItem } from './TemplateListItem';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LinkButton } from '@repo/ui';
import { ButtonVariant, ButtonSize } from '@/types/types';

interface RelatedContentProps {
    templates: Template[];
    title?: string;
    showViewAll?: boolean;
    viewAllHref?: string;
}

export function RelatedContent({
    templates,
    title = 'Related Challenges',
    showViewAll = true,
    viewAllHref = '/explore',
}: RelatedContentProps) {
    if (templates.length === 0) {
        return null;
    }

    return (
        <section className="mt-16 pt-16 border-t border-dark-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
                    <p className="text-zinc-400 text-sm">
                        Continue learning with these related challenges
                    </p>
                </div>
                {showViewAll && (
                    <LinkButton
                        href={viewAllHref}
                        variant={ButtonVariant.GHOST}
                        size={ButtonSize.SM}
                        className="text-primary-400 hover:text-primary-300 self-start sm:self-auto"
                    >
                        View All
                        <ArrowRight size={16} className="ml-2" />
                    </LinkButton>
                )}
            </div>
            {/* Mobile: List view */}
            <div className="flex flex-col gap-4 md:hidden">
                {templates.map((template) => (
                    <TemplateListItem key={template.id} template={template} />
                ))}
            </div>
            {/* Desktop: Card grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                ))}
            </div>
        </section>
    );
}


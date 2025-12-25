import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    const allItems = [
        { label: 'Home', href: '/' },
        ...items,
    ];

    return (
        <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-zinc-400 mb-6"
        >
            {allItems.map((item, index) => {
                const isLast = index === allItems.length - 1;

                return (
                    <div key={item.href} className="flex items-center gap-2">
                        {index === 0 ? (
                            <Link
                                href={item.href}
                                className="hover:text-primary-400 transition-colors flex items-center gap-1"
                                aria-label="Home"
                            >
                                <Home size={14} />
                            </Link>
                        ) : (
                            <>
                                <ChevronRight size={14} className="text-zinc-600" />
                                {isLast ? (
                                    <span className="text-white font-medium">{item.label}</span>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="hover:text-primary-400 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}


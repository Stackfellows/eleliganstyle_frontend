import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center space-x-2 text-xs font-sans text-[#6E6767] tracking-wider uppercase">
        <li>
          <Link href="/" className="hover:text-[#171515] transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center space-x-2">
              <ChevronRight className="w-3 h-3 text-[#ECE7E6]" />
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-[#171515] transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#171515] font-medium">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

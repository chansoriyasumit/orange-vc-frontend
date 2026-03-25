'use client';

import { useState } from 'react';
import { Phone, Plus, X } from 'lucide-react';

const contactLinks = [
  {
    href: 'tel:+919310557136',
    label: 'Call India: IND:91-9310557136',
    text: 'IND:91-9310557136',
    accent: 'from-tomato/20 to-tomato/10',
  },
  {
    href: 'tel:+19096342861',
    label: 'Call USA: +1 (909) 634-2861',
    text: 'USA:+1 (909) 634-2861',
    accent: 'from-tomato/20 to-tomato/10',
  },
];

export function FloatingContactBar() {
  // Default open so contact numbers are immediately visible.
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className="pointer-events-none fixed bottom-6 right-3 z-30 md:right-32 lg:right-40"
      aria-label="Quick contact"
    >
      <div className="flex flex-col items-end gap-3">
        <div
          className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!isOpen}
        >
          {contactLinks.map(({ href, label, text, accent }) => (
            <a
              key={href}
              href={href}
              aria-label={label}
              className="pointer-events-auto flex w-72 max-w-[85vw] items-center gap-3 rounded-2xl border border-tomato/20 bg-white/90 px-3.5 py-2.5 shadow-lg shadow-rich-black/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-tomato/40 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato focus-visible:ring-offset-2"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br border border-tomato/20 text-tomato/90 shadow-sm">
                <Phone className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-left text-sm font-semibold text-rich-black/85 leading-tight truncate">
                  {text}
                </span>
              </span>
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label={isOpen ? 'Close quick contact' : 'Open quick contact'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-tomato/30 bg-white/90 text-tomato shadow-lg shadow-rich-black/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-tomato/10 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato focus-visible:ring-offset-2"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
        </button>
      </div>
    </aside>
  );
}


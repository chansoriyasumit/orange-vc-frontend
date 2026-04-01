'use client';

import { useState } from 'react';
import { Facebook, Globe, Instagram, Linkedin, Phone, Plus, X, Youtube } from 'lucide-react';

const socialLinks = [
  {
    href: 'https://www.orangevirtualconnect.com/',
    label: 'Website',
    Icon: Globe,
  },
  {
    href: 'https://www.linkedin.com/company/orange-virtual-global-solutions-pvt-ltd',
    label: 'LinkedIn',
    Icon: Linkedin,
  },
  {
    href: 'https://www.instagram.com/orangevirtualconnect/',
    label: 'Instagram',
    Icon: Instagram,
  },
  {
    href: 'https://www.facebook.com/orangevirtualconnect',
    label: 'Facebook',
    Icon: Facebook,
  },
  {
    href: 'https://www.youtube.com/@OrangeVirtualConnect',
    label: 'YouTube',
    Icon: Youtube,
  },
];

const supportNumbers = [
  {
    href: 'tel:+19096342861',
    label: 'USA',
    value: '+1 (909) 634-2861',
  },
  {
    href: 'tel:+919310557136',
    label: 'IND',
    value: '+91-9310557136',
  },
];

export function FloatingSocialBar() {
  const [isSocialOpen, setIsSocialOpen] = useState(true);
  const [isPhoneOpen, setIsPhoneOpen] = useState(true);

  return (
    <aside className="pointer-events-none fixed inset-x-0 bottom-6 z-40" aria-label="Social media links">
      <div className="pointer-events-none container mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div className="flex flex-col items-start gap-3">
            <div
              className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 ${
                isPhoneOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
              aria-hidden={!isPhoneOpen}
            >
              {supportNumbers.map(({ href, label, value }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`Call ${label} support at ${value}`}
                  className="pointer-events-auto flex h-11 items-center justify-center gap-2 rounded-2xl border border-tomato/20 bg-white px-3 text-xs font-semibold text-rich-black/80 shadow-lg shadow-rich-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-tomato/40 hover:text-tomato hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato focus-visible:ring-offset-2"
                >
                  <Phone className="h-4 w-4" />
                  <span className="whitespace-nowrap">{label}: {value}</span>
                </a>
              ))}
            </div>

            <button
              type="button"
              aria-label={isPhoneOpen ? 'Close contact numbers' : 'Open contact numbers'}
              aria-expanded={isPhoneOpen}
              onClick={() => setIsPhoneOpen((prev) => !prev)}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-tomato/30 bg-white text-tomato shadow-lg shadow-rich-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-tomato hover:text-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato focus-visible:ring-offset-2"
            >
              {isPhoneOpen ? <X className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div
              className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 ${
                isSocialOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
              aria-hidden={!isSocialOpen}
            >
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-2xl border border-tomato/20 bg-white text-rich-black/70 shadow-lg shadow-rich-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-tomato/40 hover:text-tomato hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato focus-visible:ring-offset-2"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <button
              type="button"
              aria-label={isSocialOpen ? 'Close social media links' : 'Open social media links'}
              aria-expanded={isSocialOpen}
              onClick={() => setIsSocialOpen((prev) => !prev)}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-tomato/30 bg-tomato text-white shadow-lg shadow-rich-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-tomato-600 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato focus-visible:ring-offset-2"
            >
              {isSocialOpen ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

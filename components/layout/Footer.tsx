import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Instagram, Facebook, Youtube, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-rich-black py-16 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row flex-wrap justify-between gap-6 md:gap-8 lg:gap-10 mb-12">
          {/* Logo and Description */}
          <div className="flex flex-col gap-4 max-w-sm">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/logo/orangevclogo.png" 
                alt="OrangeVC Logo" 
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <span className="font-heading font-bold text-xl text-white">
                Orange<span className="text-orange-500">VC</span>
              </span>
            </Link>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              Empowering businesses with professional virtual assistance—making every task seamless, no matter the challenge.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap items-start gap-10 md:gap-12 lg:gap-16">
            {/* Product Links */}
            <div>
              <p className="text-slate-100 font-semibold mb-4 text-sm md:text-base">Product</p>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/" className="text-sm md:text-base text-gray-400 hover:text-orange-500 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-sm md:text-base text-gray-400 hover:text-orange-500 transition">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm md:text-base text-gray-400 hover:text-orange-500 transition">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm md:text-base text-gray-400 hover:text-orange-500 transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <p className="text-slate-100 font-semibold mb-4 text-sm md:text-base">Resources</p>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/about" className="text-sm md:text-base text-gray-400 hover:text-orange-500 transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm md:text-base text-gray-400 hover:text-orange-500 transition">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-sm md:text-base text-gray-400 hover:text-orange-500 transition">
                    Dashboard
                  </Link>
                </li>
                {/* <li>
                  <Link href="/contact" className="text-sm md:text-base text-gray-400 hover:text-orange-500 transition">
                    Support
                  </Link>
                </li> */}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <p className="text-slate-100 font-semibold mb-4 text-sm md:text-base">Legal</p>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/privacy" className="text-sm md:text-base text-gray-400 hover:text-orange-500 transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm md:text-base text-gray-400 hover:text-orange-500 transition">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-5 mb-8">
          <a 
            href="https://www.orangevirtualconnect.com/" 
            target="_blank" 
            rel="noreferrer"
            className="text-gray-400 hover:text-orange-500 transition"
            aria-label="Website"
          >
            <Globe className="size-5 md:size-6" />
          </a>
          <a 
            href="https://www.linkedin.com/company/orange-virtual-global-solutions-pvt-ltd" 
            target="_blank" 
            rel="noreferrer"
            className="text-gray-400 hover:text-orange-500 transition"
            aria-label="LinkedIn"
          >
            <Linkedin className="size-5 md:size-6" />
          </a>
          <a 
            href="https://www.instagram.com/orangevirtualconnect/" 
            target="_blank" 
            rel="noreferrer"
            className="text-gray-400 hover:text-orange-500 transition"
            aria-label="Instagram"
          >
            <Instagram className="size-5 md:size-6" />
          </a>
          <a 
            href="https://www.facebook.com/orangevirtualconnect" 
            target="_blank" 
            rel="noreferrer"
            className="text-gray-400 hover:text-orange-500 transition"
            aria-label="Facebook"
          >
            <Facebook className="size-5 md:size-6" />
          </a>
          <a 
            href="https://www.youtube.com/@OrangeVirtualConnect" 
            target="_blank" 
            rel="noreferrer"
            className="text-gray-400 hover:text-orange-500 transition"
            aria-label="YouTube"
          >
            <Youtube className="size-5 md:size-6" />
          </a>
        </div>
        
        {/* Copyright - Centered */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-sm md:text-base text-gray-400">
            © 2025{' '}
            <Link href="/" className="text-orange-500 hover:text-orange-400 transition">
              Orange Virtual Connect
            </Link>
            <br />
            <span className="text-xs text-gray-500 mt-2 block">
              Orange Virtual Global Solutions Pvt Ltd
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}


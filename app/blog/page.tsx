import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/src/shared/components/ui/SectionHeading';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { FileText, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Blog | OrangeVC - Insights & Tips for Virtual Assistance',
  description: 'Read insights on virtual assistants, remote work, productivity, and how OrangeVC helps businesses scale with verified professionals.',
};

// Mock blog posts – replace with API or CMS later
const blogPosts = [
  {
    slug: 'why-hire-a-virtual-assistant',
    title: 'Why Hire a Virtual Assistant? 5 Benefits for Busy Entrepreneurs',
    excerpt: 'Discover how a dedicated virtual assistant can save you time, reduce overhead, and help you focus on what matters most in your business.',
    date: '2025-03-10',
    category: 'Productivity',
    readTime: '5 min read',
  },
  {
    slug: 'virtual-assistant-vs-in-house',
    title: 'Virtual Assistant vs In-House Hire: What’s Right for You?',
    excerpt: 'We compare cost, flexibility, and scalability so you can choose the right support model for your team and budget.',
    date: '2025-03-05',
    category: 'Business',
    readTime: '6 min read',
  },
  {
    slug: 'getting-started-with-va',
    title: 'Getting Started with Your First Virtual Assistant',
    excerpt: 'A step-by-step guide to onboarding your first VA: from defining tasks and tools to setting clear expectations and feedback loops.',
    date: '2025-02-28',
    category: 'Getting Started',
    readTime: '7 min read',
  },
  {
    slug: 'customer-support-best-practices',
    title: 'Customer Support Best Practices for Growing Teams',
    excerpt: 'How to deliver consistent, empathetic support at scale—whether you handle it in-house or with a dedicated support VA.',
    date: '2025-02-20',
    category: 'Customer Support',
    readTime: '5 min read',
  },
  {
    slug: 'tools-for-remote-teams',
    title: 'Essential Tools for Managing Remote & Virtual Teams',
    excerpt: 'Communication, project management, and file-sharing tools that keep distributed teams aligned and productive.',
    date: '2025-02-15',
    category: 'Remote Work',
    readTime: '6 min read',
  },
  {
    slug: 'scaling-with-vas',
    title: 'Scaling Your Business with Virtual Assistants',
    excerpt: 'Learn how successful teams use VAs for admin, sales, marketing, and operations to grow without proportionally growing headcount.',
    date: '2025-02-08',
    category: 'Scaling',
    readTime: '5 min read',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white-smoke">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pale-dogwood/30 via-white-smoke to-tomato/5 py-32 pt-28 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-tomato/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-pale-dogwood/50 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tomato/10 text-tomato font-semibold text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              Blog
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-rich-black mb-6 leading-tight">
              Insights &{' '}
              <span className="text-tomato">Tips</span>
            </h1>
            <p className="text-xl text-rich-black/70 max-w-2xl mx-auto leading-relaxed">
              Practical advice on virtual assistants, remote work, and scaling your business with the right support.
            </p>
          </div>
        </div>
      </section>

      {/* Blog List */}
      <section className="bg-white -mt-16 pb-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto pt-16">
            <SectionHeading
              icon={FileText}
              iconLabel="Articles"
              title="Latest from our blog"
              subtitle="Ideas and best practices to help you work smarter with virtual assistance."
              centered
              className="mx-auto mb-14"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="h-full border border-platinum/60 bg-white hover:shadow-lg hover:border-tomato/20 transition-all duration-300 group overflow-hidden">
                    <CardHeader className="pb-2">
                      <span className="text-xs font-semibold text-tomato uppercase tracking-wide">
                        {post.category}
                      </span>
                      <h2 className="font-heading text-xl font-bold text-rich-black group-hover:text-tomato transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-rich-black/70 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between text-sm text-rich-black/60 pt-0">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(post.date), 'MMM d, yyyy')}
                      </span>
                      <span className="flex items-center gap-1.5 group-hover:text-tomato transition-colors">
                        {post.readTime}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

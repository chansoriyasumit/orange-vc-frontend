import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { blogPosts, getBlogPostBySlug } from '@/src/lib/blog/data';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Post not found | OrangeVC Blog' };
  return {
    title: `${post.title} | OrangeVC Blog`,
    description: post.excerpt.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt.slice(0, 160),
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white-smoke">
      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-pale-dogwood/30 via-white-smoke to-tomato/5 py-24 pt-28 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-tomato/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-pale-dogwood/50 rounded-full blur-3xl" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-rich-black/70 hover:text-tomato transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <p className="text-sm font-semibold text-tomato uppercase tracking-wide mb-2">
            {post.category}
          </p>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-rich-black max-w-3xl leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 mt-6 text-rich-black/60 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
          <div className="relative mt-10 max-w-4xl aspect-[21/9] rounded-2xl overflow-hidden shadow-lg border border-platinum/40 bg-platinum/30">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white -mt-16 pb-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto pt-16">
            <Card className="border border-platinum/60 bg-white shadow-sm overflow-hidden">
              <CardContent className="p-8 md:p-10 prose prose-lg max-w-none">
                {post.content.map((paragraph, i) => {
                  const isBold = paragraph.startsWith('**') && paragraph.endsWith('**');
                  const text = isBold ? paragraph.slice(2, -2) : paragraph;
                  if (isBold) {
                    return (
                      <h3
                        key={i}
                        className="font-heading text-lg font-bold text-rich-black mt-8 mb-2 first:mt-0"
                      >
                        {text}
                      </h3>
                    );
                  }
                  return (
                    <p key={i} className="text-rich-black/80 leading-relaxed mb-4">
                      {text}
                    </p>
                  );
                })}
              </CardContent>
            </Card>
            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-tomato hover:text-tomato-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all posts
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

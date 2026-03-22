import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogListWithDetailModal } from '@/components/blog/BlogListWithDetailModal';
import { BlogVideoSection } from '@/components/blog/BlogVideoSection';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getPublicBlogCms } from '@/src/lib/cms/getPublicBlogCms';
import { BarChart3, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog | OrangeVC - Insights & Tips for Virtual Assistance',
  description: 'Read insights on virtual assistants, remote work, productivity, and how OrangeVC helps businesses scale with verified professionals.',
};

export default async function BlogPage() {
  const cms = await getPublicBlogCms();
  const { hero, caseStudiesHero } = cms;
  const showVideoBlock = cms.videos.some((v) => v.videoUrl?.trim());

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
              {hero.badgeLabel}
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-rich-black mb-6 leading-tight">
              {hero.headingPart1}{' '}
              <span className="text-tomato">{hero.headingPart2}</span>
            </h1>
            <p className="text-xl text-rich-black/70 max-w-2xl mx-auto leading-relaxed">
              {hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Blog List (CMS) */}
      <section className="bg-white -mt-16 pb-16 md:pb-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto pt-16">
            <BlogListWithDetailModal items={cms.blogs} />
          </div>
        </div>
      </section>

      {/* Featured video (CMS) */}
      {showVideoBlock ? (
        <section className="bg-white-smoke border-t border-platinum/50 py-20 md:py-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <BlogVideoSection videosHero={cms.videosHero} videos={cms.videos} />
            </div>
          </div>
        </section>
      ) : null}

      {/* Case studies (CMS) */}
      <section className="bg-white border-t border-platinum/50 py-20 md:py-24 pb-28">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tomato/10 text-tomato font-semibold text-sm mb-5">
                <BarChart3 className="w-4 h-4" />
                {caseStudiesHero.badgeLabel}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-rich-black mb-4">
                {caseStudiesHero.headingPart1}{' '}
                <span className="text-tomato">{caseStudiesHero.headingPart2}</span>
              </h2>
              <p className="text-lg text-rich-black/70 max-w-2xl mx-auto leading-relaxed">
                {caseStudiesHero.subtitle}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cms.caseStudies.map((study, index) => (
                <Card
                  key={`case-${index}-${study.title}`}
                  className="overflow-hidden border border-platinum/60 bg-white shadow-sm hover:shadow-lg hover:border-tomato/20 transition-all duration-300 flex flex-col p-0 gap-0"
                >
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-platinum/40">
                    {study.imageUrl?.trim() ? (
                      // eslint-disable-next-line @next/next/no-img-element -- CMS S3/CDN URLs; avoid next/image remote config
                      <img
                        src={study.imageUrl}
                        alt={study.title || 'Case study'}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-rich-black/40">
                        No image
                      </div>
                    )}
                  </div>
                  <CardHeader className="px-6 pt-6 pb-2 space-y-0">
                    <h3 className="font-heading text-lg font-bold text-rich-black leading-snug">
                      {study.title || 'Untitled'}
                    </h3>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-0">
                    <p className="text-rich-black/70 text-sm leading-relaxed line-clamp-4">
                      {study.subtitle?.trim() || study.description?.trim() || '—'}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

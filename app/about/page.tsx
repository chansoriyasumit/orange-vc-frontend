import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DotBackground } from '@/src/shared/components/backgrounds/GridBackground';
import { VideoPlayer } from '@/src/shared/components/ui/VideoPlayer';
import { Clock, Globe, Shield, Sparkles, Calendar, Briefcase, Heart, TrendingUp } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';

// SEO Metadata
export const metadata: Metadata = {
  title: 'About Us | OrangeVC - Virtual Assistant Services',
  description: 'Learn about Orange Virtual Connect - 12+ years helping CEOs, entrepreneurs, and small businesses with professional virtual assistant services. Meet our expert team.',
};

// Video URL - Replace with your actual video URL when ready
const TEAM_VIDEO_URL: string = '';

// Team Members Data
interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Akashdeep Sharma',
    role: 'CEO',
    description: '15+ years building and scaling high-performing customer operations and Virtual Assistant teams globally. I drive SOP-led, scalable systems and empowered teams for seamless operations and confident growth.',
    image: '/images/team/akashdeep-sharma.jpg',
  },
  {
    id: 2,
    name: 'Mitchelle Adhiambo',
    role: 'Virtual Assistant',
    description: 'A results-driven Virtual Assistant at Orange Virtual Connect, providing executive-level admin and operational support. She helps leaders reclaim time, sharpen focus, and run smoothly.',
    image: '/images/team/mitchelle-adhiambo.jpg',
  },
  {
    id: 3,
    name: 'Suhani Saxena',
    role: 'Digital Marketing Senior Executive',
    description: 'A Digital Marketing Senior Executive at Orange Virtual Connect, driving brand visibility and lead growth. She supports social media, LinkedIn strategy, SEO, and website optimization with data-driven execution.',
    image: '/images/team/suhani-saxena.jpg',
  },
  {
    id: 4,
    name: 'Gunjan Suman',
    role: 'Virtual Assistant',
    description: 'A Virtual Assistant at Orange Virtual Connect, supporting administrative, client, and digital tasks. She manages data, reporting, research, coordination, and presentations to ensure smooth workflows and organized operations.',
    image: '/images/team/gunjan-suman.jpg',
  },
];

export default function AboutPage() {
  const hasVideo = TEAM_VIDEO_URL && TEAM_VIDEO_URL.trim() !== '';
  
  // Separate CEO from other team members
  const ceo = teamMembers.find(member => member.role === 'CEO');
  const otherMembers = teamMembers.filter(member => member.role !== 'CEO');

  return (
    <div className="min-h-screen bg-white-smoke">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pale-dogwood/30 via-white-smoke to-tomato/5 py-32 pt-28 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-tomato/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-pale-dogwood/50 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tomato/10 text-tomato font-semibold text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              About Us
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-rich-black mb-6 leading-tight">
              Your Trusted Partner in{' '}
              <span className="text-tomato">Productivity</span>
            </h1>
            <p className="text-xl text-rich-black/70 max-w-2xl mx-auto leading-relaxed">
              At Orange Virtual Connect, we believe time is your most valuable asset — and we're here to help you make the most of it.
            </p>
          </div>
        </div>
      </section>

      {/* Team Introduction Section - First Section */}
      <section className="bg-white -mt-16 pb-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Video Player */}
            <div className="p-2 md:p-4 mb-12">
              {hasVideo ? (
                <VideoPlayer
                  videoUrl={TEAM_VIDEO_URL}
                  className="shadow-2xl"
                />
              ) : null}
            </div>

            {/* CEO Section with Heading */}
            {(() => {
              const ceo = teamMembers.find(m => m.role === 'CEO');
              const otherMembers = teamMembers.filter(m => m.role !== 'CEO');
              
              return (
                <>
                  {/* CEO Card with Heading */}
                  {ceo && (
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                      {/* Heading on Left */}
                      <div className="lg:col-span-1 flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tomato/10 text-tomato font-medium text-sm mb-4 w-fit">
                          <Sparkles className="w-4 h-4" />
                          Leadership
                        </div>
                        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-rich-black mb-4 leading-tight">
                          Meet Our{' '}
                          <span className="text-tomato">CEO and Team</span>
                        </h2>
                        <p className="text-rich-black/70 text-lg leading-relaxed">
                          Leading with vision, expertise, and a commitment to excellence.
                        </p>
                      </div>

                      {/* CEO Card on Right */}
                      <div className="lg:col-span-2">
                        <div className="group relative h-full bg-gradient-to-br from-white via-tomato/5 to-tomato/10 rounded-3xl p-8 border-2 border-tomato/30 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(249,115,22,0.3)] hover:scale-[1.02] transition-all duration-500 overflow-hidden">
                          {/* Animated gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-tomato/0 via-tomato/5 to-tomato/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Glowing border effect */}
                          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-tomato/20 via-tomato/40 to-tomato/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                          
                          {/* CEO Crown Badge */}
                          <div className="absolute top-6 right-6 z-20">
                            <div className="relative">
                              <div className="absolute inset-0 bg-tomato/30 rounded-full blur-md animate-pulse" />
                              <div className="relative bg-gradient-to-br from-tomato to-tomato-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                                <Sparkles className="w-3 h-3" />
                                CEO
                              </div>
                            </div>
                          </div>

                          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6">
                            {/* Photo with special effect */}
                            <div className="relative flex-shrink-0">
                              <div className="relative w-44 h-44 lg:w-48 lg:h-48">
                                {/* Glow effect */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-tomato/40 to-tomato/60 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                                {/* Photo container */}
                                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-tomato/60 shadow-2xl group-hover:border-tomato transition-all duration-500">
                                  <Image
                                    src={ceo.image}
                                    alt={ceo.name}
                                    width={192}
                                    height={192}
                                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                                  />
                                </div>
                                {/* Decorative ring */}
                                <div className="absolute -inset-2 rounded-full border-2 border-tomato/20 animate-spin-slow" />
                              </div>
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 text-center lg:text-left">
                              <h3 className="font-heading font-bold text-2xl lg:text-3xl text-rich-black mb-2 group-hover:text-tomato transition-colors duration-300">
                                {ceo.name}
                              </h3>
                              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-tomato/10 to-tomato/20 rounded-full mb-4">
                                <span className="text-tomato font-semibold text-base">{ceo.role}</span>
                              </div>
                              <p className="text-rich-black/75 text-base lg:text-lg leading-relaxed">
                                {ceo.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Other Team Members Grid */}
                  {otherMembers.length > 0 && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {otherMembers.map((member) => (
                        <div
                          key={member.id}
                          className="group bg-white rounded-2xl p-6 border border-platinum/50 hover:border-tomato/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                        >
                          {/* Photo */}
                          <div className="relative mb-5">
                            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-platinum/30 group-hover:border-tomato/30 transition-colors shadow-lg">
                              <Image
                                src={member.image}
                                alt={member.name}
                                width={128}
                                height={128}
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="text-center flex-1 flex flex-col">
                            <h3 className="font-heading font-bold text-lg text-rich-black mb-1 group-hover:text-tomato transition-colors">
                              {member.name}
                            </h3>
                            <p className="text-tomato font-medium text-sm mb-3">
                              {member.role}
                            </p>
                            <p className="text-rich-black/60 text-sm leading-relaxed">
                              {member.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Story Section with Dot Background */}
      <DotBackground className="bg-white">
        <section className="py-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              {/* Left - Story */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tomato/10 text-tomato font-medium text-sm">
                  Our Story
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-rich-black leading-tight">
                  Over 12 Years of Industry Expertise
                </h2>
                <div className="space-y-4 text-rich-black/70 leading-relaxed text-lg">
                  <p>
                    <strong className="text-rich-black">Orange Virtual Global Solutions Pvt Ltd</strong> is a team of experienced virtual assistants dedicated to supporting <strong className="text-rich-black">CEOs, entrepreneurs, influencers, and small business owners</strong> in managing their daily tasks, communications, and digital presence.
                  </p>
                  <p>
                    From organizing your day and managing emails to handling customer interactions, data, and social media — we simplify the work behind the scenes so you can focus on the bigger picture.
                  </p>
                </div>
              </div>

              {/* Right - Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white-smoke rounded-2xl p-6 border border-platinum/50 hover:border-tomato/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-tomato/10 flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-tomato" />
                  </div>
                  <div className="text-3xl font-bold text-rich-black mb-1">12+</div>
                  <div className="text-rich-black/60">Years Experience</div>
                </div>
                <div className="bg-white-smoke rounded-2xl p-6 border border-platinum/50 hover:border-tomato/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-tomato/10 flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-tomato" />
                  </div>
                  <div className="text-3xl font-bold text-rich-black mb-1">24/7</div>
                  <div className="text-rich-black/60">Global Coverage</div>
                </div>
                <div className="bg-white-smoke rounded-2xl p-6 border border-platinum/50 hover:border-tomato/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-tomato/10 flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-tomato" />
                  </div>
                  <div className="text-3xl font-bold text-rich-black mb-1">100+</div>
                  <div className="text-rich-black/60">Happy Clients</div>
                </div>
                <div className="bg-white-smoke rounded-2xl p-6 border border-platinum/50 hover:border-tomato/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-tomato/10 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-tomato" />
                  </div>
                  <div className="text-3xl font-bold text-rich-black mb-1">98%</div>
                  <div className="text-rich-black/60">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </DotBackground>

      {/* Mission Statement */}
      <section className="bg-gradient-to-br from-rich-black to-rich-black/95 py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-2xl md:text-3xl font-heading font-semibold text-white leading-relaxed">
              "At Orange Virtual Connect, we don't just complete tasks — we{' '}
              <span className="text-tomato">create time, clarity, and confidence</span>{' '}
              for you to lead with ease."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Free Your Time Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tomato/10 text-tomato font-medium text-sm mb-4">
                Our Mission
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-rich-black mb-4">
                Free Your Time with Orange Virtual Connect
              </h2>
              <p className="text-lg text-rich-black/70 max-w-3xl mx-auto">
                Running a business, building your personal brand, or managing a busy professional life doesn't have to be overwhelming.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pale-dogwood/30 to-white-smoke rounded-3xl p-8 md:p-12">
              <p className="text-lg text-rich-black/80 leading-relaxed mb-8">
                At Orange Virtual Connect, we take care of your daily to-dos — so you can focus on what truly matters. We provide virtual assistant services designed for <strong className="text-rich-black">small businesses, CEOs, influencers, and media professionals</strong> who want to stay productive without burning out.
              </p>
              <p className="text-lg text-rich-black/80 leading-relaxed">
                From managing emails and schedules to handling customer communication and social media, our experienced team helps you stay organized, efficient, and always ahead. With over 12 years of professional experience, our virtual assistants bring a perfect blend of <strong className="text-rich-black">reliability, creativity, and professionalism</strong> — delivering results you can trust every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="bg-white-smoke py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tomato/10 text-tomato font-medium text-sm mb-4">
              Our Approach
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-rich-black mb-4">
              What Makes Us Different
            </h2>
            <p className="text-lg text-rich-black/70 max-w-2xl mx-auto">
              Every client gets a unique experience tailored to their needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-platinum/50 hover:border-tomato/30 hover:shadow-lg transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tomato to-tomato-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl text-rich-black mb-4">
                Personalized Support
              </h3>
              <p className="text-rich-black/70 leading-relaxed">
                Every client gets tailored assistance to match their goals and work style. We adapt to your unique needs.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-platinum/50 hover:border-tomato/30 hover:shadow-lg transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tomato to-tomato-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl text-rich-black mb-4">
                Global Expertise
              </h3>
              <p className="text-rich-black/70 leading-relaxed">
                Our team operates across time zones, ensuring seamless support when you need it, wherever you are.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-platinum/50 hover:border-tomato/30 hover:shadow-lg transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tomato to-tomato-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl text-rich-black mb-4">
                Trust & Confidentiality
              </h3>
              <p className="text-rich-black/70 leading-relaxed">
                We manage your tasks with the highest level of professionalism and privacy. Your data is secure with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Title */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tomato/10 text-tomato font-medium text-sm mb-4">
                  Why Choose Us
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-rich-black mb-6 leading-tight">
                  Why Choose a Virtual Assistant from Orange Virtual Connect?
                </h2>
                <p className="text-lg text-rich-black/70 leading-relaxed">
                  At Orange Virtual Connect, we don't just assist — we enable you to lead with ease.
                </p>
              </div>

              {/* Right - Benefits */}
              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-white-smoke rounded-xl p-5 border border-platinum/50 hover:border-tomato/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-tomato/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-tomato" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-rich-black mb-1">Reclaim your time</h4>
                    <p className="text-rich-black/70 text-sm">Delegate routine tasks and focus on strategic priorities.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white-smoke rounded-xl p-5 border border-platinum/50 hover:border-tomato/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-tomato/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-tomato" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-rich-black mb-1">Stay organized</h4>
                    <p className="text-rich-black/70 text-sm">Keep your inbox, calendar, and projects seamlessly managed.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white-smoke rounded-xl p-5 border border-platinum/50 hover:border-tomato/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-tomato/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-tomato" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-rich-black mb-1">Work smarter</h4>
                    <p className="text-rich-black/70 text-sm">Access skilled virtual assistants anytime, anywhere.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white-smoke rounded-xl p-5 border border-platinum/50 hover:border-tomato/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-tomato/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-tomato" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-rich-black mb-1">Better engagement</h4>
                    <p className="text-rich-black/70 text-sm">Ensure your clients, customers, and followers always feel valued.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white-smoke rounded-xl p-5 border border-platinum/50 hover:border-tomato/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-tomato/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-tomato" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-rich-black mb-1">Smart investment</h4>
                    <p className="text-rich-black/70 text-sm">Get world-class support at a fraction of full-time hiring costs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white-smoke py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-br from-tomato to-tomato-600 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Let's Simplify Your Day
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Get started today and experience how effortless your day can feel when the right team has your back.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services">
                  <Button size="lg" variant="secondary" className="bg-white text-tomato hover:bg-white/90 px-8">
                    Explore Services
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8">
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

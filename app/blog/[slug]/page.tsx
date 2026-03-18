import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';

// Mock blog posts – keep in sync with blog/page.tsx or move to shared data/CMS
const blogPosts: Record<
  string,
  { title: string; date: string; category: string; readTime: string; content: string[] }
> = {
  'why-hire-a-virtual-assistant': {
    title: 'Why Hire a Virtual Assistant? 5 Benefits for Busy Entrepreneurs',
    date: '2025-03-10',
    category: 'Productivity',
    readTime: '5 min read',
    content: [
      'Running a business means your to-do list never stops growing. Between strategy, sales, and day-to-day operations, it’s easy to burn out. A virtual assistant (VA) can take recurring and time-consuming tasks off your plate so you can focus on high-impact work.',
      'Here are five concrete benefits of hiring a virtual assistant.',
      '**1. Save time every week** – Delegate email triage, scheduling, data entry, and research. Many entrepreneurs reclaim 10–15 hours per week by handing off these tasks to a skilled VA.',
      '**2. Lower overhead** – You pay for support when you need it, without the full cost of another employee. No office space, benefits, or long-term commitment required.',
      '**3. Scale up or down** – Need more help during a launch or busy season? Adjust hours or add another VA. Need to cut back? Scale down without the complexity of layoffs.',
      '**4. Access specialized skills** – VAs can handle everything from admin and customer support to social media, bookkeeping, and CRM management. You get expertise without hiring multiple roles.',
      '**5. Better work-life balance** – When someone else handles the backlog, you can step back, think strategically, and spend time where it matters most—both in the business and outside it.',
      'At OrangeVC, we match you with verified professionals who fit your workflow. Ready to see how a VA can help? Explore our plans or get in touch for a conversation.',
    ],
  },
  'virtual-assistant-vs-in-house': {
    title: 'Virtual Assistant vs In-House Hire: What’s Right for You?',
    date: '2025-03-05',
    category: 'Business',
    readTime: '6 min read',
    content: [
      'When you need extra support, two common options are hiring a virtual assistant (VA) or bringing someone in-house. Each has trade-offs in cost, flexibility, and control.',
      '**Cost** – An in-house employee typically comes with salary, benefits, equipment, and space. A VA is usually paid for hours or tasks delivered, with no benefits or office overhead. For many small teams, a VA is the more cost-effective way to get started.',
      '**Flexibility** – VAs can scale up or down with your workload. In-house roles are harder to adjust quickly. If your needs are seasonal or still evolving, a VA gives you more room to experiment.',
      '**Control and culture** – In-house staff are in the same space (or time zone) and can be deeply embedded in your culture. A VA can still feel like part of the team with clear communication and the right tools, but the relationship is different by design.',
      '**Best for** – Consider a VA when you need admin, customer support, or project-based work and want to stay lean. Consider in-house when you need someone full-time, on-site, or in a role that’s core to your long-term structure.',
      'Many teams use both: a small in-house core plus VAs for overflow and specialized tasks. If you’d like to explore VA support, we’d be happy to help you find the right fit.',
    ],
  },
  'getting-started-with-va': {
    title: 'Getting Started with Your First Virtual Assistant',
    date: '2025-02-28',
    category: 'Getting Started',
    readTime: '7 min read',
    content: [
      'Bringing on your first virtual assistant can feel uncertain. These steps will help you set clear expectations and get off to a strong start.',
      '**1. List what to delegate** – Write down tasks that are repetitive, time-consuming, or outside your strengths. Prioritize what would free the most time and what a VA can do with minimal context.',
      '**2. Define outcomes, not just tasks** – Instead of “answer emails,” try “triage inbox, flag urgent items, and draft replies for approval.” Clear outcomes reduce back-and-forth and improve quality.',
      '**3. Choose tools and access** – Decide which tools your VA will use (email, CRM, project management) and what access they need. Use shared docs and async updates so everyone stays aligned.',
      '**4. Set a feedback loop** – Schedule a short weekly check-in at first. Share what’s working and what to adjust. Iterate as the VA learns your preferences and systems.',
      '**5. Document as you go** – Simple SOPs (who does what, where things live) make it easier to onboard future VAs and keep work consistent.',
      'At OrangeVC, we help you define the role and match you with a verified professional. If you’re ready to get started, explore our services or contact us for a conversation.',
    ],
  },
  'customer-support-best-practices': {
    title: 'Customer Support Best Practices for Growing Teams',
    date: '2025-02-20',
    category: 'Customer Support',
    readTime: '5 min read',
    content: [
      'Great customer support doesn’t happen by accident. As you grow, these practices help you keep quality high and customers happy.',
      '**Respond quickly** – Even a short “We’re on it” reduces anxiety. Set targets for first response time and stick to them.',
      '**Be clear and empathetic** – Use plain language and acknowledge how the customer feels. Avoid jargon and defensive phrasing.',
      '**Use templates wisely** – Templates save time, but personalize each reply. No one wants to feel like they’re talking to a bot.',
      '**Track what’s going wrong** – Recurring issues are a signal. Fix the root cause (product, process, or documentation) so support volume and frustration go down.',
      '**Support your support team** – Give them clear escalation paths, knowledge bases, and permission to make small decisions. Burnout and turnover show up quickly in support.',
      'Whether you handle support in-house or with a dedicated VA team, these habits will help you scale without losing the human touch. Need support capacity? We can help you design and staff it.',
    ],
  },
  'tools-for-remote-teams': {
    title: 'Essential Tools for Managing Remote & Virtual Teams',
    date: '2025-02-15',
    category: 'Remote Work',
    readTime: '6 min read',
    content: [
      'Remote and virtual teams need the right tools to stay aligned. Here’s a practical set that works for most small teams.',
      '**Communication** – Use one primary channel (e.g. Slack or Teams) for day-to-day chat and quick questions. Keep email for formal or external communication so nothing gets lost in threads.',
      '**Meetings and async** – Use video for important discussions and weekly syncs. Prefer async updates (Loom, written summaries) when a meeting isn’t necessary.',
      '**Tasks and projects** – A single source of truth (Asana, Monday, ClickUp, or similar) helps everyone see priorities, deadlines, and who’s doing what.',
      '**Files and docs** – Store everything in one place (Google Drive, Notion, or SharePoint) with clear naming and folders. Avoid “it’s in my inbox.”',
      '**Security and access** – Use strong passwords, 2FA, and only grant access that’s needed. Document who has access to what so you can revoke it when roles change.',
      'Your stack doesn’t need to be fancy—consistent use of a few tools beats a long list that no one fully adopts. If you’re bringing on a VA, we can align on the tools they’ll use from day one.',
    ],
  },
  'scaling-with-vas': {
    title: 'Scaling Your Business with Virtual Assistants',
    date: '2025-02-08',
    category: 'Scaling',
    readTime: '5 min read',
    content: [
      'Scaling often means doing more without proportionally increasing headcount. Virtual assistants are one of the most flexible ways to add capacity.',
      '**Admin and operations** – Scheduling, data entry, and internal coordination can be delegated early. A VA can own these so you and your core team focus on strategy and execution.',
      '**Sales and lead gen** – Outreach, lead qualification, and CRM updates are ideal for a dedicated VA. You keep closing and relationship-building; they keep the pipeline full and tidy.',
      '**Marketing and content** – Social posting, email campaigns, and content coordination can run on a VA with clear briefs and approval steps. You set direction; they handle execution and scheduling.',
      '**Customer support** – As volume grows, a VA team can handle first-line support, escalations, and follow-ups. With good docs and escalation paths, quality stays high while you scale.',
      'The pattern: define the outcome, document the process, then hand it off. Start with one role or one VA and expand as you see results. At OrangeVC we help you design these roles and find the right people—get in touch when you’re ready to scale.',
    ],
  },
};

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const allSlugs = Object.keys(blogPosts);

export async function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) return { title: 'Post not found | OrangeVC Blog' };
  return {
    title: `${post.title} | OrangeVC Blog`,
    description: post.content[0]?.slice(0, 160) ?? 'Read more on the OrangeVC blog.',
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts[slug];
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

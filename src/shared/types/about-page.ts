/**
 * About page CMS — aligned with orange-vc-admin `AboutPageCmsPayload` and backend DTOs.
 */

export interface AboutPageAboutUsData {
  headingPart1: string;
  headingPart2: string;
  description: string;
}

export interface LeadershipCeo {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  imageId?: string;
}

export interface LeadershipTeamMember {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  imageId?: string;
}

export interface AboutPageLeadershipData {
  headingPart1: string;
  headingPart2: string;
  ceo: LeadershipCeo;
  teamMembers: LeadershipTeamMember[];
}

export interface AboutPageOurStoryData {
  heading: string;
  storyDescription: string;
}

export interface AboutPageOurMissionData {
  heading: string;
  subheading: string;
  paragraph1: string;
  paragraph2: string;
}

export interface AboutPageOurApproachData {
  approachTitle: string;
  description: string;
}

export interface AboutPageWhyChooseUsData {
  title: string;
  subtitle: string;
}

export const MIN_LEADERSHIP_TEAM = 1;

export function normalizeLeadershipTeam(
  members: LeadershipTeamMember[] | undefined,
): LeadershipTeamMember[] {
  return members?.length ? [...members] : [];
}

export interface AboutPageCmsPayload {
  aboutUs: AboutPageAboutUsData;
  leadership: AboutPageLeadershipData;
  ourStory: AboutPageOurStoryData;
  ourMission: AboutPageOurMissionData;
  ourApproach: AboutPageOurApproachData;
  whyChooseUs: AboutPageWhyChooseUsData;
}

export function defaultEmptyAboutPageCms(): AboutPageCmsPayload {
  return {
    aboutUs: {
      headingPart1: "",
      headingPart2: "",
      description: "",
    },
    leadership: {
      headingPart1: "",
      headingPart2: "",
      ceo: {
        name: "",
        role: "",
        description: "",
        imageUrl: "",
      },
      teamMembers: [],
    },
    ourStory: {
      heading: "",
      storyDescription: "",
    },
    ourMission: {
      heading: "",
      subheading: "",
      paragraph1: "",
      paragraph2: "",
    },
    ourApproach: {
      approachTitle: "",
      description: "",
    },
    whyChooseUs: {
      title: "",
      subtitle: "",
    },
  };
}

/** Static fallbacks from pre-CMS about page copy. */
export const ABOUT_PAGE_CMS_FALLBACKS: AboutPageCmsPayload = {
  aboutUs: {
    headingPart1: "Your Trusted Partner in",
    headingPart2: "Productivity",
    description:
      "At Orange Virtual Connect, we believe time is your most valuable asset — and we're here to help you make the most of it.",
  },
  leadership: {
    headingPart1: "Meet Our",
    headingPart2: "CEO and Team",
    ceo: {
      name: "Akashdeep Sharma",
      role: "CEO",
      description:
        "15+ years building and scaling high-performing customer operations and Virtual Assistant teams globally. I drive SOP-led, scalable systems and empowered teams for seamless operations and confident growth.",
      imageUrl: "/images/team/akashdeep-sharma.jpg",
    },
    teamMembers: [
      {
        name: "Mitchelle Adhiambo",
        role: "Virtual Assistant",
        description:
          "A results-driven Virtual Assistant at Orange Virtual Connect, providing executive-level admin and operational support. She helps leaders reclaim time, sharpen focus, and run smoothly.",
        imageUrl: "/images/team/mitchelle-adhiambo.jpg",
      },
      {
        name: "Suhani Saxena",
        role: "Digital Marketing Senior Executive",
        description:
          "A Digital Marketing Senior Executive at Orange Virtual Connect, driving brand visibility and lead growth. She supports social media, LinkedIn strategy, SEO, and website optimization with data-driven execution.",
        imageUrl: "/images/team/suhani-saxena.jpg",
      },
      {
        name: "Gunjan Suman",
        role: "Virtual Assistant",
        description:
          "A Virtual Assistant at Orange Virtual Connect, supporting administrative, client, and digital tasks. She manages data, reporting, research, coordination, and presentations to ensure smooth workflows and organized operations.",
        imageUrl: "/images/team/gunjan-suman.jpg",
      },
    ],
  },
  ourStory: {
    heading: "Over 12 Years of Industry Expertise",
    storyDescription:
      "<p><b>Orange Virtual Global Solutions Pvt Ltd</b> is a team of experienced virtual assistants dedicated to supporting <b>CEOs, entrepreneurs, influencers, and small business owners</b> in managing their daily tasks, communications, and digital presence.</p><p>From organizing your day and managing emails to handling customer interactions, data, and social media — we simplify the work behind the scenes so you can focus on the bigger picture.</p>",
  },
  ourMission: {
    heading: "Free Your Time with Orange Virtual Connect",
    subheading:
      "Running a business, building your personal brand, or managing a busy professional life doesn't have to be overwhelming.",
    paragraph1:
      "At Orange Virtual Connect, we take care of your daily to-dos — so you can focus on what truly matters. We provide virtual assistant services designed for <b>small businesses, CEOs, influencers, and media professionals</b> who want to stay productive without burning out.",
    paragraph2:
      "From managing emails and schedules to handling customer communication and social media, our experienced team helps you stay organized, efficient, and always ahead. With over 12 years of professional experience, our virtual assistants bring a perfect blend of <b>reliability, creativity, and professionalism</b> — delivering results you can trust every day.",
  },
  ourApproach: {
    approachTitle: "What Makes Us Different",
    description:
      "Every client gets a unique experience tailored to their needs",
  },
  whyChooseUs: {
    title: "Why Choose a Virtual Assistant from Orange Virtual Connect?",
    subtitle:
      "At Orange Virtual Connect, we don't just assist — we enable you to lead with ease.",
  },
};

function pick(primary: string, fallback: string): string {
  return primary?.trim() ? primary : fallback;
}

function mergeLeadershipPerson(
  data: LeadershipCeo | LeadershipTeamMember,
  fallback: LeadershipCeo | LeadershipTeamMember,
): LeadershipTeamMember {
  return {
    name: pick(data.name, fallback.name),
    role: pick(data.role, fallback.role),
    description: pick(data.description, fallback.description),
    imageUrl: pick(data.imageUrl ?? "", fallback.imageUrl ?? ""),
    imageId: data.imageId ?? fallback.imageId,
  };
}

function mergeCeo(data: LeadershipCeo, fallback: LeadershipCeo): LeadershipCeo {
  return mergeLeadershipPerson(data, fallback) as LeadershipCeo;
}

export function mergeAboutCmsWithFallbacks(
  data: AboutPageCmsPayload,
): AboutPageCmsPayload {
  const f = ABOUT_PAGE_CMS_FALLBACKS;
  const rawApiTeam = data.leadership?.teamMembers;
  const apiTeam =
    rawApiTeam && rawApiTeam.length > 0 ? [...rawApiTeam] : [];
  const fbTeam = f.leadership.teamMembers;

  return {
    aboutUs: {
      headingPart1: pick(data.aboutUs?.headingPart1 ?? "", f.aboutUs.headingPart1),
      headingPart2: pick(data.aboutUs?.headingPart2 ?? "", f.aboutUs.headingPart2),
      description: pick(data.aboutUs?.description ?? "", f.aboutUs.description),
    },
    leadership: {
      headingPart1: pick(
        data.leadership?.headingPart1 ?? "",
        f.leadership.headingPart1,
      ),
      headingPart2: pick(
        data.leadership?.headingPart2 ?? "",
        f.leadership.headingPart2,
      ),
      ceo: mergeCeo(
        data.leadership?.ceo ?? {
          name: "",
          role: "",
          description: "",
          imageUrl: "",
        },
        f.leadership.ceo,
      ),
      teamMembers:
        apiTeam.length > 0
          ? apiTeam.map((m, i) =>
              mergeLeadershipPerson(m, fbTeam[i] ?? fbTeam[0]),
            )
          : [...fbTeam],
    },
    ourStory: {
      heading: pick(data.ourStory?.heading ?? "", f.ourStory.heading),
      storyDescription: pick(
        data.ourStory?.storyDescription ?? "",
        f.ourStory.storyDescription,
      ),
    },
    ourMission: {
      heading: pick(data.ourMission?.heading ?? "", f.ourMission.heading),
      subheading: pick(data.ourMission?.subheading ?? "", f.ourMission.subheading),
      paragraph1: pick(data.ourMission?.paragraph1 ?? "", f.ourMission.paragraph1),
      paragraph2: pick(data.ourMission?.paragraph2 ?? "", f.ourMission.paragraph2),
    },
    ourApproach: {
      approachTitle: pick(
        data.ourApproach?.approachTitle ?? "",
        f.ourApproach.approachTitle,
      ),
      description: pick(
        data.ourApproach?.description ?? "",
        f.ourApproach.description,
      ),
    },
    whyChooseUs: {
      title: pick(data.whyChooseUs?.title ?? "", f.whyChooseUs.title),
      subtitle: pick(data.whyChooseUs?.subtitle ?? "", f.whyChooseUs.subtitle),
    },
  };
}

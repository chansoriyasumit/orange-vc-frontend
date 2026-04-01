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

function pick(primary: string, fallback: string): string {
  return primary?.trim() ? primary : fallback;
}

const BLANK_LEADERSHIP_MEMBER: LeadershipTeamMember = {
  name: "",
  role: "",
  description: "",
  imageUrl: "",
};

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

/**
 * Ensures every CMS field exists. Empty or missing values stay empty — no
 * seeded team bios, images, or marketing copy when the API returns blanks or errors.
 */
export function mergeAboutCmsWithFallbacks(
  data: AboutPageCmsPayload,
): AboutPageCmsPayload {
  const empty = defaultEmptyAboutPageCms();
  const rawApiTeam = data.leadership?.teamMembers;
  const apiTeam =
    rawApiTeam && rawApiTeam.length > 0 ? [...rawApiTeam] : [];

  return {
    aboutUs: {
      headingPart1: pick(
        data.aboutUs?.headingPart1 ?? "",
        empty.aboutUs.headingPart1,
      ),
      headingPart2: pick(
        data.aboutUs?.headingPart2 ?? "",
        empty.aboutUs.headingPart2,
      ),
      description: pick(data.aboutUs?.description ?? "", empty.aboutUs.description),
    },
    leadership: {
      headingPart1: pick(
        data.leadership?.headingPart1 ?? "",
        empty.leadership.headingPart1,
      ),
      headingPart2: pick(
        data.leadership?.headingPart2 ?? "",
        empty.leadership.headingPart2,
      ),
      ceo: mergeLeadershipPerson(
        data.leadership?.ceo ?? empty.leadership.ceo,
        empty.leadership.ceo,
      ) as LeadershipCeo,
      teamMembers: apiTeam.map((m) => mergeLeadershipPerson(m, BLANK_LEADERSHIP_MEMBER)),
    },
    ourStory: {
      heading: pick(data.ourStory?.heading ?? "", empty.ourStory.heading),
      storyDescription: pick(
        data.ourStory?.storyDescription ?? "",
        empty.ourStory.storyDescription,
      ),
    },
    ourMission: {
      heading: pick(data.ourMission?.heading ?? "", empty.ourMission.heading),
      subheading: pick(
        data.ourMission?.subheading ?? "",
        empty.ourMission.subheading,
      ),
      paragraph1: pick(
        data.ourMission?.paragraph1 ?? "",
        empty.ourMission.paragraph1,
      ),
      paragraph2: pick(
        data.ourMission?.paragraph2 ?? "",
        empty.ourMission.paragraph2,
      ),
    },
    ourApproach: {
      approachTitle: pick(
        data.ourApproach?.approachTitle ?? "",
        empty.ourApproach.approachTitle,
      ),
      description: pick(
        data.ourApproach?.description ?? "",
        empty.ourApproach.description,
      ),
    },
    whyChooseUs: {
      title: pick(data.whyChooseUs?.title ?? "", empty.whyChooseUs.title),
      subtitle: pick(data.whyChooseUs?.subtitle ?? "", empty.whyChooseUs.subtitle),
    },
  };
}

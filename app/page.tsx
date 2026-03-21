import { getPublicHomeCms } from "@/src/lib/cms/getPublicHomeCms";
import { HomePageClient } from "./home-page-client";

export default async function Home() {
  const homeCms = await getPublicHomeCms();
  return <HomePageClient homeCms={homeCms} />;
}

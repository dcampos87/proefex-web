import { SiteShell } from "@proefex/shared/layouts/SiteShell";
import { BlogPreview } from "@/features/landing/BlogPreview";
import { ContactCta } from "@/features/landing/ContactCta";
import { FeaturedCourses } from "@/features/landing/FeaturedCourses";
import { Hero } from "@/features/landing/Hero";
import { Services } from "@/features/landing/Services";

export default function Home() {
  return (
    <SiteShell>
      <div className="relative">
        <Hero />
        <Services />
        <FeaturedCourses />
        <BlogPreview />
        <ContactCta />
      </div>
    </SiteShell>
  );
}

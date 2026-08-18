import { WaveBackground } from "@/components/animations/WaveBackground";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { BlogPreview } from "@/features/landing/BlogPreview";
import { ContactCta } from "@/features/landing/ContactCta";
import { FeaturedCourses } from "@/features/landing/FeaturedCourses";
import { Hero } from "@/features/landing/Hero";
import { Services } from "@/features/landing/Services";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-proefex-navy text-white">
      <WaveBackground />
      <Header />
      <main className="relative">
        <Hero />
        <Services />
        <FeaturedCourses />
        <BlogPreview />
        <ContactCta />
      </main>
      <Footer />
    </div>
  );
}

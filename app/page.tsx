// import {
//   CTASection,
//   HeroSection,
//   HowItWorksSection,
//   LandingFooter,
//   LandingNav,
// } from "@/components/(landing-page)/landing";

import { CTASection } from "@/components/(landing-page)/landing/cta-section";
import Features from "@/components/(landing-page)/test/features";
import Footer from "@/components/(landing-page)/test/footer";
import Header from "@/components/(landing-page)/test/header";
import Hero from "@/components/(landing-page)/test/hero";

import HowItWorks from "@/components/(landing-page)/test/how-it-works";
import RegisterInterestPopup from "@/components/(landing-page)/test/register-interest-popup";
import Testimonials from "@/components/(landing-page)/test/testimonials";

// export default function LandingPage() {
//   return (
//     <div className="flex min-h-screen flex-col bg-background ">
//       <LandingNav />

//       <main className="flex-1 ">
//         <HeroSection />
//         <HowItWorksSection />
//         <CTASection />
//         <LandingFooter />
//       </main>
//     </div>
//   );
// }

// app/page.tsx

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      {/* <Features /> */}
      <HowItWorks />
      <CTASection /> <Footer />
    </div>
  );
}

import {
  About,
  Contact,
  Credibility,
  Footer,
  Header,
  Hero,
  Process,
  Services,
  WorkflowExamples,
} from "./home-sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#1f2a2e]">
      <Header />
      <main id="top">
        <Hero />
        <Credibility />
        <WorkflowExamples />
        <Services />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

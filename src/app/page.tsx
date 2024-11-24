import HeroSection from "@/components/home/HeroSection";
import MostReadBlogsSection from "@/components/home/MostReadBlogsSection";

const Home = () => {
  return (
    <>
      <div className="absolute top-0 -z-50 h-full w-full bg-gradient-to-b from-indigo-50 via-background to-background dark:from-[#090624]" />
      <main className="container min-h-dvh">
        <HeroSection />
        <MostReadBlogsSection />
      </main>
    </>
  );
};

export default Home;

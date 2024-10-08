import HeroSection from "@/components/home/HeroSection";
import MostReadBlogsSection from "@/components/home/MostReadBlogsSection";

const Home = () => {
  return (
    <>
      <div className="absolute top-0 -z-50 h-full w-full from-[#27235399] to-black dark:bg-gradient-to-b"></div>
      <main className="container min-h-dvh bg-background sm:px-5 md:px-10 lg:px-20">
        <HeroSection />
        <MostReadBlogsSection />
      </main>
    </>
  );
};

export default Home;

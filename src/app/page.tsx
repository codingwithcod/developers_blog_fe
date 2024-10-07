import HeroSection from "@/components/home/HeroSection";
import MostReadBlogsSection from "@/components/home/MostReadBlogsSection";

const Home = () => {
  return (
    <main className="container min-h-dvh bg-background sm:px-5 md:px-10 lg:px-20">
      <HeroSection />
      <MostReadBlogsSection />
    </main>
  );
};

export default Home;

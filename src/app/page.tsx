import HeroSection from "@/components/home/HeroSection";
import MostReadBlogsSection from "@/components/home/MostReadBlogsSection";

const Home = () => {
  return (
    <main className="container min-h-dvh w-full bg-background">
      <HeroSection />
      <MostReadBlogsSection />
    </main>
  );
};

export default Home;

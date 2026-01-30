import Hero from "../components/Hero/Hero";
import Profile from "../components/Profile/Profile";
import Career from "../components/Career/Career";
import Projects from "../components/Projects/Projects";
import Contact from "../components/Contact/Contact";

const Home = () => {
  return (
    <>
      <Hero />

      <section id="profile">
        <Profile />
      </section>

      <section id="experience">
        <Career />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </>
  );
};

export default Home;

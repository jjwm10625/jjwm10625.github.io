import HilingualBack from "../../components/Hilingual/HilingualBack";
import HilingualHero from "../../components/Hilingual/HilingualHero";
import HilingualOverview from "../../components/Hilingual/HilingualOverview";
import HilingualTechStack from "../../components/Hilingual/HilingualTechStack";
import HilingualArchitecture from "../../components/Hilingual/HilingualArchitecture";
import HilingualTrouble from "../../components/Hilingual/HilingualTrouble";

import FadeInSection from "../../components/common/FadeInSection";

const Hilingual = () => {
  return (
    <main>
      {/* Back */}
      <HilingualBack />

      {/* Hero */}
      <section style={{ paddingTop: "80px", paddingBottom: "48px" }}>
        <HilingualHero />
      </section>

      {/* Overview */}
      <section style={{ paddingBottom: "96px" }}>
        <FadeInSection>
          <HilingualOverview />
        </FadeInSection>
      </section>

      {/* Tech Stack */}
      <section style={{ paddingBottom: "96px" }}>
        <FadeInSection>
          <HilingualTechStack />
        </FadeInSection>
      </section>

      {/* Architecture */}
      <section style={{ paddingBottom: "96px" }}>
        <FadeInSection>
          <HilingualArchitecture />
        </FadeInSection>
      </section>

      {/* Trouble Shooting */}
      <section style={{ paddingBottom: "140px" }}>
        <FadeInSection>
          <HilingualTrouble />
        </FadeInSection>
      </section>
    </main>
  );
};

export default Hilingual;

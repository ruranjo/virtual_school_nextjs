// app/page.js

import { Footer } from "../Footer";
import { HeroSection } from "../HeroSection";
import { MisionVisionSection } from "../MisionVisionSection";
import { Navbar } from "../Navbar";
import { StudentsSection } from "../StudentsSection";
import { TeacherSection } from "../TeacherSection";
import { ValuesSection } from "../ValuesSection";


export default function Home() {
  return (
    <div className="!scroll-smooth flex flex-col items-center">
      <Navbar />
      <main className="py-4">
        <HeroSection />
        <section id="mision">
          <MisionVisionSection />
        </section>
        <section id="valores">
          <ValuesSection />
        </section>
        <section id="gente">
          <TeacherSection />
        </section>
        <section id="estudiantes">
          <StudentsSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}

/*

        
        
        
        
*/
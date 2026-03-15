import Navbar from '../components/home/Navbar';
import Services from '../components/home/Services';
import Portfolio from '../components/home/Portfolio';
import Ebooks from '../components/home/Ebooks';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import Contact from '../components/home/Contact';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white dark:bg-black w-full overflow-hidden">
      <Navbar />
      <div className="pt-16">
        <Services />
        <Portfolio />
        <Ebooks />
        <Testimonials />
        <FAQ />
        <Contact />
      </div>
    </main>
  );
}

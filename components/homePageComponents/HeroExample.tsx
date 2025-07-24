import Hero from './hero';

// Example of how to use the Hero component in your main page
// You can import this in your page.tsx or any other page component

export default function HeroExample() {
  return (
    <main className="w-full">
      <Hero />
      {/* Add other sections below the hero */}
      <section className="min-h-screen bg-white">
        {/* Other content */}
      </section>
    </main>
  );
}

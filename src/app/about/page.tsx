import { Metadata } from 'next';
import Bio from '@/components/about/Bio';
import Skills from '@/components/about/Skills';
import Timeline from '@/components/about/Timeline';

export const metadata: Metadata = {
  title: 'About Me | Personal Brand',
  description: 'Learn more about my background, skills, and professional journey',
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">About Me</h1>
      
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Personal Story Section */}
        <section id="bio">
          <Bio />
        </section>

        {/* Skills Section */}
        <section id="skills">
          <h2 className="text-3xl font-bold mb-6">My Skills</h2>
          <Skills />
        </section>

        {/* Work History Timeline */}
        <section id="experience">
          <h2 className="text-3xl font-bold mb-6">Professional Journey</h2>
          <Timeline />
        </section>
      </div>
    </main>
  );
} 
import Image from "next/image";
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import ProjectsSection from '@/components/home/ProjectsSection';
import BlogSection from '@/components/home/BlogSection';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Hi, I'm John Doe
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Full-stack developer specializing in modern web technologies and user-centric design.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Tag variant="default" size="lg">React</Tag>
                <Tag variant="default" size="lg">Next.js</Tag>
                <Tag variant="default" size="lg">TypeScript</Tag>
                <Tag variant="default" size="lg">UI/UX</Tag>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<FontAwesomeIcon icon={faArrowRight} />}
                  iconPosition="right"
                >
                  <Link href="/projects">View My Work</Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/contact">Contact Me</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-1 rounded-lg shadow-xl">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center h-64">
                  <p className="text-gray-500 text-center p-6">
                    [Profile Image Placeholder]
                    <br />
                    <span className="text-sm mt-2 block">
                      Add your profile image here
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row items-start gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">About Me</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  I'm a passionate full-stack developer with over 5 years of experience building web applications that deliver exceptional user experiences. My journey in software development began at the University of Technology, where I earned my Bachelor's degree in Computer Science.
                </p>
                <p>
                  Throughout my career, I've had the opportunity to work with a diverse range of technologies, from traditional LAMP stacks to modern React and Node.js ecosystems. I'm particularly interested in the intersection of beautiful design and clean, efficient code.
                </p>
                <p>
                  When I'm not coding, you can find me hiking in the mountains, experimenting with new cooking recipes, or contributing to open-source projects that make a difference.
                </p>
              </div>
              <div className="mt-8">
                <Button
                  variant="outline"
                  size="md"
                  icon={<FontAwesomeIcon icon={faArrowRight} />}
                  iconPosition="right"
                >
                  <Link href="/about">More About Me</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-6">My Skills</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Frontend Skills */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-medium mb-4">Frontend</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>React / Next.js</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>TypeScript</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Tailwind CSS</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Responsive Design</span>
                    </li>
                  </ul>
                </div>
                
                {/* Backend Skills */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-medium mb-4">Backend</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Node.js / Express</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>MongoDB / PostgreSQL</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>RESTful APIs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Authentication</span>
                    </li>
                  </ul>
                </div>
                
                {/* Tools */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-medium mb-4">Tools</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span>Git / GitHub</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span>Docker</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span>VS Code</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span>Figma</span>
                    </li>
                  </ul>
                </div>
                
                {/* Soft Skills */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-medium mb-4">Soft Skills</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      <span>Problem Solving</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      <span>Communication</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      <span>Team Collaboration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      <span>Project Management</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <ProjectsSection />

      {/* Latest Blog Posts Section */}
      <BlogSection />

      {/* Social Media Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Connect With Me</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Follow me on social media to stay updated with my latest projects, articles, and insights.
          </p>
          <div className="flex justify-center gap-6">
            <a 
              href="https://github.com/johndoe" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-4 rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <FontAwesomeIcon icon={faGithub} className="h-8 w-8 text-gray-800" />
            </a>
            <a 
              href="https://linkedin.com/in/johndoe" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-4 rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <FontAwesomeIcon icon={faLinkedin} className="h-8 w-8 text-blue-700" />
            </a>
            <a 
              href="https://twitter.com/johndoe" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-4 rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <FontAwesomeIcon icon={faTwitter} className="h-8 w-8 text-blue-400" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Have a project in mind? I'm available for freelance work and interesting collaborations.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-blue-600"
          >
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

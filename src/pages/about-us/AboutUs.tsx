import React from "react";

interface TeamMember {
  name: string;
  title: string;
  imageUrl: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Alice Johnson",
    title: "CEO",
    imageUrl: "/images/alice.jpg",
    bio: "Alice has over 15 years of experience in the tech industry, leading innovative projects and inspiring teams."
  },
  {
    name: "Bob Smith",
    title: "CTO",
    imageUrl: "/images/bob.jpg",
    bio: "Bob heads our technology division, ensuring our products are built with cutting-edge solutions."
  },
  // Add more team members as needed
];

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg">
          Welcome to <span className="font-semibold">Company Name</span>, where we deliver innovative solutions that empower our clients and transform industries.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
        <p className="text-gray-700">
          Our mission is to drive positive change by delivering exceptional products and services that help our customers thrive.
        </p>
      </section>

      {/* Story Section */}
      <section className="py-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-2">Our Story</h2>
        <p className="text-gray-700">
          Founded in 2025 by visionary entrepreneurs, our journey began with a simple idea—to solve industry challenges with innovative solutions. Today, we continue to grow and evolve, guided by our passion and commitment to excellence.
        </p>
      </section>

      {/* Values Section */}
      <section className="py-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Our Values</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Integrity:</strong> We do the right thing, every time.</li>
          <li><strong>Innovation:</strong> We push boundaries to deliver breakthrough solutions.</li>
          <li><strong>Customer Focus:</strong> Your success is our priority.</li>
          <li><strong>Collaboration:</strong> We believe that together, we achieve more.</li>
          <li><strong>Passion:</strong> We love what we do, and it shows in our work.</li>
        </ul>
      </section>

      {/* Team Section */}
      <section className="py-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <img src={member.imageUrl} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-center">{member.name}</h3>
              <p className="text-center text-gray-600">{member.title}</p>
              <p className="text-gray-700 mt-2 text-center">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 border-t border-gray-200 text-center">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="text-gray-700">
          Have a question or want to learn more? Contact us at{" "}
          <a href="mailto:info@company.com" className="text-blue-500 hover:underline">
            info@company.com
          </a>{" "}
          or call (123) 456-7890.
        </p>
      </section>
    </div>
  );
};

export default About;

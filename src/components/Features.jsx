// src/components/Features.js
import React from 'react';
import { Wand2, LayoutTemplate, Settings, Share2, Smartphone } from 'lucide-react'; // Example icons

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-brand-gray-extradark p-6 rounded-lg border border-brand-gray-dark transition-all hover:border-brand-purple-light hover:shadow-lg">
     <div className="mb-4 inline-block p-3 rounded-full bg-brand-purple bg-opacity-20 text-brand-purple-light">
       <Icon size={24} />
     </div>
     <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
     <p className="text-brand-gray">{description}</p>
  </div>
);

const Features = () => {
  const featuresData = [
    { icon: Wand2, title: 'AI-Powered Design Assistance', description: 'Get personalized design recommendations with AI-powered tools that help you create a polished, professional website effortlessly.' },
    { icon: LayoutTemplate, title: 'Customizable Templates', description: 'Choose from a wide range of professionally designed templates. Easily customize fonts, colors, and layouts to reflect your brand’s.' },
    { icon: Settings, title: 'SEO Tools Built-In', description: 'Boost your website’s visibility with integrated SEO tools.' },
    { icon: Share2, title: 'APIs and Integrations', description: 'Easily connect with your favorite apps and services for a website experience.' }, // Text slightly shortened
    { icon: Smartphone, title: 'Responsive Design', description: 'Create websites that look stunning on any device.' },
     // Add a 6th feature or adjust grid columns if you only have 5
     { icon: Settings, title: 'Advanced Analytics', description: 'Track your website performance and gain valuable insights.' },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
           <span className="inline-block px-3 py-1 text-sm font-semibold text-brand-purple bg-brand-purple bg-opacity-10 rounded-full mb-2">
            Features
           </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Powerful features to simplify your <br /> web building experience
          </h2>
          <p className="text-lg md:text-xl text-brand-gray max-w-3xl mx-auto">
             Craftify unites marketers, designers, and developers to create,
             manage, and optimize impactful web experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
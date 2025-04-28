// Description: Pricing component for a web application, showcasing different subscription plans with features and pricing details.
// src/components/Pricing.jsx
import React from 'react';
import { Check } from 'lucide-react'; // Icon

const PricingCard = ({ plan, price, users, features, isPopular }) => (
  <div className={`relative border rounded-lg p-8 flex flex-col ${isPopular ? 'border-brand-purple shadow-2xl' : 'border-brand-gray-dark bg-brand-gray-extradark'}`}>
    {isPopular && (
      <span className="absolute top-0 right-4 -mt-3 bg-brand-purple text-white text-xs font-bold px-3 py-1 rounded-full">
        Most Popular
      </span>
    )}
    <h3 className="text-xl font-semibold text-white mb-1">{plan}</h3>
    <p className="text-4xl font-extrabold text-white mb-2">
      ${price}<span className="text-base font-normal text-brand-gray"> /month</span>
    </p>
    <p className="text-brand-gray mb-6">{users}</p>

    <ul className="space-y-3 mb-8 text-brand-gray flex-grow">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>

    <a
      href="#"
      className={`w-full text-center px-6 py-3 rounded-md font-semibold transition-colors ${isPopular ? 'bg-brand-purple hover:bg-brand-purple-light text-white' : 'bg-brand-gray-dark hover:bg-opacity-75 text-white'}`}
    >
      Get Started
    </a>
  </div>
);

const Pricing = () => {
  const plans = [
    {
      plan: 'Starter',
      price: 8,
      users: 'Perfect for students and fresh graduates',
      features: [
        'AI Resume & Cover Letter Builder',
        'Basic ATS Optimization',
        'Access to 5 Resume Templates',
        'One Resume Scan per month',
        'Email Support',
      ],
      isPopular: false,
    },
    {
      plan: 'Professional',
      price: 18,
      users: 'For job seekers advancing their careers',
      features: [
        'Everything in Starter plus...',
        'Unlimited Resume & Cover Letters',
        'Advanced ATS Optimization',
        'Portfolio Website Builder',
        'Priority Email Support',
      ],
      isPopular: true,
    },
    {
      plan: 'Enterprise',
      price: 35,
      users: 'For teams, universities, or career coaches',
      features: [
        'Everything in Professional plus...',
        'Team Access and Collaboration',
        'Analytics Dashboard for Job Applications',
        'Custom Branding Options',
        'Dedicated Account Manager',
      ],
      isPopular: false,
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-brand-purple bg-brand-purple bg-opacity-10 rounded-full mb-2">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Invest in Your Future Career
          </h2>
          <p className="text-lg md:text-xl text-brand-gray max-w-3xl mx-auto">
            Whether you’re just starting out or leading a team, ResumeAI has a plan to help you stand out, land interviews, and grow your career faster.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((p) => (
            <PricingCard key={p.plan} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

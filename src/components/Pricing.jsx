// src/components/Pricing.js
import React from 'react';
import { Check } from 'lucide-react'; // Example icon

const PricingCard = ({ plan, price, users, features, isPopular }) => (
  <div className={`relative border rounded-lg p-8 flex flex-col ${isPopular ? 'border-brand-purple shadow-2xl' : 'border-brand-gray-dark bg-brand-gray-extradark'}`}>
    {isPopular && (
      <span className="absolute top-0 right-4 -mt-3 bg-brand-purple text-white text-xs font-bold px-3 py-1 rounded-full">
        Popular
      </span>
    )}
    <h3 className="text-xl font-semibold text-white mb-1">{plan}</h3>
     <p className="text-4xl font-extrabold text-white mb-2">
       ${price}<span className="text-base font-normal text-brand-gray"> /per month</span>
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
      Get started
    </a>
  </div>
);

const Pricing = () => {
  const plans = [
    { plan: 'Basic', price: 10, users: 'Basic features for up to 10 users', features: ['Everything in Free plan plus...', 'Access to basic features', 'Basic reporting and analytics', 'Up to 10 individual users', 'Basic chat and email support'], isPopular: false },
    { plan: 'Business plan', price: 20, users: 'Growing teams up to 20 users', features: ['Everything in Basic plus...', 'Access to basic features', 'Basic reporting and analytics', 'Up to 10 individual users', '20GB individual data each user', 'Basic chat and email support'], isPopular: true },
    { plan: 'Enterprise Plan', price: 40, users: 'Basic features for up to 10 users', features: ['Everything in Business plan plus...', 'Access to basic features', 'Basic reporting and analytics', 'Up to 10 individual users', '20GB individual data each user', 'Basic chat and email support'], isPopular: false },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
         <div className="text-center mb-16">
           <span className="inline-block px-3 py-1 text-sm font-semibold text-brand-purple bg-brand-purple bg-opacity-10 rounded-full mb-2">
             Pricing
           </span>
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              A Plan for Every Need
           </h2>
           <p className="text-lg md:text-xl text-brand-gray max-w-3xl mx-auto">
             Craftify unites marketers, designers, and developers to create,
             manage, and optimize impactful web experiences
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
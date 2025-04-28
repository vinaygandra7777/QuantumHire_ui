// Description: Pricing component for a web application, showcasing different subscription plans with features and pricing details.
// src/components/Pricing.jsx
import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion'; // Import motion

// Animation variants for the cards
const cardVariants = {
    hidden: { opacity: 0, y: 30 }, // Start invisible and slightly down
    visible: {
        opacity: 1,
        y: 0, // End visible and at original position
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

// Pricing Card component wrapped with motion.div
const PricingCard = ({ plan, price, users, features, isPopular }) => (
    <motion.div
        className={`relative border rounded-lg p-8 flex flex-col ${isPopular ? 'border-brand-purple shadow-2xl bg-brand-gray-extradark' : 'border-brand-gray-dark bg-brand-gray-extradark'}`} // Ensure consistent dark background
        variants={cardVariants} // Apply the defined variants
        whileHover={{ y: -5, transition: { duration: 0.2 } }} // Subtle lift on hover
    >
        {/* Inner content needs a relative container if using pseudo-elements or absolute positioning within */}
        <div className="relative flex flex-col flex-grow">
            {isPopular && (
                <span className="absolute top-0 right-0 -mt-11 mr-1 bg-brand-purple text-white text-xs font-bold px-3 py-1 rounded-full z-10"> {/* Adjusted position slightly for clarity */}
                    Most Popular
                </span>
            )}
            <h3 className="text-xl font-semibold text-white mb-1">{plan}</h3>
            <p className="text-4xl font-extrabold text-white mb-2">
                ${price}<span className="text-base font-normal text-brand-gray"> /month</span>
            </p>
            <p className="text-brand-gray mb-6">{users}</p>

            <ul className="space-y-3 mb-8 text-brand-gray flex-grow"> {/* Ensure this grows to push button down */}
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            {/* Motion added to the button for interactive feedback */}
            <motion.a
                href="#"
                className={`w-full mt-auto text-center px-6 py-3 rounded-md font-semibold transition-colors ${isPopular ? 'bg-brand-purple hover:bg-brand-purple-light text-white' : 'bg-brand-gray-dark hover:bg-brand-gray-medium text-white'}`} // Adjusted non-popular hover
                whileHover={{ scale: 1.03 }} // Slightly enlarge button on hover
                whileTap={{ scale: 0.98 }} // Slightly shrink button on tap
            >
                Get Started
            </motion.a>
        </div>
    </motion.div>
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
                {/* Animate the introductory text section */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }} // Start invisible and slightly up
                    whileInView={{ opacity: 1, y: 0 }} // Animate to visible and original position
                    viewport={{ once: true, amount: 0.3 }} // Trigger when 30% visible, once
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-brand-purple bg-brand-purple bg-opacity-10 rounded-full mb-2">
                        Pricing
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
                        Invest in Your Future Career
                    </h2>
                    <p className="text-lg md:text-xl text-brand-gray max-w-3xl mx-auto">
                        Whether you’re just starting out or leading a team, ResumeAI has a plan to help you stand out, land interviews, and grow your career faster.
                    </p>
                </motion.div>

                {/* Animate the grid with staggered children */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
                    initial="hidden" // Initial state for children (uses cardVariants.hidden)
                    whileInView="visible" // Target state for children (uses cardVariants.visible)
                    viewport={{ once: true, amount: 0.1 }} // Trigger early when grid starts entering view
                    transition={{ staggerChildren: 0.15 }} // Stagger the animation of each child card
                >
                    {plans.map((p) => (
                        // PricingCard already includes motion.div and variants
                        <PricingCard key={p.plan} {...p} />
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default Pricing;

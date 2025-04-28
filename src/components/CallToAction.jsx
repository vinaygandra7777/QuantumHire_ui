import React from 'react';

const CallToAction = () => {
  return (
    <section className="py-20 md:py-32 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
          Build Resumes That Land Jobs — Instantly
        </h2>
        <p className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto mb-10">
          Join thousands of professionals using AI-powered tools to craft tailored, high-impact resumes in minutes.
          Stand out, impress recruiters, and unlock more career opportunities effortlessly.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <a
            href="#"
            className="bg-brand-purple hover:bg-brand-purple-light text-white px-8 py-3 rounded-md text-lg font-semibold transition-colors inline-block"
          >
            Create Your Resume
          </a>
          
        </div>

        {/* Optional: Product Preview Section */}
        <div className="mt-16 max-w-3xl mx-auto bg-brand-gray-extradark rounded-lg shadow-2xl p-4 border border-brand-gray-dark">
          <div className="aspect-video bg-brand-dark rounded flex items-center justify-center">
            <span className="text-brand-gray">Smart Resume Example Preview</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

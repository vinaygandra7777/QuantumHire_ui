import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react'; // Using ChevronDown for expand/collapse

const FAQItem = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-brand-gray-dark last:border-b-0">
      <button
        className="flex justify-between items-center w-full text-left py-4 focus:outline-none"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-white">{question}</span>
        <motion.div
          initial={false} // Don't animate on mount
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-brand-gray" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden" // Hide overflow during animation
          >
            <div className="pb-4 text-brand-gray"> {/* Add padding/styling to the actual content */}
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  // State to manage which FAQ item is open (using index)
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is a resume checker?",
      answer: (
        <>
          A resume checker is a tool or software used to evaluate and improve resumes. It checks for proper formatting, relevant keywords (important for Applicant Tracking Systems), grammar and spelling errors, and content relevance.
          <br /><br />
          Enhancv’s resume checker also assesses consistency in details, suggests customization for different industries, and provides feedback for improvement. We help ensure your resume meets current professional standards and trends and increase your chances of getting noticed by employers and recruiters.
        </>
      ),
    },
    {
      question: "How do I check my resume score?",
      answer: "To check your resume score, simply upload your resume to our ATS checker tool. Our AI will analyze it against common ATS criteria and provide you with a score and detailed breakdown in seconds.",
    },
    {
      question: "How do I improve my resume score?",
      answer: "After getting your score, review the AI feedback provided. Focus on incorporating relevant keywords from job descriptions, quantifying your achievements, using clear formatting, and proofreading for errors. Our tool gives specific suggestions for improvement.",
    },
    {
      question: "How do I know my resume is ATS compliant?",
      answer: "A resume is ATS compliant if it can be easily parsed and read by Applicant Tracking Systems. Key factors include using standard fonts, simple formatting, relevant keywords, clear section headings, and avoiding elements like tables, headers/footers (in some systems), or complex graphics. Our ATS checker specifically tests for these compliance factors.",
    },
    {
      question: "What is a good ATS score?",
      answer: "While scores vary between tools, a score of 80% or higher is generally considered good and indicates a strong likelihood of passing through many ATS filters. Aiming for a score in the high 80s or 90s is recommended for competitive applications.",
    },
    {
      question: "Can an ATS read PDFs?",
      answer: "Most modern ATS can read PDFs, but their parsing capabilities can vary. Simple, text-based PDFs created directly from a word processor are usually fine. PDFs containing images of text, complex layouts, custom fonts, or graphics can sometimes cause parsing errors. We recommend testing your PDF with our checker.",
    },
    {
      question: "How do I review my resume for errors?",
      answer: "Beyond using a checker, carefully read your resume aloud to catch grammatical errors and awkward phrasing. Ask a friend or mentor to proofread it. Pay attention to consistency in tense, formatting, and spacing. Our AI feedback also highlights potential errors.",
    },
     {
      question: "What should I focus on when checking my resume?",
      answer: "Focus on clarity, relevance, and impact. Ensure it's easy to read and navigate. Check if your skills and experience directly match the job description. Verify that you quantify your achievements using numbers and metrics. Finally, meticulously proofread for any typos or grammatical errors.",
    },
     {
      question: "Can I create a resume checklist?",
      answer: "Absolutely! Creating a checklist based on key ATS factors (keywords, formatting, sections), common errors (typos, inconsistencies), and best practices (quantification, tailoring) is a great way to ensure your resume is polished before applying.",
    },
    {
      question: "Should I read my resume after writing it?",
      answer: "Yes, definitely! It's crucial to read your resume multiple times after writing it. Fresh eyes, reading aloud, and having others review it can help catch mistakes and improve clarity in ways automated tools might miss. It's a vital final step.",
    },
    {
      question: "Does your resume checker serve other purposes?",
      answer: "Yes, our resume checker goes beyond just providing an ATS score. It offers detailed feedback on content, suggests relevant keywords, identifies potential formatting issues, and provides actionable steps for improvement, helping you craft a more impactful resume overall.",
    },
  ];

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle or close if already open
  };

  return (
    <section className="py-20 px-4 bg-brand-dark"> {/* Added background color */}
      <motion.div
         className="max-w-3xl mx-auto"
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, amount: 0.3 }}
         transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10 text-center">Frequently asked questions</h2>

        <div className=" border-brand-gray-dark rounded-lg p-4"> {/* Container for FAQs */}
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleOpen(index)}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FAQ;
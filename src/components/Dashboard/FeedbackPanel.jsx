import React from 'react';
import { CheckCircle, AlertTriangle, Edit } from 'lucide-react'; // Icons for feedback types

const FeedbackItem = ({ icon: Icon, title, content, colorClass }) => (
  <div className="mb-4 last:mb-0">
    <div className="flex items-center mb-1">
      <Icon className={`w-5 h-5 mr-2 ${colorClass}`} />
      <h4 className="text-md font-semibold text-white">{title}</h4>
    </div>
    <p className="text-sm text-brand-gray pl-7">{content}</p>
  </div>
);

const FeedbackPanel = ({ feedback }) => {
  // Placeholder feedback structure
  const defaultFeedback = {
    strengths: [
      { title: 'Clear Contact Info', content: 'Contact details are easy to find.' },
    ],
    weaknesses: [
      { title: 'Action Verbs Missing', content: 'Some descriptions lack strong action verbs.' },
      { title: 'Keyword Density Low', content: 'Consider adding more relevant keywords from job descriptions.' },
    ],
    suggestions: [
      { title: 'Quantify Achievements', content: 'Add numbers or metrics to showcase impact (e.g., "Increased sales by 15%").' },
    ]
  };

  const currentFeedback = feedback || defaultFeedback; // Use real feedback if available

  return (
    <div className="bg-brand-gray-extradark p-6 rounded-lg border border-brand-gray-dark">
      <h3 className="text-lg font-semibold text-white mb-4 border-b border-brand-gray-dark pb-2">AI Feedback & Analysis</h3>

      {!feedback ? (
         <p className="text-brand-gray text-center py-4">Upload a resume to get detailed feedback.</p>
      ) : (
          <>
              {currentFeedback.strengths?.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-green-400 font-semibold mb-2 text-sm uppercase tracking-wider">Strengths</h4>
                  {currentFeedback.strengths.map((item, index) => (
                    <FeedbackItem key={`str-${index}`} icon={CheckCircle} title={item.title} content={item.content} colorClass="text-green-400" />
                  ))}
                </div>
              )}

              {currentFeedback.weaknesses?.length > 0 && (
                 <div className="mb-6">
                  <h4 className="text-yellow-400 font-semibold mb-2 text-sm uppercase tracking-wider">Areas for Improvement</h4>
                  {currentFeedback.weaknesses.map((item, index) => (
                    <FeedbackItem key={`weak-${index}`} icon={AlertTriangle} title={item.title} content={item.content} colorClass="text-yellow-400" />
                  ))}
                </div>
              )}

              {currentFeedback.suggestions?.length > 0 && (
                 <div>
                  <h4 className="text-blue-400 font-semibold mb-2 text-sm uppercase tracking-wider">Suggestions</h4>
                   {currentFeedback.suggestions.map((item, index) => (
                    <FeedbackItem key={`sug-${index}`} icon={Edit} title={item.title} content={item.content} colorClass="text-blue-400" />
                  ))}
                </div>
              )}
          </>
      )}
    </div>
  );
};

export default FeedbackPanel;
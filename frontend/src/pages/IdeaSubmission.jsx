import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Target, Users, Lock, Globe } from 'lucide-react';

const IdeaSubmission = () => {
  const [formData, setFormData] = useState({
    problem: '',
    solution: '',
    secretSauce: '',
    targetAudience: '',
    requiredHelp: '',
    privacyLevel: 'public'
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Submit Your Idea</h1>
          <p className="text-gray-300">Transform your concept into a structured project proposal</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400">Step {currentStep} of {totalSteps}</span>
            <span className="text-gray-400">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <motion.div 
              className="bg-gradient-primary h-3 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></motion.div>
          </div>
        </motion.div>

        {/* Form Content */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-8"
        >
          {/* Step 1: The Problem */}
          {currentStep === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-8 h-8 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">What Problem Are You Solving?</h2>
              </div>
              <textarea
                value={formData.problem}
                onChange={(e) => handleInputChange('problem', e.target.value)}
                placeholder="Describe the real-world problem your idea addresses..."
                className="w-full h-40 bg-gray-800 text-white rounded-xl p-6 border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
              />
              <p className="text-gray-400 text-sm mt-2">Be specific about the pain point you're addressing</p>
            </div>
          )}

          {/* Step 2: The Solution */}
          {currentStep === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Your Solution (280 characters max)</h2>
              </div>
              <textarea
                value={formData.solution}
                onChange={(e) => handleInputChange('solution', e.target.value)}
                placeholder="Briefly describe your innovative solution..."
                maxLength={280}
                className="w-full h-32 bg-gray-800 text-white rounded-xl p-6 border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-400 text-sm">Keep it concise and compelling, like a tweet!</p>
                <span className="text-gray-400 text-sm">{formData.solution.length}/280</span>
              </div>
            </div>
          )}

          {/* Step 3: Secret Sauce */}
          {currentStep === 3 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center">
                  ✨
                </div>
                <h2 className="text-2xl font-bold text-white">What's Your Secret Sauce?</h2>
              </div>
              <textarea
                value={formData.secretSauce}
                onChange={(e) => handleInputChange('secretSauce', e.target.value)}
                placeholder="What makes your approach unique and different from existing solutions?"
                className="w-full h-40 bg-gray-800 text-white rounded-xl p-6 border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
              />
              <p className="text-gray-400 text-sm mt-2">Highlight your competitive advantage</p>
            </div>
          )}

          {/* Step 4: Target Audience & Help Needed */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-8 h-8 text-green-400" />
                  <h2 className="text-2xl font-bold text-white">Who Benefits From This?</h2>
                </div>
                <textarea
                  value={formData.targetAudience}
                  onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                  placeholder="Define your target audience..."
                  className="w-full h-32 bg-gray-800 text-white rounded-xl p-6 border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-4">What Help Do You Need?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {['Technical mentorship', 'Business advice', 'Funding guidance', 'Team members', 'Marketing support', 'Legal advice'].map((help, index) => (
                    <label key={index} className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                      />
                      <span className="text-white">{help}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Privacy Settings */}
          {currentStep === 5 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-8 h-8 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Privacy Settings</h2>
              </div>
              
              <div className="space-y-6">
                <div 
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.privacyLevel === 'public' 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-gray-600 bg-gray-800'
                  }`}
                  onClick={() => handleInputChange('privacyLevel', 'public')}
                >
                  <div className="flex items-center gap-4">
                    <Globe className="w-8 h-8 text-blue-400" />
                    <div>
                      <h3 className="text-xl font-bold text-white">Public</h3>
                      <p className="text-gray-400">Visible to the community for feedback and collaboration</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.privacyLevel === 'private' 
                      ? 'border-purple-500 bg-purple-500/10' 
                      : 'border-gray-600 bg-gray-800'
                  }`}
                  onClick={() => handleInputChange('privacyLevel', 'private')}
                >
                  <div className="flex items-center gap-4">
                    <Lock className="w-8 h-8 text-purple-400" />
                    <div>
                      <h3 className="text-xl font-bold text-white">Private</h3>
                      <p className="text-gray-400">Visible only to admins and assigned mentors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentStep === 1 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-700 text-white hover:bg-gray-600 hover:scale-105'
              }`}
            >
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                className="bg-gradient-primary text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                Next Step
              </button>
            ) : (
              <button className="bg-gradient-secondary text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform animate-pulse-glow">
                Submit Idea
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default IdeaSubmission;
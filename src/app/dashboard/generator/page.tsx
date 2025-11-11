"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LinkedInPostCard } from '@/components/ui/linkedin-post-card';
import { GeneratorContainer } from '@/components/ui/generator-container';
import { GenerateButton } from '@/components/ui/generate-button';

export default function GeneratorPage() {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    style: "professional" as "simple" | "professional" | "storytelling",
    emojis: true,
    hashtags: true,
    generateAll: false,
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch('/api/linkedin/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate post');
      }

      setResult(data.results);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            🎯 LinkedIn Post Generator
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Create engaging, professional LinkedIn posts with AI-powered precision
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Input Form */}
          <GeneratorContainer title="Create Your Post">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🏆 Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Enter event title (e.g., AI Hackathon 2024)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📋 Type *
                </label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="e.g., Hackathon, Internship, Workshop"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📝 Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Describe the event, your role, achievements, or key highlights..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🎨 Style
                  </label>
                  <select
                    name="style"
                    value={formData.style}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  >
                    <option value="simple">Simple & Direct</option>
                    <option value="professional">Professional</option>
                    <option value="storytelling">Storytelling</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ✨ Enhancements
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="emojis"
                        checked={formData.emojis}
                        onChange={handleChange}
                        className="mr-3 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      Include Emojis 🎯
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="hashtags"
                        checked={formData.hashtags}
                        onChange={handleChange}
                        className="mr-3 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      Include Hashtags #
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="generateAll"
                        checked={formData.generateAll}
                        onChange={handleChange}
                        className="mr-3 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      Generate All Styles
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !formData.title || !formData.type || !formData.description}
                className={`w-full relative rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 overflow-hidden transition-all duration-300 ${
                  loading || !formData.title || !formData.type || !formData.description 
                    ? "opacity-50 cursor-not-allowed" 
                    : "hover:shadow-2xl hover:scale-105"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </span>
                ) : (
                  '✨ Generate LinkedIn Post'
                )}
              </button>
            </form>
          </GeneratorContainer>

          {/* Results Section */}
          <div className="space-y-6">
            {error && (
              <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
                Error: {error}
              </div>
            )}

            {result && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Generated Posts</h2>
                {Object.entries(result).map(([style, content]) => (
                  <LinkedInPostCard 
                    key={style} 
                    style={style as "simple" | "professional" | "storytelling"}
                    className="hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">
                      {content as string}
                    </div>
                    
                    {/* Copy to Clipboard Button */}
                    <button
                      onClick={() => navigator.clipboard.writeText(content as string)}
                      className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition duration-200"
                    >
                      📋 Copy to Clipboard
                    </button>
                  </LinkedInPostCard>
                ))}
              </div>
            )}

            {!result && !error && (
              <GeneratorContainer title="Preview">
                <div className="text-center text-gray-500 py-12">
                  <div className="text-6xl mb-4">🎨</div>
                  <p className="text-lg">Your generated LinkedIn posts will appear here</p>
                  <p className="text-sm mt-2">Fill out the form and click generate to get started</p>
                </div>
              </GeneratorContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
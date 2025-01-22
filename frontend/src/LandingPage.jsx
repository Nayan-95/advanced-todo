import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Mail, CheckSquare, ArrowRight, Clock, Target } from 'lucide-react';

const TodoAILanding = ({ navigateToTodos }) => {
  return (
    <div className="min-h-screen bg-black">
      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 0% 0%, #1e40af22 0%, transparent 50%)',
                'radial-gradient(circle at 100% 100%, #1e40af22 0%, transparent 50%)',
                'radial-gradient(circle at 0% 0%, #1e40af22 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-7xl font-black mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Your Inbox
                </span>
                <br />
                <span className="text-white">
                  Works For You
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Experience 10x productivity with AI that transforms emails into actionable tasks instantly.
              </p>
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-bold"
                whileHover={{ scale: 1.05 }}
                onClick={navigateToTodos}
              >
                Transform Your Workflow
              </motion.button>
            </motion.div>

            <div className="space-y-6">
              {quotes.map((quote, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="p-6 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-white/10"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-white text-lg mb-4">{quote.text}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{quote.author}</span>
                    <span className="text-blue-400">{quote.metric}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <motion.div 
                  className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 h-full"
                  whileHover={{ y: -10 }}
                >
                  <feature.icon className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                  <div className="mt-4 text-sm text-blue-400">{feature.metric}</div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const quotes = [
  {
    text: "From drowning in emails to clear, prioritized actions. This isn't just another tool—it's a transformation of how work gets done.",
    author: "Director of Operations",
    metric: "85% reduction in task management time"
  },
  {
    text: "The AI doesn't just create tasks, it understands priority and context. It's like having a brilliant assistant who never sleeps.",
    author: "Tech Team Lead",
    metric: "100% email-to-task capture rate"
  },
  {
    text: "Finally, technology that delivers on the promise of AI. Our team's productivity has never been higher.",
    author: "Startup Founder",
    metric: "3x increase in task completion"
  }
];

const features = [
  {
    icon: Brain,
    title: "AI That Understands",
    description: "Context-aware task creation that captures every detail from your emails.",
    metric: "99.9% accuracy rate"
  },
  {
    icon: Target,
    title: "Smart Prioritization",
    description: "Automatic task prioritization based on urgency and impact.",
    metric: "50% faster task completion"
  },
  {
    icon: Clock,
    title: "Time Reclaimed",
    description: "Transform email management from hours to minutes.",
    metric: "Save 15 hours weekly"
  }
];

export default TodoAILanding;
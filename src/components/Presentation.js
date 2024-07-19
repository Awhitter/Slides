import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// This would typically be loaded from an external JSON file or API
const slideData = [
  {
    id: 'welcome',
    title: 'Welcome to HLT',
    type: 'hero',
    content: {
      heading: 'Higher Learning Technologies',
      subheading: 'Transforming Healthcare Education with AI',
      logo: 'HLT' // In a real scenario, this would be an image path
    }
  },
  {
    id: 'ai-revolution',
    title: 'AI Revolution',
    type: 'stats',
    content: [
      { title: "AI-generated questions", value: 600000, icon: "❓" },
      { title: "Unique study plans", value: 250000, icon: "📚" },
      { title: "Content creation speed", value: 85, icon: "⚡", suffix: "%" },
      { title: "AI-powered interactions", value: 1000000, icon: "🤖", suffix: "/month" }
    ]
  },
  {
    id: 'financial-growth',
    title: 'Financial Growth',
    type: 'chart',
    content: {
      chartType: 'bar',
      data: [
        { year: '2023', revenue: 6.4, ebitda: -0.6 },
        { year: '2024', revenue: 6.6, ebitda: 0.35 },
        { year: '2025', revenue: 8.1, ebitda: 1.06 },
      ],
      keys: ['revenue', 'ebitda'],
      colors: ['#8884d8', '#82ca9d']
    }
  },
  {
    id: 'user-engagement',
    title: 'User Engagement',
    type: 'chart',
    content: {
      chartType: 'line',
      data: [
        { week: 'Sep 11', users: 118147, sessions: 335418 },
        { week: 'Jul 24', users: 100498, sessions: 306605 },
        { week: 'Apr 22', users: 95231, sessions: 288374 },
        { week: 'Jan 29', users: 86791, sessions: 274023 },
        { week: 'Oct 30', users: 85065, sessions: 237403 },
        { week: 'Jul 15', users: 64762, sessions: 180006 },
      ],
      keys: ['users', 'sessions'],
      colors: ['#8884d8', '#82ca9d']
    }
  },
  // Add more slides as needed
];

const HeroSlide = ({ content }) => (
  <div className="text-center">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="w-32 h-32 mx-auto bg-hlt-blue rounded-full flex items-center justify-center">
        <span className="text-4xl font-bold text-white">{content.logo}</span>
      </div>
    </motion.div>
    <motion.h1 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="text-4xl font-bold mb-4 text-hlt-blue"
    >
      {content.heading}
    </motion.h1>
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="text-xl text-gray-600"
    >
      {content.subheading}
    </motion.p>
  </div>
);

const StatsSlide = ({ content }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-2 gap-6">
      {content.map((item, index) => (
        <motion.div 
          key={item.title}
          className="bg-white p-6 rounded-lg shadow-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="text-4xl mb-2">{item.icon}</div>
          <motion.div 
            className="text-3xl font-bold text-hlt-blue"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 100 }}
          >
            {item.value.toLocaleString()}{item.suffix}
          </motion.div>
          <p className="text-gray-600 mt-2">{item.title}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const ChartSlide = ({ content }) => {
  const ChartComponent = content.chartType === 'bar' ? BarChart : LineChart;
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={400}>
        <ChartComponent data={content.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={Object.keys(content.data[0])[0]} />
          <YAxis />
          <Tooltip />
          {content.keys.map((key, index) => (
            content.chartType === 'bar' ? 
              <Bar key={key} dataKey={key} fill={content.colors[index]} /> :
              <Line key={key} type="monotone" dataKey={key} stroke={content.colors[index]} />
          ))}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slideData.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slideData.length) % slideData.length);

  const renderSlide = (slide) => {
    switch (slide.type) {
      case 'hero':
        return <HeroSlide content={slide.content} />;
      case 'stats':
        return <StatsSlide content={slide.content} />;
      case 'chart':
        return <ChartSlide content={slide.content} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl p-4 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="h-[500px] flex items-center justify-center"
          >
            {renderSlide(slideData[currentSlide])}
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between items-center mt-8">
          <button onClick={prevSlide} className="bg-hlt-blue text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <span className="text-lg font-semibold text-gray-600">{currentSlide + 1} / {slideData.length}</span>
          <button onClick={nextSlide} className="bg-hlt-blue text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Zap, Shield, Cpu } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Camera className="h-8 w-8" />,
      title: 'Real-time Detection',
      description: 'Instant emotion analysis through your webcam with advanced AI algorithms.'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Lightning Fast',
      description: 'Powered by TensorFlow.js for rapid processing directly in your browser.'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Privacy First',
      description: 'All processing happens locally. Your data never leaves your device.'
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: 'Advanced AI',
      description: 'State-of-the-art neural networks trained on diverse emotion datasets.'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            EmotionSense
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
            Discover the power of AI-driven emotion detection. Experience real-time facial 
            emotion analysis with cutting-edge machine learning technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/detect"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Detection
            </Link>
            <Link
              to="/about"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 border border-white/20"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose EmotionSense?
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Built with the latest AI technology to provide accurate, fast, and secure emotion detection.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="text-cyan-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience the Technology
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Our AI can detect 7 different emotions with high accuracy: Happy, Sad, Angry, 
            Surprised, Fearful, Disgusted, and Neutral states.
          </p>
          <Link
            to="/detect"
            className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Camera className="h-5 w-5 mr-2" />
            Try It Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
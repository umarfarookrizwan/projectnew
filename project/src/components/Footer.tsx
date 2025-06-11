import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/20 backdrop-blur-md border-t border-white/20 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-1 text-white/60 mb-4 md:mb-0">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-400" />
            <span>using TensorFlow.js & React</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/your-username/emotion-sense"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-white/60 hover:text-cyan-400 transition-colors duration-200"
            >
              <Github className="h-5 w-5" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
        
        <div className="text-center text-white/40 text-sm mt-4 pt-4 border-t border-white/10">
          © 2025 EmotionSense. All rights reserved. | Privacy-focused AI emotion detection.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
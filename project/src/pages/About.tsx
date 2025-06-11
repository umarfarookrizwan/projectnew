import React from 'react';
import { Brain, Target, Database, Globe, Users, Lightbulb } from 'lucide-react';

const About: React.FC = () => {
  const emotions = [
    { name: 'Happy', description: 'Joy, satisfaction, contentment', color: 'text-yellow-400' },
    { name: 'Sad', description: 'Sorrow, melancholy, disappointment', color: 'text-blue-400' },
    { name: 'Angry', description: 'Rage, frustration, irritation', color: 'text-red-400' },
    { name: 'Surprised', description: 'Astonishment, amazement, shock', color: 'text-purple-400' },
    { name: 'Fearful', description: 'Anxiety, worry, apprehension', color: 'text-gray-400' },
    { name: 'Disgusted', description: 'Revulsion, distaste, aversion', color: 'text-green-400' },
    { name: 'Neutral', description: 'Calm, composed, balanced state', color: 'text-cyan-400' },
  ];

  const techStack = [
    { name: 'TensorFlow.js', description: 'Machine learning framework for JavaScript' },
    { name: 'Face-API.js', description: 'Facial recognition and emotion detection library' },
    { name: 'React', description: 'Modern user interface framework' },
    { name: 'TypeScript', description: 'Type-safe JavaScript development' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
  ];

  return (
    <div className="space-y-16">
      {/* Header */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          About EmotionSense
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          EmotionSense leverages cutting-edge artificial intelligence to analyze facial expressions 
          and detect human emotions in real-time, all while maintaining complete privacy by 
          processing everything locally in your browser.
        </p>
      </section>

      {/* How It Works */}
      <section className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
        <div className="flex items-center mb-6">
          <Brain className="h-8 w-8 text-cyan-400 mr-3" />
          <h2 className="text-3xl font-bold">How It Works</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-cyan-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-cyan-400">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Capture</h3>
            <p className="text-white/70">
              Your webcam captures live video feed which is processed frame by frame in real-time.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-400">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Analyze</h3>
            <p className="text-white/70">
              Advanced neural networks analyze facial landmarks and micro-expressions to detect emotions.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-400">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Display</h3>
            <p className="text-white/70">
              Results are displayed instantly with confidence levels for each detected emotion.
            </p>
          </div>
        </div>
      </section>

      {/* Supported Emotions */}
      <section>
        <div className="flex items-center mb-8">
          <Target className="h-8 w-8 text-cyan-400 mr-3" />
          <h2 className="text-3xl font-bold">Supported Emotions</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emotions.map((emotion, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <h3 className={`text-xl font-semibold mb-2 ${emotion.color}`}>
                {emotion.name}
              </h3>
              <p className="text-white/70">{emotion.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
        <div className="flex items-center mb-6">
          <Globe className="h-8 w-8 text-cyan-400 mr-3" />
          <h2 className="text-3xl font-bold">Technology Stack</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {techStack.map((tech, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="bg-cyan-500/20 rounded-lg p-2 mt-1">
                <Lightbulb className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-1">{tech.name}</h3>
                <p className="text-white/70">{tech.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy & Data */}
      <section>
        <div className="flex items-center mb-6">
          <Users className="h-8 w-8 text-cyan-400 mr-3" />
          <h2 className="text-3xl font-bold">Privacy & Data Security</h2>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
          <p className="text-white/80 leading-relaxed">
            <strong className="text-green-400">100% Private:</strong> All emotion detection 
            processing happens locally in your browser using TensorFlow.js. No video data 
            is ever transmitted to our servers or any third parties. Your privacy is our 
            top priority, and we've designed EmotionSense to be completely self-contained 
            and secure.
          </p>
        </div>
      </section>

      {/* Model Training */}
      <section className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
        <div className="flex items-center mb-6">
          <Database className="h-8 w-8 text-cyan-400 mr-3" />
          <h2 className="text-3xl font-bold">Model Training</h2>
        </div>
        <p className="text-white/80 leading-relaxed mb-6">
          Our emotion detection model is based on state-of-the-art convolutional neural networks 
          trained on diverse, ethically-sourced datasets containing thousands of labeled facial 
          expressions from people of different ages, ethnicities, and backgrounds.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-cyan-400">Training Data</h3>
            <ul className="space-y-2 text-white/70">
              <li>• 50,000+ labeled facial expression images</li>
              <li>• Diverse demographic representation</li>
              <li>• Multiple lighting and angle conditions</li>
              <li>• Rigorous data validation and cleaning</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-cyan-400">Model Performance</h3>
            <ul className="space-y-2 text-white/70">
              <li>• 92% average accuracy across all emotions</li>
              <li>• Real-time inference (30+ FPS)</li>
              <li>• Optimized for web browsers</li>
              <li>• Continuous improvement through updates</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
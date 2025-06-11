import React, { useState } from 'react';
import { Mail, MessageSquare, Github, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Message Sent!</h1>
        <p className="text-xl text-white/70 mb-8">
          Thank you for reaching out. We'll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Get In Touch
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Have questions about EmotionSense? Want to report a bug or suggest a feature? 
          We'd love to hear from you!
        </p>
      </section>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <section className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <div className="flex items-center mb-6">
            <MessageSquare className="h-6 w-6 text-cyan-400 mr-3" />
            <h2 className="text-2xl font-bold">Send us a Message</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-2">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select a subject</option>
                <option value="bug-report">Bug Report</option>
                <option value="feature-request">Feature Request</option>
                <option value="technical-support">Technical Support</option>
                <option value="general-inquiry">General Inquiry</option>
                <option value="collaboration">Collaboration</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Tell us more about your question or feedback..."
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              <Send className="h-5 w-5" />
              <span>Send Message</span>
            </button>
          </form>
        </section>

        {/* Contact Information */}
        <section className="space-y-8">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <div className="flex items-center mb-6">
              <Mail className="h-6 w-6 text-cyan-400 mr-3" />
              <h2 className="text-2xl font-bold">Other Ways to Reach Us</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Email Support</h3>
                <p className="text-white/70 mb-2">
                  For technical support and general inquiries
                </p>
                <a 
                  href="mailto:support@emotionsense.app"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                >
                  support@emotionsense.app
                </a>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">GitHub Repository</h3>
                <p className="text-white/70 mb-2">
                  Report bugs, request features, or contribute to the project
                </p>
                <a 
                  href="https://github.com/your-username/emotion-sense"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                >
                  <Github className="h-4 w-4 mr-2" />
                  View on GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium text-cyan-400 mb-1">Is my data safe?</h4>
                <p className="text-white/70">
                  Yes! All processing happens locally in your browser. No data is sent to our servers.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-cyan-400 mb-1">What browsers are supported?</h4>
                <p className="text-white/70">
                  Modern browsers that support WebRTC and WebGL, including Chrome, Firefox, Safari, and Edge.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-cyan-400 mb-1">Can I use this offline?</h4>
                <p className="text-white/70">
                  After the initial load, EmotionSense works offline as all models are cached locally.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">Response Time</h3>
            <p className="text-white/70">
              We typically respond to inquiries within 24-48 hours during business days. 
              For urgent technical issues, please include "URGENT" in your subject line.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
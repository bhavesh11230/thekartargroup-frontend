 import React, { useState } from 'react';
import { apiService } from '../../utils/api';
import { toast } from 'react-toastify';
import { Mail, MessageCircle, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      await apiService.submitContact(formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white w-full">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-kartar-gold mb-6">
              Contact Us
            </h2>
            <p className="text-lg text-gray-700">
              Get in touch with us to discuss your requirements or ask any questions.
            </p>
          </div>

          {/* Two-column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-start lg:items-center">
            {/* Contact Information */}
            <div className="space-y-8">
              <h3 className="text-2xl text-center font-semibold text-kartar-gold mb-4">
                Get in Touch
              </h3>

              <div className="space-y-4 text-center lg:text-left">
                <div className="flex justify-center lg:justify-start items-center space-x-3">
                  <Mail className="h-5 w-5 text-kartar-gold flex-shrink-0" />
                  <a
                    href="mailto:info@thekartargroup.in"
                    className="text-gray-700 hover:text-kartar-gold transition-colors duration-300 text-sm"
                  >
                    info@thekartargroup.in
                  </a>
                </div>

                <div className="flex justify-center lg:justify-start items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-kartar-gold flex-shrink-0" />
                  <a
                    href="https://wa.me/MOBILE_NUMBER"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-kartar-gold transition-colors duration-300 text-sm"
                  >
                    Contact on WhatsApp
                  </a>
                </div>
              </div>

              <div className="bg-kartar-cream p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 text-center lg:text-left">
                  Why Choose Kartar Group?
                </h4>
                <ul className="space-y-2 text-gray-600 text-sm text-center lg:text-left">
                  <li>• Proven track record of excellence</li>
                  <li>• Comprehensive solutions across industries</li>
                  <li>• Dedicated customer support</li>
                  <li>• Innovative and reliable services</li>
                </ul>
              </div>

              <div className="bg-kartar-cream p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 text-center lg:text-left">
                  Business Hours
                </h4>
                <div className="space-y-2 text-gray-600 text-sm text-center lg:text-left">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl text-center font-semibold text-kartar-gold mb-6">
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kartar-gold focus:border-transparent transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kartar-gold focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kartar-gold focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Minimum 10 characters required..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-kartar-gold text-white py-2.5 px-6 rounded-lg font-semibold hover:bg-kartar-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

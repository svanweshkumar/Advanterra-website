import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitMessage(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-8">Let's Build <br />Something Together.</h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-8 sm:mb-12">
              Ready to start your next project? Get in touch with us for a free consultation or visit our office.
            </p>
            
            <div className="space-y-6 sm:space-y-8">
              {[
                { icon: MapPin, title: 'Visit Us', text: '672A, Hosakerehalli Layout, Banashankari 3rd Stage, Banashankari, Bengaluru, Karnataka 560085' },
                { icon: Phone, title: 'Call Us', text: '+91 8970092228, 9964566801' },
                { icon: Mail, title: 'Email Us', text: 'advanterraconstruction@gmail.com' }
              ].map((item, idx) => (
                <div key={idx} className="flex space-x-4 sm:space-x-6">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gray-900 text-white rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
                    <item.icon size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-gray-900">{item.title}</h4>
                    <p className="text-gray-500 text-xs sm:text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-white px-6 py-4 rounded-xl w-full border border-transparent focus:border-orange-500 outline-none transition-all shadow-sm"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-white px-6 py-4 rounded-xl w-full border border-transparent focus:border-orange-500 outline-none transition-all shadow-sm"
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="bg-white px-6 py-4 rounded-xl w-full border border-transparent focus:border-orange-500 outline-none transition-all shadow-sm"
              />
              <textarea
                name="message"
                placeholder="How can we help?"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                required
                className="bg-white px-6 py-4 rounded-xl w-full border border-transparent focus:border-orange-500 outline-none transition-all shadow-sm"
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-orange-700 transition-all shadow-lg hover:shadow-orange-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
              {submitMessage && (
                <p className={`text-center ${submitMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </div>
        
        {/* Interactive Map */}
        <div className="mt-24 h-96 bg-gray-200 rounded-3xl overflow-hidden relative shadow-inner border border-gray-300 cursor-pointer" onClick={() => window.open('https://www.google.com/maps/search/672A,+Hosakerehalli+Layout,+Banashankari+3rd+Stage,+Banashankari,+Bengaluru,+Karnataka+560085', '_blank')}>
           <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5923124678698!2d77.53790537495523!3d12.933904087378057!2m3!1f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3f004da9553d%3A0x5c9817286f2b6925!2sADVANTERRA%20CONSTRUCTION!5e0!3m2!1sen!2sin!4v1769445875563!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, pointerEvents: 'none' }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;

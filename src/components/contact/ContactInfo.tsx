"use client";

import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function ContactInfo() {
  const contactDetails = {
    email: 'hello@example.com',
    location: 'San Francisco, CA',
    socialLinks: [
      {
        name: 'GitHub',
        url: 'https://github.com/yourusername',
        icon: <FaGithub size={24} />,
      },
      {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/yourusername',
        icon: <FaLinkedin size={24} />,
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com/yourusername',
        icon: <FaTwitter size={24} />,
      },
    ],
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 
        className="text-2xl font-bold mb-6 text-gray-800 dark:text-white"
        variants={itemVariants}
      >
        Contact Information
      </motion.h2>
      
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
      >
        {/* Email */}
        <motion.div 
          className="flex items-start"
          variants={itemVariants}
        >
          <div className="text-blue-600 mt-1 mr-4">
            <FaEnvelope size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Email</h3>
            <a 
              href={`mailto:${contactDetails.email}`} 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {contactDetails.email}
            </a>
          </div>
        </motion.div>
        
        {/* Location */}
        <motion.div 
          className="flex items-start"
          variants={itemVariants}
        >
          <div className="text-blue-600 mt-1 mr-4">
            <FaMapMarkerAlt size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Location</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {contactDetails.location}
            </p>
          </div>
        </motion.div>
        
        {/* Social Links */}
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Connect With Me</h3>
          <div className="flex space-x-4">
            {contactDetails.socialLinks.map((link, index) => (
              <motion.a 
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                {link.icon}
                <span className="sr-only">{link.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
        
        {/* Working Hours */}
        <motion.div 
          className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Working Hours</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Monday - Friday: 9:00 AM - 5:00 PM<br />
            Weekend: Available for urgent matters
          </p>
        </motion.div>
        
        {/* Response Time */}
        <motion.div variants={itemVariants}>
          <p className="text-gray-600 dark:text-gray-300 text-sm italic">
            I typically respond to inquiries within 24-48 hours.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 
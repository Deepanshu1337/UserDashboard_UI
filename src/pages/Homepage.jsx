import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FireAi from '../asset/OIG2.jpg'

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row justify-between items-center p-8 md:p-16 bg-gray-100">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "linear"  }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Welcome to Fire AI
        </motion.h1>
        <motion.p
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "linear" }}
          className="text-lg md:text-xl mb-6"
        >
          Fire AI is a leading company in artificial intelligence and machine learning solutions. We provide cutting-edge technology to help businesses innovate and grow. Our mission is to empower organizations with intelligent tools that drive success.
        </motion.p>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1, ease: "linear"  }}
        >
          <Link
            to="/analytics"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg"
          >
            Go to Analytics
          </Link>
        </motion.div>
      </div>
      <div className="md:w-1/2 md:h-full flex justify-center">
        <img  src={FireAi} alt="Fire AI Logo" className="w-[500px] h-[500px] rounded-md shadow-lg" />
      </div>
    </div>
  );
};

export default Homepage;
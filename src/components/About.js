import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-20 bg-dark relative overflow-hidden">
      {/* Enhanced background with animated gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-dark via-gray-900 to-dark"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.h2
            className="section-heading text-4xl md:text-6xl font-bold text-white mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            About Me
          </motion.h2>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
          <motion.p
            className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Full Stack Developer & DevOps Engineer passionate about creating
            scalable solutions
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="aspect-square rounded-3xl overflow-hidden card-3d relative">
              <img
                src="/image/nithishh.jpg"
                alt="Nithish P"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary-500/30 rounded-full animate-spin-slow"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-secondary-500/30 rounded-full animate-spin-slow-reverse"></div>
          </motion.div>

          {/* Enhanced Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.h3
              className="text-3xl md:text-5xl font-bold text-gradient leading-tight"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Turning Ideas into Reality
            </motion.h3>

            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Hi there! I'm a Full Stack Developer and DevOps Engineer with
                hands-on experience in building end-to-end web applications and
                automating scalable infrastructure. I work across the entire
                development lifecycle — from crafting responsive front-end
                interfaces to developing secure and performant back-end
                services, and deploying them using{" "}
                <span className="text-primary-400 font-semibold">
                  CI/CD pipelines
                </span>
                in the cloud.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                From crafting interactive web applications to building scalable
                server and cloud architectures, I love working across the full
                development lifecycle. My approach blends technical precision,
                automation, and creative problem-solving to deliver robust,
                future-ready solutions with{" "}
                <span className="text-secondary-400 font-semibold">
                  Jenkins, Docker & Kubernetes
                </span>
                .
              </motion.p>

              {/* Simplified Tech Stack - CORRECTED SYNTAX */}
              <motion.div
                className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🚀</span>
                  <h4 className="text-xl font-bold text-gradient">
                    Currently working with
                  </h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    {
                      name: "React",
                      icon: "⚛️",
                      color: "text-blue-400",
                    },
                    {
                      name: "Node.js",
                      icon: "🟢",
                      color: "text-green-400",
                    },
                    {
                      name: "MongoDB",
                      icon: "🍃",
                      color: "text-green-500",
                    },
                    {
                      name: "Jenkins",
                      icon: "🔧",
                      color: "text-orange-400",
                    },
                    {
                      name: "Docker",
                      icon: "🐳",
                      color: "text-blue-300",
                    },
                    {
                      name: "Kubernetes",
                      icon: "☸️",
                      color: "text-blue-500",
                    },
                    {
                      name: "AWS",
                      icon: "☁️",
                      color: "text-yellow-400",
                    },
                    {
                      name: "MySQL",
                      icon: "🗄️",
                      color: "text-blue-600",
                    },
                  ].map((tech, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-lg">{tech.icon}</span>
                      <span className={`text-sm font-medium ${tech.color}`}>
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Enhanced Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.a
                href="/nithish_resume_6.pdf"
                download="Nithish_Resume.pdf"
                className="btn-primary flex items-center justify-center gap-3 group relative overflow-hidden"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                <motion.svg
                  className="w-5 h-5 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2-2H5a2 2 0 01-2-2z"
                  />
                </motion.svg>
                <span className="relative z-10 font-semibold">
                  Download Resume
                </span>
              </motion.a>

              <motion.a
                href="#contact"
                className="btn-primary bg-transparent border-2 border-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                <motion.svg
                  className="w-5 h-5 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </motion.svg>
                <span className="relative z-10 font-semibold">
                  Get in Touch
                </span>
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full relative z-10"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

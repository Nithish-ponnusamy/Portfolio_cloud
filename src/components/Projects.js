import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiInfo,
  FiChevronUp,
  FiX,
} from "react-icons/fi";

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const modalRef = useRef(null);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Social Media Dashboard Analyzer",
      description:
        "A comprehensive analytics dashboard that provides sentiment analysis for Twitter, YouTube tracking, real-time trending news, and an integrated chatbot.",
      longDescription:
        "This full-stack application utilizes machine learning for sentiment analysis of social media data. It provides real-time analytics with customizable dashboards, API integrations with multiple social platforms, and data visualization tools. The chatbot uses NLP to respond to user queries about social media trends and metrics.",
      image:
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
      tags: ["react", "python", "ml", "api"],
      github:
        "https://github.com/Nithish-ponnusamy/social_media_dashboard_analyzer",
      demo: "#",
      featured: true,
      category: "data",
    },
    {
      id: 2,
      title: "OAS - Organization Management",
      description:
        "A comprehensive system for Organization and Administration Management, streamlining tasks, user management, and efficient data handling.",
      longDescription:
        "OAS is designed to improve organizational efficiency with features including role-based access control, automated workflow management, document processing, and comprehensive reporting tools. The system integrates with existing platforms and provides a unified interface for all administrative tasks.",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      tags: ["react", "node", "sql", "oauth"],
      github: "https://github.com/Nithish-ponnusamy/OAS",
      demo: "#",
      featured: true,
      category: "web",
    },
    {
      id: 3,
      title: "Quiz Application",
      description:
        "An interactive quiz application with real-time multiplayer capabilities, adaptive learning, and comprehensive analytics dashboard.",
      longDescription:
        "This interactive quiz application features real-time multiplayer functionality, allowing users to compete against friends or random opponents. The platform incorporates adaptive learning algorithms that adjust question difficulty based on user performance. Built with React for the frontend and MongoDB for data persistence, it includes features such as leaderboards, achievement badges, question categorization, timed challenges, and detailed analytics that track learning progress over time. The responsive design ensures a seamless experience across desktop and mobile devices.",
      image:
        "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      tags: ["react JS", "Kubernetes", "Jenkins", "Docker"],
      github: "https://github.com/Nithish-ponnusamy/quiz-devops_final",
      demo: "#",
      featured: true,
      category: "Devops",
    },
    {
      id: 4,
      title: "E-Commerce Platform(KSP_Yarns)",
      description:
        "A full-featured e-commerce platform with payment processing, user authentication, and admin dashboard.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      tags: ["react", "node", "mongodb"],
      github: "https://github.com/Nithish-ponnusamy/ksp_user",
      demo: "#",
      featured: false,
      category: "web",
    },
  ];

  // Apply filter
  const filteredProjects =
    filter === "all"
      ? projects
      : filter === "featured"
      ? projects.filter((project) => project.featured)
      : ["web", "data", "ai", "Devops"].includes(filter)
      ? projects.filter((project) => project.category === filter)
      : projects.filter((project) => project.tags.includes(filter));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.5,
      },
    },
    exit: {
      y: 50,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
      },
    },
  };

  const handleProjectDetails = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const scrollToTop = () => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const projectsSection = document.getElementById("projects");
      if (!projectsSection) return;

      const rect = projectsSection.getBoundingClientRect();
      setShowScrollTop(rect.top < -300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle keyboard navigation in modal
  const handleModalKeyDown = useCallback(
    (e) => {
      if (!showModal) return;

      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "Tab") {
        // Keep focus trapped within modal
        if (!modalRef.current) return;

        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    },
    [showModal, closeModal]
  );

  // Manage focus when modal opens/closes
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        if (modalRef.current) {
          const firstFocusable = modalRef.current.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (firstFocusable) firstFocusable.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  // Enhanced modal control with keyboard navigation
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleModalKeyDown);
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleModalKeyDown);
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleModalKeyDown);
    };
  }, [showModal, handleModalKeyDown]);

  return (
    <section
      id="projects"
      className="py-24 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-gray-900/80 to-transparent z-10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 mb-2 tracking-tight">
              My Projects
            </h2>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-transparent rounded-full"></div>
            </div>
          </motion.div>
          <motion.p
            className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Discover my portfolio of innovative projects spanning{" "}
            <span className="text-blue-400 font-semibold">web development</span>
            ,
            <span className="text-purple-400 font-semibold">
              {" "}
              data analysis
            </span>
            , and{" "}
            <span className="text-cyan-400 font-semibold">
              DevOps solutions
            </span>
            . Each project represents a unique challenge and creative solution.
          </motion.p>
        </motion.div>

        {/* Enhanced Filter buttons */}
        <motion.div
          className="flex flex-wrap justify-center mb-16 gap-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { key: "all", label: "All Projects", count: projects.length },
            {
              key: "featured",
              label: "Featured",
              count: projects.filter((p) => p.featured).length,
            },
            {
              key: "web",
              label: "Web Dev",
              count: projects.filter((p) => p.category === "web").length,
            },
            {
              key: "data",
              label: "Data Science",
              count: projects.filter((p) => p.category === "data").length,
            },
            {
              key: "Devops",
              label: "DevOps",
              count: projects.filter((p) => p.category === "Devops").length,
            },
          ].map((item, index) => (
            <motion.button
              key={item.key}
              onClick={() => setFilter(item.key)}
              className={`group relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                filter === item.key
                  ? "bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white shadow-2xl shadow-blue-500/25"
                  : "bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-700/70 hover:text-white border border-gray-700/30 hover:border-blue-500/30"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              aria-pressed={filter === item.key}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>{item.label}</span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    filter === item.key
                      ? "bg-white/20"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {item.count}
                </span>
              </span>
              {filter !== item.key && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-cyan-500/10 transition-all duration-300"></div>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Loading indicator */}
        {loading && (
          <motion.div
            className="flex flex-col justify-center items-center h-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-purple-400/20 border-b-purple-400 rounded-full animate-spin animation-delay-150"></div>
            </div>
            <motion.p
              className="mt-6 text-gray-400 font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Loading amazing projects...
            </motion.p>
          </motion.div>
        )}

        {/* Enhanced Projects grid */}
        <AnimatePresence mode="wait">
          {!loading && (
            <>
              {filteredProjects.length > 0 ? (
                <motion.div
                  key={filter}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      variants={itemVariants}
                      layoutId={`project-card-${project.id}`}
                      className="group relative"
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.3, ease: "easeOut" },
                      }}
                    >
                      {/* Enhanced Project Card */}
                      <div className="relative bg-gradient-to-br from-gray-800/40 via-gray-800/60 to-gray-900/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl h-full flex flex-col transform transition-all duration-500 hover:shadow-blue-500/20 border border-gray-700/30 hover:border-blue-500/30">
                        {/* Enhanced Image Section */}
                        <div className="relative h-72 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            loading="lazy"
                          />

                          {/* Improved overlay buttons */}
                          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                            <motion.a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-4 bg-gray-900/90 backdrop-blur-md rounded-2xl text-white hover:bg-blue-600/90 transition-all duration-300 border border-gray-600/50 hover:border-blue-400/50"
                              whileHover={{ scale: 1.15, y: -5 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              aria-label={`View ${project.title} source code on GitHub`}
                            >
                              <FiGithub className="text-xl" />
                            </motion.a>
                            <motion.a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-4 bg-gray-900/90 backdrop-blur-md rounded-2xl text-white hover:bg-purple-600/90 transition-all duration-300 border border-gray-600/50 hover:border-purple-400/50"
                              whileHover={{ scale: 1.15, y: -5 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              aria-label={`View ${project.title} live demo`}
                            >
                              <FiExternalLink className="text-xl" />
                            </motion.a>
                            <motion.button
                              onClick={() => handleProjectDetails(project)}
                              className="p-4 bg-gray-900/90 backdrop-blur-md rounded-2xl text-white hover:bg-cyan-600/90 transition-all duration-300 border border-gray-600/50 hover:border-cyan-400/50"
                              whileHover={{ scale: 1.15, y: -5 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.3 }}
                              aria-label={`View ${project.title} details`}
                            >
                              <FiInfo className="text-xl" />
                            </motion.button>
                          </div>

                          {/* Enhanced Featured Badge */}
                          {project.featured && (
                            <motion.div
                              className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white text-xs font-bold py-2 px-4 rounded-full shadow-lg border border-yellow-300/30"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{
                                delay: 0.3,
                                type: "spring",
                                stiffness: 200,
                              }}
                            >
                              ⭐ Featured
                            </motion.div>
                          )}
                        </div>

                        {/* Enhanced Content Section */}
                        <div className="p-8 flex-grow flex flex-col">
                          <motion.h3
                            className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                          >
                            {project.title}
                          </motion.h3>

                          <p className="text-gray-300 mb-6 flex-grow text-base leading-relaxed">
                            {project.longDescription?.substring(0, 180) ||
                              project.description}
                            {project.longDescription?.length > 180 && "..."}
                          </p>

                          {/* Enhanced Tags */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag, tagIndex) => (
                              <motion.span
                                key={tagIndex}
                                className={`px-4 py-2 text-sm rounded-full transition-all cursor-pointer border ${
                                  filter === tag
                                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-400/50 shadow-lg"
                                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/70 hover:text-white border-gray-600/30 hover:border-blue-400/30"
                                }`}
                                onClick={() => setFilter(tag)}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: tagIndex * 0.1 }}
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>

                          {/* Enhanced CTA Button */}
                          <motion.button
                            onClick={() => handleProjectDetails(project)}
                            className="w-full py-4 bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-cyan-600/80 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600 
                                      text-white rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-blue-500/25 border border-blue-500/20 hover:border-blue-400/40 font-semibold"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <FiInfo className="text-lg" />
                            <span>Explore Project</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="col-span-full text-center py-20"
                  variants={itemVariants}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30">
                    <div className="mb-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiInfo className="text-4xl text-blue-400" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      No projects found
                    </h3>
                    <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                      No projects match your current filter selection. Try
                      exploring other categories or view all projects.
                    </p>
                    <motion.button
                      onClick={() => setFilter("all")}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl transition-all duration-300 font-semibold transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Show All Projects
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>

        {/* Enhanced GitHub CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gradient-to-br from-gray-800/40 via-gray-800/60 to-gray-900/80 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/30 hover:border-blue-500/30 transition-all duration-500">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiGithub className="text-4xl text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                Explore More Projects
              </h3>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                Discover additional projects, code samples, and open-source
                contributions on my GitHub profile. Each repository tells a
                story of continuous learning and innovation.
              </p>
            </motion.div>

            <motion.a
              href="https://github.com/Nithish-ponnusamy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 text-white rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 border border-blue-500/20 hover:border-blue-400/40"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiGithub className="text-xl" />
              <span>View All Projects on GitHub</span>
              <FiExternalLink className="text-lg" />
            </motion.a>
          </div>
        </motion.div>

        {/* Enhanced Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl shadow-blue-500/25 z-40 border border-blue-500/20"
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to top"
            >
              <FiChevronUp className="text-xl" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Project Details Modal */}
      <AnimatePresence>
        {showModal && selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              ref={modalRef}
              className="bg-gradient-to-br from-gray-800/90 via-gray-800/95 to-gray-900/90 backdrop-blur-xl rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-gray-700/50 shadow-2xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="modal-title"
              aria-modal="true"
              tabIndex="-1"
            >
              <div className="p-8">
                {/* Enhanced Modal Header */}
                <div className="flex justify-between items-start mb-8">
                  <div className="flex-1">
                    <motion.h3
                      id="modal-title"
                      className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {selectedProject.title}
                    </motion.h3>
                    <motion.div
                      className="flex items-center space-x-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold border border-blue-500/30">
                        {selectedProject.category}
                      </span>
                      {selectedProject.featured && (
                        <span className="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-orange-400 rounded-full text-sm font-semibold border border-orange-500/30">
                          ⭐ Featured Project
                        </span>
                      )}
                    </motion.div>
                  </div>
                  <motion.button
                    onClick={closeModal}
                    className="p-3 rounded-2xl text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300 border border-gray-600/30 hover:border-gray-500/50"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Close modal"
                  >
                    <FiX className="text-xl" />
                  </motion.button>
                </div>

                {/* Enhanced Modal Image */}
                <motion.div
                  className="aspect-video rounded-2xl overflow-hidden mb-8 group border border-gray-600/30"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>

                {/* Enhanced Modal Content */}
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <motion.div
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        Project Overview
                      </h4>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {selectedProject.longDescription ||
                          selectedProject.description}
                      </p>
                    </motion.div>

                    <motion.div
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h4 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        Technologies & Tools
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.tags.map((tag, index) => (
                          <motion.span
                            key={index}
                            className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-2xl border border-gray-600/50 hover:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-300"
                            whileHover={{ scale: 1.05, y: -2 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              transition: { delay: 0.4 + index * 0.05 },
                            }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Enhanced Actions Panel */}
                  <div className="md:col-span-1">
                    <motion.div
                      className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/30"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h4 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        Project Links
                      </h4>
                      <div className="space-y-4">
                        <motion.a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-blue-600 hover:to-blue-500 text-white rounded-2xl flex items-center gap-3 transition-all duration-300 border border-gray-600/50 hover:border-blue-400/50"
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FiGithub className="text-xl" />
                          <span className="font-semibold">
                            View Source Code
                          </span>
                        </motion.a>
                        <motion.a
                          href={selectedProject.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-2xl flex items-center gap-3 transition-all duration-300 border border-purple-500/50"
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FiExternalLink className="text-xl" />
                          <span className="font-semibold">Live Demo</span>
                        </motion.a>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;

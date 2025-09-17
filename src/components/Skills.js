import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DiReact,
  DiNodejsSmall,
  DiMongodb,
  DiJavascript1,
  DiCss3,
  DiHtml5,
  DiJava,
  DiPython,
  DiGit,
  DiMysql,
  DiLinux,
} from "react-icons/di";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiFirebase,
  SiDocker,
  SiKubernetes,
  SiAmazonwebservices,
  SiC,
  SiGrafana,
  SiPrometheus,
  SiTensorflow,
} from "react-icons/si";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState(true);

  // Simplified skill data without proficiency levels
  const skillCategories = [
    {
      name: "Programming Languages",
      skills: [
        {
          name: "JavaScript",
          icon: <DiJavascript1 className="text-4xl" />,
          color: "#F7DF1E",
        },
        {
          name: "Java",
          icon: <DiJava className="text-4xl" />,
          color: "#007396",
        },
        { name: "C", icon: <SiC className="text-4xl" />, color: "#A8B9CC" },
        {
          name: "Python",
          icon: <DiPython className="text-4xl" />,
          color: "#3776AB",
        },
      ],
    },
    {
      name: "Frontend Development",
      skills: [
        {
          name: "React",
          icon: <DiReact className="text-4xl" />,
          color: "#61DAFB",
        },
        {
          name: "Next.js",
          icon: <SiNextdotjs className="text-4xl" />,
          color: "#000000",
        },
        {
          name: "HTML5",
          icon: <DiHtml5 className="text-4xl" />,
          color: "#E34F26",
        },
        {
          name: "CSS3",
          icon: <DiCss3 className="text-4xl" />,
          color: "#1572B6",
        },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss className="text-4xl" />,
          color: "#38B2AC",
        },
      ],
    },
    {
      name: "Backend Development",
      skills: [
        {
          name: "Node.js",
          icon: <DiNodejsSmall className="text-4xl" />,
          color: "#539E43",
        },
        {
          name: "MongoDB",
          icon: <DiMongodb className="text-4xl" />,
          color: "#47A248",
        },
        {
          name: "MySQL",
          icon: <DiMysql className="text-4xl" />,
          color: "#4479A1",
        },
        {
          name: "Firebase",
          icon: <SiFirebase className="text-4xl" />,
          color: "#FFCA28",
        },
      ],
    },
    {
      name: "DevOps & Tools",
      skills: [
        { name: "Git", icon: <DiGit className="text-4xl" />, color: "#F05032" },
        {
          name: "Docker",
          icon: <SiDocker className="text-4xl" />,
          color: "#2496ED",
        },
        {
          name: "Kubernetes",
          icon: <SiKubernetes className="text-4xl" />,
          color: "#326CE5",
        },
        {
          name: "AWS",
          icon: <SiAmazonwebservices className="text-4xl" />,
          color: "#FF9900",
        },
        {
          name: "Linux",
          icon: <DiLinux className="text-4xl" />,
          color: "#FCC624",
        },
        {
          name: "Grafana",
          icon: <SiGrafana className="text-4xl" />,
          color: "#F46800",
        },
        {
          name: "Prometheus",
          icon: <SiPrometheus className="text-4xl" />,
          color: "#E6522C",
        },
      ],
    },
    {
      name: "AI & ML",
      skills: [
        {
          name: "TensorFlow",
          icon: <SiTensorflow className="text-4xl" />,
          color: "#FF6F00",
        },
      ],
    },
  ];

  // Get all categories for filter
  const allCategories = [
    "All",
    ...skillCategories.map((category) => category.name),
  ];

  // Enhanced filter function with better search logic
  const getFilteredSkills = () => {
    // No filters applied - show all categories
    if (selectedCategory === "All" && !searchQuery.trim()) {
      return skillCategories;
    }

    // Search across all categories
    if (selectedCategory === "All" && searchQuery.trim()) {
      const searchTerm = searchQuery.toLowerCase().trim();
      const allMatchingSkills = [];

      skillCategories.forEach((category) => {
        category.skills.forEach((skill) => {
          if (skill.name.toLowerCase().includes(searchTerm)) {
            allMatchingSkills.push({
              ...skill,
              originalCategory: category.name,
            });
          }
        });
      });

      if (allMatchingSkills.length === 0) return [];

      return [
        {
          name: `Search Results (${allMatchingSkills.length} skills found)`,
          skills: allMatchingSkills,
        },
      ];
    }

    // Specific category selected
    const filteredCategory = skillCategories.find(
      (category) => category.name === selectedCategory
    );

    if (!filteredCategory) return [];

    // No search query - show all skills in category
    if (!searchQuery.trim()) {
      return [filteredCategory];
    }

    // Search within specific category
    const searchTerm = searchQuery.toLowerCase().trim();
    const filteredSkills = filteredCategory.skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchTerm)
    );

    if (filteredSkills.length === 0) return [];

    return [
      {
        ...filteredCategory,
        name: `${filteredCategory.name} (${filteredSkills.length} skills found)`,
        skills: filteredSkills,
      },
    ];
  };

  const filteredSkills = getFilteredSkills();

  // Toggle animation state for performance
  useEffect(() => {
    const handleScroll = () => {
      const skillsSection = document.getElementById("skills");
      if (!skillsSection) return;

      const rect = skillsSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

      setActiveAnimation(isVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.8,
      },
    },
  };

  // Enhanced Simplified Skill Icon component
  const SkillIcon = ({ skill }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
      setHoveredSkill(skill.name);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setHoveredSkill(null);
    };

    return (
      <motion.div
        className="relative"
        onHoverStart={handleMouseEnter}
        onHoverEnd={handleMouseLeave}
        whileHover={{
          scale: 1.15,
          transition: { type: "spring", stiffness: 300, damping: 15 },
        }}
        whileTap={{ scale: 0.95 }}
        aria-label={skill.name}
        tabIndex={0}
      >
        <motion.div
          className="w-24 h-24 bg-gray-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center
                     border border-gray-700 shadow-xl cursor-pointer"
          animate={{
            boxShadow: isHovered
              ? `0 0 25px ${skill.color}60, 0 0 80px ${skill.color}30`
              : "0 0 0 transparent",
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{
            duration: 0.4,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <div className="flex items-center justify-center flex-col">
            <div className="mb-1" style={{ color: skill.color }}>
              {skill.icon}
            </div>
            <p className="text-xs font-medium opacity-80">{skill.name}</p>
          </div>
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800/90 
                         backdrop-blur-sm px-4 py-1.5 rounded-lg shadow-xl z-50 whitespace-nowrap"
            >
              <p className="text-sm font-medium text-white">{skill.name}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <section
      id="skills"
      className="py-20 bg-gray-900/95 backdrop-blur-lg relative overflow-hidden"
    >
      {/* Enhanced background gradient animation */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: activeAnimation
            ? [
                "radial-gradient(circle at 10% 10%, #4F46E5 0%, transparent 50%)",
                "radial-gradient(circle at 90% 20%, #8B5CF6 0%, transparent 50%)",
                "radial-gradient(circle at 10% 90%, #10B981 0%, transparent 50%)",
                "radial-gradient(circle at 90% 80%, #3B82F6 0%, transparent 50%)",
                "radial-gradient(circle at 50% 50%, #F59E0B 0%, transparent 50%)",
              ]
            : "radial-gradient(circle at 50% 50%, #4F46E5 0%, transparent 50%)",
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        }}
      />

      {/* Animated particles */}
      {activeAnimation && (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary-300"
              initial={{
                opacity: Math.random() * 0.5 + 0.1,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.2,
              }}
              animate={{
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                ],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                ],
              }}
              transition={{
                duration: 20 + Math.random() * 30,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                width: `${Math.random() * 10 + 3}px`,
                height: `${Math.random() * 10 + 3}px`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">My Technical Toolkit</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-400 mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
            I've developed expertise across the full software development stack.
            Hover over skills to explore the technologies I work with.
          </p>
        </motion.div>

        {/* Enhanced Search and Filter Controls */}
        <motion.div
          className="mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
              {/* Category Filter */}
              <div className="relative w-full max-w-xs">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Filter by Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-700/50 text-white border border-gray-600/50 
                            focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 
                            cursor-pointer transition-all duration-300 hover:bg-gray-700/70"
                  aria-label="Filter skills by category"
                >
                  {allCategories.map((category, index) => (
                    <option
                      key={index}
                      value={category}
                      className="bg-gray-800 text-white"
                    >
                      {category}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-9 pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
              </div>

              {/* Enhanced Search Bar */}
              <div className="relative w-full max-w-xs">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Search Skills
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type skill name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className={`w-full px-4 py-3 pl-12 pr-12 rounded-xl bg-gray-700/50 text-white border transition-all duration-300
                      ${
                        isSearchFocused || searchQuery
                          ? "border-blue-500/50 ring-2 ring-blue-500/20 bg-gray-700/70"
                          : "border-gray-600/50 hover:border-gray-500/50"
                      } 
                      focus:outline-none placeholder-gray-400`}
                    aria-label="Search skills"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <FaSearch
                      className={`transition-colors duration-300 ${
                        isSearchFocused || searchQuery
                          ? "text-blue-400"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  {searchQuery && (
                    <motion.button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white 
                                transition-colors duration-200 p-1 rounded-full hover:bg-gray-600/50"
                      aria-label="Clear search"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTimes />
                    </motion.button>
                  )}
                </div>

                {/* Search suggestions/hints */}
                {isSearchFocused && !searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 p-3 bg-gray-800/95 backdrop-blur-sm 
                              rounded-xl border border-gray-600/50 z-50"
                  >
                    <p className="text-xs text-gray-400 mb-2">
                      Try searching for:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["React", "JavaScript", "Docker", "Python", "AWS"].map(
                        (suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => setSearchQuery(suggestion)}
                            className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded-md text-xs 
                                    hover:bg-blue-600/30 hover:text-blue-300 transition-colors"
                          >
                            {suggestion}
                          </button>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Results Info */}
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <p className="text-sm text-gray-400">Total Skills</p>
                  <p className="text-xl font-bold text-blue-400">
                    {filteredSkills.reduce(
                      (total, category) => total + category.skills.length,
                      0
                    )}
                  </p>
                </div>
                {(searchQuery || selectedCategory !== "All") && (
                  <motion.button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSearchQuery("");
                    }}
                    className="px-4 py-2 bg-gray-600/50 hover:bg-gray-600/70 text-gray-300 hover:text-white 
                              rounded-xl transition-all duration-200 text-sm border border-gray-600/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear All
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Skills Display */}
        <div className="space-y-16">
          <AnimatePresence mode="wait">
            {filteredSkills.length > 0 ? (
              <motion.div
                key={`${selectedCategory}-${searchQuery}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {filteredSkills.map(
                  (category, catIndex) =>
                    category.skills.length > 0 && (
                      <motion.div
                        key={`${category.name}-${catIndex}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                        className="relative"
                      >
                        {/* Enhanced Category Header */}
                        <motion.div
                          className="text-center mb-12"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 mb-3">
                            {category.name}
                          </h3>
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-blue-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent rounded-full"></div>
                          </div>
                          <p className="text-gray-400 mt-3 text-sm">
                            {category.skills.length} skill
                            {category.skills.length !== 1 ? "s" : ""}
                          </p>
                        </motion.div>

                        {/* Enhanced Skills Grid */}
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
                        >
                          {category.skills.map((skill, index) => (
                            <motion.div
                              key={`${skill.name}-${index}`}
                              variants={itemVariants}
                              className="flex flex-col items-center"
                              whileHover={{ y: -5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <SkillIcon skill={skill} />
                              {/* Optional: Show original category for search results */}
                              {skill.originalCategory && searchQuery && (
                                <motion.p
                                  className="text-xs text-gray-500 mt-2 opacity-70"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 0.7 }}
                                  transition={{ delay: 0.3 }}
                                >
                                  from {skill.originalCategory}
                                </motion.p>
                              )}
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    )
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="text-center py-20"
              >
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30 max-w-md mx-auto">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-600/20 to-gray-700/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaSearch className="text-3xl text-gray-500" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-300 mb-3">
                    No Skills Found
                  </h3>
                  <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                    {searchQuery
                      ? `No skills match "${searchQuery}" in ${
                          selectedCategory === "All"
                            ? "any category"
                            : selectedCategory
                        }.`
                      : "No skills available in the selected category."}
                  </p>
                  <div className="space-y-3">
                    <motion.button
                      onClick={() => {
                        setSelectedCategory("All");
                        setSearchQuery("");
                      }}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-600 hover:to-purple-600 
                                text-white rounded-xl transition-all duration-300 font-medium"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Show All Skills
                    </motion.button>
                    {searchQuery && (
                      <motion.button
                        onClick={() => setSearchQuery("")}
                        className="w-full px-6 py-2 bg-gray-700/50 hover:bg-gray-700/70 text-gray-300 hover:text-white 
                                  rounded-xl transition-all duration-300 text-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Clear Search Only
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Learning Journey */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-24 text-center px-4 py-8 bg-gray-800/40 backdrop-blur-md rounded-xl border border-gray-700"
        >
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 mb-4">
            My Learning Journey
          </h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            I'm passionate about continuous growth and staying at the forefront
            of technology trends. Currently exploring advanced AI integration,
            serverless architectures, and Web3 development.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#projects"
              className="btn-primary relative overflow-hidden group"
            >
              <span className="relative z-10">View My Projects</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </a>

            <a
              href="#contact"
              className="btn-secondary relative overflow-hidden group"
            >
              <span className="relative z-10">Get In Touch</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

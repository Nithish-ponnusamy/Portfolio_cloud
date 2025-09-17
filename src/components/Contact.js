import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
 

      // Replace these with your actual EmailJS credentials
      const SERVICE_ID = "your_service_id";
      const TEMPLATE_ID = "your_template_id";
      const PUBLIC_KEY = "your_public_key";

      emailjs.init(PUBLIC_KEY);

      const templateParams = {
        to_name: "Nithish P",
        to_email: "nithinithish271@gmail.com",
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
      };

      // Send email through EmailJS
      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams
      );

      console.log("Email sent successfully:", response);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    }

    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-dark via-gray-900 to-dark relative overflow-hidden"
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading text-4xl md:text-6xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to bring your next project to life? Let's discuss how we can
            work together!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gradient mb-6">
                Let's Start a Conversation
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Whether you're looking for a{" "}
                <span className="jenkins-highlight">
                  DevOps automation solution
                </span>
                , a full-stack web application, or need help with{" "}
                <span className="kubernetes-highlight">
                  Kubernetes deployments
                </span>{" "}
                and{" "}
                <span className="docker-highlight">
                  Docker containerization
                </span>
                , I'm here to help turn your ideas into reality.
              </p>
            </div>

            {/* Enhanced Contact Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: "📧",
                  title: "Email",
                  value: "nithinithish271@gmail.com",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: "📱",
                  title: "Phone",
                  value: "+1 (555) 123-4567",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: "📍",
                  title: "Location",
                  value: "Available for Remote Work",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  icon: "💼",
                  title: "Specialization",
                  value: "Full Stack + DevOps",
                  color: "from-orange-500 to-red-500",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`glass-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer group`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`text-2xl p-3 rounded-full bg-gradient-to-r ${item.color} bg-opacity-20`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-gray-400">{item.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex gap-4 pt-6"
            >
              {[
                {
                  name: "LinkedIn",
                  icon: "💼",
                  url: "#",
                  color: "hover:text-blue-400",
                },
                {
                  name: "GitHub",
                  icon: "⚡",
                  url: "#",
                  color: "hover:text-gray-300",
                },
                {
                  name: "Email",
                  icon: "�",
                  url: "mailto:nithinithish271@gmail.com",
                  color: "hover:text-green-400",
                },
                {
                  name: "Portfolio",
                  icon: "🌐",
                  url: "#",
                  color: "hover:text-primary-400",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className={`p-3 rounded-full bg-gray-800/50 border border-gray-700/50 ${social.color} transition-all duration-300 hover:scale-110 hover:border-primary-500/50`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl">{social.icon}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="contact-input"
                    placeholder="John Doe"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="contact-input"
                    placeholder="john@example.com"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="contact-input"
                  placeholder="Project Discussion / DevOps Consultation"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="contact-input resize-none"
                  placeholder="Tell me about your project, CI/CD requirements, or any DevOps challenges you're facing..."
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        🚀
                      </motion.span>
                      Send Message
                    </>
                  )}
                </span>
              </motion.button>

              {/* Success/Error Messages */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-center"
                >
                  ✅ Perfect! Your message has been sent directly to my email
                  (nithinithish271@gmail.com). I'll respond within 24 hours!
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-center"
                >
                  ❌ Email service temporarily unavailable. Please email me
                  directly at nithinithish271@gmail.com or try again later.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

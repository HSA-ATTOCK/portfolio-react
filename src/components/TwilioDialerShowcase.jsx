import React, { useState } from "react";
import "../styles/TwilioDialerShowcase.css";

const TwilioDialerShowcase = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    plan: "professional",
    message: "",
  });

  const features = [
    {
      icon: "📊",
      title: "Admin Dashboard",
      description: "Complete user management, analytics, and system monitoring",
    },
    {
      icon: "📞",
      title: "Professional Dialer",
      description: "One-click dialing with call recording and history",
    },
    {
      icon: "🔐",
      title: "Enterprise Security",
      description: "JWT authentication, role-based access, and data encryption",
    },
    {
      icon: "👥",
      title: "Multi-Tenant",
      description: "Support for multiple organizations with data isolation",
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Works perfectly on desktop, tablet, and mobile devices",
    },
    {
      icon: "⚡",
      title: "Real-time Updates",
      description: "Live call status, notifications, and activity monitoring",
    },
  ];

  const screenshots = [
    {
      id: 1,
      title: "Dashboard Overview",
      image: "/assets/img/dialer.png",
      description:
        "Clean, intuitive dashboard with real-time statistics and quick actions",
    },
    {
      id: 2,
      title: "Admin Panel",
      image: "/assets/img/dialer.png",
      description: "Comprehensive user management and system configuration",
    },
    {
      id: 3,
      title: "Dialer Interface",
      image: "/assets/img/dialer.png",
      description:
        "Professional dialing interface with call controls and history",
    },
    {
      id: 4,
      title: "Call Analytics",
      image: "/assets/img/dialer.png",
      description: "Detailed call reports and performance analytics",
    },
    {
      id: 5,
      title: "Mobile View",
      image: "/assets/img/dialer.png",
      description: "Fully responsive design optimized for mobile devices",
    },
  ];

  const pricingPlans = [
    {
      id: "starter",
      name: "Starter",
      price: "$299",
      period: "/month",
      description: "Perfect for small call centers",
      features: [
        "Up to 10 agents",
        "Basic call analytics",
        "Standard support",
        "Call recording (30 days)",
        "Mobile app access",
        "Basic integrations",
      ],
      popular: false,
    },
    {
      id: "professional",
      name: "Professional",
      price: "$599",
      period: "/month",
      description: "Ideal for growing businesses",
      features: [
        "Up to 50 agents",
        "Advanced analytics & reporting",
        "Priority support",
        "Call recording (90 days)",
        "Mobile app access",
        "Advanced integrations",
        "Custom branding",
        "API access",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$1,299",
      period: "/month",
      description: "For large organizations",
      features: [
        "Unlimited agents",
        "Real-time analytics",
        "24/7 dedicated support",
        "Unlimited call recording",
        "Mobile app access",
        "Full API access",
        "White-label solution",
        "Custom integrations",
        "SLA guarantee",
        "On-premise deployment",
      ],
      popular: false,
    },
  ];

  const techStack = [
    { name: "React.js", icon: "⚛️", description: "Modern frontend framework" },
    { name: "Node.js", icon: "🟢", description: "Scalable backend runtime" },
    { name: "MongoDB", icon: "🍃", description: "Flexible NoSQL database" },
    {
      name: "Twilio API",
      icon: "📞",
      description: "Enterprise voice services",
    },
    { name: "JWT Auth", icon: "🔐", description: "Secure authentication" },
    { name: "WebSocket", icon: "🔄", description: "Real-time communication" },
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (integrate with your backend)
    console.log("Contact form submitted:", contactForm);
    alert("Thank you! We will contact you within 24 hours.");
    setShowContactForm(false);
    setContactForm({
      name: "",
      email: "",
      company: "",
      plan: "professional",
      message: "",
    });
  };

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="dialer-showcase">
      {/* Back Navigation */}
      <div className="back-navigation">
        <button onClick={onBack} className="back-btn">
          ← Back to Portfolio
        </button>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Professional Twilio Dialer</h1>
            <h2>Enterprise-Grade Call Center Solution</h2>
            <p>
              Transform your business communication with our modern, scalable
              dialer system. Built with cutting-edge technology for call
              centers, sales teams, and customer service organizations.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Uptime</span>
              </div>
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Organizations</span>
              </div>
              <div className="stat">
                <span className="stat-number">10M+</span>
                <span className="stat-label">Calls Handled</span>
              </div>
            </div>
            <div className="hero-buttons">
              <button
                className="btn-primary"
                onClick={() => setShowContactForm(true)}
              >
                Start Free Trial
              </button>
              <button
                className="btn-secondary"
                onClick={() => setActiveTab("demo")}
              >
                View Demo
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src="/assets/img/dialer.png" alt="Dialer Dashboard" />
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <nav className="showcase-nav">
        <div className="nav-container">
          {[
            { id: "overview", label: "Overview", icon: "📊" },
            { id: "features", label: "Features", icon: "⭐" },
            { id: "demo", label: "Screenshots", icon: "🖼️" },
            { id: "technology", label: "Technology", icon: "⚡" },
            { id: "pricing", label: "Pricing", icon: "💰" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Content Sections */}
      <div className="showcase-content">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <section className="content-section">
            <div className="section-header">
              <h2>Complete Call Center Solution</h2>
              <p>
                Everything you need to manage your call center operations
                efficiently
              </p>
            </div>

            <div className="overview-grid">
              <div className="overview-card">
                <div className="card-icon">👥</div>
                <h3>Agent Management</h3>
                <p>
                  Comprehensive user management with role-based permissions,
                  activity tracking, and performance analytics.
                </p>
                <ul>
                  <li>Multi-role user system</li>
                  <li>Real-time agent status</li>
                  <li>Performance tracking</li>
                  <li>Shift management</li>
                </ul>
              </div>

              <div className="overview-card">
                <div className="card-icon">📞</div>
                <h3>Smart Dialing</h3>
                <p>
                  Advanced dialing features with call recording, analytics, and
                  seamless Twilio integration.
                </p>
                <ul>
                  <li>One-click dialing</li>
                  <li>Call recording & playback</li>
                  <li>International calling</li>
                  <li>Call routing & forwarding</li>
                </ul>
              </div>

              <div className="overview-card">
                <div className="card-icon">📊</div>
                <h3>Analytics & Reporting</h3>
                <p>
                  Detailed insights into call performance, agent productivity,
                  and business metrics.
                </p>
                <ul>
                  <li>Real-time dashboards</li>
                  <li>Custom reports</li>
                  <li>Performance metrics</li>
                  <li>Export capabilities</li>
                </ul>
              </div>

              <div className="overview-card">
                <div className="card-icon">🔒</div>
                <h3>Enterprise Security</h3>
                <p>
                  Bank-level security with encrypted data, secure
                  authentication, and compliance features.
                </p>
                <ul>
                  <li>JWT authentication</li>
                  <li>Data encryption</li>
                  <li>GDPR compliance</li>
                  <li>Audit trails</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Features Tab */}
        {activeTab === "features" && (
          <section className="content-section">
            <div className="section-header">
              <h2>Powerful Features</h2>
              <p>
                Built for modern call centers with enterprise-grade capabilities
              </p>
            </div>

            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="features-detailed">
              <div className="feature-detail">
                <div className="feature-detail-content">
                  <h3>Advanced Call Management</h3>
                  <ul>
                    <li>
                      📞 <strong>One-Click Dialing:</strong> Instant calling
                      with number validation
                    </li>
                    <li>
                      🎙️ <strong>Call Recording:</strong> Automatic recording
                      with secure storage
                    </li>
                    <li>
                      📋 <strong>Call History:</strong> Comprehensive logs with
                      search and filter
                    </li>
                    <li>
                      🔄 <strong>Call Transfer:</strong> Seamless call routing
                      between agents
                    </li>
                    <li>
                      🌍 <strong>International Support:</strong> Global calling
                      with competitive rates
                    </li>
                  </ul>
                </div>
                <div className="feature-detail-image">
                  <img src="/assets/img/dialer.png" alt="Call Management" />
                </div>
              </div>

              <div className="feature-detail reverse">
                <div className="feature-detail-image">
                  <img src="/assets/img/dialer.png" alt="Admin Dashboard" />
                </div>
                <div className="feature-detail-content">
                  <h3>Complete Admin Control</h3>
                  <ul>
                    <li>
                      👤 <strong>User Management:</strong> Create, edit, and
                      manage all users
                    </li>
                    <li>
                      🏢 <strong>Organization Setup:</strong> Multi-tenant
                      architecture
                    </li>
                    <li>
                      📊 <strong>Real-time Monitoring:</strong> Live agent
                      status and call metrics
                    </li>
                    <li>
                      ⚙️ <strong>System Configuration:</strong> Customize
                      settings and preferences
                    </li>
                    <li>
                      📈 <strong>Analytics Dashboard:</strong> Performance
                      insights and reports
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Screenshots Tab */}
        {activeTab === "demo" && (
          <section className="content-section">
            <div className="section-header">
              <h2>See It In Action</h2>
              <p>
                Explore the user interface and experience the power of our
                dialer
              </p>
            </div>

            <div className="screenshots-gallery">
              {screenshots.map((screenshot) => (
                <div key={screenshot.id} className="screenshot-card">
                  <div className="screenshot-image">
                    <img src={screenshot.image} alt={screenshot.title} />
                    <div className="screenshot-overlay">
                      <button className="view-full">🔍 View Full Size</button>
                    </div>
                  </div>
                  <div className="screenshot-info">
                    <h3>{screenshot.title}</h3>
                    <p>{screenshot.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="demo-features">
              <h3>Interactive Demo Available</h3>
              <p>
                Experience the full functionality with our live demo environment
              </p>
              <div className="demo-buttons">
                <button
                  className="btn-primary"
                  onClick={() => setShowContactForm(true)}
                >
                  Request Live Demo
                </button>
                <button className="btn-secondary">View Video Demo</button>
              </div>
            </div>
          </section>
        )}

        {/* Technology Tab */}
        {activeTab === "technology" && (
          <section className="content-section">
            <div className="section-header">
              <h2>Built with Modern Technology</h2>
              <p>
                Leveraging the latest technologies for performance, scalability,
                and reliability
              </p>
            </div>

            <div className="tech-stack">
              {techStack.map((tech, index) => (
                <div key={index} className="tech-card">
                  <div className="tech-icon">{tech.icon}</div>
                  <h3>{tech.name}</h3>
                  <p>{tech.description}</p>
                </div>
              ))}
            </div>

            <div className="architecture-section">
              <h3>System Architecture</h3>
              <div className="architecture-diagram">
                <div className="arch-layer">
                  <h4>Frontend Layer</h4>
                  <div className="arch-components">
                    <span>React.js</span>
                    <span>Responsive UI</span>
                    <span>Real-time Updates</span>
                  </div>
                </div>
                <div className="arch-arrow">↓</div>
                <div className="arch-layer">
                  <h4>API Layer</h4>
                  <div className="arch-components">
                    <span>Node.js</span>
                    <span>Express.js</span>
                    <span>JWT Auth</span>
                  </div>
                </div>
                <div className="arch-arrow">↓</div>
                <div className="arch-layer">
                  <h4>Data Layer</h4>
                  <div className="arch-components">
                    <span>MongoDB</span>
                    <span>Twilio API</span>
                    <span>Cloud Storage</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="tech-benefits">
              <h3>Technical Advantages</h3>
              <div className="benefits-grid">
                <div className="benefit">
                  <h4>🚀 High Performance</h4>
                  <p>
                    Optimized for handling thousands of concurrent calls with
                    minimal latency
                  </p>
                </div>
                <div className="benefit">
                  <h4>📈 Scalable</h4>
                  <p>
                    Horizontal scaling to support growing call volumes and user
                    base
                  </p>
                </div>
                <div className="benefit">
                  <h4>🔒 Secure</h4>
                  <p>
                    Enterprise-grade security with encryption and compliance
                    standards
                  </p>
                </div>
                <div className="benefit">
                  <h4>🔧 Maintainable</h4>
                  <p>
                    Clean, modular code architecture for easy updates and
                    customization
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Pricing Tab */}
        {activeTab === "pricing" && (
          <section className="content-section">
            <div className="section-header">
              <h2>Choose Your Plan</h2>
              <p>Flexible pricing options for organizations of all sizes</p>
            </div>

            <div className="pricing-grid">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`pricing-card ${plan.popular ? "popular" : ""}`}
                >
                  {plan.popular && (
                    <div className="popular-badge">Most Popular</div>
                  )}
                  <div className="plan-header">
                    <h3>{plan.name}</h3>
                    <div className="plan-price">
                      <span className="price">{plan.price}</span>
                      <span className="period">{plan.period}</span>
                    </div>
                    <p className="plan-description">{plan.description}</p>
                  </div>
                  <div className="plan-features">
                    <ul>
                      {plan.features.map((feature, index) => (
                        <li key={index}>✓ {feature}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    className={`plan-button ${
                      plan.popular ? "btn-primary" : "btn-secondary"
                    }`}
                    onClick={() => {
                      setContactForm({ ...contactForm, plan: plan.id });
                      setShowContactForm(true);
                    }}
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>

            <div className="pricing-footer">
              <div className="pricing-note">
                <h3>🎯 Custom Enterprise Solutions</h3>
                <p>
                  Need a tailored solution? We offer custom development,
                  on-premise deployment, and dedicated support for large
                  enterprises.
                </p>
                <button
                  className="btn-outline"
                  onClick={() => setShowContactForm(true)}
                >
                  Contact for Custom Quote
                </button>
              </div>

              <div className="pricing-guarantee">
                <h4>💯 Our Guarantee</h4>
                <ul>
                  <li>✅ 30-day free trial</li>
                  <li>✅ 99.9% uptime SLA</li>
                  <li>✅ 24/7 technical support</li>
                  <li>✅ No setup fees</li>
                  <li>✅ Cancel anytime</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div
          className="modal-overlay"
          onClick={() => setShowContactForm(false)}
        >
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Get Started Today</h2>
              <button
                className="close-btn"
                onClick={() => setShowContactForm(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleContactSubmit} className="contact-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={contactForm.company}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Interested Plan</label>
                <select
                  name="plan"
                  value={contactForm.plan}
                  onChange={handleInputChange}
                >
                  <option value="starter">Starter - $299/month</option>
                  <option value="professional">
                    Professional - $599/month
                  </option>
                  <option value="enterprise">Enterprise - $1,299/month</option>
                  <option value="custom">Custom Solution</option>
                </select>
              </div>
              <div className="form-group">
                <label>Additional Requirements</label>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Tell us about your specific needs, number of agents, expected call volume, etc."
                />
              </div>
              <div className="form-buttons">
                <button type="submit" className="btn-primary">
                  Start Free Trial
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowContactForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Call Center?</h2>
          <p>
            Join hundreds of organizations already using our professional dialer
            solution
          </p>
          <div className="cta-buttons">
            <button
              className="btn-primary large"
              onClick={() => setShowContactForm(true)}
            >
              Start Your Free Trial
            </button>
            <button className="btn-outline large">Schedule a Demo</button>
          </div>
          <div className="cta-contact">
            <p>
              Questions? Contact us at <strong>sales@your-domain.com</strong> or{" "}
              <strong>+1 (555) 123-4567</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TwilioDialerShowcase;

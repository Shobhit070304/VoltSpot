import { Link } from "react-router-dom";
import {
  Zap,
  BarChart3,
  Globe,
  Shield,
  ArrowRight,
  Star,
  Menu,
  X,
  Smartphone,
  Database,
  Cpu,
  Wifi,
  Battery,
  Lock,
  BarChart2,
  Twitter,
  Linkedin,
  Github,
  Building,
  Bus,
  Home,
  Activity,
  Users,
  LinkedinIcon,
  CheckCircle,
  Clock,
  TrendingUp,
  MapPin,
  Settings,
  Bell,
  Target,
  Award,
  Sparkles,
  Rocket,
  Play,
} from "lucide-react";
import { useState } from "react";
import HeroBanner from "../../public/banner.png";
import DashboardBanner from "../../public/banner2.png";

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      {/* Subtle Animated Background */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute top-[15%] left-[20%] w-[40rem] h-[40rem] bg-indigo-900/5 rounded-full blur-[120px] opacity-15 animate-float"></div>
        <div className="absolute bottom-[10%] right-[15%] w-[35rem] h-[35rem] bg-cyan-900/5 rounded-full blur-[100px] opacity-10 animate-float-delay"></div>
      </div>

      {/* Centered Hero Section */}
      <section className="pt-40 pb-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/5 text-[0.6rem] font-light tracking-wider text-gray-300 mb-8">
            <Zap className="h-2.5 w-2.5 mr-1.5 text-indigo-400" />
            ENTERPRISE EV SOLUTIONS
          </div>

          <h1 className="text-4xl md:text-5xl font-light mb-6 leading-tight tracking-tighter">
            <span className="text-white">Intelligent</span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              Charging Infrastructure
            </span>
          </h1>

          <p className="text-xs text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed font-light tracking-wide">
            The most advanced platform for managing electric vehicle charging networks with
            real-time analytics, AI optimization, and seamless scalability for enterprises and municipalities.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/register"
              className="group inline-flex items-center justify-center px-6 py-3 rounded-md text-[0.65rem] font-light tracking-wider text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-indigo-500/25"
            >
              <Rocket className="mr-2 h-3.5 w-3.5" />
              START FREE TRIAL
              <ArrowRight className="ml-2 h-3.5 w-3.5 opacity-80 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/home"
              className="group inline-flex items-center justify-center px-6 py-3 rounded-md text-[0.65rem] font-light tracking-wider text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
            >
              <Play className="mr-2 h-3.5 w-3.5" />
              WATCH DEMO
            </Link>
          </div>
        </div>

        {/* Hero Image - Centered with Elegant Frame */}
        <div className="max-w-4xl mx-auto px-6 mt-20">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden transition-all duration-300 group-hover:border-white/20">
              <img
                src={HeroBanner}
                alt="EV Charging Dashboard"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features - Enhanced Grid */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-900/20 backdrop-blur-sm border border-indigo-800/30 text-[0.6rem] font-light tracking-wider text-indigo-300 mb-4">
              <Sparkles className="h-2.5 w-2.5 mr-1.5" />
              POWERFUL FEATURES
            </div>
            <h2 className="text-3xl font-light mb-4 tracking-tight text-white">
              Enterprise-Grade Charging Management
            </h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto font-light tracking-wide">
              Comprehensive tools to monitor, optimize, and scale your EV charging network with cutting-edge technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Activity className="h-5 w-5 text-indigo-400" />,
                title: "Real-Time Monitoring",
                description: "Live status and performance metrics across all stations with instant alerts",
                highlight: "99.9% uptime"
              },
              {
                icon: <Cpu className="h-5 w-5 text-indigo-400" />,
                title: "AI Optimization",
                description: "Machine learning algorithms for smart load balancing and energy distribution",
                highlight: "30% efficiency boost"
              },
              {
                icon: <BarChart2 className="h-5 w-5 text-indigo-400" />,
                title: "Advanced Analytics",
                description: "Comprehensive insights into usage patterns, revenue, and operational metrics",
                highlight: "Real-time insights"
              },
              {
                icon: <Shield className="h-5 w-5 text-indigo-400" />,
                title: "Enterprise Security",
                description: "Role-based access control, encryption, and compliance with industry standards",
                highlight: "SOC 2 compliant"
              },
              {
                icon: <Zap className="h-5 w-5 text-indigo-400" />,
                title: "Smart Energy Management",
                description: "Grid integration, demand response, and renewable energy optimization",
                highlight: "Grid-friendly"
              },
              {
                icon: <Users className="h-5 w-5 text-indigo-400" />,
                title: "Fleet Management",
                description: "Comprehensive user management, access controls, and billing integration",
                highlight: "Multi-tenant ready"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-6 transition-all duration-300 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-lg flex items-center justify-center mb-4 border border-indigo-800/30 group-hover:border-indigo-600/50 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-sm font-medium text-white mb-2">{feature.title}</h3>
                <p className="text-[0.65rem] text-gray-400 font-light tracking-wide mb-3 leading-relaxed">
                  {feature.description}
                </p>
                <div className="inline-flex items-center px-2 py-1 rounded-full bg-indigo-900/20 border border-indigo-800/30">
                  <span className="text-[0.6rem] font-medium text-indigo-300">{feature.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Showcase */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 space-y-8">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-indigo-900/20 to-purple-900/20 backdrop-blur-sm border border-indigo-800/30 text-[0.6rem] font-light tracking-wider text-indigo-300 mb-4">
                  <Target className="h-2.5 w-2.5 mr-1.5" />
                  AI-POWERED ANALYTICS
                </div>
                <h2 className="text-3xl font-light mb-6 tracking-tight text-white">
                  Smarter Charging Decisions
                </h2>
                <p className="text-sm text-gray-400 font-light tracking-wide leading-relaxed">
                  Our platform uses advanced machine learning algorithms to optimize energy distribution,
                  reduce operational costs, and improve charging efficiency across your entire network.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { text: "Dynamic load balancing", icon: <TrendingUp className="h-3 w-3" /> },
                  { text: "Predictive maintenance alerts", icon: <Bell className="h-3 w-3" /> },
                  { text: "Energy cost optimization", icon: <BarChart3 className="h-3 w-3" /> },
                  { text: "Peak demand management", icon: <Settings className="h-3 w-3" /> }
                ].map((item, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="w-5 h-5 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-full flex items-center justify-center mr-4 mt-0.5 border border-indigo-800/30 group-hover:border-indigo-600/50 transition-colors">
                      <div className="text-indigo-400">{item.icon}</div>
                    </div>
                    <span className="text-sm text-gray-300 font-light tracking-wide group-hover:text-white transition-colors">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 group-hover:border-white/20 group-hover:shadow-2xl group-hover:shadow-indigo-500/20">
                  <img
                    src={DashboardBanner}
                    alt="AI Dashboard"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Enhanced Display */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-900/20 backdrop-blur-sm border border-green-800/30 text-[0.6rem] font-light tracking-wider text-green-300 mb-4">
              <Award className="h-2.5 w-2.5 mr-1.5" />
              PROVEN RESULTS
            </div>
            <h2 className="text-3xl font-light mb-4 tracking-tight text-white">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto font-light tracking-wide">
              Our platform powers charging networks across the globe with unmatched reliability and performance.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Stations Managed", icon: <MapPin className="h-4 w-4 text-indigo-400" /> },
              { value: "2.5MW", label: "Total Power Output", icon: <Zap className="h-4 w-4 text-indigo-400" /> },
              { value: "99.9%", label: "System Uptime", icon: <Clock className="h-4 w-4 text-indigo-400" /> },
              { value: "24/7", label: "Active Monitoring", icon: <Activity className="h-4 w-4 text-indigo-400" /> }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 border border-indigo-800/30 group-hover:border-indigo-600/50 transition-colors">
                  {stat.icon}
                </div>
                <div className="text-3xl font-light text-white mb-2">{stat.value}</div>
                <div className="text-xs text-gray-400 font-light tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-900/20 backdrop-blur-sm border border-yellow-800/30 text-[0.6rem] font-light tracking-wider text-yellow-300 mb-4">
              <Star className="h-2.5 w-2.5 mr-1.5" />
              CUSTOMER SUCCESS
            </div>
            <h2 className="text-3xl font-light mb-4 tracking-tight text-white">
              What Our Customers Say
            </h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto font-light tracking-wide">
              Join thousands of satisfied customers who trust VoltSpot for their charging infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "VoltSpot transformed our charging network management. The AI optimization alone saved us 40% on energy costs.",
                author: "Sarah Chen",
                role: "CTO, GreenCity Energy",
                rating: 5
              },
              {
                quote: "The real-time monitoring and predictive maintenance features have eliminated 95% of our downtime issues.",
                author: "Michael Rodriguez",
                role: "Operations Director, EV Fleet Solutions",
                rating: 5
              },
              {
                quote: "Best-in-class platform for enterprise EV charging. The analytics and reporting capabilities are unmatched.",
                author: "Dr. Emily Watson",
                role: "Head of Sustainability, MetroCorp",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-300 font-light tracking-wide leading-relaxed mb-4">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="text-xs font-medium text-white">{testimonial.author}</div>
                  <div className="text-[0.6rem] text-gray-500 font-light tracking-wider">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-900/20 backdrop-blur-sm border border-purple-800/30 text-[0.6rem] font-light tracking-wider text-purple-300 mb-4">
              <Settings className="h-2.5 w-2.5 mr-1.5" />
              FLEXIBLE PRICING
            </div>
            <h2 className="text-3xl font-light mb-4 tracking-tight text-white">
              Choose Your Plan
            </h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto font-light tracking-wide">
              Scale with confidence. Start free and upgrade as you grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                price: "Free",
                period: "forever",
                description: "Perfect for small fleets and testing",
                features: ["Up to 5 stations", "Basic analytics", "Email support", "Mobile app access"],
                cta: "Get Started",
                popular: false
              },
              {
                name: "Professional",
                price: "$99",
                period: "per month",
                description: "Ideal for growing businesses",
                features: ["Up to 50 stations", "Advanced analytics", "Priority support", "API access", "Custom branding"],
                cta: "Start Free Trial",
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "pricing",
                description: "For large-scale deployments",
                features: ["Unlimited stations", "AI optimization", "Dedicated support", "Custom integrations", "SLA guarantee"],
                cta: "Contact Sales",
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} className={`relative bg-white/5 backdrop-blur-sm rounded-xl border transition-all duration-300 hover:border-white/20 ${
                plan.popular ? 'border-purple-500/50 bg-gradient-to-b from-purple-900/10 to-indigo-900/10' : 'border-white/10'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[0.6rem] font-medium px-3 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-medium text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-light text-white">{plan.price}</span>
                    <span className="text-xs text-gray-400 font-light tracking-wider ml-1">{plan.period}</span>
                  </div>
                  <p className="text-xs text-gray-400 font-light tracking-wide mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-3 w-3 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-xs text-gray-300 font-light tracking-wide">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={plan.name === "Enterprise" ? "/contact" : "/register"}
                    className={`block w-full text-center py-3 rounded-lg text-xs font-medium tracking-wider transition-all duration-200 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700' 
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 backdrop-blur-sm rounded-2xl border border-indigo-800/30 p-12">
            <h2 className="text-3xl font-light mb-6 tracking-tight text-white">
              Ready to Transform Your Charging Network?
            </h2>
            <p className="text-sm text-gray-400 max-w-md mx-auto mb-10 font-light tracking-wide leading-relaxed">
              Join industry leaders using our platform to optimize their EV infrastructure and reduce operational costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="group inline-flex items-center justify-center px-8 py-4 rounded-lg text-sm font-medium tracking-wider text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-indigo-500/25"
              >
                <Rocket className="mr-2 h-4 w-4" />
                START FREE TRIAL
                <ArrowRight className="ml-2 h-4 w-4 opacity-80 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/demo"
                className="group inline-flex items-center justify-center px-8 py-4 rounded-lg text-sm font-medium tracking-wider text-gray-300 bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
              >
                <Play className="mr-2 h-4 w-4" />
                SCHEDULE DEMO
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );

};

// Animation keyframes (add to your global CSS)
`@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
@keyframes gradient-x {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes slide-in {
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}`;

export default LandingPage;

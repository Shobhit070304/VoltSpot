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
    <>
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

        {/* Features - Simple and Clear */}
        <section className="py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-900/20 backdrop-blur-sm border border-indigo-800/30 text-[0.6rem] font-light tracking-wider text-indigo-300 mb-4">
                <Sparkles className="h-2.5 w-2.5 mr-1.5" />
                PROJECT FEATURES
              </div>
              <h2 className="text-3xl font-light mb-4 tracking-tight text-white">
                Simple and Useful Tools
              </h2>
              <p className="text-xs text-gray-400 max-w-md mx-auto font-light tracking-wide">
                VoltSpot is designed for everyone. Find charging stations, share your experience, and help the EV community grow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <MapPin className="h-5 w-5 text-indigo-400" />,
                  title: "Find Stations",
                  description: "Search for EV charging stations near you with ease.",
                  highlight: "Quick search"
                },
                {
                  icon: <Star className="h-5 w-5 text-indigo-400" />,
                  title: "Leave Reviews",
                  description: "Share your feedback and help others choose the best stations.",
                  highlight: "Community input"
                },
                {
                  icon: <Shield className="h-5 w-5 text-indigo-400" />,
                  title: "Report Issues",
                  description: "Let everyone know if a station has a problem.",
                  highlight: "Easy reporting"
                },
                {
                  icon: <BarChart2 className="h-5 w-5 text-indigo-400" />,
                  title: "See Ratings",
                  description: "Check average ratings for each station.",
                  highlight: "User ratings"
                },
                {
                  icon: <Users className="h-5 w-5 text-indigo-400" />,
                  title: "Manage Account",
                  description: "Sign up, log in, and save your favorite stations.",
                  highlight: "Personal profile"
                },
                {
                  icon: <Battery className="h-5 w-5 text-indigo-400" />,
                  title: "Mobile Ready",
                  description: "Use VoltSpot on your phone or tablet, anytime.",
                  highlight: "Responsive design"
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

        {/* Project Stats - Simple */}
        <section className="py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-900/20 backdrop-blur-sm border border-green-800/30 text-[0.6rem] font-light tracking-wider text-green-300 mb-4">
                <Award className="h-2.5 w-2.5 mr-1.5" />
                PROJECT STATS
              </div>
              <h2 className="text-3xl font-light mb-4 tracking-tight text-white">
                Growing Together
              </h2>
              <p className="text-xs text-gray-400 max-w-md mx-auto font-light tracking-wide">
                See how VoltSpot is helping the EV community with real, simple numbers.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "100+", label: "Stations Listed", icon: <MapPin className="h-4 w-4 text-indigo-400" /> },
                { value: "500+", label: "Reviews Shared", icon: <Star className="h-4 w-4 text-indigo-400" /> },
                { value: "4.5/5", label: "Avg. Rating", icon: <BarChart2 className="h-4 w-4 text-indigo-400" /> },
                { value: "200+", label: "Active Users", icon: <Users className="h-4 w-4 text-indigo-400" /> }
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

        {/* Sleek Final CTA Section */}
        <section className="py-20">
          <div className="max-w-xl mx-auto px-6 text-center">
            <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur-sm rounded-xl border border-indigo-800/30 p-8 shadow-lg">
              <h2 className="text-2xl font-light mb-4 tracking-tight text-white">
                Ready to join the VoltSpot community?
              </h2>
              <p className="text-sm text-gray-400 mb-6 font-light tracking-wide leading-relaxed">
                Start finding and sharing EV charging stations today. Help make charging easier for everyone!
              </p>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg text-sm font-medium tracking-wider text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-indigo-500/25"
              >
                <Rocket className="mr-2 h-4 w-4" />
                Get Started
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
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

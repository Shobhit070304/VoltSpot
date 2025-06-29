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
} from "lucide-react";
import { useState } from "react";
import Banner from "../../public/banner.png";
import Banner2 from "../../public/banner2.png";

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden md:pt-20">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[15%] w-[50rem] h-[50rem] bg-indigo-900/10 rounded-full blur-[180px] opacity-20 animate-float"></div>
        <div className="absolute bottom-[15%] right-[20%] w-[45rem] h-[45rem] bg-cyan-900/10 rounded-full blur-[160px] opacity-15 animate-float-delay"></div>
        <div className="absolute top-[60%] left-[30%] w-[40rem] h-[40rem] bg-violet-900/10 rounded-full blur-[140px] opacity-10 animate-float"></div>
      </div>

      {/* Hero Section */}
      <section className="pt-40 pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 text-xs font-light tracking-wider text-gray-300 mb-8">
              <Zap className="h-3 w-3 mr-2 text-indigo-400" />
              NEXT-GENERATION EV INFRASTRUCTURE
            </div>

            <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight tracking-tighter">
              <span className="text-white">Intelligent</span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                EV Charging
              </span>{" "}
              <span className="text-gray-500">Networks</span>
            </h1>

            <p className="text-sm text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light tracking-wide">
              The most advanced platform for managing electric vehicle charging
              infrastructure with real-time analytics, AI optimization, and
              seamless scalability for enterprises and municipalities.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/home"
                className="group inline-flex items-center px-6 py-3.5 border border-transparent text-xs font-light tracking-wider rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
              >
                START FREE TRIAL
                <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/home"
                className="inline-flex items-center px-6 py-3.5 border border-gray-700 text-xs font-light tracking-wider rounded-lg text-gray-300 bg-gray-900/50 hover:bg-gray-800/50 transition-all"
              >
                WATCH DEMO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Image */}
      <div className="">
        <div className="mx-auto w-3/4 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden">
          <img
            src={Banner}
            alt="SaaS Styled"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Features Section */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 text-xs font-light tracking-wider text-gray-300 mb-6">
                CORE FEATURES
              </div>
              <h2 className="text-3xl font-light mb-6 tracking-tight">
                Enterprise-grade{" "}
                <span className="text-white">charging infrastructure</span>{" "}
                management
              </h2>
              <p className="text-xs text-gray-400 mb-8 leading-relaxed font-light tracking-wide max-w-md">
                Our platform provides comprehensive tools to monitor, optimize,
                and scale your EV charging network with unprecedented control
                and efficiency.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: <BarChart3 className="h-4 w-4 text-indigo-400" />,
                    title: "Dashboard Overview",
                    description:
                      "Get a quick view of key information like station activity, reports, and usage stats.",
                  },
                  {
                    icon: <Cpu className="h-4 w-4 text-indigo-400" />,
                    title: "Smart Features",
                    description:
                      "Helpful tools to make managing and using charging stations simpler and smoother.",
                  },
                  {
                    icon: <Shield className="h-4 w-4 text-indigo-400" />,
                    title: "Safe & Reliable",
                    description:
                      "Built-in safety and access control features to ensure a secure user experience.",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center mr-4 border border-white/10">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-light text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-light tracking-wide">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 p-1 overflow-hidden">
                <img
                  src={Banner2}
                  alt="Dashboard Preview"
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-gradient-to-b from-gray-950/50 to-gray-950/0">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "50+", label: "Charging stations available" },
              { value: "500+", label: "Total charging sessions" },
              { value: "10+", label: "Cities covered" },
              { value: "98%", label: "System uptime" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all"
              >
                <div className="text-3xl font-light text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400 font-light tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 text-xs font-light tracking-wider text-gray-300 mb-6">
              SOLUTIONS
            </div>
            <h2 className="text-3xl font-light mb-4 tracking-tight">
              Tailored solutions for{" "}
              <span className="text-white">every use case</span>
            </h2>
            <p className="text-xs text-gray-400 max-w-2xl mx-auto font-light tracking-wide">
              Our platform adapts to your specific needs, whether you're a
              municipal fleet operator or a commercial charging network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Building className="h-5 w-5" />,
                title: "Public Locations",
                description:
                  "Charging stations placed in common public spots like malls, offices, and parking areas.",
              },
              {
                icon: <Bus className="h-5 w-5" />,
                title: "Local Fleets",
                description:
                  "Support for small electric vehicle fleets used in local transport and deliveries.",
              },
              {
                icon: <Home className="h-5 w-5" />,
                title: "Community Access",
                description:
                  "Helping neighborhoods and small towns get easy access to EV charging.",
              },
            ].map((solution, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-8 hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-6 text-indigo-400 group-hover:text-white transition-colors">
                  {solution.icon}
                </div>
                <h3 className="text-lg font-light text-white mb-3">
                  {solution.title}
                </h3>
                <p className="text-xs text-gray-400 font-light tracking-wide leading-relaxed">
                  {solution.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-gradient-to-b from-gray-950/50 to-gray-950/0">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 text-xs font-light tracking-wider text-gray-300 mb-6">
              TESTIMONIALS
            </div>
            <h2 className="text-3xl font-light mb-4 tracking-tight">
              Trusted by <span className="text-white">industry leaders</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "The platform made it really easy to manage our charging stations and track usage.",
                author: "Aarav Mehta",
                role: "Station Manager",
                company: "VoltPoint Services",
              },
              {
                quote:
                  "Setting up new stations was simple, and the dashboard gives clear insights into performance.",
                author: "Priya Sharma",
                role: "City Admin",
                company: "ChargeCity Connect",
              },
              {
                quote:
                  "We loved how smooth the experience was. Great for teams getting started with EV infrastructure.",
                author: "Rohan Verma",
                role: "Tech Lead",
                company: "GreenRoute Logistics",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-8 hover:bg-white/10 transition-all"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 text-amber-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-300 mb-8 italic font-light tracking-wide leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="text-sm font-light text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-xs text-gray-500">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 p-12 text-center">
            <h2 className="text-3xl font-light mb-6 tracking-tight">
              Ready to transform your{" "}
              <span className="text-white">charging network</span>?
            </h2>
            <p className="text-xs text-gray-400 mb-10 max-w-lg mx-auto font-light tracking-wide leading-relaxed">
              Join hundreds of organizations optimizing their EV infrastructure
              with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/register"
                className="group inline-flex items-center px-6 py-3.5 border border-transparent text-xs font-light tracking-wider rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
              >
                START FREE TRIAL
                <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to=""
                className="inline-flex items-center px-6 py-3.5 border border-gray-700 text-xs font-light tracking-wider rounded-lg text-gray-300 bg-gray-900/50 hover:bg-gray-800/50 transition-all"
              >
                TALK TO SALES
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

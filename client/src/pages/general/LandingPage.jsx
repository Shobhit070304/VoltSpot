import { Link } from "react-router-dom";
import {
  Zap,
  Shield,
  ArrowRight,
  Star,
  Menu,
  X,
  Smartphone,
  BarChart2,
  Twitter,
  Linkedin,
  Github,
  Users,
  CheckCircle,
  Clock,
  TrendingUp,
  MapPin,
  Sparkles,
  Rocket,
  Play,
  ChevronRight,
  MessageCircle,
  UserPlus,
  Search,
  Bookmark,
  User,
  Settings,
  MapIcon
} from "lucide-react";
import HeroBanner from "/hero.png";

const LandingPage = () => {

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-100 to-yellow-50 text-gray-900 overflow-x-hidden">
        {/* Subtle Animated Background */}
        <div className="fixed inset-0 -z-20 overflow-hidden">
          <div className="absolute top-[15%] left-[20%] w-[32rem] h-[32rem] bg-orange-200/30 rounded-full blur-[100px] opacity-50 animate-float"></div>
          <div className="absolute bottom-[10%] right-[15%] w-[28rem] h-[28rem] bg-amber-200/30 rounded-full blur-[80px] opacity-40 animate-float-delay"></div>
          <div className="absolute top-[50%] left-[50%] w-[18rem] h-[18rem] bg-yellow-200/20 rounded-full blur-[60px] opacity-30 animate-pulse"></div>
        </div>

        {/* Hero Section */}
        <section className="pt-48 pb-20 relative">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
                  <Zap className="h-3.5 w-3.5 mr-1" />
                  # EV Charging Platform
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                  <span className="text-gray-900">Find Your Perfect</span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                    Charging Station
                  </span>
                </h1>
                <p className="text-base text-gray-600 leading-relaxed max-w-md">
                  Discover, review, and share the best EV charging stations in your area. Join thousands of EV drivers making charging easier and more accessible for everyone.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    to="/register"
                    className="group inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-md hover:shadow-orange-400/20 font-semibold text-[0.98rem]"
                  >
                    <Rocket className="mr-1.5 h-4 w-4" />
                    Start Free Trial
                    <ArrowRight className="ml-1.5 h-4 w-4 opacity-80 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/home"
                    className="group inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all duration-200 font-semibold text-[0.98rem]"
                  >
                    <Play className="mr-1.5 h-4 w-4" />
                    Watch Demo
                  </Link>
                </div>
                <div className="flex items-center space-x-6 pt-2">
                  <div className="flex items-center space-x-1.5">
                    <div className="flex -space-x-1.5">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 border-2 border-white"></div>
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">Join now</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-xs font-semibold">4.6/5</span>
                    <span className="text-xs text-gray-600">(50+ reviews)</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-200/10 to-amber-200/10 rounded-xl blur-xl"></div>
                <div className="relative bg-white rounded-xl shadow-lg shadow-orange-200/20 border border-gray-100 overflow-hidden">
                  <img
                    src={HeroBanner}
                    alt="EV Charging Dashboard"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-14 bg-white/80">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium mb-2">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                Powerful Features
              </div>
              <h2 className="text-2xl font-bold mb-3 text-gray-900">
                Everything You Need for EV Charging
              </h2>
              <p className="text-base text-gray-600 max-w-xl mx-auto">
                Easily search, manage, and keep track of EV charging stations with VoltSpot.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: <Search className="h-6 w-6 text-orange-500" />,
                  title: "Station Search",
                  description: "Find EV charging stations using location, filters, and keywords.",
                  features: ["Search by Name/Location", "Filter by Type", "Map View"]
                },
                {
                  icon: <Star className="h-6 w-6 text-orange-500" />,
                  title: "Ratings & Reviews",
                  description: "View what others say and share your own charging experience.",
                  features: ["Add Ratings", "Write Reviews", "Read Feedback"]
                },
                {
                  icon: <Bookmark className="h-6 w-6 text-orange-500" />,
                  title: "Save Stations",
                  description: "Bookmark your favorite stations for quick access later.",
                  features: ["Save Stations", "View Saved List", "Remove if Needed"]
                },
                {
                  icon: <MapIcon className="h-6 w-6 text-orange-500" />,
                  title: "Map Overview",
                  description: "See all nearby charging stations on one map.",
                  features: ["Map of Stations", "Click to View", "Location Pins"]
                },
                {
                  icon: <Shield className="h-6 w-6 text-orange-500" />,
                  title: "Report Issues",
                  description: "Easily report a problem with any station you visit.",
                  features: ["Quick Report", "View Status", "Keep Users Informed"]
                },
                {
                  icon: <User className="h-6 w-6 text-orange-500" />,
                  title: "User Dashboard",
                  description: "Users can manage their own stations and account.",
                  features: ["Add/Edit Stations", "View Stats", "Delete if Needed"]
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-orange-50 to-white rounded-xl p-5 border border-gray-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-200/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-1">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-14 bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-medium mb-2">
                <Play className="h-3.5 w-3.5 mr-1" />
                How It Works
              </div>
              <h2 className="text-2xl font-bold mb-3 text-gray-900">
                Get Started in 3 Simple Steps
              </h2>
              <p className="text-base text-gray-600 max-w-xl mx-auto">
                Join the VoltSpot community and start finding the best charging stations today.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  step: "01",
                  icon: <UserPlus className="h-12 w-12 text-orange-600" />,
                  title: "Sign Up",
                  description: "Create your account and set up your basic profile in a few easy steps.",
                  details: ["Simple Registration", "Email Login", "User Profile"]
                },
                {
                  step: "02",
                  icon: <Search className="h-12 w-12 text-orange-600" />,
                  title: "Search Stations",
                  description: "Look for EV charging stations near you using search and filters.",
                  details: ["Maps Support", "Search & Filter", "Station Details"]
                },
                {
                  step: "03",
                  icon: <MessageCircle className="h-12 w-12 text-orange-600" />,
                  title: "Review & Report",
                  description: "Rate stations, write reviews, and report any problems you notice.",
                  details: ["Add Ratings", "Write Reviews", "Report Issues"]
                }
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                        {step.icon}
                      </div>
                      <span className="text-4xl font-bold text-orange-600 opacity-20">{step.step}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    <ul className="space-y-1">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center text-xs text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ChevronRight className="h-8 w-8 text-orange-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="py-14 bg-white/80">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium mb-2">
                <TrendingUp className="h-3.5 w-3.5 mr-1" />
                Growing Community
              </div>
              <h2 className="text-2xl font-bold mb-3 text-gray-900">
                Trusted by EV Drivers
              </h2>
              <p className="text-base text-gray-600 max-w-xl mx-auto">
                See how VoltSpot is helping the EV community grow with real numbers and success stories.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                {
                  value: "100+",
                  label: "Charging Stations Listed",
                  icon: <MapPin className="h-6 w-6 text-orange-600" />,
                  description: "Across different cities"
                },
                {
                  value: "50+",
                  label: "User Reviews",
                  icon: <Star className="h-6 w-6 text-orange-600" />,
                  description: "Shared by early users"
                },
                {
                  value: "4.7/5",
                  label: "Average Rating",
                  icon: <BarChart2 className="h-6 w-6 text-orange-600" />,
                  description: "From user feedback"
                },
                {
                  value: "10+",
                  label: "Accounts Created",
                  icon: <Users className="h-6 w-6 text-orange-600" />,
                  description: "Tested by real users"
                }].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-base font-semibold text-gray-700 mb-1">{stat.label}</div>
                    <div className="text-xs text-gray-500">{stat.description}</div>
                  </div>
                ))}
            </div>

            {/* Additional Stats */}
            <div className="mt-10 grid md:grid-cols-3 gap-5">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">95%</div>
                <div className="text-base font-semibold text-gray-900 mb-1">Uptime</div>
                <div className="text-sm text-gray-600">Reliable service you can count on</div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-5 text-center">
                <div className="text-2xl font-bold text-amber-600 mb-1">24/7</div>
                <div className="text-base font-semibold text-gray-900 mb-1">Support</div>
                <div className="text-sm text-gray-600">Always here when you need help</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-5 text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-1">100%</div>
                <div className="text-base font-semibold text-gray-900 mb-1">Free</div>
                <div className="text-sm text-gray-600">No hidden fees or subscriptions</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-14 bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium mb-2">
                <Star className="h-3.5 w-3.5 mr-1" />
                Customer Success
              </div>
              <h2 className="text-2xl font-bold mb-3 text-gray-900">
                What Our Community Says
              </h2>
              <p className="text-base text-gray-600 max-w-xl mx-auto">
                Join thousands of satisfied EV drivers who trust VoltSpot for their charging needs.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  quote: "VoltSpot made it so much easier to find charging stations near me. The filters and map view are really helpful.",
                  author: "Ravi Sharma",
                  role: "Tata Nexon EV Owner",
                  location: "Delhi, India",
                  rating: 5,
                  avatar: "RS"
                },
                {
                  quote: "I liked how I could save my favourite stations and see reviews from other users. Very useful for regular travel.",
                  author: "Sneha Patil",
                  role: "MG ZS EV Owner",
                  location: "Pune, India",
                  rating: 5,
                  avatar: "SP"
                },
                {
                  quote: "Clean design and simple to use. Reporting issues and checking station details was quick and smooth.",
                  author: "Arjun Nair",
                  role: "Hyundai Kona Owner",
                  location: "Bangalore, India",
                  rating: 5,
                  avatar: "AN"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-4 leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-xs text-gray-600">{testimonial.role}</div>
                      <div className="text-xs text-gray-500">{testimonial.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-14 bg-gradient-to-br from-orange-500 to-amber-500">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Ready to Join the EV Revolution?
            </h2>
            <p className="text-base text-orange-100 mb-5 max-w-xl mx-auto">
              Start finding the best charging stations today and help build a better future for electric mobility.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-orange-600 bg-white hover:bg-gray-50 transition-all duration-200 shadow-md font-semibold text-[0.98rem]"
              >
                <Rocket className="mr-1.5 h-4 w-4" />
                Get Started Free
              </Link>
              <Link
                to="/home"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-white border border-white/30 hover:bg-white/10 transition-all duration-200 font-semibold text-[0.98rem]"
              >
                <Play className="mr-1.5 h-4 w-4" />
                Explore Demo
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};


export default LandingPage;

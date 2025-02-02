// import React from 'react';
// import fypImage from '../pictures/fyp.jpg'; // Adjust the path to your image
// import '../Components/MainPage.css'; // Ensure the CSS file is correctly referenced
// import Card from './Card';
// import f1Image from '../pictures/f1.jpeg';
// import f2Image from '../pictures/f2.png';
// import f3Image from '../pictures/f3.jpeg';
// const MainPage = () => {
//     return (
//         <div className="main-page">
//             <img src={fypImage} alt="Background" className="background-image" />
//             <h1 className='text-lg font-bold'>Welcome to Social Manager Pro</h1>
//             <p>Manage your social media accounts with ease.</p>
//             <div className="card-container">
//                 <Card
//                     title="Schedule Posts Ahead of Time"
//                     description="Plan and schedule your social media posts in advance. Ensure your content reaches your audience at the optimal times, even when you're not online."
//                     image={f1Image} // Update with your image path
//                 />
//                 <Card
//                     title="Track Your Engagement"
//                     description="Get detailed analytics on your social media performance. Monitor likes, shares, comments, and more to understand what works best for your audience."
//                     image={f2Image} // Update with your image path
//                 />
//                 <Card
//                     title="Manage Multiple Accounts"
//                     description="Easily manage and switch between multiple social media accounts from one platform. Streamline your workflow and save time."
//                     image={f3Image} // Update with your image path
//                 />
//                 <Card
//                     title="Manage Multiple Accounts"
//                     description="Easily manage and switch between multiple social media accounts from one platform. Streamline your workflow and save time."
//                     image={f3Image} // Update with your image path
//                 />
//                 <Card
//                     title="Manage Multiple Accounts"
//                     description="Easily manage and switch between multiple social media accounts from one platform. Streamline your workflow and save time."
//                     image={f3Image} // Update with your image path
//                 />
//                 <Card
//                     title="Manage Multiple Accounts"
//                     description="Easily manage and switch between multiple social media accounts from one platform. Streamline your workflow and save time."
//                     image={f3Image} // Update with your image path
//                 />
//                 <Card
//                     title="Manage Multiple Accounts"
//                     description="Easily manage and switch between multiple social media accounts from one platform. Streamline your workflow and save time."
//                     image={f3Image} // Update with your image path
//                 />
//             </div>
//         </div>
//     );
// };

// export default MainPage;
import { useState, useEffect} from "react"
import { Link } from "react-router-dom"
import { useSpring, animated } from "@react-spring/web"
import { ArrowRight, CheckCircle } from "lucide-react"
import fypImage from "../pictures/fyp.jpg"
import f1Image from "../pictures/f1.jpeg"
import f2Image from "../pictures/f2.png"
import f3Image from "../pictures/f3.jpeg"
import "../Components/MainPage.css"

import Contact from "./Contact"


const CustomButton = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 ${className}`}
  >
    {children}
  </button>
)
const FeatureCard = ({ title, description, image, delay }) => {
  const props = useSpring({
    from: { opacity: 0, transform: "translateY(80px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay,
  })

  return (
    <animated.div style={props}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
        <div className="w-full h-48 overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </animated.div>
  )
}





const MainPage = ({ homeRef, featuresRef, aboutRef, contactRef }) => {
  const [isLoading, setIsLoading] = useState(true)
  
console.log(isLoading);
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 300,
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  // const scrollTo = (ref) => {
  //   ref.current.scrollIntoView({ behavior: "smooth" })
  // }

  const benefitSpring = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 0,
  })



  return (
    
    <animated.div style={fadeIn} className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      

      {/* Hero Section */}
      <section ref={homeRef} className="relative h-screen flex items-center justify-center text-center px-4 pt-16">
        <img
          src={fypImage || "/placeholder.svg"}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-6 animate-fade-in-down">
            Welcome to <span className="text-blue-600">Social Manager Pro</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto animate-fade-in-up">
            Streamline your social media management with our all-in-one platform. Schedule, track, and grow your online
            presence effortlessly.
          </p>
          <CustomButton className="animate-bounce">
            <Link to="/auth" className="flex items-center">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </CustomButton>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 animate-fade-in-down">
            Powerful Features for Social Media Success
          </h2>
          <div className=" text-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 cursor-pointer">
            <FeatureCard 
              title="Schedule Posts Ahead of Time"
              description="Plan and schedule your social media posts in advance. Ensure your content reaches your audience at the optimal times, even when you're not online."
              image={f1Image}
              delay={200}
            />
            <FeatureCard
              title="Track Your Analytic"
              description="Get detailed analytics on your social media performance. Monitor posts, Scheduled Posts, Total posts and more to understand what works best for your audience."
              image={f2Image}
              delay={400}
            />
            <FeatureCard
              title="AI Generated Captions"
              description="AI-powered captions instantly for your social media posts. Effortlessly enhance your content with engaging text , boosting your social media presence in no time."
              image={f3Image}
              delay={600}
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={aboutRef} className="bg-gray-100 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 animate-fade-in-down">
            Why Choose Social Manager Pro?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "Intuitive and user-friendly interface",
              "Real-time analytics and reporting",
              "AI-powered content suggestions",
              "Seamless integration with major social platforms",
              "Collaborative team features",
              "24/7 customer support",
            ].map((benefit, index) => (
              <animated.div key={index} style={benefitSpring} className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                <span className="text-lg text-gray-700">{benefit}</span>
              </animated.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 animate-fade-in-down">
            Ready to Revolutionize Your Social Media Strategy?
          </h2>
          <p className="text-xl text-gray-600 mb-10 animate-fade-in-up">
            Join thousands of satisfied users and take your social media game to the next level.
          </p>
          <CustomButton className="animate-pulse">
            <Link to="/signup" className="flex items-center">
            Empower Your Presence
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </CustomButton>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef}>
        <Contact />
      </section>
      
    </animated.div>
  
  )
}

export default MainPage



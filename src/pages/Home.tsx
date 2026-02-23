import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Button } from '../components/Button'

export const Home: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Welcome to Swasthya AI
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Get instant health guidance powered by AI. Your personal healthcare assistant, available 24/7.
            </p>
            <Button onClick={() => alert('Get Started Clicked!')}>Get Started</Button>
          </section>

          {/* Features Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-6 border rounded-lg border-gray-300 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get instant medical guidance anytime, anywhere from our AI-powered assistant.
              </p>
            </div>
            <div className="p-6 border rounded-lg border-gray-300 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Expert Knowledge</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Powered by latest medical research and certified healthcare professionals.
              </p>
            </div>
            <div className="p-6 border rounded-lg border-gray-300 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Privacy First</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your health data is encrypted and secure. Your privacy is our priority.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-blue-600 text-white rounded-lg p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Start Your Health Journey Today</h3>
            <p className="mb-6 text-lg">Join thousands of users who trust Swasthya AI for their health needs.</p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100">Sign Up Now</Button>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

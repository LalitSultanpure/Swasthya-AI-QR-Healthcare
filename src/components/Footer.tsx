import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">About</h3>
            <p className="text-gray-400">Swasthya AI - Your trusted healthcare assistant</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Links</h3>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">Services</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <p className="text-gray-400">Email: info@swasthyaai.com</p>
            <p className="text-gray-400">Phone: +91 XXXXX XXXXX</p>
          </div>
        </div>
        <hr className="my-8 border-gray-700" />
        <p className="text-center text-gray-400">© 2024 Swasthya AI. All rights reserved.</p>
      </div>
    </footer>
  )
}

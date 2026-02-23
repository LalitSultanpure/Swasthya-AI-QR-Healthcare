import React from 'react'

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold">Swasthya AI</h1>
        <p className="text-blue-100">Healthcare Assistant Platform</p>
      </div>
    </header>
  )
}

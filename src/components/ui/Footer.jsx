import React from 'react'
import logo from '../../assets/leafScan.png';

const Footer = () => {
  return (
    <div>
     <footer className="bg-primary/5 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-primary to-primary-glow p-2 rounded-lg shadow-glow">
                <img src={logo} className="h-10 w-10" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                LeafScan
              </span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-muted-foreground">
                © 2025 LeafScan. Empowering farmers and gardners with AI-powered plant care.
              </p>
            </div>
          </div>
        </div>
     </footer>
    </div>
  )
}

export default Footer
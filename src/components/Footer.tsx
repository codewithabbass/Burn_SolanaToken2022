"use client";
import React from 'react';
import { Flame, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 px-6 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Flame size={20} className="text-primary mr-2" />
            <span className="font-semibold text-foreground">
              Token<span className="text-primary">Burn</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border text-center text-sm text-foreground/50">
          <p>© {new Date().getFullYear()} TokenBurn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

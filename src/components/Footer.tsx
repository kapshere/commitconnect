
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 py-8 border-t">
      <div className="connect-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Building immutable commitments and connections for individuals and businesses.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Features</h4>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-connect-500 dark:hover:text-connect-400 text-sm">Commitments</Link></li>
              <li><Link to="/connections" className="text-gray-600 dark:text-gray-400 hover:text-connect-500 dark:hover:text-connect-400 text-sm">Connections</Link></li>
              <li><Link to="/wallet" className="text-gray-600 dark:text-gray-400 hover:text-connect-500 dark:hover:text-connect-400 text-sm">Wallet</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-connect-500 dark:hover:text-connect-400 text-sm">About Us</Link></li>
              <li><Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-connect-500 dark:hover:text-connect-400 text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-connect-500 dark:hover:text-connect-400 text-sm">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2">
              <li><a href="mailto:support@connect.app" className="text-gray-600 dark:text-gray-400 hover:text-connect-500 dark:hover:text-connect-400 text-sm">support@connect.app</a></li>
              <li><a href="tel:+1-555-123-4567" className="text-gray-600 dark:text-gray-400 hover:text-connect-500 dark:hover:text-connect-400 text-sm">+1-555-123-4567</a></li>
            </ul>
            
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-connect-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.531A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-connect-500">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

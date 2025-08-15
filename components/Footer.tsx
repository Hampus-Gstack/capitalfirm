export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <span className="text-2xl font-bold gradient-text">Cursus Capital</span>
            <p className="text-sm leading-6 text-gray-300">
              Revolutionizing fundraising with technology-driven approaches and proven results.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Services</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="#process" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Capital Raising
                    </a>
                  </li>
                  <li>
                    <a href="#verticals" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Investor Relations
                    </a>
                  </li>
                  <li>
                    <a href="#team" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Fund Management
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Strategic Advisory
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="#about" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#team" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Our Team
                    </a>
                  </li>
                  <li>
                    <a href="#testimonials" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Success Stories
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Resources</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="#resources" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Investment Guides
                    </a>
                  </li>
                  <li>
                    <a href="#resources" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Market Insights
                    </a>
                  </li>
                  <li>
                    <a href="#resources" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Case Studies
                    </a>
                  </li>
                  <li>
                    <a href="#resources" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-800 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; 2024 Cursus Capital. All rights reserved. Designed with ❤️ for capital raising excellence.
          </p>
        </div>
      </div>
    </footer>
  )
} 
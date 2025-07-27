export default function About() {
  return (
    <div id="about" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Capital Firm</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            With over 15 years of experience in the financial industry, we've helped thousands of clients 
            achieve their financial goals. Our team of certified professionals is dedicated to providing 
            personalized solutions that align with your unique needs and aspirations.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We believe in transparency, integrity, and putting our clients first. Every recommendation we make 
            is based on thorough analysis and your best interests. Our success is measured by your success.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div className="flex flex-col items-start">
            <div className="rounded-lg bg-primary-600/10 p-2 ring-1 ring-primary-600/20">
              <div className="h-6 w-6 text-primary-600" aria-hidden="true">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
            <h3 className="mt-4 text-lg font-semibold leading-6 text-gray-900">15+ Years Experience</h3>
            <p className="mt-2 text-base leading-7 text-gray-600">
              Decades of expertise in financial markets and wealth management strategies.
            </p>
          </div>
          <div className="flex flex-col items-start">
            <div className="rounded-lg bg-primary-600/10 p-2 ring-1 ring-primary-600/20">
              <div className="h-6 w-6 text-primary-600" aria-hidden="true">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
            <h3 className="mt-4 text-lg font-semibold leading-6 text-gray-900">Certified Professionals</h3>
            <p className="mt-2 text-base leading-7 text-gray-600">
              Our team holds industry certifications and continuous education requirements.
            </p>
          </div>
          <div className="flex flex-col items-start">
            <div className="rounded-lg bg-primary-600/10 p-2 ring-1 ring-primary-600/20">
              <div className="h-6 w-6 text-primary-600" aria-hidden="true">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
            <h3 className="mt-4 text-lg font-semibold leading-6 text-gray-900">Client-First Approach</h3>
            <p className="mt-2 text-base leading-7 text-gray-600">
              Every decision is made with your best interests and financial goals in mind.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 
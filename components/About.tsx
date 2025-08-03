

const processSteps = [
  {
    id: '01',
    title: 'Solving For Investor Segment',
    description: 'Identify and segment investor types based on key variables like stage, valuation, and industry, compiling a curated list of mandate-specific investors using proprietary technology and personal networks. Further, granular firm and individual identification ensures precision targeting for effective outreach efforts and investor commitments.',
  },
  {
    id: '02',
    title: 'Solving For Presentation',
    description: 'Create compelling investment materials and pitch decks that resonate with target investors, ensuring your story is presented in the most impactful way possible.',
  },
  {
    id: '03',
    title: 'Solving Introductions',
    description: 'Leverage our extensive network and relationships to make strategic introductions to the right investors at the right time.',
  },
  {
    id: '04',
    title: 'Solving For Conversions',
    description: 'Guide investors through the due diligence process with compelling data and strategic positioning to maximize conversion rates.',
  },
  {
    id: '05',
    title: 'Solving For Deal Closure',
    description: 'Navigate the final stages of deal negotiation and closing, ensuring successful capital raising outcomes.',
  },
]

export default function About() {
  return (
    <section id="verticals" className="py-24 sm:py-32 bg-gradient-to-br from-gray-900 to-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 gradient-text">Process / 02</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Dive Deeper Into Our Process
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Our systematic approach ensures every step of your fundraising journey is optimized for success.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid gap-8 lg:grid-cols-2">
            {processSteps.map((step, index) => (
              <div key={step.id} className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-accent-600 to-accent-500">
                      <span className="text-sm font-bold text-white">{step.id}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="absolute left-5 top-10 w-0.5 h-16 bg-gradient-to-b from-accent-500 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Investor Verticals */}
        <div className="mt-24">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 gradient-text">VERTICALS / 03</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Investor Verticals We Work With
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Institutional Investors</h3>
              <p className="text-gray-300">
                These are sophisticated entities such as banks, insurance firms, and pension funds, characterized by their substantial capital base and rigorous investment protocols. Institutional investors prioritize stable, long-term returns and typically engage in diversified investment portfolios.
              </p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Accredited Retail</h3>
              <p className="text-gray-300">
                High-net-worth individuals and accredited investors who meet specific financial criteria and can participate in private investment opportunities.
              </p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">High Net Worth Individuals (HNWI)/Angels</h3>
              <p className="text-gray-300">
                Individual investors with significant wealth who provide capital for business start-ups, usually in exchange for convertible debt or ownership equity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 
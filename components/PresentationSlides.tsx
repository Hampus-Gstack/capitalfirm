import React from 'react';

export interface Slide {
  id: number;
  title: string;
  content: React.ReactNode;
}

export const presentationSlides: Slide[] = [
  {
    id: 1,
    title: "Capital Raising Protocol",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6">
            <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-4xl">🦁</span>
            </div>
          </div>
          <h1 className="text-6xl font-bold text-white mb-4">Capital Raising Protocol</h1>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Fee Structure",
    content: (
      <div className="flex h-full">
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-32 h-32">
            <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-6xl">🦁</span>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col justify-center space-y-8 p-8">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-2">Engagement Fee</h3>
            <p className="text-white/90 mb-4">One time fee to cover for hard costs</p>
            <div className="bg-yellow-400 p-3 rounded">
              <p className="text-black font-bold text-xl">Est. $15,000 - $50,000</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-2">Success Fee</h3>
            <p className="text-white/90 mb-4">Commission on capital raised</p>
            <div className="bg-yellow-400 p-3 rounded">
              <p className="text-black font-bold text-xl">Est. 4% - 5%</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Social Proof - Indie Power Systems",
    content: (
      <div className="flex h-full">
        <div className="w-1/2 p-8">
          <div className="bg-white/10 p-4 rounded-lg mb-4">
            <span className="text-white font-bold">SOCIAL PROOF</span>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-bold">🌱</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Indie Power Systems</h3>
              <p className="text-white/80">Creating reliable clean energy solutions for EV with The Indiecharger™</p>
            </div>
          </div>
          <div className="flex space-x-2 mb-4">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Cleantech</span>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">Startup</span>
          </div>
          <div className="space-y-2 text-white/90">
            <p><span className="font-bold">$1,465,665</span> - 98% of target raised</p>
            <p><span className="font-bold">110 Investors</span></p>
            <p><span className="font-bold">Campaign Closed</span> - February 20, 2023</p>
            <p className="flex items-center"><span className="text-green-400 mr-2">✓</span> Successfully funded!</p>
            <p><span className="font-bold">$500 CAD</span> minimum investment</p>
          </div>
        </div>
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-white mb-4">Invest Into the Next Generation of The EV Charging Experience Inside the $77 Billion Industry</h2>
          <p className="text-xl text-white/80 mb-8">Introducing The Indie Power Charger</p>
          <div className="flex space-x-4">
            <button className="bg-white text-black px-6 py-3 rounded-lg font-bold">US INVESTORS</button>
            <button className="bg-white text-black px-6 py-3 rounded-lg font-bold">CANADIAN INVESTORS</button>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Social Proof - Carolina Outpatient Detox",
    content: (
      <div className="flex h-full">
        <div className="w-1/2 p-8">
          <div className="bg-white/10 p-4 rounded-lg mb-4">
            <span className="text-white font-bold">SOCIAL PROOF</span>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-bold">🏥</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">CAROLINA</h3>
              <p className="text-white/80">OUTPATIENT DETOX</p>
            </div>
          </div>
          <p className="text-white/90 mb-4">Located just out Charlotte, NC, our Charlotte outpatient detox center provides compassionate and comprehensive drug and alcohol detox and treatment programs.</p>
          <p className="text-white/90">They specialize in business operations, consolidation, financial optimization, and acquisitions.</p>
        </div>
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-bold text-2xl">👨</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-yellow-400">Henry DeRolf</h3>
              <p className="text-white/80">Principal at Finer Days Healthcare</p>
            </div>
          </div>
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-xl ${i < 4 ? 'text-yellow-400' : 'text-white/30'}`}>★</span>
            ))}
          </div>
          <div className="text-white/90 space-y-4">
            <p>"With his expertise, he not only helped me establish but also rapidly advance a sophisticated marketing automation system for effectively sourcing potential business deals and partners."</p>
            <p>"His deep understanding of marketing automation makes him an invaluable asset to create Dealflow. He has really helped me rapidly. And that pretty quickly"</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Term Sheet & Funding Highlights",
    content: (
      <div className="flex h-full">
        <div className="w-1/2 p-8">
          <div className="bg-white/10 p-4 rounded-lg mb-4">
            <span className="text-white font-bold">SOCIAL PROOF</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-6">Term Sheet</h2>
          <div className="space-y-4 text-white/90">
            <div>
              <p className="font-bold">Date: August 24, 2023</p>
            </div>
            <div>
              <p className="font-bold">Company: [REDACTED]</p>
            </div>
            <div>
              <p className="font-bold">Investor: [REDACTED] and/or any of its Affiliates</p>
            </div>
            <div>
              <p className="font-bold">Securities:</p>
              <p>Registered and freely tradeable common stock via an effective registration statement.</p>
            </div>
            <div>
              <p className="font-bold">Total Commitment:</p>
              <p>Up to US $25,000,000 of common stock</p>
            </div>
            <div>
              <p className="font-bold">Structure:</p>
              <p>Private Placements drawn down at the Company's option.</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-bold text-white mb-6">Funding Highlights</h2>
          <div className="space-y-4 text-white/90">
            <div>
              <p className="font-bold">Total Investment:</p>
              <p>Pyramid: $15,000,000</p>
              <p>Method: $31,000,000</p>
              <p className="font-bold">Total: $50,000,000</p>
            </div>
            <div>
              <p className="font-bold">Technology:</p>
              <p>NCR Primary Reformer: Nickle Electric Steam Methane Reformer</p>
            </div>
            <div>
              <p className="font-bold">Location:</p>
              <p>San Jacinto River & Rail 18511 Beaumont Highway Houston, TX 77049</p>
            </div>
            <div>
              <p className="font-bold">Delivery:</p>
              <p>No flue gas production</p>
              <p>Steam Turbine: Powered by steam from reforming heat, used to generate electricity for entire plant.</p>
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <div className="bg-yellow-500 text-black px-4 py-2 rounded font-bold">$25,000,000 Term Sheet</div>
            <div className="bg-yellow-500 text-black px-4 py-2 rounded font-bold">$50,000,000 Term Sheet</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "Investor Fit Criteria",
    content: (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="bg-white/10 p-4 rounded-lg mb-8">
          <span className="text-white font-bold">INVESTOR FIT CRITERIA</span>
        </div>
        <div className="w-32 h-32 mb-8">
          <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
            <span className="text-6xl">🦁</span>
          </div>
        </div>
        <div className="flex justify-center space-x-8 mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-2">
              <span className="text-white text-2xl">🏢</span>
            </div>
            <p className="text-white text-sm">Criteria 1<br/>Mandate Fit with Company</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-2">
              <span className="text-white text-2xl">💰</span>
            </div>
            <p className="text-white text-sm">Criteria 2<br/>Cheque Size Fit with Company</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-2">
              <span className="text-white text-2xl">💡</span>
            </div>
            <p className="text-white text-sm">Criteria 3<br/>Strategic fit with Company</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-2">
              <span className="text-white text-2xl">📈</span>
            </div>
            <p className="text-white text-sm">Criteria 4<br/>Long Term goal of Investors</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-2">
              <span className="text-white text-2xl">👥</span>
            </div>
            <p className="text-white text-sm">Criteria 5<br/>Cultural Fit with Company</p>
          </div>
        </div>
        <p className="text-white text-xl text-center">The process opens the door - these 5 criteria close the deal.</p>
      </div>
    )
  },
  {
    id: 7,
    title: "Social Proof - Victor Dahl",
    content: (
      <div className="flex h-full">
        <div className="w-1/2 p-8">
          <div className="bg-white/10 p-4 rounded-lg mb-4">
            <span className="text-white font-bold">SOCIAL PROOF</span>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-bold text-2xl">👨</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-yellow-400">Victor Dahl</h3>
              <p className="text-white/80">Vice President at EQT Group</p>
              <p className="text-white/60">September 25, 2023, Victor reported directly to Jonas</p>
            </div>
          </div>
          <div className="text-white/90 space-y-4">
            <p>"I highly recommend Jonas. I reported directly to Jonas for 9 months as part of my position as Non-Executive Financial Director and Board member of Pathmaker, an investment company. Jonas is the Founding Director and CEO. Jonas is extremely professional, dedicated, and ambitious with a deep understanding of sales and marketing."</p>
            <p>"He encompasses the skills of a leader with natural grit and takes on the mantle as a leader with true compassion for his colleagues. Jonas faced any obstacle or challenge with great enthusiasm and creativity, always finding a new approach to achieve our objectives. Jonas's persistence, high energy, and innovative mindset enabled him to establish Pathmaker, attract talented professionals to the board, and garner interest from numerous investors and potential sellers."</p>
          </div>
        </div>
        <div className="w-1/2 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl font-bold text-yellow-400 mb-4">EQT</div>
            <div className="text-4xl font-bold text-yellow-400">70</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 8,
    title: "Next Steps",
    content: (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="bg-white/10 p-4 rounded-lg mb-8">
          <span className="text-white font-bold">NEXT STEPS</span>
        </div>
        <div className="w-32 h-32 mb-8">
          <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
            <span className="text-6xl">🦁</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div className="text-center">
            <div className="bg-gray-700 p-4 rounded-lg mb-2">
              <h3 className="text-white font-bold">Discovery Call w/ Advisors</h3>
            </div>
            <div className="bg-white p-3 rounded-lg mb-2">
              <p className="text-black font-bold">Deep Dive</p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-lg">
              <ul className="text-black text-sm space-y-1">
                <li>• Learn more about your startup</li>
                <li>• Personalised Roadmap layout</li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-gray-700 p-4 rounded-lg mb-2">
              <h3 className="text-white font-bold">Internal Discussion & Proposal</h3>
            </div>
            <div className="bg-white p-3 rounded-lg mb-2">
              <p className="text-black font-bold">Synthesis</p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-lg">
              <ul className="text-black text-sm space-y-1">
                <li>• Take reports back to internal committee</li>
                <li>• Scope of Work gets shared</li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-gray-700 p-4 rounded-lg mb-2">
              <h3 className="text-white font-bold">Second Call</h3>
            </div>
            <div className="bg-white p-3 rounded-lg mb-2">
              <p className="text-black font-bold">Finalising</p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-lg">
              <ul className="text-black text-sm space-y-1">
                <li>• Handle any queries</li>
                <li>• Align timelines</li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-gray-700 p-4 rounded-lg mb-2">
              <h3 className="text-white font-bold">Onboarding</h3>
            </div>
            <div className="bg-white p-3 rounded-lg mb-2">
              <p className="text-black font-bold">Narrative & Pre-Marketing</p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-lg">
              <ul className="text-black text-sm space-y-1">
                <li>• Intake form, data room access, schedule kick-off</li>
                <li>• Team assigned, initial collateral build out</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 9,
    title: "Example - New York Based Oil & Gas Fund",
    content: (
      <div className="flex h-full">
        <div className="w-1/2 p-8">
          <div className="bg-white/10 p-4 rounded-lg mb-4">
            <span className="text-white font-bold">EXAMPLE</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">New York Based Oil & Gas Fund ($13M Raise)</h2>
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-2xl">👨</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Dr. Vincent deFilippo</h3>
                <p className="text-white/80">30-year career in business and finance, specializing in capital investment, fundraising, and real estate investment strategies.</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-2xl">👨</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Mr. Wayne Andrews</h3>
                <p className="text-white/80">Expertise in energy and oil & gas analysis, CEO of RCA Financial Partners.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 p-8">
          <div className="bg-black p-6 rounded-lg mb-6">
            <h3 className="text-2xl font-bold text-white mb-4">Capital Structuring</h3>
            <ul className="text-white/90 space-y-2">
              <li>• Transaction Structuring & Capital Positioning</li>
              <li>• Institutional-grade Data Room & Document Assembly</li>
              <li>• Investment Narrative & Valuation Modelling</li>
              <li>• LP, Fund, and Strategic Investor Targeting</li>
              <li>• Pre-marketing & Investor Activation Collateral</li>
              <li>• Term Sheet Structuring & Capital Stack Optimization</li>
              <li>• Investor Negotiation Support & Transaction Readiness</li>
            </ul>
          </div>
          <div className="text-white/90">
            <p className="font-bold">NORTH AMERICAN ENERGY OPPORTUNITIES CORP.</p>
            <p>40 Wall Street, 17th Floor</p>
            <p>New York, New York 10005</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 10,
    title: "Social Proof - Maurice Boucher",
    content: (
      <div className="flex h-full">
        <div className="w-1/2 p-8">
          <div className="bg-white/10 p-4 rounded-lg mb-4">
            <span className="text-white font-bold">SOCIAL PROOF</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Maurice Boucher, CEO of Renaissance Bioscience USD 10M Round - Took over from banking syndicate, 120 days</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">8,304</div>
              <div className="text-white/60 text-sm">Total Activity</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">5.2%</div>
              <div className="text-white/60 text-sm">Conversion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">433</div>
              <div className="text-white/60 text-sm">Engagements</div>
            </div>
          </div>
          <div className="space-y-2 text-white/90">
            <p className="font-bold">Step Analytics Activity:</p>
            <p>Step 1: 2,450 interactions</p>
            <p>Step 2: 1,890 responses</p>
            <p>Step 3: 433 meetings</p>
            <p>Step 4: 225 proposals</p>
          </div>
        </div>
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <div className="bg-white/10 p-4 rounded-lg mb-4">
            <p className="text-white/90">Email from Ankit to Alex:</p>
            <p className="text-white font-bold">Subject: Re: Regarding Renaissance BioScience Corp. Financing Opportunity</p>
            <p className="text-white/90">"Hi Alex, I am following up on your email regarding Renaissance BioScience financing. I'd like to chat with the founder to learn more about the company and the funding round. Thanks, Ankit"</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-4xl">E8</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 11,
    title: "Background & Track Record",
    content: (
      <div className="flex h-full">
        <div className="w-1/2 p-8">
          <div className="bg-white/10 p-4 rounded-lg mb-4">
            <span className="text-white font-bold">BACKGROUND & TRACK RECORD</span>
          </div>
          <div className="w-32 h-32 mb-8">
            <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-6xl">🦁</span>
            </div>
          </div>
          <div className="space-y-6 text-white/90">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">$1.8B</h2>
              <p className="text-white/80">Size of our Teams Dealbook</p>
            </div>
            <p>ROIALS CAPITAL is a global private capital advisory firm executing mandates across North America, Europe, and MENA. Our current execution footprint exceeds $100M, with total mandates surpassing $1.8B across energy, real estate, fund capital, and transaction-led mandates. We deliver precision, speed, and full LP alignment for institutional raises.</p>
          </div>
        </div>
        <div className="w-1/2 p-8">
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2">
                <span className="text-black font-bold">SAAB</span>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2">
                <span className="text-black font-bold">VOLVO</span>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2">
                <span className="text-black font-bold">HUSQVARNA</span>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2">
                <span className="text-black font-bold">SWEDISH ARMED FORCES</span>
              </div>
            </div>
          </div>
          <p className="text-white/90 mb-6">Our team has executed GTM strategy, investor targeting, and marketing automation across capital-intensive sectors including energy, real estate, SaaS, and transaction-driven verticals. We've developed investor-message-fit systems that reduce friction and accelerate alignment. Our background includes institutional M&A execution, and engagements with Volvo, Ericsson, Saab, Husqvarna, Epiroc, ABB, and the Swedish Armed Forces.</p>
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-black text-2xl">🌍</span>
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">$600M</h3>
            <p className="text-white/90">We specialize in LP sourcing, capital structuring, and investor alignment - before fund managers step in. Our proprietary activation stack drives faster closes and stronger conversions than banker-led processes. From narrative build to term sheet structuring, we execute the full capital stack with institutional-grade control.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 12,
    title: "What We Do",
    content: (
      <div className="flex h-full">
        <div className="w-1/2 p-8">
          <div className="bg-white/10 p-4 rounded-lg mb-4">
            <span className="text-white font-bold">WHAT WE DO</span>
          </div>
          <div className="w-32 h-32 mb-8">
            <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-6xl">🦁</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">ROIALS removes key barriers to speed up capital raising and secure closings</h2>
          <div className="h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mb-8"></div>
          <div className="space-y-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">Investor Message Fit</h3>
              <ul className="text-white/90 space-y-1">
                <li>• Narrative & Pitch Deck Mastery</li>
                <li>• Data Room Precision</li>
                <li>• Valuation & Fundraising Strategy</li>
                <li>• Targeted Investor Mapping</li>
                <li>• Video Asset Production</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">Investor Introductions</h3>
              <ul className="text-white/90 space-y-1">
                <li>• Warm Investor Access (Exclusive Investor Universe)</li>
                <li>• Cold Outreach at Scale (Expanded Targeting)</li>
                <li>• Roadshow Execution (Large-Scale Raises)</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">Closing</h3>
              <ul className="text-white/90 space-y-1">
                <li>• Due Diligence Mastery</li>
                <li>• Negotiation & Closing Acceleration</li>
                <li>• Regulatory Compliance Precision (High-Stakes Verticals)</li>
              </ul>
            </div>
          </div>
          <p className="text-white text-center mt-8">The ROIALS Guarantee: We stay engaged until capital is secured and deals are closed</p>
        </div>
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <div className="space-y-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">Investor List</h3>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black text-sm">📋</span>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">Investor Meetings</h3>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black text-sm">👥</span>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">Term Sheets</h3>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black text-sm">📄</span>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">Distribution</h3>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black text-sm">📊</span>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">Follow-up & Data Room</h3>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black text-sm">📁</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  // I'll continue with the remaining slides in the next part
]; 
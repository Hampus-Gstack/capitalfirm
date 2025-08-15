import { 
  ChartBarIcon, 
  GlobeAltIcon, 
  UserGroupIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

const benefits = [
  {
    name: 'Marketing & Growth Background',
    description: 'Extensive background in marketing paired with a technology-driven approach to allow for effective fundraising.',
    icon: ChartBarIcon,
  },
  {
    name: 'Venture Capital Expertise',
    description: 'Composed of former investment bankers and venture capitalists, our team has a profound understanding of the global investment landscape.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Broad Connections & Unique Business Model',
    description: 'Global reach and operating on a success-fee basis without charging a retainer, ensuring alignment with our clients\' goals.',
    icon: UserGroupIcon,
  },
  {
    name: 'Proven Track Record',
    description: 'Over $200M+ capital raised in the last 2 years with a systematic approach to investor introductions and deal closures.',
    icon: RocketLaunchIcon,
  },
  {
    name: 'Technology-Driven Approach',
    description: 'Proprietary technology and personal networks for precision targeting and effective outreach efforts.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Success-Fee Based',
    description: 'No retainer fees - we only succeed when you succeed, ensuring perfect alignment with your fundraising goals.',
    icon: CurrencyDollarIcon,
  },
]

export default function Services() {
  return (
    <section id="process" className="py-24 sm:py-32 bg-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 gradient-text">Benefits / 01</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Why Cursus Capital
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            From precision investor segmentation to impactful outreach, we tailor strategies, create compelling assets, 
            and provide comprehensive support - ensuring efficient, cost-effective, and successful fundraising support 
            from the onset and throughout.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <benefit.icon className="h-5 w-5 flex-none gradient-text" aria-hidden="true" />
                  {benefit.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">{benefit.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="bg-gradient-to-r from-accent-600 to-accent-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-accent-700 hover:to-accent-600 transition-all duration-200 inline-flex items-center gap-2"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  )
} 
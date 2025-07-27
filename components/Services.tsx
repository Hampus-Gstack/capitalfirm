import { 
  BanknotesIcon, 
  ChartBarIcon, 
  BuildingOfficeIcon, 
  ShieldCheckIcon,
  UserGroupIcon,
  CogIcon
} from '@heroicons/react/24/outline'

const services = [
  {
    name: 'Investment Management',
    description: 'Professional portfolio management tailored to your financial goals and risk tolerance.',
    icon: ChartBarIcon,
  },
  {
    name: 'Wealth Planning',
    description: 'Comprehensive financial planning to secure your future and achieve your dreams.',
    icon: BanknotesIcon,
  },
  {
    name: 'Business Finance',
    description: 'Strategic financial solutions to help your business grow and thrive.',
    icon: BuildingOfficeIcon,
  },
  {
    name: 'Risk Management',
    description: 'Protect your assets with our expert risk assessment and mitigation strategies.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Retirement Planning',
    description: 'Secure your golden years with our comprehensive retirement planning services.',
    icon: UserGroupIcon,
  },
  {
    name: 'Tax Optimization',
    description: 'Minimize your tax burden with our strategic tax planning and optimization services.',
    icon: CogIcon,
  },
]

export default function Services() {
  return (
    <div id="services" className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Our Services</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to succeed financially
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We offer a comprehensive suite of financial services designed to help you achieve your goals, 
            whether you're an individual investor or a growing business.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <service.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                  {service.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{service.description}</p>
                  <p className="mt-6">
                    <a href="#contact" className="text-sm font-semibold leading-6 text-primary-600">
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
} 
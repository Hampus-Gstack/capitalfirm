export default function CapitalRaisingPresentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">
            Capital Raising Firm Presentation
          </h1>
          <p className="text-gray-400 mt-1">Embedded presentation</p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden">
          <iframe
            src="https://app.pageon.ai/s/share/85544/capital-raising-firm-presentation"
            className="w-full h-[80vh]"
            frameBorder={0}
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}



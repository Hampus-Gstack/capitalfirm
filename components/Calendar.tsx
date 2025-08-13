export default function Calendar() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Schedule a Meeting
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Book a time that works for you. Let's discuss your capital raising needs and create a customized strategy.
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <iframe 
              src="https://zcal.co/i/5xJgTKir?showBackground=1&embed=1&embedType=iframe" 
              loading="lazy" 
              style={{
                border: 'none', 
                minWidth: '320px', 
                minHeight: '544px', 
                height: '731px', 
                width: '1096px'
              }} 
              id="zcal-invite" 
              scrolling="no"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

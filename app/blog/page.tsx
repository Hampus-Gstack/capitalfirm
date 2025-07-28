import Link from 'next/link'
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'
import { generateBlogPosts } from '@/lib/blogGenerator'

// Generate blog posts automatically
const blogPosts = generateBlogPosts(12)

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-900/20 to-primary-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Link 
              href="/" 
              className="inline-flex items-center text-accent-400 hover:text-accent-300 transition-colors mb-8"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Capital Raising
              <span className="gradient-text block">Insights</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Expert insights, strategies, and proven tactics for successful capital raising. 
              Stay ahead of the curve with our latest analysis and industry trends.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {blogPosts.filter(post => post.featured).map(post => (
          <div key={post.id} className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 mb-16 border border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className="text-accent-400 text-sm">Featured</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {post.title}
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4" />
                {post.readTime}
              </div>
            </div>
            <Link 
              href={`/blog/${post.slug}`}
              className="inline-flex items-center bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              Read Full Article
            </Link>
          </div>
        ))}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.filter(post => !post.featured).map(post => (
            <article key={post.id} className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-accent-500 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-accent-500/20 text-accent-400 px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-300 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-accent-400 hover:text-accent-300 font-medium text-sm transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-accent-900/20 to-primary-900/20 rounded-2xl p-8 border border-accent-500/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated with Capital Raising Insights
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get the latest capital raising strategies, investor insights, and industry trends delivered to your inbox. 
              Join thousands of entrepreneurs who are raising capital successfully.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500"
              />
              <button className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
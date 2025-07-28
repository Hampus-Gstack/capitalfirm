import Link from 'next/link'
import { ArrowLeftIcon, CalendarIcon, ClockIcon, ShareIcon } from '@heroicons/react/24/outline'
import { generateBlogPosts } from '@/lib/blogGenerator'

// Generate blog posts automatically
const blogPosts = generateBlogPosts(20)

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-gray-300 mb-8">The article you're looking for doesn't exist.</p>
          <Link 
            href="/blog"
            className="inline-flex items-center bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-900/20 to-primary-900/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-accent-400 hover:text-accent-300 transition-colors mb-8"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
          
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {post.title}
            </h1>
            
            <p className="text-gray-300 text-lg mb-6">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-400 mb-8">
              <div className="flex items-center gap-6">
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
                <div className="text-accent-400">
                  By {post.author}
                </div>
              </div>
              <button className="flex items-center gap-2 text-accent-400 hover:text-accent-300 transition-colors">
                <ShareIcon className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <article className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
          <div 
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div className="text-gray-400">
                <p>Share this article:</p>
              </div>
              <div className="flex gap-4">
                <button className="text-accent-400 hover:text-accent-300 transition-colors">
                  Twitter
                </button>
                <button className="text-accent-400 hover:text-accent-300 transition-colors">
                  LinkedIn
                </button>
                <button className="text-accent-400 hover:text-accent-300 transition-colors">
                  Email
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts
              .filter(p => p.slug !== post.slug && p.category === post.category)
              .slice(0, 2)
              .map(relatedPost => (
                <Link 
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-accent-500 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-accent-500/20 text-accent-400 px-3 py-1 rounded-full text-sm font-medium">
                      {relatedPost.category}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    {relatedPost.title}
                  </h4>
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      {new Date(relatedPost.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" />
                      {relatedPost.readTime}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
} 
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Blog content generator
const topics = [
  {
    category: "Capital Raising",
    titles: [
      "The Complete Guide to Raising Series A Funding in 2024",
      "How to Build an Investor Pipeline That Actually Works",
      "The Psychology of Angel Investors: What They Really Want",
      "Raising Capital in a Down Market: Strategies That Work",
      "The Art of the Perfect Investor Pitch: Templates That Close Deals",
      "Alternative Funding Sources: Beyond Traditional Venture Capital",
      "How to Prepare for Due Diligence: A Founder's Checklist",
      "The Role of Financial Projections in Successful Fundraising",
      "Building Relationships with VCs: A Long-term Strategy",
      "The Impact of Market Conditions on Fundraising Success"
    ]
  },
  {
    category: "Fundraising",
    titles: [
      "Why Most Fundraising Fails and How to Succeed",
      "The 10 Commandments of Successful Fundraising",
      "How to Create Urgency in Your Fundraising Process",
      "The Importance of Storytelling in Fundraising",
      "Fundraising Metrics That Matter to Investors",
      "How to Handle Investor Rejections and Keep Moving Forward",
      "The Role of Advisors in Successful Fundraising",
      "Fundraising Timeline: How Long Should It Really Take?",
      "The Impact of Team Dynamics on Fundraising Success",
      "How to Leverage Your Network for Fundraising Success"
    ]
  },
  {
    category: "Investor Relations",
    titles: [
      "How to Build Trust with Potential Investors",
      "The Do's and Don'ts of Investor Communication",
      "Managing Investor Expectations: A Founder's Guide",
      "How to Choose the Right Investors for Your Company",
      "The Role of Board Members in Company Growth",
      "Investor Updates: How Often and What to Include",
      "Handling Difficult Investor Conversations",
      "The Importance of Transparency with Investors",
      "How to Leverage Your Investors' Network",
      "Building Long-term Relationships with Investors"
    ]
  },
  {
    category: "Pitch Decks",
    titles: [
      "The 10 Slides Every Pitch Deck Must Have",
      "How to Design a Pitch Deck That Captures Attention",
      "The Psychology Behind Successful Pitch Presentations",
      "Pitch Deck Templates That Have Closed Millions",
      "How to Tailor Your Pitch for Different Investor Types",
      "The Role of Data Visualization in Pitch Decks",
      "Common Pitch Deck Mistakes and How to Avoid Them",
      "How to Practice Your Pitch Until It's Perfect",
      "The Importance of Storytelling in Pitch Presentations",
      "How to Handle Tough Questions During Your Pitch"
    ]
  },
  {
    category: "Funding Stages",
    titles: [
      "Seed Funding: Everything You Need to Know",
      "Series A Funding: The Complete Guide",
      "Series B and Beyond: Scaling Your Fundraising",
      "Bridge Rounds: When and How to Use Them",
      "Pre-IPO Funding: Preparing for the Public Markets",
      "The Differences Between Angel and VC Funding",
      "How to Determine the Right Funding Stage for Your Company",
      "The Role of Convertible Notes in Early-Stage Funding",
      "SAFE Agreements: A Founder's Guide",
      "The Impact of Funding Rounds on Company Valuation"
    ]
  }
];

const contentTemplates = [
  {
    structure: "problem-solution",
    sections: [
      "The Problem",
      "Why Current Solutions Fall Short", 
      "Our Solution",
      "Market Opportunity",
      "Competitive Advantage",
      "Business Model",
      "Traction and Metrics",
      "Team",
      "Financial Projections",
      "Use of Funds",
      "Conclusion"
    ]
  },
  {
    structure: "how-to-guide",
    sections: [
      "Introduction",
      "Why This Matters",
      "Step-by-Step Process",
      "Common Mistakes to Avoid",
      "Pro Tips and Best Practices",
      "Case Studies",
      "Tools and Resources",
      "Measuring Success",
      "Next Steps",
      "Conclusion"
    ]
  },
  {
    structure: "analysis",
    sections: [
      "Current State of the Market",
      "Key Trends and Drivers",
      "Data and Statistics",
      "Expert Insights",
      "Future Predictions",
      "Implications for Entrepreneurs",
      "Actionable Recommendations",
      "Conclusion"
    ]
  }
];

const contentSnippets = {
  introductions: [
    "In today's competitive fundraising landscape, entrepreneurs need every advantage they can get.",
    "The fundraising process can be overwhelming, but with the right approach, success is within reach.",
    "Understanding the nuances of capital raising is crucial for any entrepreneur looking to scale their business.",
    "The difference between successful and failed fundraising often comes down to preparation and strategy.",
    "As the investment landscape evolves, so too must the strategies entrepreneurs use to secure funding."
  ],
  conclusions: [
    "By following these proven strategies, you can significantly increase your chances of fundraising success.",
    "Remember, fundraising is a marathon, not a sprint. Focus on building relationships and demonstrating value.",
    "The key to successful fundraising lies in preparation, persistence, and the ability to tell your story compellingly.",
    "With the right approach and mindset, securing the capital you need to grow your business is entirely achievable.",
    "Success in fundraising comes down to understanding what investors want and positioning your company accordingly."
  ]
};

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function generateReadTime(contentLength) {
  const wordsPerMinute = 200;
  const minutes = Math.ceil(contentLength / wordsPerMinute);
  return `${minutes} min read`;
}

function generateContent(topic, title) {
  const template = contentTemplates[Math.floor(Math.random() * contentTemplates.length)];
  const intro = contentSnippets.introductions[Math.floor(Math.random() * contentSnippets.introductions.length)];
  const conclusion = contentSnippets.conclusions[Math.floor(Math.random() * contentSnippets.conclusions.length)];
  
  let content = `<p>${intro}</p>\n\n`;
  
  template.sections.forEach((section, index) => {
    content += `<h${index === 0 ? '2' : '3'}>${section}</h${index === 0 ? '2' : '3'}>\n`;
    content += `<p>This section would contain detailed content about ${section.toLowerCase()}...</p>\n\n`;
    
    if (index === 0) {
      content += `<ul>\n`;
      content += `<li>Key point about ${section.toLowerCase()}</li>\n`;
      content += `<li>Important consideration for ${section.toLowerCase()}</li>\n`;
      content += `<li>Best practice for ${section.toLowerCase()}</li>\n`;
      content += `</ul>\n\n`;
    }
  });
  
  content += `<p>${conclusion}</p>`;
  
  return content;
}

function generateBlogPost(id) {
  const topic = topics[Math.floor(Math.random() * topics.length)];
  const title = topic.titles[Math.floor(Math.random() * topic.titles.length)];
  const slug = generateSlug(title);
  const content = generateContent(topic, title);
  const readTime = generateReadTime(content.length);
  
  // Generate a date within the last 6 months
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 180));
  
  return {
    id,
    title,
    excerpt: `Expert insights on ${title.toLowerCase()}. Learn proven strategies and best practices for successful capital raising.`,
    slug,
    date: date.toISOString().split('T')[0],
    readTime,
    category: topic.category,
    content,
    author: "Capital Firm Team",
    featured: Math.random() < 0.2 // 20% chance of being featured
  };
}

function generateBlogPosts(count) {
  const posts = [];
  for (let i = 1; i <= count; i++) {
    posts.push(generateBlogPost(i));
  }
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Main execution
function main() {
  const numberOfPosts = process.argv[2] ? parseInt(process.argv[2]) : 10;
  console.log(`Generating ${numberOfPosts} blog posts...`);
  
  const posts = generateBlogPosts(numberOfPosts);
  
  // Create data directory if it doesn't exist
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Save to JSON file
  const outputPath = path.join(dataDir, 'blog-posts.json');
  fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));
  
  console.log(`✅ Generated ${posts.length} blog posts`);
  console.log(`📁 Saved to: ${outputPath}`);
  
  // Display summary
  console.log('\n📊 Summary:');
  const categoryCount = {};
  posts.forEach(post => {
    categoryCount[post.category] = (categoryCount[post.category] || 0) + 1;
  });
  
  Object.entries(categoryCount).forEach(([category, count]) => {
    console.log(`  ${category}: ${count} posts`);
  });
  
  const featuredCount = posts.filter(post => post.featured).length;
  console.log(`  Featured posts: ${featuredCount}`);
}

if (require.main === module) {
  main();
}

module.exports = { generateBlogPosts, generateBlogPost }; 
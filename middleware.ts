import { withAuth } from "next-auth/middleware"

// Temporarily disable authentication for testing
export default function middleware(req: any) {
  // Allow all requests for now
  return
}

// Uncomment this when you want to enable authentication
// export default withAuth(
//   function middleware(req) {
//     // Add any additional middleware logic here
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token
//     },
//   }
// )

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"]
} 
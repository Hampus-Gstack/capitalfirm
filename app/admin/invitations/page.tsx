'use client'
import { useState } from 'react'
import { 
  PlusIcon, 
  EnvelopeIcon, 
  ClipboardDocumentIcon,
  CheckCircleIcon,
  ClockIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface Invitation {
  id: string
  email: string
  company: string
  role: string
  invitedBy: string
  invitedAt: string
  status: 'pending' | 'accepted' | 'expired'
  token: string
  signupLink: string
}

export default function AdminInvitationsPage() {
  const [invitations, setInvitations] = useState<Invitation[]>([
    {
      id: '1',
      email: 'john@techstart.com',
      company: 'TechStart Inc.',
      role: 'Founder/CEO',
      invitedBy: 'Capital Firm Team',
      invitedAt: '2024-01-15T10:00:00Z',
      status: 'pending',
      token: 'inv_abc123',
      signupLink: 'https://capitalfirm-vert.vercel.app/signup/inv_abc123'
    },
    {
      id: '2',
      email: 'sarah@innovate.co',
      company: 'Innovate Co.',
      role: 'CTO',
      invitedBy: 'Capital Firm Team',
      invitedAt: '2024-01-14T14:30:00Z',
      status: 'accepted',
      token: 'inv_def456',
      signupLink: 'https://capitalfirm-vert.vercel.app/signup/inv_def456'
    }
  ])

  const [showInviteForm, setShowInviteForm] = useState(false)
  const [newInvitation, setNewInvitation] = useState({
    email: '',
    company: '',
    role: '',
    message: ''
  })

  const generateToken = () => {
    return 'inv_' + Math.random().toString(36).substr(2, 9)
  }

  const createInvitation = (e: React.FormEvent) => {
    e.preventDefault()
    
    const token = generateToken()
    const signupLink = `https://capitalfirm-vert.vercel.app/signup/${token}`
    
    const newInv: Invitation = {
      id: Date.now().toString(),
      email: newInvitation.email,
      company: newInvitation.company,
      role: newInvitation.role,
      invitedBy: 'Capital Firm Team',
      invitedAt: new Date().toISOString(),
      status: 'pending',
      token,
      signupLink
    }
    
    setInvitations([newInv, ...invitations])
    setNewInvitation({ email: '', company: '', role: '', message: '' })
    setShowInviteForm(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'text-green-400 bg-green-400/10'
      case 'expired':
        return 'text-red-400 bg-red-400/10'
      default:
        return 'text-yellow-400 bg-yellow-400/10'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircleIcon className="h-4 w-4" />
      case 'expired':
        return <XMarkIcon className="h-4 w-4" />
      default:
        return <ClockIcon className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-900/20 to-primary-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Client Invitations</h1>
              <p className="text-xl text-gray-300">Manage client access to your platform</p>
            </div>
            <button
              onClick={() => setShowInviteForm(true)}
              className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Send Invitation
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-accent-500/10 rounded-lg">
                <EnvelopeIcon className="h-6 w-6 text-accent-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Invitations</p>
                <p className="text-2xl font-bold text-white">{invitations.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Accepted</p>
                <p className="text-2xl font-bold text-white">
                  {invitations.filter(inv => inv.status === 'accepted').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <ClockIcon className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-white">
                  {invitations.filter(inv => inv.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Invitations List */}
        <div className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Recent Invitations</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Invited
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {invitations.map((invitation) => (
                  <tr key={invitation.id} className="hover:bg-gray-800/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">{invitation.email}</div>
                        <div className="text-sm text-gray-400">Invited by {invitation.invitedBy}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {invitation.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {invitation.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invitation.status)}`}>
                        {getStatusIcon(invitation.status)}
                        <span className="ml-1">{invitation.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(invitation.invitedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => copyToClipboard(invitation.signupLink)}
                          className="text-accent-400 hover:text-accent-300 transition-colors"
                          title="Copy signup link"
                        >
                          <ClipboardDocumentIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => window.open(invitation.signupLink, '_blank')}
                          className="text-accent-400 hover:text-accent-300 transition-colors"
                          title="View signup link"
                        >
                          <EnvelopeIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Invite Form Modal */}
      {showInviteForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-6">Send Client Invitation</h3>
            
            <form onSubmit={createInvitation} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={newInvitation.email}
                  onChange={(e) => setNewInvitation({...newInvitation, email: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 transition-colors"
                  placeholder="client@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  value={newInvitation.company}
                  onChange={(e) => setNewInvitation({...newInvitation, company: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 transition-colors"
                  placeholder="Company Inc."
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                  Role
                </label>
                <select
                  id="role"
                  value={newInvitation.role}
                  onChange={(e) => setNewInvitation({...newInvitation, role: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-accent-500 transition-colors"
                >
                  <option value="">Select role</option>
                  <option value="Founder/CEO">Founder/CEO</option>
                  <option value="CTO">CTO</option>
                  <option value="CFO">CFO</option>
                  <option value="COO">COO</option>
                  <option value="Investor Relations">Investor Relations</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Personal Message (Optional)
                </label>
                <textarea
                  id="message"
                  value={newInvitation.message}
                  onChange={(e) => setNewInvitation({...newInvitation, message: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 transition-colors"
                  placeholder="Add a personal message to the invitation..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowInviteForm(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 
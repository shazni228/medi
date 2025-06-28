import React from 'react'
import { Shield, Eye, Lock, Users, FileText, AlertCircle } from 'lucide-react'

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Shield className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed">
              At MediBlog, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our 
              website and use our services.
            </p>
          </div>

          {/* Information We Collect */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Eye className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Name and email address when you create an account</li>
                  <li>Professional credentials and medical specialization</li>
                  <li>Contact information when you reach out to us</li>
                  <li>Content you create and publish on our platform</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Pages you visit and time spent on our site</li>
                  <li>Search queries and content interactions</li>
                  <li>Device information and browser type</li>
                  <li>IP address and general location data</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <FileText className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>To provide and maintain our medical content platform</li>
              <li>To authenticate users and manage accounts</li>
              <li>To enable content creation and collaboration</li>
              <li>To improve our services and user experience</li>
              <li>To communicate important updates and notifications</li>
              <li>To ensure content quality and medical accuracy</li>
              <li>To comply with legal obligations and prevent misuse</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Information Sharing</h2>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-blue-800 text-sm">
                  <strong>We do not sell, trade, or rent your personal information to third parties.</strong>
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-4">We may share your information only in the following circumstances:</p>
            
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>With your consent:</strong> When you explicitly agree to share information</li>
              <li><strong>Service providers:</strong> Trusted partners who help us operate our platform</li>
              <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Medical verification:</strong> To verify credentials with medical boards (with consent)</li>
              <li><strong>Published content:</strong> Articles and content you choose to publish publicly</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Lock className="h-6 w-6 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information:
            </p>
            
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and authentication requirements</li>
              <li>Secure hosting infrastructure with backup systems</li>
              <li>Staff training on data protection and privacy</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights and Choices</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Access and Control</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                  <li>View and update your account information</li>
                  <li>Download your data</li>
                  <li>Delete your account</li>
                  <li>Opt out of communications</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy Controls</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                  <li>Control profile visibility</li>
                  <li>Manage content permissions</li>
                  <li>Set communication preferences</li>
                  <li>Request data correction</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
            
            <p className="text-gray-700 mb-4">
              We use cookies and similar technologies to enhance your experience:
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li><strong>Essential cookies:</strong> Required for basic site functionality</li>
                <li><strong>Analytics cookies:</strong> Help us understand how you use our site</li>
                <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Security cookies:</strong> Protect against fraud and unauthorized access</li>
              </ul>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
            
            <p className="text-gray-700">
              Our services are not intended for children under 13 years of age. We do not knowingly collect 
              personal information from children under 13. If you are a parent or guardian and believe your 
              child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage 
              you to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> privacy@mediblog.com</p>
              <p><strong>Phone:</strong> +1 (555) MEDI-BLOG</p>
              <p><strong>Address:</strong> 123 Medical Center Drive, Healthcare District, New York, NY 10001</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
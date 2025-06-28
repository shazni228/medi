import React from 'react'
import { FileText, AlertTriangle, Shield, Users, Gavel, CheckCircle } from 'lucide-react'

export function TermsConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <FileText className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed">
              Welcome to MediBlog. These Terms and Conditions ("Terms") govern your use of our website and services. 
              By accessing or using MediBlog, you agree to be bound by these Terms. If you disagree with any part 
              of these terms, then you may not access the service.
            </p>
          </div>

          {/* Medical Disclaimer */}
          <section className="mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-bold text-red-900 mb-2">Important Medical Disclaimer</h2>
                  <p className="text-red-800 text-sm leading-relaxed">
                    The information provided on MediBlog is for educational and informational purposes only. 
                    It is not intended as a substitute for professional medical advice, diagnosis, or treatment. 
                    Always seek the advice of your physician or other qualified health provider with any questions 
                    you may have regarding a medical condition.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Acceptance of Terms */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Acceptance of Terms</h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              By accessing and using MediBlog, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>You must be at least 18 years old to use our services</li>
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for maintaining the confidentiality of your account</li>
              <li>You agree to notify us immediately of any unauthorized use of your account</li>
            </ul>
          </section>

          {/* User Accounts */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">User Accounts and Responsibilities</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Registration</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information to keep it accurate</li>
                  <li>Medical professionals must provide valid credentials</li>
                  <li>One account per person or organization</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Security</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>You are responsible for safeguarding your password</li>
                  <li>You must not share your account with others</li>
                  <li>Notify us immediately of any security breaches</li>
                  <li>We reserve the right to suspend accounts for security reasons</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Content Guidelines */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <FileText className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Content Guidelines</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Standards</h3>
                <p className="text-gray-700 mb-2">All content published on MediBlog must:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Be medically accurate and evidence-based</li>
                  <li>Be written by qualified healthcare professionals</li>
                  <li>Include proper citations and references</li>
                  <li>Comply with medical ethics and professional standards</li>
                  <li>Be original or properly attributed</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Prohibited Content</h3>
                <p className="text-gray-700 mb-2">The following content is strictly prohibited:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Misleading or false medical information</li>
                  <li>Promotion of unproven treatments or cures</li>
                  <li>Personal medical advice or diagnosis</li>
                  <li>Copyrighted material without permission</li>
                  <li>Discriminatory or offensive content</li>
                  <li>Commercial advertisements disguised as content</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Intellectual Property Rights</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Content</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>You retain ownership of content you create and publish</li>
                  <li>You grant us a license to display, distribute, and promote your content</li>
                  <li>You warrant that you have the right to publish the content</li>
                  <li>You are responsible for any copyright infringement claims</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Content</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>MediBlog platform, design, and features are our property</li>
                  <li>You may not copy, modify, or distribute our platform</li>
                  <li>Our trademarks and logos are protected</li>
                  <li>User-generated content remains the property of respective authors</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Privacy and Data */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and Data Protection</h2>
            
            <p className="text-gray-700 mb-4">
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information. 
              By using our services, you also agree to our Privacy Policy.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>Note:</strong> We comply with HIPAA regulations and maintain strict confidentiality 
                standards for all medical information shared on our platform.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Gavel className="h-6 w-6 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Limitation of Liability</h2>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-yellow-800 text-sm">
                <strong>Important:</strong> MediBlog provides information for educational purposes only. 
                We are not liable for any medical decisions made based on information from our platform.
              </p>
            </div>
            
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>We provide the platform "as is" without warranties of any kind</li>
              <li>We are not responsible for the accuracy of user-generated content</li>
              <li>We are not liable for any damages arising from use of our services</li>
              <li>Our liability is limited to the maximum extent permitted by law</li>
              <li>Users assume full responsibility for their use of the information provided</li>
            </ul>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">By You</h3>
                <p className="text-gray-700">
                  You may terminate your account at any time by contacting us or using the account deletion feature.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">By Us</h3>
                <p className="text-gray-700 mb-2">We may terminate or suspend your account if you:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Violate these Terms and Conditions</li>
                  <li>Publish misleading or harmful medical information</li>
                  <li>Engage in fraudulent or illegal activities</li>
                  <li>Violate intellectual property rights</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
            
            <p className="text-gray-700">
              These Terms shall be interpreted and governed by the laws of the State of New York, United States, 
              without regard to its conflict of law provisions. Any disputes arising from these Terms will be 
              resolved in the courts of New York.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            
            <p className="text-gray-700">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes 
              via email or through our platform. Your continued use of MediBlog after such modifications constitutes 
              acceptance of the updated Terms.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> legal@mediblog.com</p>
              <p><strong>Phone:</strong> +1 (555) MEDI-BLOG</p>
              <p><strong>Address:</strong> 123 Medical Center Drive, Healthcare District, New York, NY 10001</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
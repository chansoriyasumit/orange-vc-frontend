import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Shield, FileText, Lock, Eye, Database, Globe } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white-smoke">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pale-dogwood/30 via-white-smoke to-tomato/5 py-32 pt-28 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-tomato/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-pale-dogwood/50 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tomato/10 text-tomato font-semibold text-sm mb-6">
              <Shield className="w-4 h-4" />
              Privacy Policy
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-rich-black mb-6 leading-tight">
              Your Privacy <span className="text-tomato">Matters</span>
            </h1>
            <p className="text-xl text-rich-black/70 max-w-2xl mx-auto leading-relaxed">
              Effective Date: 15 December 2025 | Last Updated: 16 December 2025
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-platinum/50">
              
              {/* Introduction */}
              <div className="mb-12">
                <p className="text-lg text-rich-black/80 leading-relaxed mb-6">
                  This privacy policy ("Privacy Policy") applies to the use or access of the domain name/website of Orange Virtual Connect ("OVC", "Company", "we", "us", or "our"), operated by Orange Virtual Global Solutions Pvt Ltd. The Privacy Policy constitutes an integral part of the agreements/terms and conditions of use between the Company and its users/customers.
                </p>
                <p className="text-lg text-rich-black/80 leading-relaxed">
                  This Privacy Policy has been designed and developed to help you understand the type of personal information we collect, how we use it, who we share it with, how we protect it, and how you can access and modify your information.
                </p>
              </div>

              {/* Section 1: Type of Information We Collect */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-tomato/10 flex items-center justify-center">
                    <Database className="w-6 h-6 text-tomato" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-rich-black">
                    1. Type of Information We Collect
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-rich-black mb-3">A. Personal Information</h3>
                    <p className="text-rich-black/70 leading-relaxed mb-4">
                      We collect personal information that you provide to us voluntarily when you register on the Platform and express an interest in obtaining information about us or our products and Services. The personal information we collect may include:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-rich-black/70 ml-4">
                      <li>Name</li>
                      <li>Phone Number</li>
                      <li>Email Address</li>
                      <li>User ID</li>
                      <li>Address (including country and ZIP/postal code)</li>
                      <li>Password chosen by you</li>
                      <li>Contact Preferences</li>
                      <li>Financial account information like bank account details, GST certificate, PAN Card, etc.</li>
                      <li>All other personally identifiable information/details as the User may share from time to time</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl font-semibold text-rich-black mb-3">B. Log and Usage Data</h3>
                    <p className="text-rich-black/70 leading-relaxed">
                      Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services. This may include your IP address, device information, browser type, settings, and information about your activity in the Services.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl font-semibold text-rich-black mb-3">C. Device Data</h3>
                    <p className="text-rich-black/70 leading-relaxed">
                      We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. This may include your IP address, device and application identification numbers, location, browser type, hardware model, Internet service provider, operating system, and system configuration information.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl font-semibold text-rich-black mb-3">D. Information Collected from Other Sources</h3>
                    <p className="text-rich-black/70 leading-relaxed">
                      We may collect limited data from public databases, marketing partners, social media platforms, and other outside sources to enhance our ability to provide relevant marketing, offers, and services to you.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2: Purpose of Collecting Information */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-tomato/10 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-tomato" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-rich-black">
                    2. Purpose of Collecting Information
                  </h2>
                </div>
                
                <p className="text-rich-black/70 leading-relaxed mb-4">
                  We use your personal data only when we have a valid legal basis to do so. We use personal data to:
                </p>
                <ul className="list-disc list-inside space-y-3 text-rich-black/70 ml-4">
                  <li><strong className="text-rich-black">Power Our Services:</strong> To improve our offerings, for internal purposes such as auditing or data analysis, or for troubleshooting.</li>
                  <li><strong className="text-rich-black">Process Your Transactions:</strong> To process transactions, we must collect data such as your name, purchase, and payment information.</li>
                  <li><strong className="text-rich-black">Communicate with You:</strong> To respond to communications, reach out to you about your transactions or account, market our products and services, and provide other relevant information.</li>
                  <li><strong className="text-rich-black">Security and Fraud Prevention:</strong> To protect individuals, employees, and the Company and for loss prevention and to prevent fraud.</li>
                  <li><strong className="text-rich-black">Comply with Law:</strong> To comply with applicable law — for example, to satisfy tax or reporting obligations, or to comply with a lawful governmental request.</li>
                  <li><strong className="text-rich-black">Other purposes:</strong> User registration, processing orders, sending updates, technical administration, personalization, research and development, and customer care activities.</li>
                </ul>
              </div>

              {/* Section 3: Sharing Information */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-tomato/10 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-tomato" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-rich-black">
                    3. When and With Whom Do We Share Your Information?
                  </h2>
                </div>
                
                <p className="text-rich-black/70 leading-relaxed mb-4">
                  We respect your privacy and will not sell or rent your personal information to third parties. However, we may share your data in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-3 text-rich-black/70 ml-4">
                  <li><strong className="text-rich-black">Service Providers:</strong> We may share your information with trusted third-party service providers who assist us in operating our business, such as payment processors, hosting providers, marketing partners, and customer support services.</li>
                  <li><strong className="text-rich-black">Legal and Regulatory Authorities:</strong> We may disclose your personal data if required by law, such as to comply with a subpoena, legal process, or other governmental request.</li>
                  <li><strong className="text-rich-black">Business Transfers:</strong> In the event of a merger, acquisition, sale of assets, or other business transaction, your personal data may be transferred to the new owner or successor entity.</li>
                </ul>
              </div>

              {/* Section 4: Cookies */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-tomato/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-tomato" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-rich-black">
                    4. Cookies and Tracking Technologies
                  </h2>
                </div>
                
                <p className="text-rich-black/70 leading-relaxed mb-4">
                  Our website employs cookies and similar tracking technologies to enhance your browsing experience, analyze site usage, and support our marketing initiatives. Cookies are small text files stored on your device when you visit our site.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-rich-black mb-2">Types of Cookies We Use:</h3>
                    <ul className="list-disc list-inside space-y-2 text-rich-black/70 ml-4">
                      <li><strong className="text-rich-black">Essential Cookies:</strong> Necessary for the basic functioning of our website.</li>
                      <li><strong className="text-rich-black">Performance and Analytics Cookies:</strong> Help us understand how visitors interact with our site.</li>
                      <li><strong className="text-rich-black">Functionality Cookies:</strong> Remember your preferences and allow us to offer you a more personalized experience.</li>
                      <li><strong className="text-rich-black">Targeting and Advertising Cookies:</strong> Used to deliver advertisements that are more relevant to you and your interests.</li>
                      <li><strong className="text-rich-black">Third-Party Cookies:</strong> Placed by third parties, such as advertisers or analytics providers.</li>
                    </ul>
                  </div>
                  <p className="text-rich-black/70 leading-relaxed">
                    You have the right to manage your cookie preferences through your browser settings. However, please note that disabling cookies may affect your ability to use certain features on our website.
                  </p>
                </div>
              </div>

              {/* Section 5: Data Protection Rights */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-tomato/10 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-tomato" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-rich-black">
                    5. Your Data Protection Rights
                  </h2>
                </div>
                
                <p className="text-rich-black/70 leading-relaxed mb-4">
                  Depending on your location, you may be entitled to specific rights regarding your personal data under applicable data protection laws:
                </p>
                <ul className="list-disc list-inside space-y-3 text-rich-black/70 ml-4">
                  <li><strong className="text-rich-black">Right to Access:</strong> You have the right to request access to the personal data we hold about you.</li>
                  <li><strong className="text-rich-black">Right to Correction:</strong> You have the right to request correction of inaccurate or incomplete personal information.</li>
                  <li><strong className="text-rich-black">Right to Deletion:</strong> In certain circumstances, you may have the right to request the deletion of your personal data ("right to be forgotten").</li>
                  <li><strong className="text-rich-black">Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data in specific circumstances.</li>
                  <li><strong className="text-rich-black">Right to Object:</strong> You have the right to object to the processing of your personal data in certain situations.</li>
                  <li><strong className="text-rich-black">Right to Data Portability:</strong> In certain situations, you have the right to request the transfer of your personal data to another organization or directly to you.</li>
                </ul>
                <p className="text-rich-black/70 leading-relaxed mt-4">
                  All information provided to the Company by a User, including Sensitive Personal Data or Information, is voluntary. Users can access, modify, correct and delete the Personal Information provided by them. To exercise these rights, please contact us at the email address provided below.
                </p>
              </div>

              {/* Section 6: Security */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-tomato/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-tomato" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-rich-black">
                    6. Security Practices and Procedures
                  </h2>
                </div>
                
                <p className="text-rich-black/70 leading-relaxed mb-4">
                  We are committed to protecting Your Personal Information, and to that end, the Company adopts reasonable security practices and procedures to implement technical, operational, managerial and physical security control measures in order to protect the Personal Information in its possession from loss, misuse and unauthorized access, disclosure, alteration and destruction.
                </p>
                <p className="text-rich-black/70 leading-relaxed">
                  While we try our best to provide security that is commensurate with the industry standards, due to the inherent vulnerabilities of the internet, we cannot ensure or warrant complete security of all information that is being transmitted to Us.
                </p>
              </div>

              {/* Section 7: Third-Party Links */}
              <div className="mb-12">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-rich-black mb-4">
                  7. Third-Party Links
                </h2>
                <p className="text-rich-black/70 leading-relaxed">
                  The links to third-party advertisements, third-party websites or any third-party electronic communication services may be provided on the platform. If you access any such Third-Party Links, we request you to review the concerned website's privacy policy. We shall not be responsible for the privacy policy and practices of these third-party websites.
                </p>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-br from-pale-dogwood/30 to-white-smoke rounded-2xl p-8 border border-platinum/50">
                <h2 className="font-heading text-2xl font-bold text-rich-black mb-4">
                  Contact Us
                </h2>
                <p className="text-rich-black/70 leading-relaxed mb-4">
                  If you have any questions or concerns about this Privacy Policy or wish to exercise your data protection rights, please contact us at:
                </p>
                <ul className="space-y-2 text-rich-black/70">
                  <li><strong className="text-rich-black">Email:</strong> virtual.care@orangevirtualconnect.com</li>
                  <li><strong className="text-rich-black">Phone:</strong> +1 (909) 634-2861</li>
                </ul>
              </div>

              {/* Last Updated */}
              <div className="mt-8 pt-8 border-t border-platinum">
                <p className="text-sm text-rich-black/60 text-center">
                  Last Updated: 16 December 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


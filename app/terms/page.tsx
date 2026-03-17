import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FileText, Shield, CreditCard, Clock, Phone, AlertCircle, Scale, Users } from 'lucide-react';

export default function TermsPage() {
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
              <FileText className="w-4 h-4" />
              Terms & Conditions
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-rich-black mb-6 leading-tight">
              Master Company <span className="text-tomato">Policy</span>
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
                  This Master Company Policy ("Policy") governs the access to and use of services provided by Orange Virtual Connect ("OVC", "Company", "we", "us", or "our"), operated by Orange Virtual Global Solutions Pvt Ltd. This Policy is legally binding and applies to all users, clients, partners, consultants, vendors, and employees.
                </p>
                <p className="text-lg text-rich-black/80 leading-relaxed">
                  Please read these Terms carefully before using our Services. By accessing or using the Services, you signify your acceptance to be bound by the Terms. This is a legally binding contract between you and OVC.
                </p>
              </div>

              {/* Section 1: Introduction */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-tomato/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-tomato" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-rich-black">
                    1. Introduction
                  </h2>
                </div>
                
                <div className="space-y-4 text-rich-black/70 leading-relaxed">
                  <p>
                    This Master Website Policy explains the rights, responsibilities, processes, and legal terms governing your access to and use of the Orange Virtual Connect website, platform, products, and services (collectively, the "Services").
                  </p>
                  <p>
                    The Policy covers terms of service, privacy and data protection, billing and refunds, acceptable use, intellectual property, confidentiality, security, and dispute resolution with provisions that reflect compliance considerations for India, the United States, and Canada.
                  </p>
                  <p>
                    If you do not agree with any part of these Terms & Conditions, you may refrain from accessing or using our Services. Your continued use of the Services will constitute your acceptance of these Terms.
                  </p>
                </div>
              </div>

              {/* Section 2: Membership */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-tomato/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-tomato" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-rich-black">
                    2. Membership
                  </h2>
                </div>
                
                <div className="space-y-4 text-rich-black/70 leading-relaxed">
                  <p>
                    You must register yourself as a Lead Partner to render the Services. Once registered, an account is created for each Lead Partner. If you choose to register as a Member, you represent and warrant to us that:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>You are of legal age to form a binding contract (at least eighteen (18) years old or the age of majority in your state or province of residence).</li>
                    <li>You will provide us with accurate, current and complete registration and contact information, and keep your information updated.</li>
                    <li>Your registration on our Services is not prohibited by law.</li>
                    <li>You are responsible for keeping your password secure and for all actions taken using your password.</li>
                    <li>Your account may be set to inactive if there is no activity associated with that account for 90 days.</li>
                    <li>You undertake that you do not have any criminal record under any regulatory authority.</li>
                  </ul>
                </div>
              </div>

              {/* Section 3: Use of Services */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-tomato/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-tomato" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-rich-black">
                    3. Use of Services
                  </h2>
                </div>
                
                <div className="space-y-4 text-rich-black/70 leading-relaxed">
                  <p>
                    You agree to use the Services in strict compliance with all applicable local, state, national, and international laws and regulations. You must not use our Services for any purpose that:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Violates any law or regulation</li>
                    <li>Infringes on the rights of others</li>
                    <li>Is harmful, fraudulent, deceptive, or abusive</li>
                    <li>Interferes with the operation of our Services</li>
                    <li>Impairs the enjoyment of our Services by others</li>
                  </ul>
                  <p>
                    Violations of this section may result in immediate suspension or termination of your access to our Services.
                  </p>
                </div>
              </div>

              {/* Section 4: Scope of Work */}
              <div className="mb-12">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-rich-black mb-6">
                  4. Scope of Work
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-rich-black mb-3">Daily Task Management Services</h3>
                    <p className="text-rich-black/70 leading-relaxed mb-4">
                      OVC provides administrative, operational, coordination, and communication-based functions including:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-rich-black/70 ml-4">
                      <li><strong className="text-rich-black">Email Administration:</strong> Inbox governance, priority filtering, drafting emails, follow-up management, and correspondence coordination.</li>
                      <li><strong className="text-rich-black">Calendar & Time Coordination:</strong> Global scheduling, agenda preparation, buffer management, deadline tracking, and multi-party coordination.</li>
                      <li><strong className="text-rich-black">Travel Support:</strong> Research, custom travel planning, travel resource preparation, and document organization.</li>
                      <li><strong className="text-rich-black">Administrative Coordination:</strong> Internal information flow management, document drafting, template preparation, and digital file management.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl font-semibold text-rich-black mb-3">Personal Assistance Services</h3>
                    <p className="text-rich-black/70 leading-relaxed mb-4">
                      Services include appointment scheduling, event coordination research, personal shopping & gift research, and household management assistance.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl font-semibold text-rich-black mb-3">Social Media Management Services</h3>
                    <p className="text-rich-black/70 leading-relaxed mb-4">
                      OVC provides content planning & scheduling, engagement & interaction support, creative design support, and analytics & reporting.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl font-semibold text-rich-black mb-3">Limitations</h3>
                    <p className="text-rich-black/70 leading-relaxed">
                      OVC will NOT make binding decisions or commitments on behalf of the Client, approve or process payments autonomously, provide physically present task execution, or offer regulated professional services (legal, financial, medical, tax, investment).
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 5: Subscription Model */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-tomato/10 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-tomato" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-rich-black">
                    5. Subscription Model
                  </h2>
                </div>
                
                <div className="space-y-4 text-rich-black/70 leading-relaxed">
                  <p>
                    All services operate under a subscription model wherein the Client selects a predefined monthly allocation of service hours. These hours correspond to professional work performed across any of OVC's service categories.
                  </p>
                  {/* <p>
                    <strong className="text-rich-black">Automatic Renewal:</strong> Subscriptions renew automatically each calendar month unless the Client submits a formal cancellation request. At renewal, the Client receives their newly purchased subscription hours, plus 50% of unused hours from the previous month.
                  </p> */}
                  <p>
                    <strong className="text-rich-black">Billing:</strong> All subscription fees are invoiced and payable in advance for the upcoming service cycle. Services remain active only when payment is completed.
                  </p>
                </div>
              </div>

              {/* Section 6: Hour Tracking */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-tomato/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-tomato" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-rich-black">
                    6. Hour Tracking Methodology
                  </h2>
                </div>
                
                <p className="text-rich-black/70 leading-relaxed mb-4">
                  OVC maintains professional and transparent time-tracking protocols. Hours are tracked for all effort-based activities including reviewing client instructions, conducting research, drafting documents, conducting calls, and processing revisions.
                </p>
                <p className="text-rich-black/70 leading-relaxed">
                  Clients receive weekly breakdowns of hours consumed, balance hours, nature of tasks performed, and estimated hours required for upcoming work.
                </p>
              </div>

              {/* Section 7: Calling & Dialer Policy */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-tomato/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-tomato" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-rich-black">
                    7. Calling & Dialer Policy
                  </h2>
                </div>
                
                <div className="space-y-4 text-rich-black/70 leading-relaxed">
                  <p>
                    Dialer services are optional and billed separately. When a subscription requires outbound/inbound calling, OVC can provide its proprietary or licensed dialer at an additional recurring cost, or the Client may provide their own dialer credentials.
                  </p>
                  <p>
                    Calling services must comply with local telecommunication laws, spam/solicitation regulations, and Do-Not-Call (DNC) registries. OVC does not guarantee sales results, conversion rates, lead quality, or customer compliance.
                  </p>
                </div>
              </div>

              {/* Section 8: Dormant Account Policy */}
              <div className="mb-12">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-rich-black mb-6">
                  8. Dormant Account Policy
                </h2>
                
                <div className="space-y-4 text-rich-black/70 leading-relaxed">
                  <p>
                    A client may be marked "Dormant" when they do not engage or respond for 15 consecutive days. Before classification, OVC performs a structured outreach process including email notifications and phone follow-ups.
                  </p>
                  <p>
                    Once classified as dormant: all ongoing services are paused, the full subscription amount for the cycle is refunded automatically, and any dedicated assistant may be reassigned. Reactivation requires a new subscription payment.
                  </p>
                </div>
              </div>

              {/* Section 9: Refund & Cancellation */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-tomato/10 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-tomato" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-rich-black">
                    9. Refund & Cancellation Policy
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-rich-black mb-2">Refunds Granted For:</h3>
                    <ul className="list-disc list-inside space-y-2 text-rich-black/70 ml-4">
                      <li>Unused hours (at OVC's discretion)</li>
                      <li>Dormant account status</li>
                      <li>Service discontinuation by OVC</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-rich-black mb-2">Non-Refundable Charges:</h3>
                    <ul className="list-disc list-inside space-y-2 text-rich-black/70 ml-4">
                      <li>Used hours</li>
                      <li>Completed deliverables</li>
                      <li>Dialer fees</li>
                      <li>External platform costs</li>
                      <li>Channel Partner subscriptions (first month)</li>
                    </ul>
                  </div>
                  
                  <p className="text-rich-black/70 leading-relaxed">
                    Refunds are generally processed within 7–21 business days, depending on banks, payment gateways, and geographic factors.
                  </p>
                </div>
              </div>

              {/* Section 10: Disclaimers & Limitations */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-tomato/10 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-tomato" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-rich-black">
                    10. Disclaimers & Limitations
                  </h2>
                </div>
                
                <div className="space-y-4 text-rich-black/70 leading-relaxed">
                  <p>
                    <strong className="text-rich-black">No Guarantee of Business Outcomes:</strong> OVC provides operational and administrative support but does not guarantee measurable outcomes such as revenue increase, lead conversion, or business profitability.
                  </p>
                  <p>
                    <strong className="text-rich-black">No Assurances Regarding Social Media Performance:</strong> OVC does not guarantee follower growth, viral content performance, engagement improvement, or reach.
                  </p>
                  <p>
                    <strong className="text-rich-black">No Liability for External Platform Issues:</strong> OVC is not liable for disruptions caused by third-party platforms including social media outages, API failures, or payment gateway issues.
                  </p>
                  <p>
                    <strong className="text-rich-black">Limitation of Liability:</strong> To the fullest extent permitted by law, OVC's total liability for any claim, damage, or loss shall be strictly limited to the total subscription fees paid by the Client in the preceding 30 days.
                  </p>
                </div>
              </div>

              {/* Section 11: Intellectual Property */}
              <div className="mb-12">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-rich-black mb-6">
                  11. Intellectual Property
                </h2>
                
                <p className="text-rich-black/70 leading-relaxed mb-4">
                  All materials in the Services, including text, software, photos, video, graphics, music, sound, the OVC Logo, and trademarks are the property of the Company and/or its affiliates or licensors, and are protected by international/Indian copyright and trademark laws.
                </p>
                <p className="text-rich-black/70 leading-relaxed">
                  All content created by OVC is transferred to the Client only after full payment. OVC retains internal drafts, templates, and source files not explicitly purchased.
                </p>
              </div>

              {/* Section 12: Confidentiality */}
              <div className="mb-12">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-rich-black mb-6">
                  12. Confidential Information
                </h2>
                
                <p className="text-rich-black/70 leading-relaxed mb-4">
                  All tangible and intangible information obtained or disclosed, including documents, data, business or customer information, trade secrets and processes relating to the business practices, is deemed confidential and proprietary information of OVC.
                </p>
                <p className="text-rich-black/70 leading-relaxed">
                  You will ensure that the Confidential Information is not used in any manner incompatible or inconsistent with that authorized by OVC and will take necessary action to protect it against misuse, loss or destruction.
                </p>
              </div>

              {/* Section 13: Governing Law */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-tomato/10 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-tomato" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-rich-black">
                    13. Governing Law & Dispute Resolution
                  </h2>
                </div>
                
                <p className="text-rich-black/70 leading-relaxed">
                  These Terms and your use of our Services shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any disputes arising out of or relating to these Terms shall be resolved through binding arbitration in accordance with the rules of the Arbitration and Conciliation Act, 1996.
                </p>
              </div>

              {/* Section 14: Force Majeure */}
              <div className="mb-12">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-rich-black mb-6">
                  14. Force Majeure
                </h2>
                
                <p className="text-rich-black/70 leading-relaxed">
                  Neither OVC nor you shall be liable for failure to timely perform the Services to the extent that its performance is delayed by a force majeure event including earthquakes, floods, fires, hurricanes, acts of terrorism, civil unrest, epidemics, and labor strikes. If a Force Majeure Event continues for more than 15 days, either party may terminate your use and access of the Services.
                </p>
              </div>

              {/* Section 15: Policy Modifications */}
              <div className="mb-12">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-rich-black mb-6">
                  15. Changes/Modifications to Terms
                </h2>
                
                <p className="text-rich-black/70 leading-relaxed">
                  We reserve the right to modify or update these Terms at any time. Any changes will be effective immediately upon posting the updated Terms on our website. Your continued use of our Services after the posting of any changes constitutes your acceptance of the modified Terms.
                </p>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-br from-pale-dogwood/30 to-white-smoke rounded-2xl p-8 border border-platinum/50">
                <h2 className="font-heading text-2xl font-bold text-rich-black mb-4">
                  Contact Us
                </h2>
                <p className="text-rich-black/70 leading-relaxed mb-4">
                  If you have any questions or concerns about these Terms, please contact us at:
                </p>
                <ul className="space-y-2 text-rich-black/70">
                  <li><strong className="text-rich-black">Email:</strong> virtual.care@orangevirtualconnect.com</li>
                  <li><strong className="text-rich-black">Phone:</strong> +1 (909) 634-2861</li>
                </ul>
                <p className="text-rich-black/70 leading-relaxed mt-4">
                  For any queries or issues, you can speak to the respective relationship manager from 10:00 AM to 7:00 PM available from Monday to Saturday.
                </p>
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


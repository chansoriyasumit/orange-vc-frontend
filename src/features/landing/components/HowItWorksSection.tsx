// 'use client';

// import { UserPlus, Users, ClipboardList, CheckCircle, ArrowRight } from 'lucide-react';
// import { motion } from 'motion/react';

// const steps = [
//   {
//     number: 1,
//     icon: UserPlus,
//     title: 'Choose Your Plan',
//     description: 'Select a plan that fits your needs, register, and complete your onboarding. You\'ll receive a welcome email with all the details.',
//     accent: 'from-tomato to-tomato-600',
//     bgGradient: 'from-tomato/5 to-tomato/10',
//   },
//   {
//     number: 2,
//     icon: Users,
//     title: 'Get Matched with Your VA',
//     description: 'We assign a skilled virtual assistant based on your requirements and time zone. An intro call confirms your communication preferences.',
//     accent: 'from-tomato-600 to-tomato',
//     bgGradient: 'from-tomato-600/5 to-tomato/10',
//   },
//   {
//     number: 3,
//     icon: ClipboardList,
//     title: 'Submit & Delegate Tasks',
//     description: 'Send tasks via email or our portal. Your VA acknowledges, researches, coordinates, and completes each task with precision.',
//     accent: 'from-tomato to-tomato-600',
//     bgGradient: 'from-tomato/5 to-tomato/10',
//   },
//   {
//     number: 4,
//     icon: CheckCircle,
//     title: 'Review & Grow',
//     description: 'Receive completed work with weekly reports and time tracking. Share feedback for continuous improvement and seamless support.',
//     accent: 'from-tomato-600 to-tomato',
//     bgGradient: 'from-tomato-600/5 to-tomato/10',
//   },
// ];

// export function HowItWorksSection() {
//   return (
//     <section
//       id="how-it-works"
//       className="bg-gradient-to-br from-pale-dogwood/20 via-white-smoke to-white py-16 sm:py-20 lg:py-24 relative overflow-hidden"
//     >
//       {/* Decorative background elements */}
//       <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-tomato/5 rounded-full blur-3xl" />
//       <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-72 sm:h-72 bg-pale-dogwood/50 rounded-full blur-3xl" />

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12 sm:mb-16"
//         >
//           <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-tomato/10 text-tomato font-semibold text-xs sm:text-sm mb-4">
//             How It Works
//           </span>
//           <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-rich-black mb-4 px-4">
//             Your Journey to Productivity
//           </h2>
//           <p className="text-base sm:text-lg text-rich-black/70 max-w-2xl mx-auto px-4">
//             Experience how effortless your day can feel when the right team has your back
//           </p>
//         </motion.div>

//         {/* Desktop: Enhanced Timeline Layout */}
//         <div className="hidden lg:block max-w-7xl mx-auto">
//           <div className="relative">
//             {/* Enhanced connecting line with gradient */}
//             <div className="absolute top-28 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-tomato/30 via-tomato to-tomato/30 to-transparent" />
            
//             <div className="grid grid-cols-4 gap-6 xl:gap-8">
//               {steps.map((step, index) => (
//                 <motion.div
//                   key={step.number}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   className="relative group"
//                 >
//                   {/* Step Card */}
//                   <div className="relative bg-white rounded-2xl p-6 xl:p-8 border border-platinum/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
//                     {/* Step number circle */}
//                     <div className="relative mx-auto mb-6">
//                       <div className={`w-20 h-20 xl:w-24 xl:h-24 rounded-2xl bg-gradient-to-br ${step.accent} flex items-center justify-center text-white shadow-lg shadow-tomato/25 mx-auto relative z-10 group-hover:scale-110 transition-transform duration-300`}>
//                         <step.icon className="w-9 h-9 xl:w-11 xl:h-11" />
//                       </div>
//                       {/* Number badge */}
//                       <div className="absolute -top-2 -right-2 w-8 h-8 xl:w-10 xl:h-10 rounded-full bg-white border-2 border-tomato flex items-center justify-center text-sm xl:text-base font-bold text-tomato shadow-md">
//                         {step.number}
//                       </div>
//                     </div>

//                     {/* Content */}
//                     <div className="text-center">
//                       <h3 className="font-heading text-lg xl:text-xl font-bold text-rich-black mb-3 group-hover:text-tomato transition-colors">
//                         {step.title}
//                       </h3>
//                       <p className="text-rich-black/70 leading-relaxed text-sm xl:text-base">
//                         {step.description}
//                       </p>
//                     </div>

//                     {/* Hover arrow indicator */}
//                     {index < steps.length - 1 && (
//                       <div className="absolute top-1/2 -right-3 xl:-right-4 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <div className="w-6 h-6 xl:w-8 xl:h-8 rounded-full bg-tomato flex items-center justify-center">
//                           <ArrowRight className="w-3 h-3 xl:w-4 xl:h-4 text-white" />
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Tablet: 2 Column Grid */}
//         <div className="hidden md:block lg:hidden max-w-4xl mx-auto">
//           <div className="grid grid-cols-2 gap-6">
//             {steps.map((step, index) => (
//               <motion.div
//                 key={step.number}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="relative group"
//               >
//                 <div className="relative bg-white rounded-2xl p-6 border border-platinum/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
//                   <div className="relative mx-auto mb-6">
//                     <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.accent} flex items-center justify-center text-white shadow-lg shadow-tomato/25 mx-auto relative z-10 group-hover:scale-110 transition-transform duration-300`}>
//                       <step.icon className="w-9 h-9" />
//                     </div>
//                     <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-tomato flex items-center justify-center text-sm font-bold text-tomato shadow-md">
//                       {step.number}
//                     </div>
//                   </div>
//                   <div className="text-center">
//                     <h3 className="font-heading text-lg font-bold text-rich-black mb-3 group-hover:text-tomato transition-colors">
//                       {step.title}
//                     </h3>
//                     <p className="text-rich-black/70 leading-relaxed text-sm">
//                       {step.description}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Mobile: Enhanced Vertical Timeline */}
//         <div className="md:hidden w-full px-2 sm:px-4">
//           <div className="relative max-w-lg mx-auto">
//             {/* Enhanced vertical connecting line */}
//             <div className="absolute top-0 bottom-0 left-6 sm:left-8 w-1 bg-gradient-to-b from-tomato via-tomato-600 to-tomato" />
            
//             <div className="space-y-6 sm:space-y-8">
//               {steps.map((step, index) => (
//                 <motion.div
//                   key={step.number}
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   className="relative flex gap-4 sm:gap-6 ml-8 sm:ml-12"
//                 >
//                   {/* Icon circle */}
//                   <div className="relative flex-shrink-0 -ml-8 sm:-ml-12">
//                     <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${step.accent} flex items-center justify-center text-white shadow-lg shadow-tomato/25 relative z-10`}>
//                       <step.icon className="w-6 h-6 sm:w-8 sm:h-8" />
//                     </div>
//                   </div>

//                   {/* Content Card */}
//                   <div className="relative flex-1 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-platinum/50 shadow-sm min-w-0">
//                     {/* Number badge on top of card */}
//                     <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-rich-black flex items-center justify-center text-white text-sm sm:text-base font-bold shadow-lg z-20">
//                       {step.number}
//                     </div>
                    
//                     <h3 className="font-heading text-base sm:text-lg font-bold text-rich-black mb-2 mt-1">
//                       {step.title}
//                     </h3>
//                     <p className="text-rich-black/70 leading-relaxed text-sm sm:text-base">
//                       {step.description}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Bottom note - Enhanced */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="mt-12 sm:mt-16 text-center"
//         >
//           <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-white border border-platinum/50 shadow-sm max-w-2xl">
//             <div className="flex items-center gap-2">
//               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//               <span className="text-rich-black font-semibold text-sm sm:text-base">
//                 Transparent & Reliable
//               </span>
//             </div>
//             <span className="hidden sm:inline text-rich-black/40">•</span>
//             <span className="text-rich-black/70 text-xs sm:text-sm text-center sm:text-left">
//               Weekly reports, time tracking, and continuous improvement
//             </span>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

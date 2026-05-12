"use client";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-32 min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1746292184556-04b7eaefe97d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGVtYWlsJTIwYW5kJTIwY2FsbHxlbnwwfHwwfHx8MA%3D%3D')" }}
      ></div>
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[3px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-[42px] md:text-[42px] font-bold text-gray-900">
            Get in <span className="text-[#fc3fb4]">Touch</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Have questions about Modeweltjob? Our team is here to help you find the best talent or your next dream job.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-[#fc3fb4]/10 rounded-full flex items-center justify-center mb-4">
              <Mail className="text-[#fc3fb4] w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">Send us an email and we'll get back to you within 24 hours.</p>
            <a href="mailto:contact.us@befog.in" className="text-[#fc3fb4] font-semibold hover:underline">
              contact.us@befog.in
            </a>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-[#fc3fb4]/10 rounded-full flex items-center justify-center mb-4">
              <Phone className="text-[#fc3fb4] w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Speak directly with our support team for urgent matters.</p>
            <span className="text-[#fc3fb4] font-semibold">+91 (Your Phone Number)</span>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-[#fc3fb4]/10 rounded-full flex items-center justify-center mb-4">
              <MapPin className="text-[#fc3fb4] w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Visit Us</h3>
            <p className="text-gray-600 mb-4">Check out our office or send us mail at our headquarters.</p>
            <span className="text-gray-600 italic">Befog, India</span>
          </div>
        </div>
      </div>
    </section>
  );
}

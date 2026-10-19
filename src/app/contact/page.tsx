'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Check, Send, Sparkles } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24 font-sans">
      {/* Header */}
      <div className="bg-[#FCFAF9] border-b border-[#ECE7E6] py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C58C97] font-medium block">
            PRIVATE CLIENT CONCIERGE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#171515]">
            Contact Us
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6767] font-light max-w-lg mx-auto leading-relaxed">
            Our dedicated maison advisors in Paris and Florence are at your disposal for shade-matching, bridal consultations, and order assistance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]} />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Inquiries Form */}
          <div className="lg:col-span-7 bg-[#FCFAF9] border border-[#ECE7E6] p-8 sm:p-12">
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#171515] mb-2">
              Send a Private Message
            </h2>
            <p className="text-xs text-[#6E6767] font-light mb-8">
              We respond to all client correspondences within 24 hours.
            </p>

            {submitted ? (
              <div className="p-8 bg-[#FFFFFF] border border-[#ECE7E6] text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#E9C9CE] text-[#171515] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#171515]">Message Inscribed</h3>
                <p className="text-xs text-[#6E6767] font-light max-w-sm mx-auto">
                  Thank you, {formData.name}. A senior client concierge has received your request and will reach out to {formData.email} shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 text-xs uppercase tracking-widest bg-[#171515] text-[#FCFAF9] hover:bg-[#292526] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-[#171515] font-medium block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Lady Clara Vance"
                      className="w-full bg-[#FFFFFF] border border-[#ECE7E6] px-4 py-3 text-xs text-[#171515] focus:outline-none focus:border-[#171515] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-[#171515] font-medium block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="clara@example.com"
                      className="w-full bg-[#FFFFFF] border border-[#ECE7E6] px-4 py-3 text-xs text-[#171515] focus:outline-none focus:border-[#171515] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-[#171515] font-medium block">
                      Contact Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-[#FFFFFF] border border-[#ECE7E6] px-4 py-3 text-xs text-[#171515] focus:outline-none focus:border-[#171515] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-[#171515] font-medium block">
                      Inquiry Category *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#FFFFFF] border border-[#ECE7E6] px-4 py-3 text-xs text-[#171515] focus:outline-none focus:border-[#171515] transition-colors"
                    >
                      <option value="general">General Maison Inquiries</option>
                      <option value="order">Order Status & Delivery Inquiries</option>
                      <option value="bridal">Bridal Makeup Suite Consultation</option>
                      <option value="leather">Leather Goods & Custom Embossing</option>
                      <option value="returns">Returns & Exchange Concierge</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[#171515] font-medium block">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe how our concierge may assist your ritual or styling..."
                    className="w-full bg-[#FFFFFF] border border-[#ECE7E6] p-4 text-xs text-[#171515] focus:outline-none focus:border-[#171515] transition-colors leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-widest px-10 py-4 hover:bg-[#292526] transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Coordinates & Salons */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Contact Cards */}
            <div className="p-8 bg-[#FCFAF9] border border-[#ECE7E6] space-y-6">
              <h3 className="font-serif text-xl text-[#171515] border-b border-[#ECE7E6] pb-3">
                Concierge Desks
              </h3>

              <div className="space-y-4 text-xs font-light text-[#6E6767]">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C58C97] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#171515] block font-normal">Electronic Mail</strong>
                    <a href="mailto:concierge@elegantstyle.com" className="hover:text-[#171515] transition-colors">
                      concierge@elegantstyle.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C58C97] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#171515] block font-normal">Telephone Assistance</strong>
                    <p>International: +33 (0)1 42 68 55 00</p>
                    <p>US Toll-Free: +1 (800) 492-3855</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C58C97] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#171515] block font-normal">Operating Hours</strong>
                    <p>Monday – Saturday: 9:00 AM – 8:00 PM CET</p>
                    <p>Sunday: 11:00 AM – 5:00 PM CET</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Atelier Locations */}
            <div className="p-8 bg-[#171515] text-[#FCFAF9] space-y-6">
              <h3 className="font-serif text-xl text-[#FFFFFF] border-b border-[#292526] pb-3">
                Flagship Salons
              </h3>

              <div className="space-y-4 text-xs font-light text-[#A8A19F]">
                <div>
                  <strong className="text-[#FCFAF9] block font-normal text-sm font-serif">Paris Flagship</strong>
                  <p>18 Place Vendôme, 75001 Paris, France</p>
                </div>
                <div>
                  <strong className="text-[#FCFAF9] block font-normal text-sm font-serif">Florence Leather Studio</strong>
                  <p>Via de’ Tornabuoni 24, 50123 Firenze, Italy</p>
                </div>
                <div>
                  <strong className="text-[#FCFAF9] block font-normal text-sm font-serif">New York Boutique</strong>
                  <p>720 Madison Avenue, New York, NY 10065, USA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

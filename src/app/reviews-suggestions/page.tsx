'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, CheckCircle2, MessageSquare, ThumbsUp, Send, Sparkles, Filter } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

interface FeedbackItem {
  id: string;
  userName: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  category: string;
  type: 'review' | 'suggestion';
  verified: boolean;
}

const INITIAL_REVIEWS: FeedbackItem[] = [
  {
    id: 'rev-1',
    userName: 'Contessa Beatrice R.',
    location: 'Florence, Italy',
    rating: 5,
    date: 'September 2026',
    title: 'The Bridal Radiance Suite is unmatched',
    comment: 'I purchased the Royal Bridal Couture Suite for my Tuscan wedding. The satin finish stayed luminous across 14 hours of sunlight, tears, and dancing. Outstanding botanical formulation.',
    category: 'Bridal Makeup Deals',
    type: 'review',
    verified: true
  },
  {
    id: 'rev-2',
    userName: 'Genevieve D.',
    location: 'Paris, France',
    rating: 5,
    date: 'August 2026',
    title: 'Florentine leather that rivals historic heritage houses',
    comment: 'The Palais Structured Calfskin Handbag is exceptional. The leather aroma, hand-burnished edges, and weight of the gold-plated clasp demonstrate sublime mastery.',
    category: 'Hand Bags',
    type: 'review',
    verified: true
  },
  {
    id: 'rev-3',
    userName: 'Arthur H.',
    location: 'London, UK',
    rating: 5,
    date: 'August 2026',
    title: 'Académie School Belt – Outstanding quality for children',
    comment: 'Finally a genuine full-grain leather school belt for junior students that does not crack or peel after two months of wear. Extremely solid nickel-free buckle.',
    category: 'School Belts',
    type: 'review',
    verified: true
  },
  {
    id: 'rev-4',
    userName: 'Sora K.',
    location: 'Tokyo, Japan',
    rating: 5,
    date: 'July 2026',
    title: 'Suggestion for travel-sized botanical face cleanser',
    comment: 'The Lumière serum and Velours cream have transformed my skin hydration during flights. My suggestion is to create a 30ml travel wash to complete the in-flight kit!',
    category: 'Skincare',
    type: 'suggestion',
    verified: true
  }
];

export default function ReviewsSuggestionsPage() {
  const [reviews, setReviews] = useState<FeedbackItem[]>(INITIAL_REVIEWS);
  const [activeTab, setActiveTab] = useState<'all' | 'review' | 'suggestion'>('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form state
  const [formType, setFormType] = useState<'review' | 'suggestion'>('review');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [userName, setUserName] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('Makeup');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const filtered = activeTab === 'all'
    ? reviews
    : reviews.filter(r => r.type === activeTab);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim() || !title.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newItem: FeedbackItem = {
        id: `rev-${Date.now()}`,
        userName,
        location: location || 'Global Client',
        rating,
        date: 'Just now',
        title,
        comment,
        category,
        type: formType,
        verified: true
      };

      setReviews([newItem, ...reviews]);
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setTitle('');
      setComment('');
      setUserName('');
      setLocation('');
    }, 500);
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24 font-sans">
      {/* Header */}
      <div className="bg-[#FCFAF9] border-b border-[#ECE7E6] py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C58C97] font-medium block">
            PATRON TESTIMONIALS & SUGGESTIONS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#171515]">
            Reviews & Suggestions
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6767] font-light max-w-xl mx-auto leading-relaxed">
            Your voice shapes each future formulation and leather atelier iteration. Explore authentic patron reviews or submit your personal recommendations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Reviews & Suggestions' }]} />

        {/* Rating Metrics Bar */}
        <div className="mt-8 bg-[#171515] text-[#FCFAF9] p-8 sm:p-10 grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#E9C9CE] block">
              OVERALL PATRON SCORE
            </span>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-serif text-4xl text-[#FFFFFF]">4.95</span>
              <div className="flex text-[#E9C9CE]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
            <span className="text-xs text-[#A8A19F] font-light">Based on 1,840+ verified patrons</span>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-[#292526] pt-4 md:pt-0 md:pl-6">
            <span className="text-[10px] uppercase tracking-widest text-[#E9C9CE] block">
              FORMULATION EFFICACY
            </span>
            <span className="font-serif text-2xl text-[#FFFFFF]">99.2%</span>
            <p className="text-xs text-[#A8A19F] font-light">Report visible glow and hydration</p>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-[#292526] pt-4 md:pt-0 md:pl-6">
            <span className="text-[10px] uppercase tracking-widest text-[#E9C9CE] block">
              LEATHER CRAFTSMANSHIP
            </span>
            <span className="font-serif text-2xl text-[#FFFFFF]">100%</span>
            <p className="text-xs text-[#A8A19F] font-light">Full-grain Tuscan calfskin certified</p>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-[#292526] pt-4 md:pt-0 md:pl-6">
            <span className="text-[10px] uppercase tracking-widest text-[#E9C9CE] block">
              DELIVERY ON TIME
            </span>
            <span className="font-serif text-2xl text-[#FFFFFF]">98.7%</span>
            <p className="text-xs text-[#A8A19F] font-light">Delivered within committed period</p>
          </div>
        </div>

        {/* Content Columns: Left Reviews List, Right Submit Feedback */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Feedbacks List */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ECE7E6] pb-4">
              <h2 className="font-serif text-2xl font-light text-[#171515]">
                Verified Patron Experiences ({filtered.length})
              </h2>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 text-xs uppercase tracking-widest transition-colors ${
                    activeTab === 'all'
                      ? 'bg-[#171515] text-[#FCFAF9]'
                      : 'bg-[#FCFAF9] text-[#6E6767] hover:text-[#171515]'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab('review')}
                  className={`px-3 py-1.5 text-xs uppercase tracking-widest transition-colors ${
                    activeTab === 'review'
                      ? 'bg-[#171515] text-[#FCFAF9]'
                      : 'bg-[#FCFAF9] text-[#6E6767] hover:text-[#171515]'
                  }`}
                >
                  Reviews
                </button>
                <button
                  onClick={() => setActiveTab('suggestion')}
                  className={`px-3 py-1.5 text-xs uppercase tracking-widest transition-colors ${
                    activeTab === 'suggestion'
                      ? 'bg-[#171515] text-[#FCFAF9]'
                      : 'bg-[#FCFAF9] text-[#6E6767] hover:text-[#171515]'
                  }`}
                >
                  Suggestions
                </button>
              </div>
            </div>

            {/* List */}
            <div className="space-y-6">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FCFAF9] border border-[#ECE7E6] p-6 sm:p-7 space-y-4 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="flex text-[#C58C97]">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-[#FFFFFF] border border-[#ECE7E6] text-[#171515] font-medium">
                          {item.type === 'suggestion' ? 'Suggestion' : 'Verified Review'}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg text-[#171515] font-light">
                        {item.title}
                      </h3>
                    </div>

                    <span className="text-[10px] text-[#A8A19F] uppercase tracking-widest whitespace-nowrap">
                      {item.date}
                    </span>
                  </div>

                  <p className="text-xs text-[#6E6767] font-light leading-relaxed">
                    {item.comment}
                  </p>

                  <div className="pt-2 border-t border-[#ECE7E6]/70 flex items-center justify-between text-[11px] text-[#6E6767]">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-[#171515]">{item.userName}</span>
                      <span>•</span>
                      <span>{item.location}</span>
                    </div>

                    <span className="text-[10px] uppercase tracking-widest text-[#C58C97]">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Feedback & Suggestions Form */}
          <div className="lg:col-span-5 bg-[#FCFAF9] border border-[#ECE7E6] p-6 sm:p-8 h-fit space-y-6">
            <div className="border-b border-[#ECE7E6] pb-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C58C97] font-medium block">
                SHARE YOUR VOICE
              </span>
              <h3 className="font-serif text-2xl font-light text-[#171515]">
                Feedback & Suggestions
              </h3>
              <p className="text-xs text-[#6E6767] font-light mt-1">
                Help us elevate the Maison experience. We value every thoughtful review and suggestion.
              </p>
            </div>

            {submittedSuccess ? (
              <div className="p-6 bg-[#FFFFFF] border border-[#ECE7E6] text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#C58C97] mx-auto" />
                <h4 className="font-serif text-xl text-[#171515]">Thank You For Your Voice</h4>
                <p className="text-xs text-[#6E6767] font-light leading-relaxed">
                  Your feedback has been added to our ledger and transmitted to our product formulation & atelier council.
                </p>
                <button
                  onClick={() => setSubmittedSuccess(false)}
                  className="mt-2 text-xs uppercase tracking-widest text-[#C58C97] hover:text-[#171515] underline"
                >
                  Submit Another Feedback
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Type Selection */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormType('review')}
                    className={`py-2.5 text-xs uppercase tracking-widest transition-all ${
                      formType === 'review'
                        ? 'bg-[#171515] text-[#FCFAF9] font-medium'
                        : 'bg-[#FFFFFF] text-[#6E6767] border border-[#ECE7E6]'
                    }`}
                  >
                    Product Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormType('suggestion')}
                    className={`py-2.5 text-xs uppercase tracking-widest transition-all ${
                      formType === 'suggestion'
                        ? 'bg-[#171515] text-[#FCFAF9] font-medium'
                        : 'bg-[#FFFFFF] text-[#6E6767] border border-[#ECE7E6]'
                    }`}
                  >
                    Suggestion
                  </button>
                </div>

                {/* Rating Stars */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-widest text-[#171515] block">
                    Your Rating:
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= (hoverRating || rating)
                              ? 'text-[#C58C97] fill-current'
                              : 'text-[#ECE7E6]'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-[#6E6767] ml-2 font-light">({rating} of 5 Stars)</span>
                  </div>
                </div>

                {/* Name & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#171515] block">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor V."
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#ECE7E6] px-3 py-2.5 text-xs text-[#171515] focus:outline-none focus:border-[#171515]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#171515] block">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="City, Country"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#ECE7E6] px-3 py-2.5 text-xs text-[#171515] focus:outline-none focus:border-[#171515]"
                    />
                  </div>
                </div>

                {/* Category Select */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-[#171515] block">
                    Product or Topic *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#ECE7E6] px-3 py-2.5 text-xs text-[#171515] focus:outline-none focus:border-[#171515]"
                  >
                    <option value="Makeup">Makeup & Lip Colors</option>
                    <option value="Skincare">Skincare Elixirs</option>
                    <option value="Belts">Belts & Calfskin</option>
                    <option value="Hand Bags">Hand Bags & Totes</option>
                    <option value="School Belts">School Belts</option>
                    <option value="Bridal Makeup Deals">Bridal Makeup Deals</option>
                    <option value="Party Makeup Deals">Party Makeup Deals</option>
                    <option value="Makeup Deals">Makeup Deals</option>
                    <option value="Delivery Period">Delivery Period & Shipping</option>
                    <option value="Return Policy">Return Policy & Service</option>
                  </select>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-[#171515] block">
                    Headline Summary *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Brief summary of your review or idea..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#ECE7E6] px-3 py-2.5 text-xs text-[#171515] focus:outline-none focus:border-[#171515]"
                  />
                </div>

                {/* Comment */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-[#171515] block">
                    Detailed Feedback or Suggestion *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Share your detailed impressions, thoughts on formulation, leather feel, or ideas for future collections..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#ECE7E6] p-3 text-xs text-[#171515] focus:outline-none focus:border-[#171515]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-widest py-3.5 hover:bg-[#292526] transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Inscribing...' : 'Submit Feedback & Suggestion'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

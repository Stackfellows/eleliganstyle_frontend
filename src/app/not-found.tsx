import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-[#FCFAF9] min-h-[75vh] flex items-center justify-center font-sans text-[#171515] p-6">
      <div className="max-w-md w-full text-center space-y-6 bg-[#FFFFFF] border border-[#ECE7E6] p-10 shadow-sm">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C58C97] font-medium block">
          ERROR 404 — PAGE NOT FOUND
        </span>

        <h1 className="font-serif text-4xl font-light text-[#171515]">
          A Quiet Absence
        </h1>

        <p className="text-xs text-[#6E6767] font-light leading-relaxed">
          The formulation, article, or section you are seeking has been moved or does not exist within the ElegantStyle ledger.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-block bg-[#171515] text-[#FCFAF9] text-xs uppercase tracking-[0.2em] py-3.5 px-8 hover:bg-[#292526] transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

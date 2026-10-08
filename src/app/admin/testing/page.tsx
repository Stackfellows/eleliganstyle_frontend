'use client';

import React, { useState } from 'react';
import {
  Terminal,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  Shield,
  User,
  Sparkles,
  Copy,
  Check,
  RefreshCw
} from 'lucide-react';

interface TestResult {
  endpoint: string;
  method: string;
  role: 'Admin' | 'User';
  status: 'PENDING' | 'PASS' | 'FAIL';
  statusCode?: number;
  timeMs?: number;
  responsePayload?: any;
}

export default function AdminApiTestingPage() {
  const [runningAll, setRunningAll] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [testCases, setTestCases] = useState<TestResult[]>([
    {
      endpoint: '/api/auth/login',
      method: 'POST',
      role: 'Admin',
      status: 'PENDING',
    },
    {
      endpoint: '/api/products',
      method: 'GET',
      role: 'User',
      status: 'PENDING',
    },
    {
      endpoint: '/api/products/rouge-opera-satin-silk-lipstick',
      method: 'GET',
      role: 'User',
      status: 'PENDING',
    },
    {
      endpoint: '/api/admin/products',
      method: 'POST',
      role: 'Admin',
      status: 'PENDING',
    },
    {
      endpoint: '/api/offers',
      method: 'GET',
      role: 'User',
      status: 'PENDING',
    },
    {
      endpoint: '/api/admin/offers',
      method: 'POST',
      role: 'Admin',
      status: 'PENDING',
    },
    {
      endpoint: '/api/orders',
      method: 'POST',
      role: 'User',
      status: 'PENDING',
    },
    {
      endpoint: '/api/upload/cloudinary',
      method: 'POST',
      role: 'Admin',
      status: 'PENDING',
    },
  ]);

  const runSingleTest = async (index: number) => {
    const test = testCases[index];
    const startTime = performance.now();

    try {
      let res: Response;
      let bodyData: any = null;

      if (test.endpoint === '/api/auth/login') {
        res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'admin@elegantstyle.com', password: 'admin123' })
        });
      } else if (test.endpoint === '/api/products') {
        res = await fetch('/api/products?mainCategory=beauty');
      } else if (test.endpoint.startsWith('/api/products/')) {
        res = await fetch(test.endpoint);
      } else if (test.endpoint === '/api/admin/products' && test.method === 'POST') {
        res = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Test Bio-Resilience Fluid',
            mainCategory: 'beauty',
            subcategory: 'skin-care',
            price: 110.00,
            images: [
              'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop'
            ]
          })
        });
      } else if (test.endpoint === '/api/offers') {
        res = await fetch('/api/offers');
      } else if (test.endpoint === '/api/admin/offers' && test.method === 'POST') {
        res = await fetch('/api/admin/offers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: 'Test Bridal Suite Deal',
            dealCategory: 'bridal-makeup-deals',
            originalPrice: 350,
            discountedPrice: 220,
            savingsPercentage: 37
          })
        });
      } else if (test.endpoint === '/api/orders' && test.method === 'POST') {
        res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerName: 'Test Client',
            customerPhone: '+92 300 1234567',
            customerEmail: 'test@maison.pk',
            shippingAddress: {
              street: 'Mall Road, Gulberg',
              city: 'Lahore',
              province: 'Punjab',
              postalCode: '54000'
            },
            items: [{ productName: 'Test Item', quantity: 1, pricePKR: 25000 }],
            totalPKR: 25000,
            paymentMethod: 'Cash on Delivery (COD)'
          })
        });
      } else if (test.endpoint === '/api/upload/cloudinary') {
        const formData = new FormData();
        const dummyBlob = new Blob(['test image content'], { type: 'image/jpeg' });
        formData.append('file', dummyBlob, 'test.jpg');
        res = await fetch('/api/upload/cloudinary', {
          method: 'POST',
          body: formData
        });
      } else {
        res = await fetch(test.endpoint, { method: test.method });
      }

      const duration = Math.round(performance.now() - startTime);
      bodyData = await res.json();

      setTestCases((prev) => {
        const copy = [...prev];
        copy[index] = {
          ...copy[index],
          status: res.ok ? 'PASS' : 'FAIL',
          statusCode: res.status,
          timeMs: duration,
          responsePayload: bodyData
        };
        return copy;
      });
    } catch (e: any) {
      const duration = Math.round(performance.now() - startTime);
      setTestCases((prev) => {
        const copy = [...prev];
        copy[index] = {
          ...copy[index],
          status: 'FAIL',
          statusCode: 500,
          timeMs: duration,
          responsePayload: { error: e.message || 'Request network error' }
        };
        return copy;
      });
    }
  };

  const handleRunAll = async () => {
    setRunningAll(true);
    for (let i = 0; i < testCases.length; i++) {
      await runSingleTest(i);
    }
    setRunningAll(false);
  };

  const handleCopyJSON = (data: any, idx: number) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#242022] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#262123] text-[#E9C9CE] text-[10px] uppercase tracking-widest font-mono mb-1">
            <Terminal className="w-3.5 h-3.5 text-[#E9C9CE]" />
            <span>Interactive API Test Runner</span>
          </div>
          <h1 className="font-serif text-2xl text-[#FFFFFF]">Maison API Testing Suite</h1>
          <p className="text-xs text-[#7A7375]">
            Execute and verify every REST endpoint as Admin or User with real payload responses.
          </p>
        </div>

        <button
          onClick={handleRunAll}
          disabled={runningAll}
          className="px-5 py-2.5 bg-[#E9C9CE] hover:bg-[#F3D7DC] text-[#171515] font-medium text-xs tracking-wider uppercase rounded transition-all flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 shrink-0"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>{runningAll ? 'Testing APIs...' : 'Run All API Tests'}</span>
        </button>
      </div>

      {/* Test Cases Table */}
      <div className="space-y-4">
        {testCases.map((test, idx) => (
          <div
            key={idx}
            className="bg-[#141213] border border-[#242022] rounded-lg p-4 space-y-3 transition-colors hover:border-[#3A3134]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded uppercase ${
                    test.method === 'GET'
                      ? 'bg-blue-950 text-blue-300 border border-blue-800'
                      : test.method === 'POST'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-purple-950 text-purple-300 border border-purple-800'
                  }`}
                >
                  {test.method}
                </span>

                <span className="font-mono text-xs text-[#FFFFFF] font-medium">{test.endpoint}</span>

                <span
                  className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded font-mono ${
                    test.role === 'Admin'
                      ? 'bg-[#262123] text-[#E9C9CE] border border-[#3A3134]'
                      : 'bg-[#1A1718] text-[#A8A19F] border border-[#2B2527]'
                  }`}
                >
                  {test.role === 'Admin' ? <Shield className="w-3 h-3 text-[#E9C9CE]" /> : <User className="w-3 h-3" />}
                  <span>{test.role} Persona</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                {test.status === 'PASS' && (
                  <span className="flex items-center gap-1 text-emerald-400 text-xs font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>PASS ({test.statusCode}) • {test.timeMs}ms</span>
                  </span>
                )}

                {test.status === 'FAIL' && (
                  <span className="flex items-center gap-1 text-red-400 text-xs font-mono">
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span>FAIL ({test.statusCode})</span>
                  </span>
                )}

                {test.status === 'PENDING' && (
                  <span className="text-[#7A7375] text-xs font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Not Executed</span>
                  </span>
                )}

                <button
                  onClick={() => runSingleTest(idx)}
                  className="px-3 py-1 bg-[#1A1718] border border-[#2B2527] hover:border-[#E9C9CE] text-[#E9C9CE] text-xs rounded transition-colors"
                >
                  Run Test
                </button>
              </div>
            </div>

            {/* Response JSON Viewer */}
            {test.responsePayload && (
              <div className="mt-3 bg-[#0D0C0C] border border-[#242022] p-3 rounded relative font-mono text-[11px] text-[#A8A19F] overflow-x-auto max-h-48">
                <div className="flex items-center justify-between text-[10px] text-[#7A7375] border-b border-[#242022] pb-1.5 mb-2">
                  <span>RESPONSE PAYLOAD</span>
                  <button
                    onClick={() => handleCopyJSON(test.responsePayload, idx)}
                    className="flex items-center gap-1 hover:text-[#E9C9CE] transition-colors"
                  >
                    {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedIndex === idx ? 'Copied!' : 'Copy JSON'}</span>
                  </button>
                </div>
                <pre>{JSON.stringify(test.responsePayload, null, 2)}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

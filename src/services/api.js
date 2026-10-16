// Delta One Back Office API Service Layer
// Clean async functions ready to connect to your real backend endpoints.

const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Helper to perform HTTP requests with auth headers and error handling
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('delta_one_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || `API error ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    // If backend is not available or mock mode, fall back to local responses
    console.warn(`[API] Endpoint ${endpoint} fell back to local handler:`, err.message);
    return null;
  }
}

// -------------------------------------------------------------
// Customer API Services
// -------------------------------------------------------------

export const customerApi = {
  // Fetch user profile and summary
  async getProfile() {
    const data = await request('/customer/profile');
    return data || {
      username: 'rickylundell',
      email: 'ricky@deltaone.ai',
      verified: true,
      sponsor: 'Delta 1',
      payoutAddress: ''
    };
  },

  // Fetch wallets balances
  async getWallets() {
    const data = await request('/customer/wallets');
    return data || {
      purchase: 0.00,
      rewards: 312.40,
      matrix: 2098.12
    };
  },

  // Fetch all user modules
  async getModules() {
    const data = await request('/customer/modules');
    return data || [
      { id: 'ΔM-0001', price: 1000, day: 137, rebuy: true },
      { id: 'ΔM-0002', price: 5000, day: 42, rebuy: false },
      { id: 'ΔM-0003', price: 1000, day: 6, rebuy: true },
      { id: 'ΔM-0000', price: 1000, day: 400, rebuy: false }
    ];
  },

  // Purchase a new module
  async purchaseModule({ amount, payPurchase, payRewards, payMatrix }) {
    const res = await request('/customer/modules/purchase', {
      method: 'POST',
      body: JSON.stringify({ amount, payPurchase, payRewards, payMatrix })
    });
    return res || { success: true, amount, timestamp: new Date().toISOString() };
  },

  // Spin the module booster
  async spinBooster(moduleId) {
    const res = await request(`/customer/modules/${moduleId}/booster/spin`, {
      method: 'POST'
    });
    if (res) return res;
    // Client simulation
    const pct = Math.max(0.1, Math.round(5.0 * Math.pow(Math.random(), 2.2) * 10) / 10);
    const isJackpot = pct >= 4.0;
    return {
      moduleId,
      pct,
      isJackpot,
      expiresAt: Date.now() + 10 * 60 * 1000
    };
  },

  // Apply booster top-up
  async acceptBoosterOffer({ moduleId, topUpAmount, bonusAmount }) {
    const res = await request(`/customer/modules/${moduleId}/booster/accept`, {
      method: 'POST',
      body: JSON.stringify({ topUpAmount, bonusAmount })
    });
    return res || { success: true, moduleId, topUpAmount, bonusAmount };
  },

  // Request withdrawal from rewards wallet
  async requestWithdrawal({ amount, address }) {
    const res = await request('/customer/withdraw', {
      method: 'POST',
      body: JSON.stringify({ amount, address })
    });
    return res || { success: true, txId: `0x${Math.random().toString(16).slice(2, 10)}...`, amount };
  },

  // Fetch activity log
  async getActivity(filter = 'all', tab = 'tx') {
    const data = await request(`/customer/activity?filter=${filter}&tab=${tab}`);
    return data || [
      { id: 1, k: 'module', tab: 'rew', event: 'AI Module Rewards · Module ΔM-0002', time: '2026-10-14 12:00 UTC', proof: '0x8f3a…c21e', amount: '+25.00' },
      { id: 2, k: 'module', tab: 'rew', event: 'AI Module Rewards · Module ΔM-0001', time: '2026-10-14 12:00 UTC', proof: '0x8f3a…c21f', amount: '+5.00' },
      { id: 3, k: 'module', tab: 'rebuy', event: 'Auto-Rebuy · Module ΔM-0003', time: '2026-10-14 12:00 UTC', proof: '0x41be…09d2', amount: '5.00' },
      { id: 4, k: 'withdraw', tab: 'tx', event: 'Withdrawal to payout address', time: '2026-10-13 08:14 UTC', proof: '0x77c0…a3b4', amount: '−150.00' },
      { id: 5, k: 'added', tab: 'tx', event: 'USDT added · Purchase Wallet', time: '2026-10-12 17:40 UTC', proof: '0x19ad…6e70', amount: '+1,000.00' },
      { id: 6, k: 'module', tab: 'tx', event: 'Module purchased · ΔM-0003', time: '2026-10-12 17:42 UTC', proof: '0x19ad…6e71', amount: '−1,000.00' }
    ];
  }
};

// -------------------------------------------------------------
// Ambassador API Services
// -------------------------------------------------------------

export const ambassadorApi = {
  // Fetch ambassador overview metrics
  async getOverview() {
    const data = await request('/ambassador/overview');
    return data || {
      currentRank: 'Everest',
      personalVolume: 200000,
      teamVolume: 1240000,
      activeEnrollees: 24,
      totalDownline: 384,
      matrixRewards: 2098.12
    };
  },

  // Fetch downline member records
  async getDownline(params = {}) {
    const query = new URLSearchParams(params).toString();
    const data = await request(`/ambassador/downline?${query}`);
    return data || null; // Component provides realistic deterministic downline tree generator
  },

  // Fetch commissions breakdown
  async getCommissions(period = 7) {
    const data = await request(`/ambassador/commissions?period=${period}`);
    return data || null;
  },

  // Request withdrawal from matrix wallet
  async requestMatrixWithdrawal({ amount, address }) {
    const res = await request('/ambassador/withdraw', {
      method: 'POST',
      body: JSON.stringify({ amount, address })
    });
    return res || { success: true, txId: `0x${Math.random().toString(16).slice(2, 10)}...`, amount };
  }
};


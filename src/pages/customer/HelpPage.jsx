import React, { useState } from 'react';
import { useBackOffice } from '../../context/BackOfficeContext';
import { sfx } from '../../utils/sfx';

export default function HelpPage() {
  const { setEventText } = useBackOffice();
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How do AI Module Rewards work?',
      a: 'Modules connect your capital to algorithmic trading. Every day at 16:00 Dubai (12:00 UTC), net trading profit is calculated and credited to active Modules. Each Module continues running until it has delivered exactly 2× its purchase price in rewards, at which point it is marked Completed.'
    },
    {
      q: 'What is the Module Booster?',
      a: 'The Module Booster lets you spin for an instant percentage top-up bonus on your Module. Each Module receives up to 10 boosters across its lifetime. When you land a booster, you have a 10-minute timer to choose your top-up amount and lock in the bonus credits.'
    },
    {
      q: 'When and how can I withdraw?',
      a: 'Rewards Wallet balances can be withdrawn once per UTC day, with a minimum threshold of 5 USDT. Withdrawals are processed on the BNB Smart Chain (BEP-20) and typically arrive at your verified payout address within 15 minutes.'
    },
    {
      q: 'What are Founder Seats?',
      a: 'Founder Seats are 260 numbered allocations across six tiers that entitle holders to a permanent share of the platform’s global gross trading performance pool. Seats never expire and are logged on the public registry.'
    },
    {
      q: 'What is the Line Balance rule for Ambassadors?',
      a: 'To advance through summits (from Fuji up to Everest), qualifying organization volume must meet the line balance rule: no single leg can contribute more than the specified maximum percentage (ranging from 50% down to 20%) toward your target rank requirement.'
    }
  ];

  const toggleFaq = (idx) => {
    sfx.play('pop');
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div>
        <h1 className="h1">Help & Support</h1>
        <div className="lbl">Guides, answers and direct contact with the Delta One support desk.</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {faqs.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <button
                className="faqq"
                onClick={() => toggleFaq(i)}
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <span className="faqi">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && <div className="faqa">{faq.a}</div>}
            </div>
          );
        })}
      </div>

      {/* Support Contact Box */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div className="kick">Still have questions?</div>
          <div style={{ fontSize: '18px', fontWeight: 500 }}>Live Support Desk</div>
          <div className="small">Our compliance and technical team is available 24/7.</div>
        </div>
        <button
          className="b3 gold"
          onClick={() => {
            sfx.play('pop');
            setEventText('Connecting to a live support agent...');
          }}
        >
          Talk to live support
        </button>
      </div>
    </section>
  );
}

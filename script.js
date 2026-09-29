// Indicative rates (placeholder numbers)
const RATES = {
  USD: { INR: 83.42, MXN: 17.08, PHP: 56.21, NGN: 1542.5, BRL: 5.02, KES: 129.4 },
  EUR: { INR: 90.11, MXN: 18.45, PHP: 60.72, NGN: 1666.3, BRL: 5.42, KES: 139.8 },
  GBP: { INR: 105.37, MXN: 21.57, PHP: 71.0, NGN: 1948.2, BRL: 6.34, KES: 163.4 },
};
const SYMBOL = { USD: '$', EUR: '€', GBP: '£' };
const ETA = { INR: '~3 minutes', MXN: '~2 minutes', PHP: '~3 minutes', NGN: '~6 minutes', BRL: '~4 minutes', KES: '~5 minutes' };
const FEE = 0.0025;       // Orrith fee
const BANK_COST = 0.0438; // typical wire fee + FX markup, for "you save"

const $ = (id) => document.getElementById(id);
const fmt = (n, d = 2) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

function updateQuote() {
  const amount = Math.max(0, parseFloat($('sendAmount').value) || 0);
  const from = $('fromCur').value;
  const to = $('toCur').value;
  const rate = RATES[from][to];
  const fee = amount * FEE;
  const received = (amount - fee) * rate;
  const sym = SYMBOL[from];

  $('feeOut').textContent = sym + fmt(fee);
  $('rateOut').textContent = `1 ${from} = ${fmt(rate)} ${to}`;
  $('receiveAmount').value = fmt(received);
  $('etaOut').textContent = ETA[to];
  $('saveOut').textContent = sym + fmt(amount * (BANK_COST - FEE));
}

['sendAmount', 'fromCur', 'toCur'].forEach((id) => $(id).addEventListener('input', updateQuote));
updateQuote();

// Mobile nav
$('navToggle').addEventListener('click', () => document.body.classList.toggle('nav-open'));
document.querySelectorAll('.nav-links a').forEach((a) =>
  a.addEventListener('click', () => document.body.classList.remove('nav-open'))
);

// Nav shadow on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 8), { passive: true });

// Fade-in on scroll
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))),
  { threshold: 0.12 }
);
document.querySelectorAll('.section h2, .cell, .plan, .table, .quote-card, .code-card, .feature-box, .cta, .corridors, .mini-stats')
  .forEach((el) => { el.classList.add('reveal'); io.observe(el); });

// Duplicate ticker content for a seamless loop
const set = document.querySelector('.ticker-set');
if (set) set.parentNode.appendChild(set.cloneNode(true));

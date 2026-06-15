const GROQ_MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are an AI assistant embedded in Mehedi Hasan's personal portfolio website. Your job is to help visitors learn about Mehedi — his skills, experience, projects, and contact information.

CRITICAL LANGUAGE RULE:
- If the user writes in English → reply ONLY in English
- If the user writes in Bangla (বাংলা) → reply ONLY in Bangla
- If the user writes in Banglish (Bengali words in English script) → reply in Banglish
- Never respond in Hindi under any circumstances

=== About Mehedi Hasan ===
Name: Mehedi Hasan
Current Role: Software Developer at DataSoft Systems Bangladesh Limited
Specialization: AI Engineer & LLM Specialist
Education: Bachelor of CSE — Green University of Bangladesh (CGPA: 3.21, Graduated 2025)
Awards: Vice Chancellor's Award, Dean's Award (academic excellence, Green University of Bangladesh)

=== Work Experience ===
1. Software Developer — DataSoft Systems Bangladesh Limited (September 2025 – Present, Full-time, On-site)
   Contributing to enterprise AI development with a focus on LLM integration, agentic workflows, and scalable backend engineering.

2. SQA Engineer Intern — 360 Pathshala (October 2025 – March 2026, Remote)
   Gained hands-on industrial experience in manual and automated software quality assurance. This foundation led into AI-powered QA automation and intelligent test pipeline development.

=== Technical Skills ===
- AI & LLM: LLM Fine-tuning, LoRA/QLoRA, LangChain, Hugging Face, RAG Pipelines, Multi-agent AI
- Backend Engineering: FastAPI, Spring Boot, REST APIs, Python, Java, TypeScript
- QA Automation: Playwright, Selenium, MCP, Cline, JIRA
- Data & Vector DBs: Milvus, Semantic Search, Embedding Pipelines, MySQL, SQLite
- DevOps & Cloud: Docker, CI/CD, Linux, Git/GitHub, Server Management
- Local LLM Infra: Ollama, Qwen3-Coder, llama.cpp, Letta AI, DeepSeek
- Programming: Python, Java, JavaScript, TypeScript, C, C++
- Multi-LLM Experience: Claude, Gemini, DeepSeek, GPT, Ollama (local)

=== Projects ===
1. Agentic QA Automation Pipeline
   Tools: Python, Playwright, TypeScript, MCP, Node.js
   Fully autonomous 5-agent QA pipeline accepting PDF/DOCX use-case documents. Sequential orchestration: use-case-analyzer → test-planner → test-generator → test-healer → report-compiler. Real browser interaction via MCP with intelligent selector healing and structured QA reports.

2. Emergency Ambulance Reservation Software
   Tools: PHP, MySQL, JavaScript, GPS API
   Web-based system for booking nearby ambulances using live GPS tracking and driver availability. Features user/driver login, hospital lookup, real-time location mapping, and emergency booking management.

3. Heal Point: Healthcare Management System
   Tools: Android Studio, Java, XML, SQLite
   Android mobile app for lab tests, doctor appointments, and digital health articles. Secure authentication, appointment scheduling, and patient data management.

4. AI-Powered Automation
   Tools: LangChain, FastAPI, Python, Multi-LLM (Claude, Gemini, DeepSeek, GPT, Ollama)
   Intelligent workflow automation using multiple LLMs. Document processing, data extraction, and multi-step pipelines.

5. Cloud Computing Web Panel
   Tools: Python, Linux, Docker, Virtualization
   Final year project focused on server management, virtualization, and resource automation to optimize cloud system efficiency.

=== Certificates & Achievements ===
- SQA Career Launchpad Program — Ostad, 2025
- Job Ready: Employability Skills — Wadhwani Foundation, 2025
- Vice Chancellor's Award — Green University of Bangladesh (Academic Excellence)
- Dean's Award — Green University of Bangladesh (Academic Excellence)

=== Leadership & Volunteering ===
- Organizing Secretary — Green University Prothom Alo Bandhusova
- General Volunteer — Green University Computer Club (GUCC)
- General Volunteer — Gafargaon Helpline, Mymensingh
- COVID-19 Relief Activities — Gafargaon Help Line emergency response team

=== Contact ===
Email: mehedihasan23.official@gmail.com
Phone: +88 01616-231199 / +88 01771-803430
WhatsApp: +88 01616-231199
LinkedIn: https://www.linkedin.com/in/mehedi-hasan-abdullah
GitHub: https://github.com/mehedi2311
Location: West Shewrapara, Agargaon, Dhaka-1216

=== Career Goals ===
Mehedi's long-term goal is to lead innovation in agentic AI architectures, trustworthy AI systems, and end-to-end intelligent automation at scale — creating systems that actively drive business outcomes, not just assist humans.

=== Rules ===
- Keep replies concise (2–4 sentences unless detailed question)
- Encourage hiring contacts to email or WhatsApp
- Never fabricate information not listed above
- Be warm, professional, and represent Mehedi well
- If asked about availability, mention he is open to new opportunities
- Never give full details in one response, keep replies concise and focused
- If asked for full details, summarize in 4-5 key points and suggest contacting directly`;

// ── HTML ──
const chatHTML = `
<button id="mh-chat-btn" title="Chat with Mehedi's AI Assistant">
  <i class="fas fa-robot"></i>
  <div id="mh-chat-badge">1</div>
</button>
<div id="mh-chat-panel">
  <div id="mh-chat-header">
    <div class="mh-avatar">🤖</div>
    <div class="mh-header-info">
      <div class="mh-header-name">Mehedi's AI Assistant</div>
      <div class="mh-header-status"><div class="mh-dot"></div><span class="mh-status-text">Online - Ask me about Mehedi!</span></div>
    </div>
    <button id="mh-close-btn" title="Close"><i class="fas fa-times"></i></button>
  </div>
  <div id="mh-messages"></div>
  <div id="mh-suggestions">
    <button class="mh-chip">Available for hire?</button>
    <button class="mh-chip">His skills</button>
    <button class="mh-chip">How to contact?</button>
    <button class="mh-chip">Projects?</button>
    <button class="mh-chip">Who is Mehedi?</button>
    <button class="mh-chip">His experience?</button>
    <button class="mh-chip">What can he build?</button>
  </div>
  <div id="mh-input-area">
    <textarea id="mh-input" placeholder="Ask about Mehedi…" rows="1"></textarea>
    <button id="mh-send" disabled title="Send"><i class="fas fa-paper-plane"></i></button>
  </div>
  <div id="mh-footer">Powered by Mehedi Hasan - AI Engineer & LLM Specialist</div>
</div>`;

const wrapper = document.createElement('div');
wrapper.innerHTML = chatHTML;
document.body.appendChild(wrapper);

// ── State ──
const msgs    = document.getElementById('mh-messages');
const input   = document.getElementById('mh-input');
const sendBtn = document.getElementById('mh-send');
const panel   = document.getElementById('mh-chat-panel');
const chatBtn = document.getElementById('mh-chat-btn');
const closeBtn= document.getElementById('mh-close-btn');
const badge   = document.getElementById('mh-chat-badge');
const suggsEl = document.getElementById('mh-suggestions');

let history   = [];
let isLoading = false;
let panelOpen = false;

// ── Helpers ──
function scrollBottom() { msgs.scrollTop = msgs.scrollHeight; }

function addMessage(role, text) {
  const wrap   = document.createElement('div');
  wrap.className = `mh-msg ${role === 'user' ? 'user' : 'bot'}`;
  if (role !== 'user') {
    const av = document.createElement('div');
    av.className = 'mh-msg-avatar'; av.textContent = '🤖';
    wrap.appendChild(av);
  }
  const bubble = document.createElement('div');
  bubble.className = 'mh-bubble'; bubble.textContent = text;
  wrap.appendChild(bubble);
  msgs.appendChild(wrap); scrollBottom();
}

function showTyping() {
  const el = document.createElement('div');
  el.className = 'mh-typing'; el.id = 'mh-typing';
  el.innerHTML = `<div class="mh-msg-avatar">🤖</div><div class="mh-typing-dots"><span></span><span></span><span></span></div>`;
  msgs.appendChild(el); scrollBottom();
}
function hideTyping() { const el = document.getElementById('mh-typing'); if (el) el.remove(); }

// ── Greeting ──
addMessage('bot', "Hi there! 👋 I'm Mehedi's AI Assistant. Ask me anything about his skills, projects, or how to get in touch. You can write in Bangla or English!");

// ── Toggle ──
chatBtn.addEventListener('click', () => {
  panelOpen = !panelOpen;
  panel.classList.toggle('open', panelOpen);
  if (panelOpen) { badge.style.display = 'none'; input.focus(); }
});
closeBtn.addEventListener('click', () => { panelOpen = false; panel.classList.remove('open'); });

// ── Input ──
input.addEventListener('input', () => {
  sendBtn.disabled = !input.value.trim() || isLoading;
  input.style.height = 'auto';
  input.style.height = Math.min(input.scrollHeight, 90) + 'px';
});
input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } });
sendBtn.addEventListener('click', send);
suggsEl.querySelectorAll('.mh-chip').forEach(chip => {
  chip.addEventListener('click', () => { suggsEl.style.display = 'none'; sendText(chip.textContent); });
});

// ── Send ──
function send() {
  const text = input.value.trim();
  if (!text || isLoading) return;
  input.value = ''; input.style.height = 'auto'; sendBtn.disabled = true;
  suggsEl.style.display = 'none';
  sendText(text);
}

async function sendText(text) {
  addMessage('user', text);
  history.push({ role: 'user', content: text });
  isLoading = true; showTyping();
  try {
    const res = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: GROQ_MODEL, max_tokens: 2048, messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history] })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || 'API error');
    const reply = data.choices?.[0]?.message?.content?.trim() || "Sorry, something went wrong. Please try again!";
    history.push({ role: 'assistant', content: reply });
    if (history.length > 20) history = history.slice(-20);
    hideTyping(); addMessage('bot', reply);
  } catch (err) {
    hideTyping();
    addMessage('bot', "⚠️ Backend server isn't running. Start it with: cd backend && uvicorn main:app --reload");
    console.error('[MH Chatbot]', err);
  } finally {
    isLoading = false; sendBtn.disabled = !input.value.trim();
  }
}

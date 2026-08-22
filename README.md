# AI Resume Analyzer 📄✨

An AI-powered Resume Analyzer and ATS Optimization application built with React 19, TypeScript, Vite, TailwindCSS, Google Gemini AI, and client-side document parsing.

---

## 🚀 Features

- **Real In-Browser Document Parsing**: Instant text extraction from **PDF** (via `pdfjs-dist`), **DOCX** (via `mammoth`), and **TXT** files directly in the browser with zero server latency.
- **Multi-Tier AI Analysis Engine**:
  - **Google Gemini AI (`gemini-1.5-flash`)**: Deep semantic analysis, context-aware keyword gap detection, and personalized bullet rewrites with quantifiable metrics.
  - **Built-in Smart Local NLP Engine**: 100% offline, zero-config algorithmic fallback that audits 150+ industry skills, validates ATS formatting, and calculates dynamic scores without needing an API key.
  - **Optional n8n / Webhook Support**: Forward document payloads to external workflows if configured.
- **Dynamic ATS Score Breakdown**: Computes weighted scores across ATS Formatting, Section Completeness, Bullet Quality, and Target Keyword Alignment.
- **Keyword Gap & Match Analysis**: Identifies matched and missing technical skills, tools, and domain keywords against any target job description.
- **Actionable Bullet Rewriter**: Flags weak action verbs and passive language in candidate bullets, generating measurable before-and-after rewrites.
- **User-Configurable AI Settings**: Easily toggle between Gemini AI and Local NLP with in-browser API key management.
- **Export to PDF & JSON**: Download detailed recruiter-ready analysis reports with a single click.

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **AI Integration:** [Google Gemini API](https://ai.google.dev/)
- **Document Parsing:** [pdfjs-dist](https://github.com/mozilla/pdf.js) & [mammoth](https://github.com/mwilliamson/mammoth.js)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Exporting:** [jsPDF](https://github.com/parallax/jsPDF) & [html2canvas](https://html2canvas.hertzen.com/)

---

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BhumikaKothari77/AI_Resume_Analyzer.git
   cd AI_Resume_Analyzer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **(Optional) Configure Environment Variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your free Google Gemini API key if you'd like default AI power:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(Note: You can also enter your Gemini key directly in the UI settings or use the built-in local engine with zero configuration).*

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📄 License

This project is licensed under the MIT License.

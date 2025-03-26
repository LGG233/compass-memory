# 🧭 Compass – Memory Companion

*A personal AI assistant to help people with memory issues stay grounded, remember what matters, and move through life with intention.*

Compass is a React-based web app designed to support users with forgetfulness, aging-related memory loss, or executive functioning challenges. It blends thoughtful design with intelligent features like AI-enhanced reminders, contextual suggestions, and simple memory logging.

---

## 🌟 Features

- ✅ **Morning Flow Check-In** – Start your day with a mood check, a chance to share what’s on your mind, and space to prioritize.
- 🧠 **Memory Keeper** – Log anything you want to remember: reminders, notes, events, and conversations.
- 💡 **Compass AI Insight Engine** – Rephrases and categorizes your thoughts using GPT-3.5, suggesting type and urgency.
- 📦 **Local storage** – Your memories persist even after refreshing or closing the app.
- 📆 **Archived memory view** – Review dismissed reminders later, with date and type.
- ✏️ **Full editing support** – Update or delete entries via a clean modal UI.
- 🧘 **Active vs Passive Reminders** – Built-in support for contextual vs time-sensitive memories.

---

## 🧰 Tech Stack

- **React** (via Create React App)
- **Tailwind CSS** for styling
- **OpenAI API** (GPT-3.5-turbo-0125)
- **LocalStorage** (for now — planning Supabase/Postgres backend)
- **Notion** (used for internal task tracking and planning)

---

## 🚧 Coming Soon

- AI-powered contextual reminders (e.g., "Mary has class now — maybe text her later")
- Timeline view or calendar integration
- Google Calendar sync (optional)
- Personalized AI agent behaviors per user
- Authentication and backend storage

---

## 🛠 Getting Started

1. Clone the repo:

   git clone https://github.com/LGG233/compass-memory.git  
   cd compass-memory

2. Install dependencies:

   npm install

3. Add your OpenAI key to a `.env` file:

   REACT_APP_OPENAI_API_KEY=your_key_here

4. Start the development server:

   npm start

## 📄 License

This project is currently private and not licensed for public distribution. Licensing details TBD.

---

## 💬 Questions or Ideas?

Feel free to open an issue or send a message! Feedback, feature ideas, or collaboration interest is welcome.

---

 “A companion for living with intention.”
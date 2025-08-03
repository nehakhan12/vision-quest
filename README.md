👁️ Vision Quest
Vision Quest is a retro-style educational app designed to help identify potential vision and cognitive issues in a fun, game-based way. Built with React Native and Expo, the app offers interactive mini-games that make basic visual screening engaging, accessible, and enjoyable for children—especially in low-resource or high-anxiety settings.

🎯 Problem Statement
Many existing educational or assessment tools for children with learning challenges, visual tracking difficulties, or attention-related issues are either too clinical or unengaging. There's a gap in accessible, gamified tools that can evaluate visual cognition while also being fun and approachable for young users.

💡 Solution
Vision Quest is an interactive mobile app designed to assess and enhance children's visual attention, color recognition, and letter identification skills through engaging mini-games.

Built with React Native + Expo Router, it provides a seamless, cross-platform experience while tracking user performance across two main tests:

🟦 Color Quest – Tests the child’s ability to recognize and react to different colors in a timed challenge.

🔤 Letter Hunt – Challenges the user to find specific letters hidden among distractions.

At the end of both tests, results are presented visually using a bar graph, giving both kids and parents/educators a clear idea of performance in each category.

📱 Key Features
🎮 Game-like interface to keep kids engaged while testing cognitive and visual skills

🎨 Retro pixel-style UI with animations and sound

📊 Results Visualization via bar graphs for easy interpretation of test scores

🧒 Kid-friendly UI with simple tap-based navigation

📡 Works fully offline – no internet required

📈 Future Improvements
👁️ Add real-time AI-based eye tracking for more detailed interaction metrics

💾 Store progress using local storage or backend integration

🧩 Add more mini-games targeting different cognitive skills (e.g., memory, sequencing)

🧠 Integrate attention span and reaction time metrics

🌐 Export results for teachers or caregivers

🛠 Tech Stack
Frontend: React Native + Expo

Navigation: Expo Router

Design: Pixel art, PressStart2P font, Lottie animations

📁 Project Structure
bash
Copy
Edit
app/
├── assets/               # Fonts, images, sounds, animations
├── components/           # Custom reusable components
├── screens/              # LetterHuntScreen, AboutPage, etc.
├── index.tsx             # App entry point
├── tsconfig.json         # TypeScript config
🚀 Getting Started
Prerequisites
Node.js (v18+ recommended)

Expo CLI (npm install -g expo-cli)

Installation
bash
Copy
Edit
git clone https://github.com/your-username/vision-quest.git
cd vision-quest
npm install
npx expo start
Use Expo Go to scan the QR code or run in a simulator.

👩‍💻 Team
Created by:

Zainab Lawal

Inshal Chawudry

Neha Khan

⚠️ Disclaimer
This app is intended for educational and early screening purposes only. It does not replace a professional eye or cognitive exam by a licensed specialist.

# 🧠 EmotiBot

**EmotiBot** is an AI-powered emotional wellness app designed for children and adolescents. It combines facial emotion recognition and mental health screening tools (PHQ-9 & GAD-7) to promote emotional awareness and support early detection of mental health conditions. Built with accessibility, interaction, and education in mind, EmotiBot guides young users through engaging experiences that encourage emotional expression and self-reflection.

---

## 🌟 Features

### 🎭 Emotion Analysis

-   Uses webcam input to **simulate** emotion detection through facial expression.
-   Offers **localized** responses in multiple languages.
-   Provides **storytelling** based on detected emotion using speech synthesis.

### 📋 PHQ-9 & GAD-7 Forms

-   Digital mental health questionnaires for depression (PHQ-9) and anxiety (GAD-7).
-   Results classification with support for dynamic forms and future ML integration.

### 🌐 Multilingual Support

-   English and Spanish translations via `react-i18next`.
-   All UI, emotion labels, and stories are fully translated.

### 🤖 Interactive Robot UI

-   Toggle between **robot mode** (illustrations and voice) and **camera mode**.
-   Friendly mascot imagery included to keep the experience kid-friendly.

---

## 🛠️ Technologies

-   **Frontend**: React + TypeScript
-   **Routing**: React Router
-   **State Management**: Redux Toolkit
-   **Styling**: Tailwind CSS
-   **Internationalization**: react-i18next
-   **Text-to-Speech**: Web Speech API (`window.speechSynthesis`)
-   **Camera Access**: WebRTC via `navigator.mediaDevices.getUserMedia`
-   **Form Logic**: PHQ-9 and GAD-7 scoring

---

## 🗂 Directory Structure

```
/src
 ├── assets/images/        # EmotiBot illustrations (ask, analyze, logo)
 ├── components/           # React components
 ├── pages/
 │    ├── EmotionAnalysis/ # Emotion analysis UI and logic
 │    ├── PHQGADForms/     # Questionnaire components
 ├── store/                # Redux slices
 ├── i18n/                 # Translation files (en.json, es.json)
 ├── router/               # App routes
 └── App.tsx               # Entry point
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/emotibot.git
cd emotibot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

---

## 🌍 Translations

EmotiBot supports multilingual content via i18next. You can find translations in:

```
/src/i18n/en.json
/src/i18n/es.json
```

New languages can be added by following the same format.

---

## 📦 Simulated Backend

For the emotion recognition feature, EmotiBot currently **simulates** image analysis. You can later connect it to a real ML model backend via HTTP POST using the frame data:

```json
{
  "image": [[[R, G, B], [R, G, B], ...], ...]
}
```

> The simulated frame is converted via `canvas.getContext('2d').getImageData(...)`.

---

## 🧪 Testing

This project is currently not integrated with a testing framework. If needed, suggestions include:

-   **Jest + React Testing Library** (for components)
-   **Cypress** (for end-to-end UI flows)

---

## 📘 License

MIT © \[Your Name or Organization]
Images used for EmotiBot are AI-generated and intended for non-commercial, educational use.

---

## 💡 Future Ideas

-   Integration with real-time emotion detection ML model (via Flask or FastAPI).
-   Saving emotion history in Redux or backend.
-   Gamification features for children.
-   Admin dashboard for educators or psychologists.

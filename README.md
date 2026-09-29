# Yummi 🍳📱

Yummi is a social-first mobile application designed to simplify the cooking experience by combining community-driven recipe sharing with intelligent AI assistance. It transforms recipe discovery into a social media experience, allowing users to scroll through a feed of culinary creations, share their own dishes, and instantly turn posts into actionable, step-by-step cooking guides. 

Yummi addresses common kitchen friction points by offering hands-free AI voice control, dynamic dietary substitutions, and smart pantry management, making cooking both collaborative and effortless.

---

## 🛠 Tech Stack & Architecture

* **Frontend (Mobile):** React Native (iOS & Android) utilizing Expo Router for file-based navigation.
* **Styling Engine:** Tailwind CSS via NativeWind v4 for rapid, responsive UI styling.
* **Media Handling:** `expo-video` for high-performance, virtualized vertical video feeds.
* **Backend API (In Progress):** PHP handling REST API routing, user authentication, and feed algorithms.
* **Database (In Progress):** MySQL for relational structuring of Users, Posts, Followers, Ingredients, and Comments.
* **AI Integration (In Progress):** Local prototyping and prompt testing utilizing Ollama and Llama 3.1.

---

## 📂 Project Directory Flow & Connections

The frontend architecture follows a strict Expo Router paradigm, separating full-screen modal overlays from the primary tab-based navigation shell.

```text
yummi/
├── app/                        # Main Application Routes (Expo Router)
│   ├── _layout.tsx             # Root Stack Provider (Wraps Tabs & Full-screen Modals)
│   │
│   ├── (tabs)/                 # 📱 BOTTOM NAVIGATION TAB SHELL
│   │   ├── _layout.tsx         # Injects the <BottomNav/> component
│   │   ├── index.tsx           # /feed   -> Renders <FlatList> of <FeedItem/>
│   │   ├── fridge.tsx          # /fridge -> AI Scanner & Limits UI
│   │   ├── create.tsx          # /create -> Multi-step AI Recipe Formatter
│   │   ├── saved.tsx           # /saved  -> User's curated Recipe Collections
│   │   └── lists.tsx           # /lists  -> Collaborative Grocery Checklists
│   │
│   ├── cook/                   
│   │   └── [id].tsx            # 🧑‍🍳 EXECUTION MODE: Full-screen interactive cooking UI
│   │
│   ├── recipe/                 
│   │   └── [id].tsx            # 📋 RECIPE DETAILS: Static macro & method breakdown
│   │
│   ├── explore.tsx             # 🔍 SEMANTIC SEARCH: Pushed from FeedHeader
│   └── profile.tsx             # 👤 USER PROFILE: Pushed from FeedHeader
│
├── components/                 # Reusable UI & Logic Components
│   ├── BottomNav.tsx           # Custom 5-icon Tab Navigation Bar
│   ├── FeedHeader.tsx          # Top Header (Logo, For You/Following, Search/Profile)
│   ├── FeedItem.tsx            # Full-bleed Video Player & Context Overlay
│   └── AddToListModal.tsx      # Slide-up modal bridging recipes to grocery lists

## Key Component Connections
* **`<FeedItem />` Routing:** Located in `app/(tabs)/index.tsx`, this component contains dual action buttons. Tapping "Cook this" pushes the user directly to `app/cook/[id].tsx`, while tapping "Recipe" routes them to `app/recipe/[id].tsx`.
* **State Management Bridging:** The `<AddToListModal />` is triggered from a `<FeedItem />` but passes its payload (the ingredients) to be rendered globally inside `app/(tabs)/lists.tsx`.

## 🔄 Core User Flows

## 1. The Discovery & Cooking Flow
* **Step 1:** User opens the app to the Home Feed (`/`). Videos auto-play as they scroll.
* **Step 2:** User finds a meal and taps the **"Recipe"** button to view static macros, time limits, and ingredient lists (`/recipe/[id]`).
* **Step 3:** Ready to cook, the user taps **"Start cooking mode"**.
* **Step 4:** The app overlays the Execution Mode (`/cook/[id]`). The UI scales typography for countertop reading, splits the screen with a looping step-video, and activates the microphone for hands-free AI navigation.

## 2. The AI Pantry "Fridge Scanner" Flow
* **Step 1:** User navigates to the Fridge tab (`/fridge`).
* **Step 2:** User taps the camera viewfinder to scan their physical refrigerator shelves. Computer vision extracts raw ingredients and converts them into UI chips (e.g., "Half a cabbage", "2 eggs").
* **Step 3:** User selects dietary limits (e.g., "High-protein", "30 min") and hits **"Find me a meal"**.
* **Step 4:** The AI generates a custom recipe card based strictly on the scanned inventory, which can be instantly pushed to the Cooking Flow.

### 3. AI-Assisted Upload Flow
* **Step 1:** Creator navigates to the Create tab (`/create`).
* **Step 2:** Creator uploads an aesthetic video and pastes a messy, unstructured block of text or voice notes.
* **Step 3:** User taps **"Format Recipe"**.
* **Step 4:** The Llama 3.1 AI parses the raw text, extracting exact measurements, normalizing the steps, and outputting clean JSON data. The user reviews the structured preview before publishing it to the global feed.

### 4. Collaborative Grocery Flow
* **Step 1:** User taps the **"List"** icon on a recipe in the feed.
* **Step 2:** A modal opens (`<AddToListModal />`), allowing the user to select an existing shared household list or create a new one.
* **Step 3:** The app categorizes the ingredients automatically (Produce, Protein, Pantry).
* **Step 4:** Roommates/partners open the Lists tab (`/lists`) to view a synchronized, checkable shopping list with a live progress bar.

## ✨ Features Breakdown

### 📱 UI & Social Engine (Implemented)
* **The Yummi Feed (Social Discovery):** Scrollable, visual feed of user-generated recipe posts with interactive controls[cite: 8].   
* **User Profiles & Collections:** Personalized hubs showcasing user uploads, followers, and curated recipe folders[cite: 8].   
* **Step-by-Step Video Tracking:** Integrated sequential video player aligned with written instructions[cite: 8].   
* **"I Made This" Threads (Remixes):** Visual reply system allowing photo attachments, reviews, and tweak notes under posts[cite: 8].

### 🧠 AI & Smart Utility (Under Development)
* **Voice-Activated AI Sous-Chef:** Context-aware voice interaction engine for hands-free queries and controls[cite: 8].
* **Dynamic Substitutions:** Real-time AI adjustments to ingredient lists and procedural steps[cite: 8].
* **The "Fridge Scanner" (AI Vision):** Image recognition powered by computer vision to detect raw ingredients[cite: 8].
* **Contextual Meal Generator:** Recommendation engine prioritizing operational constraints (time, macros, pantry)[cite: 8].

### 🤝 Community & Growth Features (Under Development)
* **AI-Assisted Uploads:** AI automatically converts unstructured text, messy copy-paste jobs, or voice notes into clean, structured ingredient lists and step-by-step guides for new posts[cite: 8].
* **Collaborative Grocery Lists:** Saved recipe ingredients can be exported to a shareable, editable grocery list that syncs across multiple household members[cite: 8].
* **Semantic AI Search:** Advanced search capabilities that allow natural language queries (e.g., "light summer dinner" or "quick spicy chicken") instead of relying on exact keyword matching[cite: 8].
│
├── global.css                  # NativeWind / Tailwind CSS directives
└── tailwind.config.js          # Theme overrides (Colors, Backgrounds, Spacing)

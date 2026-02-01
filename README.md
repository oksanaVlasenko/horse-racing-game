# Horse Racing

Horse Racing is an interactive web application built with Vue 2 and Vite. It lets users generate and watch horse races, displaying results in real-time with animated horse movement. The game simulates 6 rounds of racing with randomly selected horses, each with unique conditions and colors, creating an engaging and dynamic experience.

## Features

- Generate a list of horses (up to 20) with random condition scores
- Create a 6-round race schedule
- Start races and watch animated horse movement
- Pause / Resume round
- Display race results sequentially as each round concludes
- Fast performance
- Clean and maintainable code structure using Vue components
- **Unit tests implemented with Jest** to ensure code reliability and correctness

## Technologies Used

- Vue 2
- Vite
- TypeScript
- Sass
- Tailwind
- Jest for testing
- Vuex for state management

# Horse Racing Game 🏇

Try the game online: [https://oksanavlasenko.github.io/horse-racing-game/](https://oksanavlasenko.github.io/horse-racing-game/)  
Or run it locally on your machine.

## Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/oksanaVlasenko/horse-racing-game.git
```
### 2.Navigate to the project folder and install dependencies

```bash
cd horse-racing
npm install
```
### 3.Start the development server

```bash
npm run dev
```
Open your browser at http://localhost:3000 to start using the application.

### 4. Run unit tests

```bash
npm run test:unit
```

## How It Works

- **Generate Horse List**: Create a list of 1–20 horses with unique colors and condition scores (1–100).  
- **Generate Race Schedule**: Click the "Generate" button to set up 6 rounds of races.  
- **Start the Race**: Click "Start" to run the races, one round at a time.  
- **Pause and Resume**: You can pause the race at any time and resume it later.  
- **Watch Horses Move**: Horses move visually across the track as the race progresses.  
- **View Results**: Each race result is displayed in order in the Results panel.  

## Race Rules

- **Total horses available**: 20  
- **Each race** consists of 6 rounds with 10 randomly selected horses per round  
- **Round distances**:  
  - Round 1: 1200 meters  
  - Round 2: 1400 meters  
  - Round 3: 1600 meters  
  - Round 4: 1800 meters  
  - Round 5: 2000 meters  
  - Round 6: 2200 meters  

## Enjoy racing and have fun managing your horses!

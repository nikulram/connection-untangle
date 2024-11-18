
# Connection Untangle

**Created by Nikul Ram**  
**GitHub Repository:** [Connection Untangle](https://github.com/nikulram/connection-untangle)

---

## Inspiration

For me, inspiration was Planar Graphs. I like graphs and their complex behaviors when combined with algorithms. It's challenging and fun at the same time. Apart from that, I wanted to make something that can be both challenging and fun. I remember a few years ago, I saw a game with planar graphs, so I recalled that and made my version of a Planar Graph game.

---

## What It Does

It tangles the lines, and then you as a user have to untangle and solve the puzzle so that no lines intersect. As soon as you solve the puzzle, a victory message pops up on the screen, and you get the option to go to other levels or the main menu. It also tracks progress during the session: if you solve a level, it records the time, and the lesser the time, the higher your score. Best time per level is used to track high scores. It's challenging and fun, where users can challenge their friends to see who can solve the level the fastest. In conclusion, you have to Untangle the Connections.

---

## How I Built It and How to Run the App

I researched Graphs and then read the theory, which links I have included in the app under the credits section. I built this using React and Node.js. Here's how you can run it:

1. Download or clone the repository from [GitHub](https://github.com/nikulram/connection-untangle) to your PC.
2. Open a terminal in the project directory and run `npm install` to install all the required packages.
3. Run `npm start` to launch the app. It will open in your default browser, and you're ready to play!

**Prerequisites** :
Make sure you have Node.js installed on your PC.

---

## Challenges I Ran Into

Many bugs, such as intersecting lines not being detected correctly. Creating the logic to fix this was challenging, and I had to use debugging tools to resolve the issue. Another challenge was ensuring that the graph generated is planar (solvable). Fixing that required implementing the correct logic.

---

## Accomplishments

I successfully completed the game and ensured that every graph generated is a planar graph! Fixing this was the biggest accomplishment in this project.

---

## Was made for WOLFJAM 2024 
[WOLFJAM PROJECT](https://devpost.com/software/connection-untangle)

[PLAY ONLINE WITH PC](https://nikulram.github.io/connection-untangle/)
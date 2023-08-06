# Kanji Panda - A Japanese Kanji Study Companion
Unleash the power of kanji with this captivating study companion! Upon page load, users are greeted with 5 random characters. Dive into pronunciation and meanings at a tap, and save the ones you love to study. Plus, easily search by English meaning or character to fuel your language journey. Your path to kanji mastery starts here! 
Try this app <a href="https://kanji-panda.vercel.app/">here</a>!

## Technologies Used
React, PropTypes, React router v6, create-react-app, CSS, HTML, JavaScript, Cypress

## Why I Built This App:
As someone whose family are first-generation immigrants, learning languages holds a special place in my heart. It's a way to connect with cultures worldwide and learning my own family’s language helped me connect with my heritage and background. I genuinely hope this application can be a valuable tool for others who share the same passion for language learning and aid them in mastering the Japanese language.

## Contributors:
<a href="https://github.com/sakisandrac">Saki Chatphatthanasiri</a><br>

## Learning Goals:
At the time of this project, I am a student at Turing School of Software Engineering in the front end development program, in mod 3. This project was created for the final solo project- we have now been learning React and this project was a way to showcase all the knowlege gained from practicing React. 

## Challenges:
The biggest challenge about this project was the "my saved kanji" page. This page allows users to filter through their saved kanji by viewing all saved, kanji yet to be studied, and kanji already learned. Having the components re-render and stay in sync with each other was a challenge as there were serveral different states to keep track of.

Other challenges included testing with Cypress. I was running into errors while trying to intercept and stub data- everything was essentially working 90% of the time but I could not get it to work 100% of the time. In order to prevent as many fails as possible, I utilized Cypress' alias and wait methods to intercept data every time I was expecting my application to make a network request (which was sometimes more than once in each it block), as well and combining tests into as few it blocks as possible so that Cypress didn't have to intercept the data as frequently. 

The last challenge with Cypress was that Cypress was unable to read the Japanese kanji in the endpoints I was trying to intercept- it would turn endpoints such as `https://kanjialive-example/花` into `https://kanjialive-example/N2%20` where the kanji character was jiberish at the end, so my written intercepts were never matching the actual endpoints from the network requests being made. I ended up solving this by creating an array of "fake" kanji which was just an array of english alphabet letters, and assigning the alphabet letters to real kanji data through fixtures, that way when the intercepts were running, the endpoints no longer contained kanji characters and this worked!

## Project Preview
![Aug-06-2023 16-47-16](https://github.com/sakisandrac/kanji-panda/assets/118419729/200d78e2-f0c7-43e1-80e0-b02429600eeb)
![Aug-06-2023 16-47-30](https://github.com/sakisandrac/kanji-panda/assets/118419729/b49ca768-ac9b-40f2-8716-54228133791a)


## Set up
(NOTE: to run this project locally,<a href="https://rapidapi.com/KanjiAlive/api/learn-to-read-and-write-japanese-kanji"> you will need an api key from kanji alive</a>)
1. Fork or clone down this respository. 
2. In the terminal, open this app by running the command `cd <project folder name>`
3. Run the command  `npm install` to install dependencies.
4. Run the command `npm start` to start the server.
5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
6. You can also view the project <a href="https://kanji-panda.vercel.app/">here</a>.
7. Use control C to stop the server.

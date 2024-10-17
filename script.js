// script.js

let phrases = [
    "You're amazing.",
    "I appreciate you.",
    "You bring joy to my life.",
    "Your smile brightens my day.",
    "I can't imagine life without you.",
    "You have a heart of gold.",
    "Your laughter is the best sound.",
    "You inspire me to be better.",
    "I admire your strength and kindness.",
    "You are unique and special.",
    "Every moment with you is a treasure.",
    "You have a way of making everything better.",
    "Your presence makes my day brighter.",
    "I love the way you see the world.",
    "Before we continue, there's a video you MUST watch, and no skipping!",
];

let phraseIndex = 0; // To keep track of the current phrase displayed

// Function to handle transitions between sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active'); // Hide all sections
        section.classList.add('hidden'); // Add hidden class
    });
    document.getElementById(sectionId).classList.remove('hidden'); // Show the target section
    document.getElementById(sectionId).classList.add('active'); // Add active class
}

// Function to start background music and display phrases
function startBackgroundMusicAndDisplayPhrases() {
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.play(); // Start playing background music

    // Show phrases one by one
    const phraseInterval = setInterval(() => {
        if (phraseIndex < phrases.length) {
            document.getElementById('message').innerText = phrases[phraseIndex++];
        } else {
            clearInterval(phraseInterval); // Stop interval when all phrases are displayed
            setTimeout(() => {
                showSection('video-section'); // Move to video section after phrases
            }, 2000); // Wait for 2 seconds before moving to the video
        }
    }, 3000); // Change phrases every 3 seconds
}

// YouTube API initialization
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-video', {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

// Pause and play background music based on YouTube player state
function onPlayerStateChange(event) {
    const backgroundMusic = document.getElementById('background-music');
    if (event.data === YT.PlayerState.PLAYING) {
        backgroundMusic.pause(); // Pause background music when video plays
    } else if (event.data === YT.PlayerState.ENDED) {
        backgroundMusic.play(); // Resume background music after video ends
        showSection('confession-section'); // Go to confession section after video ends
    }
}

// Start everything on window load
window.addEventListener('load', () => {
    showSection('intro-section'); // Show intro section initially
    document.getElementById('start-button').addEventListener('click', () => {
        showSection('message-section'); // Show message section
        startBackgroundMusicAndDisplayPhrases(); // Start music and phrases
    });

    // Handle button clicks for confession
    document.getElementById('discord-button').addEventListener('click', () => {
        showSection('confession-section'); // Show confession section
        document.getElementById('choices').classList.remove('hidden'); // Show choices
    });

    // Handle Yes/No button clicks
    document.getElementById('yes-button').addEventListener('click', () => {
        showSection('thank-you-section'); // Show thank you section
    });

    document.getElementById('no-button').addEventListener('click', () => {
        alert('I appreciate your honesty. Let\'s stay friends! 🌟');
    });

    // Handle send message button click
    document.getElementById('send-message-button').addEventListener('click', () => {
        alert("Haha! Just kidding! This button doesn't actually work. Please send your message directly to my Instagram DM!");
    });

    // Toggle Dark/Light Mode
    document.getElementById('toggle-theme').addEventListener('click', () => {
        document.body.classList.toggle('dark'); // Toggle dark class
        const isDark = document.body.classList.contains('dark');
        document.getElementById('toggle-theme').textContent = isDark ? '☀️' : '🌙'; // Update toggle text
    });
});

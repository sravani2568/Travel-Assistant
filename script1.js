function planTrip() {
    const budget = document.getElementById('budget').value;
    const people = document.getElementById('people').value;
    const destinationContainer = document.getElementById('destination-container');

    // Clear previous destinations
    destinationContainer.innerHTML = '';

    let recommendedDestinations = [];

    // Example destinations for different budget ranges
    const destinations = {
        low: [
            {
                name: 'Hanoi, Vietnam',
                description: 'Affordable cultural experiences and street food.',
                image: 'https://vietnamtour.in/wp-content/uploads/VNIN_Hanoi_61.jpg'
            },
            {
                name: 'Lisbon, Portugal',
                description: 'Budget-friendly European destination with rich culture.',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtW61YKVDskfLa_qysUCL23fqq8WxGTnC3dg&s'
            }
        ],
        medium: [
            {
                name: 'Paris, France',
                description: 'Visit the Eiffel Tower, Louvre, and more!',
                image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/15/6d/d6/paris.jpg?w=1400&h=1400&s=1'
            },
            {
                name: 'Bali, Indonesia',
                description: 'Enjoy beautiful beaches and rich culture.',
                image: 'https://www.going.com/_next/image?url=https%3A%2F%2Fgoing-cms-strapi.s3.amazonaws.com%2F64d3d65ad1767dc0a382b38d_baliheader_c407957740.webp&w=3840&q=100&dpl=dpl_GhHDBZ2TTKvuJp46vFU27AJ2a6sY'
            }
        ],
        high: [
            {
                name: 'Maldives',
                description: 'Luxury resorts and crystal-clear waters.',
                image: 'https://hips.hearstapps.com/hmg-prod/images/best-hotels-in-maldives-10-1664296626.jpg?crop=1xw:0.8896302474284127xh;center,top&resize=980:*'
            },
            {
                name: 'Tokyo, Japan',
                description: 'Explore the modern city with traditional temples.',
                image: 'https://wanderlustcrew.com/wp-content/uploads/2018/10/What-to-do-in-Tokyo-Japan-Itinerary.jpg'
            }
        ]
    };

    // Get recommended destinations based on budget
    recommendedDestinations = destinations[budget];

    // Display recommendations
    recommendedDestinations.forEach(dest => {
        const card = document.createElement('div');
        card.classList.add('destination-card');
        card.innerHTML = `
            <img src="${dest.image}" alt="${dest.name}">
            <h3>${dest.name}</h3>
            <p>${dest.description}</p>
        `;
        destinationContainer.appendChild(card);
    });

    // Add animation effect
    destinationContainer.classList.add('fade-in');
}

// Add fade-in animation to destination container
document.getElementById('destination-container').addEventListener('animationend', function () {
    this.classList.remove('fade-in');
});

// Function to send message to the chatbot
function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") {
        return; // Don't send empty messages
    }

    // Display user message
    displayMessage(userInput, 'user');

    // Call the AI Assistant (you can integrate an API here or use a pre-trained model)
    getAIResponse(userInput);
    
    // Clear the input field
    document.getElementById("user-input").value = '';
}

// Function to display messages in the chatbox
function displayMessage(message, sender) {
    const chatboxBody = document.getElementById("chatbox-body");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender);
    messageDiv.textContent = message;
    chatboxBody.appendChild(messageDiv);

    // Scroll to the bottom of the chatbox
    chatboxBody.scrollTop = chatboxBody.scrollHeight;
}

// Function to simulate AI response (could integrate ML model or API here)
function getAIResponse(userInput) {
    // Simulate different responses based on input (you can replace this with an API or ML model call)
    let response = "I'm here to help! Tell me more about your trip.";
    
    if (userInput.toLowerCase().includes("budget")) {
        response = "Based on your budget, I can recommend some budget-friendly destinations!";
    } else if (userInput.toLowerCase().includes("destination")) {
        response = "I can recommend destinations based on your interests and preferences.";
    } else if (userInput.toLowerCase().includes("activities")) {
        response = "What kind of activities do you enjoy? Beaches, mountains, or something else?";
    }

    // Display AI response
    displayMessage(response, 'bot');
}





const chatboxBody = document.getElementById("chatbox-body");
const userInput = document.getElementById("user-input");

function sendMessage() {
    const message = userInput.value;
    displayMessage("user", message);
    userInput.value = "";

    // Start a conversation based on the input
    respondToUser(message);
}

function displayMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = message;
    chatboxBody.appendChild(messageElement);
    chatboxBody.scrollTop = chatboxBody.scrollHeight; // Scroll to the bottom
}

// Initial prompt from the chatbot
function startChat() {
    displayMessage("bot", "Welcome! Let's plan your trip together. First, what's your budget?");
    displayOptions(["Low", "Medium", "High"], handleBudget);
}

// Display options as clickable buttons
function displayOptions(options, callback) {
    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options");

    options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => callback(option);
        optionsContainer.appendChild(button);
    });

    chatboxBody.appendChild(optionsContainer);
    chatboxBody.scrollTop = chatboxBody.scrollHeight;
}

// Handle budget choice
function handleBudget(budget) {
    displayMessage("user", budget);
    displayMessage("bot", "Great! How many people are traveling?");
    displayOptions(["1", "2", "3-5", "More than 5"], handlePeople);
}

// Handle number of people choice
function handlePeople(people) {
    displayMessage("user", people);
    displayMessage("bot", "Got it! What type of destination do you prefer?");
    displayOptions(["Beaches", "Mountains", "Cities", "Countryside"], handleDestinationType);
}

// Handle destination type choice
function handleDestinationType(destinationType) {
    displayMessage("user", destinationType);
    displayMessage("bot", `Excellent choice! Here are some top recommendations for ${destinationType} destinations.`);
    displayRecommendations(destinationType);
}

// Display sample recommendations based on destination type
function displayRecommendations(type) {
    const recommendations = {
        Beaches: ["Maldives", "Bali, Indonesia", "Miami, USA"],
        Mountains: ["Swiss Alps, Switzerland", "Rocky Mountains, Canada", "Himalayas, Nepal"],
        Cities: ["Paris, France", "Tokyo, Japan", "New York, USA"],
        Countryside: ["Tuscany, Italy", "Kyoto, Japan", "Loire Valley, France"]
    };

    const selectedRecommendations = recommendations[type] || [];
    displayMessage("bot", "Top destinations for you:");
    selectedRecommendations.forEach(place => {
        displayMessage("bot", `- ${place}`);
    });

    displayMessage("bot", "Would you like more details on any of these destinations?");
    displayOptions(["Yes", "No"], handleMoreDetails);
}

// Handle user choice for more details
function handleMoreDetails(response) {
    if (response === "Yes") {
        displayMessage("user", response);
        displayMessage("bot", "Please select a destination to learn more!");
        displayOptions(["Maldives", "Bali, Indonesia", "Miami, USA"], showDestinationDetails);
    } else {
        displayMessage("user", "No");
        displayMessage("bot", "Thanks for using our travel assistant! Let me know if you have more questions.");
    }
}

// Display destination details (placeholder function)
function showDestinationDetails(destination) {
    displayMessage("user", destination);
    displayMessage("bot", `${destination} is a fantastic choice! Known for its breathtaking beauty and vibrant culture.`);
}

// Start the chatbot
startChat();


let channel;

function initializeChat(chatId) {
    // Create a new MessageChannel
    const messageChannel = new MessageChannel();
    channel = messageChannel.port1;
    
    // Listen for messages
    channel.onmessage = (event) => {
        displayMessage(event.data, 'received');
    };
    
    // When the window loads, send the port to the parent
    window.onload = () => {
        window.parent.postMessage(`connect-${chatId}`, '*', [messageChannel.port2]);
    };
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message && channel) {
        channel.postMessage(message);
        displayMessage(message, 'sent');
        input.value = '';
    }
}

function displayMessage(message, type) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Allow sending message with Enter key
document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
}); 
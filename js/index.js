let port1, port2;

window.onmessage = (event) => {
    // Ensure the message is from our iframes
    if (event.source !== window) {
        if (event.data === 'connect-chat1') {
            port1 = event.ports[0];
            setupCommunication();
        } else if (event.data === 'connect-chat2') {
            port2 = event.ports[0];
            setupCommunication();
        }
    }
};

function setupCommunication() {
    // Only set up the communication when both ports are available
    if (port1 && port2) {
        port1.onmessage = (event) => {
            port2.postMessage(event.data);
        };

        port2.onmessage = (event) => {
            port1.postMessage(event.data);
        };
    }
} 
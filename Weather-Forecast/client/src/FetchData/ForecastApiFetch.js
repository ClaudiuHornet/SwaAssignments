
export const url = (type,city) => {
    return `http://localhost:3080/${type}/${city}`
}
//Q5 async/await
//The fetch function returns a promise that resolves with a response object
//We then use the await keyword to wait for the promise to resolve
//then we extract the data from the response object and return the value
export const getForecast = async (url) => {
    try {
        const response = await fetch(url)
        const temp =  response.json()
        return await temp
    } catch (e) {
        throw e
    }
}

//Q6
export const sendMessageWS = (message, urlString) => {
    let socket = new WebSocket(urlString)

    socket.onopen = () => {
        alert("[open] Connection established");
        alert("Sending to server");
        if (message)
        socket.send(message);
    };

    socket.onmessage = (e) => {
        alert(`[message] Data received from server: ${e.data}`);
    };

    socket.onclose = (e) => {
        if (e.wasClean) {
            alert(`[close] Connection closed cleanly, code=${e.code} reason=${e.reason}`);
        } else {
            alert('[close] Connection died');
        }
    };

    socket.onerror = (error) => {
        alert(`[error] ${error.message}`);
    };
    return socket
}
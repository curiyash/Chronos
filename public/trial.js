(function(){
    async function requestPocket(){
        console.log("Clicked");
        await fetch("https://getpocket.com/v3/oauth/request?consumer_key=102894-ac9c50b12080d1f4d69a0de&redirect_uri=www.google.com", {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(response => response.text())
        .then(data => console.log(data));
    }

    let m = document.getElementsByClassName("begin")[0];
    m.onclick = requestPocket;
})();
document.addEventListener("DOMContentLoaded", () => {

    const enableBtn = document.getElementById('enable-btn');
    const sendBtn = document.getElementById('send-notification-btn');
    const statusText = document.getElementById('status');

    function updatePermissionStatus() {
        const permission = Notification.permission;

        if (permission === 'granted') {
            statusText.textContent = "Permission Status: Granted ✅";
            statusText.style.color = "green";
            enableBtn.style.display = "none";
        } 
        else if (permission === 'denied') {
            statusText.textContent = "Permission Status: Denied ❌";
            statusText.style.color = "red";
        } 
        else {
            statusText.textContent = "Permission Status: Default (Ask)";
            statusText.style.color = "#333";
        }

        sendBtn.disabled = (permission !== "granted");
    }

    enableBtn.addEventListener("click", () => {
        if (!("Notification" in window)) {
            statusText.textContent = "Error: Browser not supported";
            return;
        }

        Notification.requestPermission().then(() => {
            updatePermissionStatus();
        });
    });

    sendBtn.addEventListener("click", () => {
        if (Notification.permission === "granted") {
            const notification = new Notification("Alert! New Message!", {
                body: "This is the simple pop-up text you requested.",
                icon: "https://cdn-icons-png.flaticon.com/512/565/565422.png"
            });

            setTimeout(() => notification.close(), 3000);
        }
    });

    updatePermissionStatus();
});

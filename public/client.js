const publicVapidKey = "BB9cTa531zVr4vy5_uHSK9e07xnM_2jBTnjIFvN0jzmQlNyOn5U1568NpId82jAh1R91SBkgP886-jF6mk4BKgo";

// service workers are promised base
//console.log("FOO");

//check for service worker
// if ("serviceWorker" in navigator) {
//     run().catch(err => console.error(err))
// }

const check = () => {
    if (!("serviceWorker" in navigator)) {
        throw new Error("No Service Worker Support!");
    }
    if (!("PushManager" in window)) {
        throw new Error("No Push API Support!")
    }
}

// register service worker and push
const registerServiceWorker = () => {
    console.log("Registering service worker...");
    navigator.serviceWorker.register("/serviceworker.js", { // installing service worker if it does not exist
        scope: "/"
    }).then(register => {
        let serviceWorker;
        if (register.installing) {
            serviceWorker = register.installing;
        } else if (register.waiting) {
            serviceWorker = register.waiting;
        } else if (register.active) {
            serviceWorker = register.active;
        }

        if (serviceWorker) {
            console.log("sw current state", serviceWorker.state);
            if (serviceWorker.state == "activated") {
                console.log("sw already active");
                async function newUserOldSW() {
                    console.log("NEW USER, OLD Service Worker Registered");
                    // register push
                    console.log("Registering push...");
                    const notification = await register.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
                    });
                    console.log("Push registered");
                    //send push notification
                    console.log("Sending endpoint payload to server to save");
                    await fetch("/endpoint", {
                        method: "POST",
                        body: JSON.stringify(notification),
                        headers: {
                            "content-type": "application/json"
                        }
                    });
                    console.log("Payload sent");
                }
                newUserOldSW();
            }
            serviceWorker.addEventListener("statechange", async function (e) {
                console.log("sw statechange : ", e.target.state);
                if (e.target.state == "activated") {

                    console.log("Service Worker Registered");
                    // register push
                    console.log("Registering push...");
                    const notification = await register.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
                    });
                    console.log("Push registered");
                    //send push notification
                    console.log("Sending endpoint payload to server to save");
                    await fetch("/endpoint", {
                        method: "POST",
                        body: JSON.stringify(notification),
                        headers: {
                            "content-type": "application/json"
                        }
                    });
                    console.log("Payload sent");

                }
            })
        }
    })


}




const reqNotificationPerm = async () => {
    const permission = await window.Notification.requestPermission();

    if (permission !== "granted") {
        throw new Error("Permission not granted for Notification!")
    } else if (permission === "granted") {
        return permission
    }
}




function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


const main = async () => {
    check();
    await reqNotificationPerm();
    await registerServiceWorker();
}

main();

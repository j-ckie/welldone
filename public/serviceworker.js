console.log("Service Worker Loaded");

self.addEventListener("push", event => {
    const data = event.data.json();
    console.log("Push received", data)
    self.registration.showNotification(data.title, {
        body: '',
        icon: 'https://i.imgur.com/ZZ7SWwY.png'
    });
})
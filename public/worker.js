console.log("Service Worker Loaded");

self.addEventListener("push", event => {
    const data = event.data.json();
    console.log("Push received", data)
    self.registration.showNotification(data.title, {
        body: '',
        icon: "https://lh3.googleusercontent.com/p_eCmyizbLeNPn13aus7C0iilpW0880LY2tETmcyGylv_inw9p0NYW2BGCk04fUO1ZNOCNhSg5xZxvtUtB0uoCRt3HbJQ2mXzzb2NWv4k6G0qHSD86Wfnx-6C6mfHMMgAnMhWLeknJwQnG_7YggLwv4CYGQx46SFodGdhXSmoGH8QKr_cKfiA131DxHoJAzDChNwHwrINbvEBYVJ1D7efXhhwWJiTaHygxEI0BZIZ1CslbtguUTkLEp54X9junuWgJNfbnwHj_Zo9MSKoC0jTQFBmP--yAABnvQWPPeAyym4aDq4Hu_XwVObFLF3qISDx9VSZNyGOu5mx9ynXdGNhdnGYuJayhs3ML9mus8AbQalZ1w7eHkdmExHxDQbgR3MMldX7ccUWCVdnUJta8VU9U4uvGfRbjUfih-X6w4xzxEAPUVWz6e7ldH9T1yWZb3gPFsJgj50WMGm2rAJEOz4nbfrfvozFDYxVdPVJ56ERiRIHcESaYSwhbFqur3gu7B5FdGhQsDuWAKv5OPsGgG7WjpGjkrPpwFC4YlGCjCakc5aFC_XPLPXDLgz1IuOj8mzSnZmgw3FIb0bbj54E8mC3c9krV-cnQlHr6g3D62mLk714VPy4zJ94jYMpV7l16HmE6v3ylrhg_ziT0EtAQYqQ5eU2RUd6NrHyQSBqLdunxttoWaIv_lsMg=w128-h111-no"
    });
})
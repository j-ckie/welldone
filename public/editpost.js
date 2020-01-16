
let editPostBtn = document.getElementsByClassName("editpost-button")
let updatePostForm = document.getElementsByClassName("update-post-form")
let hideEditFields = document.getElementsByClassName("hide-post-form")

updatePostForm.style.display = "none";
hideEditFields.style.display = "none";

editPostBtn.addEventListener("click", () => {
    updatePostForm.style.display = "block";
    hideEditFields.style.display = "block";
    editPostBtn.style.display = "none";
})

hideEditFields.addEventListener("click", () => {
    updatePostForm.style.display = "none";
    editPostBtn.style.display = "block";
    hideEditFields.style.display = "none";
})

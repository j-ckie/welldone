
function showEdit(id) {
    let edit = document.getElementById(`Edit${id}`)
    let cancelEditBtn = document.getElementById('hide-edit-button')
    cancelEditBtn.style.display = "block"
    edit.style.display = "block"
}

function hideEdit(id) {
    let edit = document.getElementById(`Edit${id}`)
    let cancelEditBtn = document.getElementById('hide-edit-button')
    cancelEditBtn.style.display = "none"
    edit.style.display = "none"
}


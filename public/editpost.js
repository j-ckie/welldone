
function showEdit(id) {
    let edit = document.getElementById(`Edit${id}`)
    let showEditBtn = document.getElementById('show-edit-button')
    let cancelEditBtn = document.getElementById('hide-edit-button')
    cancelEditBtn.style.display = "block"
    showEditBtn.style.display = "none"
    edit.style.display = "block"
}

function hideEdit(id) {
    let edit = document.getElementById(`Edit${id}`)
    let showEditBtn = document.getElementById('show-edit-button')
    let cancelEditBtn = document.getElementById('hide-edit-button')
    cancelEditBtn.style.display = "none"
    showEditBtn.style.display = "block"
    edit.style.display = "none"
}


// Event Listeners
document.querySelector('#editDetails').addEventListener('click', detailsModal);

async function detailsModal() {
    var myModal = new bootstrap.Modal(document.getElementById('detailsModal'));
    myModal.show();
}

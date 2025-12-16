// Event Listeners
document.querySelector('#editDetails').addEventListener('click', detailsModal);
document.querySelector('#addRepair').addEventListener('click', addRepairModal);


// Functions
async function detailsModal() {
    var myModal = new bootstrap.Modal(document.getElementById('detailsModal'));
    myModal.show();
}

async function addRepairModal() {
    var myModal = new bootstrap.Modal(document.getElementById('addRepairModal'));
    myModal.show();
}

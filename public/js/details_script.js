// Event Listeners
document.querySelector('#editDetails').addEventListener('click', detailsModal);
document.querySelector('#addRepair').addEventListener('click', addRepairModal);
document.querySelectorAll('.deleteRepairBtn').forEach(button => {
    button.addEventListener('click', () => {
        let repair_id = button.value;
        confirmDeleteModal(repair_id);
    })
});


// Functions
async function detailsModal() {
    var myModal = new bootstrap.Modal(document.getElementById('detailsModal'));
    myModal.show();
}

async function addRepairModal() {
    var myModal = new bootstrap.Modal(document.getElementById('addRepairModal'));
    myModal.show();
}

async function confirmDeleteModal(repair_id) {
    var deleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    document.querySelector('#deleteRepairForm').innerHTML += `<input type="hidden" name="repair_id" value="${repair_id}">`;
    deleteModal.show();
}
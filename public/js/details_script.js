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
    displayModelOptions();
    document.querySelector('#makeSelect').addEventListener('change', displayModelOptions);

    myModal.show();
}

async function displayModelOptions() {
    let make = document.querySelector('#makeSelect').value.toLowerCase();
    let modelOptions = document.querySelector('#modelSelect');
    let currentModel = modelOptions.attributes.value.value;
    modelOptions.innerHTML = `<option value="">Select Model:</option>`;

    let data = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${make}?format=json`);
    let results = await data.json();
    let models = [];

    for(i in results.Results) {
        models.push(results.Results[i].Model_Name);
    }

    models.sort();

    for (i in models) {
        let modelName = models[i];
        if (modelName == currentModel) {
            modelOptions.innerHTML += `<option value="${modelName}" selected>${modelName}</option>`;
        } else {
        modelOptions.innerHTML += `<option value="${modelName}">${modelName}</option>`;
        }
    }
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
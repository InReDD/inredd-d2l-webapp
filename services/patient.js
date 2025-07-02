import { API } from "@/helpers/api"; 

/**
 * Fetches a list of all patients from the API.
 * Can include search parameters for filtering, sorting, etc.
 * @param {object} searchParams - Optional search parameters to be sent to the API.
 * @returns {Promise<Array>} 
 */
export async function getAllPatients(searchParams) {
  try {
    const patients = await API.get({ path: "/patients", searchParams });
    return patients;
  } catch (err) {
    console.error("Failed to fetch patients:", err);
    return [];
  }
}

/**
 * Fetches a single patient by their unique ID.
 * @param {string | number} id - The ID of the patient to fetch.
 * @returns {Promise<object|null>} A promise that resolves to the patient DTO or null if not found/error.
 */
export async function getPatientById(id) {
  if (!id) {
    throw new Error("Patient ID is required.");
  }
  try {
    const patient = await API.get({ path: `/patients/${id}` });
    return patient;
  } catch (err) {
    console.error(`Failed to fetch patient with ID ${id}:`, err);
    return null;
  }
}

/**
 * Creates a new patient.
 * @param {object} patientData - The data for the new patient, matching the PatientCreateDTO.
 * @returns {Promise<object>} A promise that resolves to the newly created patient DTO.
 */
export async function createPatient(patientData) {
  try {
    const newPatient = await API.post({ path: "/api/v1/patients", data: patientData });
    return newPatient;
  } catch (err) {
    console.error("Failed to create patient:", err);
    // Re-throw the error so the component can handle it (e.g., show a toast notification)
    throw err;
  }
}

/**
 * Updates an existing patient by their ID.
 * @param {string | number} id - The ID of the patient to update.
 * @param {object} patientData - The updated data for the patient.
 * @returns {Promise<object>} A promise that resolves to the updated patient DTO.
 */
export async function updatePatient(id, patientData) {
  if (!id) {
    throw new Error("Patient ID is required for updating.");
  }
  try {
    const updatedPatient = await API.put({ path: `/patients/${id}`, data: patientData });
    return updatedPatient;
  } catch (err) {
    console.error(`Failed to update patient with ID ${id}:`, err);
    throw err;
  }
}

/**
 * Deletes a patient by their ID.
 * @param {string | number} id - The ID of the patient to delete.
 * @returns {Promise<void>} A promise that resolves when the deletion is successful.
 */
export async function deletePatient(id) {
  if (!id) {
    throw new Error("Patient ID is required for deletion.");
  }
  try {
    await API.delete({ path: `/patients/${id}` });
  } catch (err) {
    console.error(`Failed to delete patient with ID ${id}:`, err);
    throw err;
  }
}

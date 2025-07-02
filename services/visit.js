import { API } from "@/helpers/api";

/**
 * Fetches all visits for a specific patient.
 * Can include search parameters for filtering or pagination.
 * @param {string | number} patientId - The ID of the patient whose visits are to be fetched.
 * @param {object} [searchParams] - Optional search parameters.
 * @returns {Promise<Array>} A promise that resolves to an array of visit DTOs.
 */
export async function getAllVisitsForPatient(patientId, searchParams) {
  if (!patientId) {
    throw new Error("Patient ID is required to fetch visits.");
  }
  try {
    // This endpoint structure is a common RESTful pattern
    const visits = await API.get({ path: `/patients/${patientId}/visits`, searchParams });
    return visits;
  } catch (err) {
    console.error(`Failed to fetch visits for patient ID ${patientId}:`, err);
    return []; // Return an empty array on failure so UI doesn't break
  }
}

/**
 * Fetches a single visit by its unique ID.
 * @param {string | number} id - The ID of the visit to fetch.
 * @returns {Promise<object|null>} A promise that resolves to the visit DTO or null if not found/error.
 */
export async function getVisitById(id) {
  if (!id) {
    throw new Error("Visit ID is required.");
  }
  try {
    const visit = await API.get({ path: `/visits/${id}` });
    return visit;
  } catch (err) {
    console.error(`Failed to fetch visit with ID ${id}:`, err);
    return null;
  }
}

/**
 * Creates a new visit for a specific patient.
 * @param {string | number} patientId - The ID of the patient for whom the visit is being created.
 * @param {object} visitData - The data for the new visit.
 * @returns {Promise<object>} A promise that resolves to the newly created visit DTO.
 */
export async function createVisit(patientId, visitData) {
  if (!patientId) {
    throw new Error("Patient ID is required to create a visit.");
  }
  try {
    const newVisit = await API.post({ path: `/patients/${patientId}/visits`, data: visitData });
    return newVisit;
  } catch (err) {
    console.error("Failed to create visit:", err);
    throw err; // Re-throw to allow component-level error handling
  }
}

/**
 * Updates an existing visit by its ID.
 * @param {string | number} id - The ID of the visit to update.
 * @param {object} visitData - The updated data for the visit.
 * @returns {Promise<object>} A promise that resolves to the updated visit DTO.
 */
export async function updateVisit(id, visitData) {
  if (!id) {
    throw new Error("Visit ID is required for updating.");
  }
  try {
    const updatedVisit = await API.put({ path: `/visits/${id}`, data: visitData });
    return updatedVisit;
  } catch (err) {
    console.error(`Failed to update visit with ID ${id}:`, err);
    throw err;
  }
}

/**
 * Deletes a visit by its ID.
 * @param {string | number} id - The ID of the visit to delete.
 * @returns {Promise<void>} A promise that resolves when the deletion is successful.
 */
export async function deleteVisit(id) {
  if (!id) {
    throw new Error("Visit ID is required for deletion.");
  }
  try {
    await API.delete({ path: `/visits/${id}` });
  } catch (err) {
    console.error(`Failed to delete visit with ID ${id}:`, err);
    throw err;
  }
}

/**
 * Performs a complex search for visits based on multiple criteria.
 * @param {object} searchCriteria - An object containing all the search filters.
 * @returns {Promise<object>} A promise that resolves to an object containing results and stats.
 */
export async function searchVisits(searchCriteria) {
  try {
    const response = await API.post({ path: "/visits/search", data: searchCriteria });
    return response;
  } catch (err) {
    console.error("Failed to perform advanced visit search:", err);
    throw err;
  }
}
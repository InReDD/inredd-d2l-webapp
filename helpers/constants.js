/**
 * @file This file contains shared constants used throughout the application
 * to ensure consistency and improve maintainability.
 */

/**
 * Standardized options for select dropdowns that handle boolean (Yes/No) filters,
 * including a default "Any" option for searching.
 */
export const BOOLEAN_OPTIONS_ANY = [
    { value: '', label: 'Any' },
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' }
];

/**
 * Standardized options for the 'sex' field in forms.
 * The 'value' must exactly match the string values defined in the backend's `SexEnum.java`.
 */
export const SEX_OPTIONS = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
];

/**
 * Defines standard date and time formats used across the application.
 */
export const DATE_FORMATS = {
    /** For displaying dates in a user-friendly format (e.g., 07/02/2025) */
    LOCAL_DATE: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    },
    /** For displaying dates and times (e.g., 07/02/2025, 9:23 PM) */
    LOCAL_DATETIME: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
    },
    /** The format expected by HTML <input type="date"> elements (YYYY-MM-DD) */
    HTML_INPUT: 'yyyy-MM-dd',
};

/**
 * Application-wide constants.
 */
export const APP_INFO = {
    NAME: "Dental Second Look",
    VERSION: "1.0.0",
};
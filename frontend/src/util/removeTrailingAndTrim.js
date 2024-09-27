/**
 * Removes trailing whitespace from the text and trims any leading/trailing whitespace.
 * If the text ends with a period (.), it is removed.
 *
 * @param {string} text - The input text to be processed.
 * @returns {string} The processed text with trailing whitespace and trailing period removed.
 */
export const removeTrailingAndTrim = (text) => {
    if (typeof text !== 'string') return '';

    let result = text.trim();
    if (result.endsWith('.')) {
        result = result.slice(0, -1);
    }
    return result;
}
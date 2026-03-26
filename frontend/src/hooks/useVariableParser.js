import { useMemo } from 'react';

const variableRegex = /{{\s*([a-zA-Z_$][\w$.-]*)\s*}}/g;

/**
 * React hook that parses text for {{variable}} placeholders.
 * Returns an array of unique variables with generated label and handle IDs.
 * 
 * @param {string} text - The input template text.
 * @returns {Array<{label: string, handleId: string}>}
 */
export const useVariableParser = (text) =>
  useMemo(() => {
    const matches = Array.from(text.matchAll(variableRegex));
    const uniqueVariables = new Map();

    matches.forEach((match) => {
      const label = match[1];
      if (!uniqueVariables.has(label)) {
        uniqueVariables.set(label, {
          label,
          handleId: label.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase(),
        });
      }
    });

    return Array.from(uniqueVariables.values());
  }, [text]);

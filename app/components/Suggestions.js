"use client";

import { useBudget } from "../context/BudgetContext";

const Suggestions = () => {
  const { getSavingsSuggestions } = useBudget();

  const suggestions = getSavingsSuggestions();

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded shadow dark:bg-gray-800">
      <h3 className="text-xl font-semibold mb-4">Tasarruf Önerileri</h3>
      <ul className="list-disc pl-6 space-y-2">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;

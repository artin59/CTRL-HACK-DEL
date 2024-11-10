// utils/csvLoader.js
import Papa from 'papaparse';

export const loadCSV = async () => {
  const response = await fetch('/food-data.csv'); // Assuming the CSV is in the public folder
  const data = await response.text();
  
  // Parse CSV data using papaparse
  const parsedData = Papa.parse(data, {
    header: true, // Consider first row as headers
    skipEmptyLines: true,
  });
  
  return parsedData.data; // Return the parsed rows
};

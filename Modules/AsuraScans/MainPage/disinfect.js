const str = 'self.__next_f.push([123, "a really long string with many characters..."])';

// Regular expression to match the function call and capture the array part
const regex = /self\.__next_f\.push\(\[(.*?)\]\)/;

// Match the regular expression against the string
const match = str.match(regex);

if (match) {
  // Extract the array part from the match
  const arrayString = match[1]; // This will be '123, "a really long string with many characters..."'

  // Split the array string into its components
  // Use a regex to split by comma not inside quotes
  const parts = arrayString.split(/,\s*(?=(?:(?:[^"]*"){2})*[^"]*$)/); // Split by comma outside quotes

  // Access the specific elements
  if (parts.length > 1) {
    const firstElement = parts[0].trim(); // The number (123)
    const secondElement = parts[1].trim().slice(1, -1); // The long string, removing quotes

    console.log('First element:', firstElement);
    console.log('Second element:', secondElement);
  } else {
    console.log('The array does not have two elements.');
  }
} else {
  console.log('Function not found.');
}

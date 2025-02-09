import ky from "ky" // Import ky

const kyInstance = ky.create({ // Create a new instance of ky
    parseJson: (text) => // Parse the JSON response 
        JSON.parse(text, (key, value) => { // Parse the JSON response with a reviver function that converts the date strings to Date objects
            if (key.endsWith("At")) return new Date(value) // Convert the date strings to Date objects
            return value // Return the value as is if it's not a date string 
        })
})

export default kyInstance; // Export the ky instance
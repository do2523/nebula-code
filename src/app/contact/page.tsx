'use client'
import React from "react"; // Ensure React is imported

export default function Contact() {
  // 1. The handleSubmit function is defined inside the Contact component.
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent default form submission behavior

    // 2. Use event.currentTarget to get the form element
    const formData = new FormData(event.currentTarget);

    // 3. Append the access key to the form data
    formData.append("access_key", "bedb4d5a-a2f1-4512-87d3-d3d5ce2bf431");

    // 4. Convert formData to an object and then to a JSON string
    const object = Object.fromEntries(formData.entries()); // Make sure to use .entries()
    const json = JSON.stringify(object);

    try {
      // 5. Send the form data to the server
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      if (!response.ok) {
        // Handle non-200 responses
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 6. Parse the JSON response
      const result = await response.json();
      if (result.success) {
        // Log success
        console.log("Form submitted successfully:", result);
      } else {
        // Log failure
        console.error("Form submission failed:", result);
      }
    } catch (error) {
      // 7. Log errors
      console.error("Error submitting form:", error);
    }
  }

  // 8. Return the form element with the onSubmit handler
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" required />
        <input type="email" name="email" required />
        <textarea name="message" required></textarea>
        <button type="submit">Submit Form</button>
      </form>
    </>
  );
}

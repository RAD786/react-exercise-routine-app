export const validateForm = (formData) => {
    const errors = {};
  
    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }
  
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errors.email = "Enter a valid email address.";
    }
  
    if (!formData.message.trim()) {
      errors.message = "Message cannot be empty.";
    } else if (formData.message.length < 10) {
      errors.message = "Message must be at least 10 characters.";
    }
  
    return errors; // Returns an object with validation errors
  };
  
export const validateUserAuthForm = (formData, formState) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const phoneRegex = /^[0-9]{10}$/;
  const nameRegex = /^[A-Za-z\s]+$/;

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Invalid email format";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (!passwordRegex.test(formData.password)) {
    errors.password =
      "Password must contain at least 8 characters, including one uppercase, one lowercase, one number, and one special character";
  }

  if (formState === "Sign Up") {
    if (!formData.name) {
      errors.name = "Name is required";
    } else if (!nameRegex.test(formData.name)) {
      errors.name = "Name can only contain letters and spaces";
    }
  }

  if (formState === "Sign Up") {
    if (!formData.phone) {
      errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Invalid phone number format";
    }
  }

  return errors;
};


export const validateAddItemForm = (formData, selectedImage) => {
    const errors = {};
  
    if (!formData.brand) errors.brand = "Brand is required";
    if (!formData.year) errors.year = "Year is required";
    if (!formData.itemName) errors.itemName = "Item Name is required";
    if (!formData.state) errors.state = "State is required";
    if (!formData.place) errors.place = "Place is required";
    if (!formData.zipCode) errors.zipCode = "Zip Code is required";
    if (!formData.description) errors.description = "Description is required";
    if (!formData.price) errors.price = "Price is required";
    if (!formData.username) errors.username = "Username is required";
    if (!formData.phone) errors.phone = "Phone is required";
    if (!selectedImage) errors.image = "Image is required"; 
  
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }

    if (formData.price && isNaN(formData.price)) {
      errors.price = "Price must be a valid number";
    }

    if (selectedImage) {
        const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!validImageTypes.includes(selectedImage.type)) {
            errors.image = "Invalid image format. Only JPG, JPEG, or PNG are allowed.";
        }
      }
  
    return errors;
  };
  
const handleImageUpload = async (file) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
  formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_NAME);
  const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URL.replace(
    "{cloud_name}",
    import.meta.env.VITE_CLOUDINARY_NAME
  );
  
  const response = await fetch(cloudinaryUrl, {
    method: "POST",
    body: formData,
  });

  const uploadedImageURl = await response.json();

  return uploadedImageURl.url;
};

export default handleImageUpload;

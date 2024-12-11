export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file); // ImgBB expects "image" as the key for the file
    const apiKey = process.env.REACT_APP_IMGBB_API_KEY; // Store your ImgBB API key in environment variables
    const url = `https://api.imgbb.com/1/upload?key=${apiKey}`; // ImgBB API endpoint
  
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("Something went wrong with the image upload");
    }
  
    const data = await response.json();
    return data.data.url; 
  };
  
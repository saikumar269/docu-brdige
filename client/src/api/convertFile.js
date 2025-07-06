const response = await fetch("http://localhost:5000/api/convert", {
  method: "POST",
  body: formData,
});

const blob = await response.blob();
const url = URL.createObjectURL(blob);
setConvertedFile(url);

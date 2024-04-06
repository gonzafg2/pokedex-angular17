addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // URL de la imagen Docker
  const dockerImageUrl = process.env.DOCKER_IMAGE_URL;

  // Hacer una solicitud a la imagen Docker
  const dockerImageResponse = await fetch(dockerImageUrl);

  // Extraer el contenido de la respuesta de la imagen Docker
  const dockerImageBlob = await dockerImageResponse.blob();

  // Construir una nueva respuesta para el cliente con el contenido de la imagen Docker
  const response = new Response(dockerImageBlob, {
    status: dockerImageResponse.status,
    statusText: dockerImageResponse.statusText,
    headers: {
      "Content-Type": "application/octet-stream", // Cambiar según el tipo de imagen Docker
      "Cache-Control": "public, max-age=3600", // Opcional: configurar la caché
    },
  });

  return response;
}

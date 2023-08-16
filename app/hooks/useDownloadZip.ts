import JSZip from "jszip";

export default function useDownloadZip(
  fileName: string,
  htmlContent: string,
  mdContent: string,
  texContent: string
) {
  const downloadZip = async () => {
    const zip = new JSZip();

    // Add HTML file
    zip.file(`${fileName}.html`, htmlContent);

    // Add MD file
    zip.file(`${fileName}.md`, mdContent);

    // Add TEX file
    zip.file(`${fileName}.tex`, texContent);

    // Get html img tags and iterate over the array
    const images = htmlContent.match(/<img[^>]+src="([^">]+)"/g);
    for (const imgTag of images!) {
      // Get src from imgTag
      const srcMatch = imgTag.match(/src="([^">]+)"/);
      if (srcMatch![1]) {
        const imageUrl = srcMatch![1];
        try {
          // Fetch image to URL
          const response = await fetch(imageUrl);
          if (!response.ok) {
            throw new Error(
              `Network response was not ok. Status: ${response.status}`
            );
          }
          // Get image blob and zip it
          const imageBlob = await response.blob();
          zip.file(imageUrl, imageBlob);
        } catch (error) {
          console.error("Image fetch error:", error);
        }
      }
    }

    // const blob = new Blob([htmlContent]);
    // zip.file(, blob);

    // Get zip blob
    const zipBlob = await zip.generateAsync({ type: "blob" });

    // Create URL and add <a> tag to document
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Return zip promise
  return downloadZip;
}

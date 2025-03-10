"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, CardMedia, Typography } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";

interface ArchivosMultimediaProps {
  onChange: (files: File[], updatedImageUrls: string[]) => void;
  existingImages?: string[];
}

interface PreviewFile {
  url: string;
  isVideo: boolean;
  isUploaded: boolean; // 🔹 Indica si la imagen proviene de la BD
}

const ArchivosMultimedia: React.FC<ArchivosMultimediaProps> = ({ onChange, existingImages = [] }) => {
  const [previewFiles, setPreviewFiles] = useState<PreviewFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]); // 🔹 Maneja las URLs actuales

  useEffect(() => {
    if (existingImages.length > 0) {
      const formattedImages = existingImages.map(url => ({
        url,
        isVideo: url.endsWith(".mp4"),
        isUploaded: true, // 🔹 Indica que son imágenes ya almacenadas
      }));
      setPreviewFiles(formattedImages);
      setImageUrls(existingImages);
    }
  }, [existingImages]);

  const handleLocalUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, 4 - previewFiles.length);
      const newPreviews = newFiles.map((file) => ({
        url: URL.createObjectURL(file),
        isVideo: file.type.startsWith("video/"),
        isUploaded: false, // 🔹 Indica que es una nueva imagen
      }));

      setPreviewFiles([...previewFiles, ...newPreviews]);
      setSelectedFiles([...selectedFiles, ...newFiles]);
      onChange([...selectedFiles, ...newFiles], imageUrls); // 🔹 Envía imágenes actualizadas al formulario
    }
  };

  const handleRemoveFile = (index: number) => {
    const fileToRemove = previewFiles[index];

    if (fileToRemove.isUploaded) {
      // 🔹 Si la imagen es de la BD, la eliminamos de `imageUrls`
      const updatedUrls = imageUrls.filter((url) => url !== fileToRemove.url);
      setImageUrls(updatedUrls);
      onChange(selectedFiles, updatedUrls);
    } else {
      // 🔹 Si es una imagen nueva, la eliminamos de `selectedFiles`
      const updatedFiles = selectedFiles.filter((_, i) => i !== index);
      setSelectedFiles(updatedFiles);
      onChange(updatedFiles, imageUrls);
    }

    setPreviewFiles(previewFiles.filter((_, i) => i !== index));
    URL.revokeObjectURL(fileToRemove.url);
  };

  return (
    <Box
      className="bg-black10"
      sx={{
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "20px",
      }}>
      <Box className="bg-black10" sx={{ p: 3, borderRadius: "8px", width: "100%", textAlign: "center" }}>
        <input accept=".jpg,.png,.mp4" type="file" multiple onChange={handleLocalUpload} style={{ display: "none" }} id="local-upload" />
        <label htmlFor="local-upload">
          <Button
            variant="contained"
            component="span"
            className="bg-primary"
            sx={{ textTransform: "none", width: "218px", height: "50px", borderRadius: "20px", marginTop: "10px" }}
            startIcon={<FileUploadIcon />}
            disabled={previewFiles.length >= 4}>
            Seleccionar archivos
          </Button>
        </label>
        <Typography style={{ fontSize: "15px", paddingTop: "8px" }}>En formato .jpg o .png</Typography>

        <Box display="flex" flexWrap="wrap" mt={2} gap={2} justifyContent="center">
          {previewFiles.map((file, index) => (
            <Box key={index} sx={{ position: "relative", width: "200px", height: "200px" }}>
              {file.isVideo ? (
                <video style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "8px" }} src={file.url} controls />
              ) : (
                <CardMedia component="img" sx={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "8px" }} image={file.url} alt={`Vista previa ${index + 1}`} />
              )}
              <IconButton aria-label="delete" onClick={() => handleRemoveFile(index)} sx={{ position: "absolute", top: "5px", right: "5px", backgroundColor: "rgba(255, 0, 0, 0.8)", color: "white", "&:hover": { backgroundColor: "red" } }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ArchivosMultimedia;

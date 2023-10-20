import { Button } from "@/components/ui/button";
import { ICreateInvoiceForm } from "@/types/invoice";
import { Box } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import "./imagePicker.css";

const ImagePicker = () => {
  const { setValue } = useFormContext<ICreateInvoiceForm>();

  const [image, setImage] = useState<string | null>(null);

  const onImageChange = (event: any) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setValue("image", event.target.files[0]);
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid #3E4147",
        backgroundColor: "#3E41470D",
        height: "110px",
        minWidth: "150px",
        width: "150px",
        borderRadius: "0.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <input accept=".png" type="file" id="file-input" onChange={onImageChange} className="filetype" />
      {!image && (
        <label htmlFor="file-input" className="file-input-label text-xs text-gray-400">
          Insert Logo
        </label>
      )}
      {image && <img src={image} alt="preview image" style={{ width: "100%", height: "100%", objectFit: "contain" }} />}
      {image && (
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <Button
            style={{
              background: "transparent",
              color: "white",
              height: "1.5rem",
              width: "1.5rem",
            }}
            onClick={() => setImage(null)}
          >
            x
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ImagePicker;

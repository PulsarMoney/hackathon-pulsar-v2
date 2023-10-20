import GifPicker, { TenorImage, Theme } from "gif-picker-react";
import { Dialog, DialogContent, Modal } from "@mui/material";

const TENOR_API_KEY = "AIzaSyDd_g_mM50vbWe1avLMuqsQ16zFsa1HPRI";

interface GifPickerSelectorProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setGif: (gif: string) => void;
}

export const GifPickerSelector = ({ open, setOpen, setGif }: GifPickerSelectorProps) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent>
        <GifPicker
          theme={Theme.DARK}
          tenorApiKey={TENOR_API_KEY}
          onGifClick={(g) => {
            setOpen(false);
            setGif(g.url);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

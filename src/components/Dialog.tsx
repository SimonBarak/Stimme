"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const DialogAuth = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(true);
  const router = useRouter(); // Initialize the router

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      router.back(); // Navigate back when the dialog is closed
    }
  };

  return (
    <Dialog.Root defaultOpen={true} open={open} onOpenChange={handleOpenChange}>
      {/* <Dialog.Trigger asChild>
        <button className="Button">Log-in</button>
      </Dialog.Trigger> */}
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content
          className="DialogContent lg"
          aria-describedby={undefined}
        >
          <Dialog.Title className="DialogTitle"></Dialog.Title>
          <>{children}</>
          <Dialog.Close asChild>
            <button className="CloseButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogAuth;

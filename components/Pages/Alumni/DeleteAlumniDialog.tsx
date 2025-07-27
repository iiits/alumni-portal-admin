"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { axiosInstance } from "@/lib/api/axios";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

interface DeleteAlumniDialogProps {
  alumniId: string;
  onSuccess?: () => void;
  verified: boolean;
  revokeAccess?: () => void;
  trigger?: React.ReactNode;
}

const DeleteAlumniDialog: React.FC<DeleteAlumniDialogProps> = ({
  alumniId,
  onSuccess,
  verified,
  revokeAccess,
  trigger,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      setLoading(true);
      return axiosInstance.delete(`/alumni/${alumniId}`);
    },
    onSuccess: () => {
      toast.success("Alumni Details deleted successfully");
      setLoading(false);
      setOpen(false);
      setTimeout(() => {
        onSuccess && onSuccess();
      }, 200);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete alumni details",
      );
      setLoading(false);
    },
  });

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleDelete}>
          <DialogHeader>
            <DialogTitle>Delete Alumni Details</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this alumni&apos;s details? This
              action cannot be undone.
              {verified && (
                <span>
                  If you want to revoke the alumni&apos;s access, please use the
                  &quot;Revoke Access&quot; option instead.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex !flex-col gap-2 w-full mt-6">
            <div className="flex gap-2 w-full">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="w-1/2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={loading}
                className="w-1/2"
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </div>
            {verified && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  revokeAccess && revokeAccess();
                }}
                className="w-full bg-green-400 text-white hover:bg-green-500"
              >
                Revoke Access Instead
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAlumniDialog;

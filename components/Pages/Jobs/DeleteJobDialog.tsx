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

interface DeleteJobDialogProps {
  jobId: string;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

const DeleteJobDialog: React.FC<DeleteJobDialogProps> = ({
  jobId,
  onSuccess,
  trigger,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      setLoading(true);
      return axiosInstance.delete(`/jobs/${jobId}`);
    },
    onSuccess: () => {
      toast.success("Job deleted successfully");
      setLoading(false);
      setOpen(false);
      setTimeout(() => {
        onSuccess && onSuccess();
      }, 200);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete job");
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
      <DialogContent className="sm:max-w-[400px]">
        <form onSubmit={handleDelete}>
          <DialogHeader>
            <DialogTitle>Delete Job</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this job posting? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" variant="destructive" disabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteJobDialog;

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/lib/api/axios";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";
import DeleteReferralDialog from "./DeleteReferralDialog";
import { Referral } from "./interface";

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);

interface EditReferralModalProps {
  referral: Referral;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

const EditReferralModal: React.FC<EditReferralModalProps> = ({
  referral,
  onSuccess,
  trigger,
}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    isActive: referral.isActive,
    numberOfReferrals: referral.numberOfReferrals,
    jobDetails: { ...referral.jobDetails },
    lastApplyDate: referral.lastApplyDate
      ? referral.lastApplyDate instanceof Date
        ? referral.lastApplyDate
        : new Date(referral.lastApplyDate)
      : new Date(),
  });
  const [loading, setLoading] = useState(false);

  const editReferralMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      setLoading(true);
      const response = await axiosInstance.put(
        `/referrals/${referral.id}`,
        data,
      );
      setLoading(false);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Referral updated successfully!");
      setOpen(false);
      onSuccess && onSuccess();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update referral");
      setLoading(false);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // @ts-ignore
    const { name, value, type, checked } = e.target;
    if (name.startsWith("jobDetails.")) {
      const key = name.replace("jobDetails.", "");
      setFormData((prev) => ({
        ...prev,
        jobDetails: { ...prev.jobDetails, [key]: value },
      }));
    } else if (name === "numberOfReferrals") {
      setFormData((prev) => ({ ...prev, numberOfReferrals: Number(value) }));
    } else if (name === "isActive") {
      setFormData((prev) => ({
        ...prev,
        isActive: type === "checkbox" ? checked : value,
      }));
    } else if (name === "lastApplyDate") {
      setFormData((prev) => ({ ...prev, [name]: new Date(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editReferralMutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[90vw] sm:max-w-lg lg:max-w-2xl max-h-[80vh] mx-auto p-6 rounded-lg shadow-lg overflow-y-scroll">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold">
            Edit Referral
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LabelInputContainer>
              <Label htmlFor="jobDetails.title">Title</Label>
              <Input
                id="jobDetails.title"
                name="jobDetails.title"
                value={formData.jobDetails.title}
                onChange={handleInputChange}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="jobDetails.company">Company</Label>
              <Input
                id="jobDetails.company"
                name="jobDetails.company"
                value={formData.jobDetails.company}
                onChange={handleInputChange}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="jobDetails.role">Role</Label>
              <Input
                id="jobDetails.role"
                name="jobDetails.role"
                value={formData.jobDetails.role}
                onChange={handleInputChange}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="jobDetails.link">Link</Label>
              <Input
                id="jobDetails.link"
                name="jobDetails.link"
                value={formData.jobDetails.link}
                onChange={handleInputChange}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="numberOfReferrals">Number of Referrals</Label>
              <Input
                id="numberOfReferrals"
                name="numberOfReferrals"
                type="number"
                min={1}
                value={formData.numberOfReferrals}
                onChange={handleInputChange}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastApplyDate">Last Apply Date</Label>
              <Input
                id="lastApplyDate"
                name="lastApplyDate"
                type="date"
                value={
                  formData.lastApplyDate instanceof Date
                    ? formData.lastApplyDate.toISOString().split("T")[0]
                    : formData.lastApplyDate
                }
                onChange={handleInputChange}
                required
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer>
            <Label htmlFor="jobDetails.description">Description</Label>
            <Textarea
              id="jobDetails.description"
              name="jobDetails.description"
              value={formData.jobDetails.description}
              onChange={handleInputChange}
              rows={4}
              required
            />
          </LabelInputContainer>
          <div className="flex items-center space-x-2 mt-2">
            <Input
              id="isActive"
              name="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="w-4 h-4"
            />
            <Label
              htmlFor="isActive"
              className="mb-0 cursor-pointer select-none"
            >
              Active
            </Label>
          </div>
        </form>
        <DialogFooter className="flex !flex-col gap-2 w-full">
          <DialogClose asChild>
            <div className="w-full">
              <Button
                type="button"
                variant="outline"
                disabled={loading || editReferralMutation.isPending}
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </DialogClose>
          <div className="flex gap-2 w-full">
            <DeleteReferralDialog
              referralId={referral.id}
              onSuccess={() => {
                setOpen(false);
                onSuccess && onSuccess();
              }}
              trigger={
                <Button variant="destructive" className="w-1/2">
                  Delete
                </Button>
              }
            />
            <Button
              type="submit"
              disabled={loading || editReferralMutation.isPending}
              className="w-1/2"
            >
              {loading || editReferralMutation.isPending
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditReferralModal;

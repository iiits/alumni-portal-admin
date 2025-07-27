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

interface ReferralFormData {
  numberOfReferrals: number;
  jobDetails: {
    title: string;
    description: string;
    company: string;
    role: string;
    link: string;
  };
  lastApplyDate: string;
}

interface CreateReferralModalProps {
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

const CreateReferralModal: React.FC<CreateReferralModalProps> = ({
  onSuccess,
  trigger,
}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ReferralFormData>({
    numberOfReferrals: 1,
    jobDetails: {
      title: "",
      description: "",
      company: "",
      role: "",
      link: "",
    },
    lastApplyDate: "",
  });
  const [loading, setLoading] = useState(false);

  const createReferralMutation = useMutation({
    mutationFn: async (data: ReferralFormData) => {
      setLoading(true);
      const response = await axiosInstance.post("/referrals", data);
      setLoading(false);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Referral created successfully!");
      setOpen(false);
      resetForm();
      onSuccess && onSuccess();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create referral");
      setLoading(false);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("jobDetails.")) {
      const key = name.replace("jobDetails.", "");
      setFormData((prev) => ({
        ...prev,
        jobDetails: { ...prev.jobDetails, [key]: value },
      }));
    } else if (name === "numberOfReferrals") {
      setFormData((prev) => ({ ...prev, numberOfReferrals: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({
      numberOfReferrals: 1,
      jobDetails: {
        title: "",
        description: "",
        company: "",
        role: "",
        link: "",
      },
      lastApplyDate: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReferralMutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[90vw] sm:max-w-lg lg:max-w-2xl max-h-[80vh] mx-auto p-6 rounded-lg shadow-lg overflow-y-scroll">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold">
            Create a New Referral
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
                placeholder="e.g. Software Developer II"
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
                placeholder="e.g. Google Inc."
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
                placeholder="e.g. SDE II"
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
                placeholder="e.g. https://careers.google.com/jobs/xyz"
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
                value={formData.lastApplyDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
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
          {/* postedBy fields can be auto-filled or hidden if not needed in the form */}
          <DialogFooter className="flex !flex-col gap-2 w-full">
            <DialogClose asChild>
              <div className="w-full"></div>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading || createReferralMutation.isPending}
              className="w-full"
            >
              {loading || createReferralMutation.isPending
                ? "Creating..."
                : "Create Referral"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

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

export default CreateReferralModal;

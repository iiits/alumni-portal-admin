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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/lib/api/axios";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";
import DeleteJobDialog from "./DeleteJobDialog";

const JOB_TYPES = [
  { value: "fulltime", label: "Full Time" },
  { value: "parttime", label: "Part Time" },
  { value: "internship", label: "Internship" },
  { value: "others", label: "Others" },
];
const WORK_TYPES = [
  { value: "onsite", label: "On-site" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
];

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

interface EditJobModalProps {
  job: any;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

const EditJobModal: React.FC<EditJobModalProps> = ({
  job,
  onSuccess,
  trigger,
}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    jobName: job.jobName || "",
    company: job.company || "",
    role: job.role || "",
    eligibility: {
      batch: job.eligibility?.batch || [],
      requirements: job.eligibility?.requirements || [],
    },
    description: job.description || "",
    type: job.type || "",
    stipend: job.stipend || "",
    duration: job.duration || "",
    workType: job.workType || "",
    links: job.links || [],
    lastApplyDate: job.lastApplyDate ? job.lastApplyDate.split("T")[0] : "",
  });
  const [loading, setLoading] = useState(false);

  const editJobMutation = useMutation({
    mutationFn: async (data: any) => {
      setLoading(true);
      data.links = data.links.filter((l: string) => l.trim() !== "");
      data.eligibility.requirements = data.eligibility.requirements.filter(
        (r: string) => r.trim() !== "",
      );
      data.eligibility.batch = data.eligibility.batch.filter(
        (b: string) => b.trim() !== "",
      );
      const response = await axiosInstance.put(`/jobs/${job.id}`, data);
      setLoading(false);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Job posting updated successfully!");
      setOpen(false);
      onSuccess && onSuccess();
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update job posting",
      );
      setLoading(false);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBatchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const batches = e.target.value.split(",").map((b) => b.trim());
    setFormData((prev) => ({
      ...prev,
      eligibility: { ...prev.eligibility, batch: batches },
    }));
  };

  const handleRequirementsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const requirements = e.target.value.split(",").map((r) => r.trim());
    setFormData((prev) => ({
      ...prev,
      eligibility: { ...prev.eligibility, requirements },
    }));
  };

  const handleLinksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const links = e.target.value.split(",").map((l) => l.trim());
    setFormData((prev) => ({ ...prev, links }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editJobMutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[90vw] sm:max-w-lg lg:max-w-2xl max-h-[80vh] mx-auto p-6 rounded-lg shadow-lg overflow-y-scroll">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold">
            Edit Job Posting
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LabelInputContainer>
              <Label htmlFor="jobName">Job Title</Label>
              <Input
                id="jobName"
                name="jobName"
                value={formData.jobName}
                onChange={handleInputChange}
                placeholder="e.g. Software Development Engineer"
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="e.g. Google, Inc."
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="e.g. SDE II"
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="stipend">Stipend/Salary</Label>
              <Input
                id="stipend"
                name="stipend"
                value={formData.stipend}
                onChange={handleInputChange}
                placeholder="e.g. 50,000 per month or 10 LPA"
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="workType">Work Type</Label>
              <Select
                value={formData.workType}
                onValueChange={(value) => handleSelectChange("workType", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select work type" />
                </SelectTrigger>
                <SelectContent>
                  {WORK_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {JOB_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="e.g. 6 months, 2 years or Permanent"
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
            <Label htmlFor="batch">Eligible Batches (comma-separated)</Label>
            <Input
              id="batch"
              name="batch"
              value={formData.eligibility.batch.join(", ")}
              onChange={handleBatchChange}
              placeholder="2022, 2023, 2024"
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="requirements">Requirements (comma-separated)</Label>
            <Input
              id="requirements"
              name="requirements"
              value={formData.eligibility.requirements.join(", ")}
              onChange={handleRequirementsChange}
              placeholder="React, Node.js, TypeScript"
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="links">Links (comma-separated)</Label>
            <Input
              id="links"
              name="links"
              value={formData.links.join(", ")}
              onChange={handleLinksChange}
              placeholder="https://example1.com, https://example2.com"
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              required
            />
          </LabelInputContainer>
          <DialogFooter className="flex !flex-col gap-2 w-full">
            <DialogClose asChild>
              <div className="w-full">
                <Button
                  type="button"
                  variant="outline"
                  disabled={loading || editJobMutation.isPending}
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </DialogClose>
            <div className="flex gap-2 w-full">
              <DeleteJobDialog
                jobId={job.id}
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
                disabled={loading || editJobMutation.isPending}
                className="w-1/2"
              >
                {loading || editJobMutation.isPending
                  ? "Saving..."
                  : "Save Changes"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditJobModal;

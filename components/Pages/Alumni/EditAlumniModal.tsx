"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { axiosInstance } from "@/lib/api/axios";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";
import DeleteAlumniDialog from "./DeleteAlumniDialog";
import { AlumniProfileData } from "./interface";

interface EditAlumniModalProps {
  user: AlumniProfileData;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

const roles = ["admin", "alumni", "student"];

const departments = ["CSE", "ECE", "AIDS"];

const currentYear = new Date().getFullYear();
const batches = [...Array(currentYear + 5 - 2014 + 1)].map((_, i) =>
  (currentYear + 5 - i).toString(),
);

const EditAlumniModal: React.FC<EditAlumniModalProps> = ({
  user,
  onSuccess,
  trigger,
}) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    role: user.role || "",
    department: user.department || "",
    batch: user.batch ? String(user.batch) : "",
    collegeEmail: user.collegeEmail || "",
    userId: user.userId || "",
  });
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: typeof form) => {
      setLoading(true);
      const payload = { ...data };
      return axiosInstance.put(`/users/${user.id}`, payload);
    },
    onSuccess: () => {
      toast.success("User updated successfully");
      setLoading(false);
      setOpen(false);
      setTimeout(() => {
        onSuccess && onSuccess();
      }, 200);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update user");
      setLoading(false);
    },
  });

  const verifyMutation = useMutation({
    mutationFn: async (verified: boolean) => {
      setVerifying(true);
      return axiosInstance.put(`/alumni/${user.alumniDetails.id}`, {
        verified,
      });
    },
    onSuccess: () => {
      toast.success("Verification status updated");
      setVerifying(false);
      setTimeout(() => {
        onSuccess && onSuccess();
      }, 200);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update verification status",
      );
      setVerifying(false);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  // AlumniDetails fields
  const alumniDetails = user.alumniDetails;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-w-[95vw] max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Edit user details and save changes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              <div className="rounded-md border px-3 py-2 text-sm bg-gray-50 dark:bg-zinc-800 dark:text-white">
                {user.name}
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Username</Label>
              <div className="rounded-md border px-3 py-2 text-sm bg-gray-50 dark:bg-zinc-800 dark:text-white">
                {user.username}
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Personal Email</Label>
              <div className="rounded-md border px-3 py-2 text-sm bg-gray-50 dark:bg-zinc-800 dark:text-white">
                {user.personalEmail}
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Bio</Label>
              <div className="rounded-md border px-3 py-2 text-sm bg-gray-50 dark:bg-zinc-800 dark:text-white min-h-[40px]">
                {user.bio || "-"}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={form.role}
                onValueChange={(v) => handleSelect("role", v)}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={form.department}
                onValueChange={(v) => handleSelect("department", v)}
              >
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="batch">Batch</Label>
              <Select
                value={form.batch}
                onValueChange={(v) => handleSelect("batch", v)}
              >
                <SelectTrigger id="batch">
                  <SelectValue placeholder="Select batch" />
                </SelectTrigger>
                <SelectContent>
                  {batches.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="collegeEmail">College Email</Label>
              <Input
                id="collegeEmail"
                name="collegeEmail"
                value={form.collegeEmail}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                name="userId"
                value={form.userId}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2 grid gap-2">
              <Label>Social Profiles</Label>
              <div className="flex flex-wrap gap-2">
                {user.profiles && user.profiles.length > 0 ? (
                  user.profiles.map((profile: any, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded bg-gray-100 dark:bg-zinc-700 text-xs"
                    >
                      {profile.type}: {profile.link} ({profile.visibility})
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-400">No profiles</span>
                )}
              </div>
            </div>

            <div className="md:col-span-2 grid gap-2 border-t pt-4 mt-2">
              <Label>Alumni Details</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Location</Label>
                  <div className="rounded-md border px-3 py-2 text-sm bg-gray-50 dark:bg-zinc-800 dark:text-white">
                    {alumniDetails?.location?.city || "-"},{" "}
                    {alumniDetails?.location?.country || "-"}
                  </div>
                </div>
                <div>
                  <Label>Expertise</Label>
                  <div className="rounded-md border px-3 py-2 text-sm bg-gray-50 dark:bg-zinc-800 dark:text-white">
                    {alumniDetails?.expertise &&
                    alumniDetails.expertise.length > 0
                      ? alumniDetails.expertise.join(", ")
                      : "-"}
                  </div>
                </div>
                <div>
                  <Label>Verified</Label>
                  <div className="rounded-md border px-3 py-2 text-sm bg-gray-50 dark:bg-zinc-800 dark:text-white">
                    {alumniDetails?.verified ? "Yes" : "No"}
                  </div>
                </div>
              </div>
              <div>
                <Label>Job Positions</Label>
                <div className="space-y-2">
                  {alumniDetails?.jobPosition &&
                  alumniDetails.jobPosition.length > 0 ? (
                    alumniDetails.jobPosition.map((job, idx) => (
                      <div
                        key={idx}
                        className="rounded border p-2 text-xs bg-gray-50 dark:bg-zinc-800"
                      >
                        <div>
                          <b>Title:</b> {job.title}
                        </div>
                        <div>
                          <b>Company:</b> {job.company}
                        </div>
                        <div>
                          <b>Type:</b> {job.type}
                        </div>
                        <div>
                          <b>Location:</b> {job.location}
                        </div>
                        <div>
                          <b>Job Type:</b> {job.jobType}
                        </div>
                        <div>
                          <b>Start:</b>{" "}
                          {job.start
                            ? new Date(job.start).toLocaleDateString()
                            : "-"}
                        </div>
                        <div>
                          <b>End:</b>{" "}
                          {job.ongoing
                            ? "Ongoing"
                            : job.end
                              ? new Date(job.end).toLocaleDateString()
                              : "-"}
                        </div>
                        <div>
                          <b>Description:</b> {job.description || "-"}
                        </div>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">
                      No job positions
                    </span>
                  )}
                </div>
              </div>
              <div>
                <Label>Education</Label>
                <div className="space-y-2">
                  {alumniDetails?.education &&
                  alumniDetails.education.length > 0 ? (
                    alumniDetails.education.map((edu, idx) => (
                      <div
                        key={idx}
                        className="rounded border p-2 text-xs bg-gray-50 dark:bg-zinc-800"
                      >
                        <div>
                          <b>School:</b> {edu.school}
                        </div>
                        <div>
                          <b>Degree:</b> {edu.degree}
                        </div>
                        <div>
                          <b>Field:</b> {edu.fieldOfStudy}
                        </div>
                        <div>
                          <b>Location:</b> {edu.location}
                        </div>
                        <div>
                          <b>Start:</b>{" "}
                          {edu.start
                            ? new Date(edu.start).toLocaleDateString()
                            : "-"}
                        </div>
                        <div>
                          <b>End:</b>{" "}
                          {edu.ongoing
                            ? "Ongoing"
                            : edu.end
                              ? new Date(edu.end).toLocaleDateString()
                              : "-"}
                        </div>
                        <div>
                          <b>Description:</b> {edu.description || "-"}
                        </div>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">
                      No education records
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
        <DialogFooter className="flex !flex-col gap-2 w-full">
          <div className="flex gap-2 w-full">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={loading || verifying}
                className="w-1/2"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant={alumniDetails?.verified ? "destructive" : "secondary"}
              className={`w-1/2 ${alumniDetails?.verified === false ? "bg-green-400 text-white hover:bg-green-500" : ""}`}
              disabled={verifying}
              onClick={() => verifyMutation.mutate(!alumniDetails?.verified)}
            >
              {verifying
                ? "Updating..."
                : alumniDetails?.verified
                  ? "Mark as Unverified"
                  : "Mark as Verified"}
            </Button>
          </div>
          <div className="flex gap-2 w-full">
            <DeleteAlumniDialog
              alumniId={user.id}
              verified={alumniDetails?.verified || false}
              revokeAccess={() => verifyMutation.mutate(false)}
              onSuccess={() => {
                setOpen(false);
                setTimeout(() => {
                  onSuccess && onSuccess();
                }, 200);
              }}
              trigger={
                <Button
                  type="button"
                  variant="destructive"
                  disabled={loading || verifying}
                  className="w-1/2"
                >
                  Delete Allumni Details
                </Button>
              }
            />
            <Button
              type="button"
              disabled={loading || verifying}
              className="w-1/2"
              onClick={(e) => {
                // Manually trigger the submit handler
                handleSubmit({
                  preventDefault: () => {},
                } as React.FormEvent);
              }}
            >
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAlumniModal;

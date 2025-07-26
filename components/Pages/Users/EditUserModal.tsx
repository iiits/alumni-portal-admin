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
import DeleteUserDialog from "./DeleteUserDialog";
import { UserProfileData } from "./interface";

interface EditUserModalProps {
  user: UserProfileData;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

const roles = ["admin", "alumni", "student"];

const departments = ["CSE", "ECE", "AIDS"];

const currentYear = new Date().getFullYear();
const batches = [...Array(currentYear + 5 - 2014 + 1)].map((_, i) =>
  (currentYear + 5 - i).toString(),
);

const verifiedOptions = ["true", "false"];

const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  onSuccess,
  trigger,
}) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    role: user.role || "",
    verified: user.verified ? "true" : "false",
    department: user.department || "",
    batch: user.batch ? String(user.batch) : "",
    collegeEmail: user.collegeEmail || "",
    userId: user.userId || "",
  });
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: typeof form) => {
      setLoading(true);
      const payload = {
        ...data,
        verified: data.verified === "true",
      };
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
            {/* Name (readonly) */}
            <div className="grid gap-2">
              <Label>Name</Label>
              <div className="rounded-md border px-3 py-2 text-sm bg-gray-50 dark:bg-zinc-800 dark:text-white">
                {user.name}
              </div>
            </div>

            {/* Username (readonly) */}
            <div className="grid gap-2">
              <Label>Username</Label>
              <div className="rounded-md border px-3 py-2 text-sm bg-gray-50 dark:bg-zinc-800 dark:text-white">
                {user.username}
              </div>
            </div>

            {/* Personal Email (readonly) */}
            <div className="grid gap-2">
              <Label>Personal Email</Label>
              <div className="rounded-md border px-3 py-2 text-sm bg-gray-50 dark:bg-zinc-800 dark:text-white">
                {user.personalEmail}
              </div>
            </div>

            {/* Bio (readonly) */}
            <div className="grid gap-2">
              <Label>Bio</Label>
              <div className="rounded-md border px-3 py-2 text-sm bg-gray-50 dark:bg-zinc-800 dark:text-white min-h-[40px]">
                {user.bio || "-"}
              </div>
            </div>

            {/* Editable fields */}
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
              <Label htmlFor="verified">Verified</Label>
              <Select
                value={form.verified}
                onValueChange={(v) => handleSelect("verified", v)}
              >
                <SelectTrigger id="verified">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {verifiedOptions.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v.charAt(0).toUpperCase() + v.slice(1)}
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

            {/* Social Profiles (readonly) */}
            <div className="md:col-span-2 grid gap-2">
              <Label>Social Profiles</Label>
              <div className="flex flex-wrap gap-2">
                {user.profiles && user.profiles.length > 0 ? (
                  user.profiles.map((profile: any, idx: number) => (
                    <div
                      key={idx}
                      className="border rounded px-2 py-1 text-xs bg-gray-50 dark:bg-zinc-800 dark:text-white"
                    >
                      <span className="font-semibold">{profile.type}:</span>{" "}
                      {profile.link} (
                      {profile.visibility ? "Public" : "Private"})
                    </div>
                  ))
                ) : (
                  <span className="text-muted-foreground">No profiles</span>
                )}
              </div>
            </div>
          </div>
        </form>
        <DialogFooter className="flex !flex-col gap-2 w-full">
          <DialogClose asChild>
            <div className="w-full">
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </DialogClose>
          <div className="flex gap-2 w-full">
            <DeleteUserDialog
              userId={user.id}
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
                  disabled={loading}
                  className="w-1/2"
                >
                  Delete User
                </Button>
              }
            />
            <Button
              type="button"
              disabled={loading}
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

export default EditUserModal;

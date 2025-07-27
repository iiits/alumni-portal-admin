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
import { axiosInstance } from "@/lib/api/axios";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import { ContactUs } from "./interface";

interface ContactUsModalProps {
  contact: ContactUs;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

const ContactUsModal: React.FC<ContactUsModalProps> = ({
  contact,
  onSuccess,
  trigger,
}) => {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    responseSubject: "",
    resolutionMessage: contact.resolutionMessage || "",
  });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setForm({
      responseSubject: "",
      resolutionMessage: contact.resolutionMessage || "",
    });
  }, [contact]);

  const mutation = useMutation({
    mutationFn: async (data: typeof form) => {
      setLoading(true);
      return axiosInstance.post("/contactus", {
        id: contact.id,
        subject: data.responseSubject,
        message: data.resolutionMessage,
      });
    },
    onSuccess: () => {
      toast.success("Message sent successfully");
      setLoading(false);
      setOpen(false);
      setTimeout(() => {
        onSuccess && onSuccess();
      }, 200);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to send message");
      setLoading(false);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-w-[95vw] max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Contact Query Details</DialogTitle>
            <DialogDescription>
              View and respond to this query.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 py-4">
            <div>
              <Label>Name</Label>
              <Input value={contact.name} readOnly className="bg-gray-100" />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={contact.email} readOnly className="bg-gray-100" />
            </div>
            <div>
              <Label>Subject</Label>
              <Input value={contact.subject} readOnly className="bg-gray-100" />
            </div>
            <div>
              <Label>Message</Label>
              <textarea
                value={contact.message}
                readOnly
                className="w-full rounded-md border px-3 py-2 text-sm bg-gray-100"
                rows={2}
              />
            </div>
            <div>
              <Label>Created At</Label>
              <Input
                value={new Date(contact.createdAt).toLocaleString()}
                readOnly
                className="bg-gray-100"
              />
            </div>
            <div>
              <Label>Resolved</Label>
              <Input
                value={contact.resolved ? "Yes" : "No"}
                readOnly
                className="bg-gray-100"
              />
            </div>
            {!contact.resolved && (
              <div>
                <Label>Subject for Mail Response</Label>
                <Input
                  name="responseSubject"
                  value={form.responseSubject}
                  onChange={handleChange}
                  placeholder="Enter subject for mail response"
                />
              </div>
            )}
            <div>
              <Label>Resolution Message</Label>
              <textarea
                name="resolutionMessage"
                value={form.resolutionMessage}
                onChange={handleChange}
                readOnly={contact.resolved}
                className={
                  contact.resolved
                    ? "bg-gray-100 w-full rounded-md border px-3 py-2 text-sm"
                    : "w-full rounded-md border px-3 py-2 text-sm"
                }
                rows={2}
                placeholder="Type your response here..."
              />
            </div>
          </div>
        </form>
        <DialogFooter className="flex !flex-col gap-2 w-full">
          <div className="flex gap-2 w-full">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                className="w-1/2"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading || contact.resolved}
              className="w-1/2"
              onClick={(e) => {
                handleSubmit({ preventDefault: () => {} } as React.FormEvent);
              }}
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactUsModal;

"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosInstance } from "@/lib/api/axios";
import { useMutation } from "@tanstack/react-query";
import { ChevronDownIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const eventTypes = ["alumni", "college", "club", "others"];

interface CreateEventModalProps {
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({
  onSuccess,
  trigger,
}) => {
  const [open, setOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [endDatePickerOpen, setEndDatePickerOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    dateTime: undefined as Date | undefined,
    endDateTime: undefined as Date | undefined,
    venue: "",
    description: "",
    contentTitle: "",
    contentDescription: "",
    imageUrl: "",
    links: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: typeof form) => {
      setLoading(true);
      const payload = {
        name: data.name,
        dateTime: data.dateTime,
        endDateTime: data.endDateTime,
        venue: data.venue,
        description: data.description,
        content: {
          title: data.contentTitle,
          description: data.contentDescription,
        },
        imageUrl: data.imageUrl,
        links: data.links
          .split(",")
          .map((l) => l.trim())
          .filter(Boolean),
        type: data.type,
      };
      return axiosInstance.post("/events", payload);
    },
    onSuccess: () => {
      toast.success("Event created successfully");
      setLoading(false);
      setOpen(false);
      setForm({
        name: "",
        dateTime: undefined,
        endDateTime: undefined,
        venue: "",
        description: "",
        contentTitle: "",
        contentDescription: "",
        imageUrl: "",
        links: "",
        type: "alumni",
      });
      setTimeout(() => {
        onSuccess && onSuccess();
      }, 200);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create event");
      setLoading(false);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleDateChange = (name: "dateTime" | "endDateTime", date?: Date) => {
    setForm({ ...form, [name]: date });
  };

  const handleTimeChange = (name: "dateTime" | "endDateTime", time: string) => {
    const date = form[name] ? new Date(form[name] as Date) : new Date();
    const [h, m, s] = time.split(":").map(Number);
    date.setHours(h || 0, m || 0, s || 0);
    setForm({ ...form, [name]: date });
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
            <DialogTitle>Create Event</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new event.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={form.type}
                onValueChange={(v) => handleSelect("type", v)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="venue">Venue</Label>
              <Input
                id="venue"
                name="venue"
                value={form.venue}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="links">Links (comma separated)</Label>
              <Input
                id="links"
                name="links"
                value={form.links}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 text-sm bg-background"
                rows={2}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contentTitle">Content Title</Label>
              <Input
                id="contentTitle"
                name="contentTitle"
                value={form.contentTitle}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contentDescription">Content Description</Label>
              <textarea
                id="contentDescription"
                name="contentDescription"
                value={form.contentDescription}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 text-sm bg-background"
                rows={2}
              />
            </div>

            <div className="grid gap-2">
              <Label>Date & Time</Label>
              <div className="flex gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="date-picker" className="px-1">
                    Date
                  </Label>
                  <Popover
                    open={datePickerOpen}
                    onOpenChange={setDatePickerOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date-picker"
                        className="w-32 justify-between font-normal"
                      >
                        {form.dateTime
                          ? form.dateTime.toLocaleDateString()
                          : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={form.dateTime}
                        captionLayout="dropdown"
                        onSelect={(date) => handleDateChange("dateTime", date)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="time-picker" className="px-1">
                    Time
                  </Label>
                  <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    value={
                      form.dateTime
                        ? form.dateTime.toLocaleTimeString("en-GB")
                        : ""
                    }
                    onChange={(e) =>
                      handleTimeChange("dateTime", e.target.value)
                    }
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>End Date & Time</Label>
              <div className="flex gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="end-date-picker" className="px-1">
                    Date
                  </Label>
                  <Popover
                    open={endDatePickerOpen}
                    onOpenChange={setEndDatePickerOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="end-date-picker"
                        className="w-32 justify-between font-normal"
                      >
                        {form.endDateTime
                          ? form.endDateTime.toLocaleDateString()
                          : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={form.endDateTime}
                        captionLayout="dropdown"
                        onSelect={(date) =>
                          handleDateChange("endDateTime", date)
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="end-time-picker" className="px-1">
                    Time
                  </Label>
                  <Input
                    type="time"
                    id="end-time-picker"
                    step="1"
                    value={
                      form.endDateTime
                        ? form.endDateTime.toLocaleTimeString("en-GB")
                        : ""
                    }
                    onChange={(e) =>
                      handleTimeChange("endDateTime", e.target.value)
                    }
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                </div>
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
          <Button
            type="button"
            disabled={loading}
            className="w-full"
            onClick={(e) => {
              handleSubmit({ preventDefault: () => {} } as React.FormEvent);
            }}
          >
            {loading ? "Creating..." : "Create Event"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventModal;

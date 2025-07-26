import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Not authorized - No token provided." },
        { status: 401 },
      );
    }

    const body = await req.json();
    const {
      name,
      dateTime,
      endDateTime,
      venue,
      description,
      content,
      imageUrl,
      links,
      type,
    } = body;
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { message: "Event ID is required" },
        { status: 400 },
      );
    }

    if (dateTime && isNaN(new Date(dateTime).getTime())) {
      return NextResponse.json(
        { message: "Invalid Start Date provided." },
        { status: 400 },
      );
    }

    if (endDateTime && isNaN(new Date(endDateTime).getTime())) {
      return NextResponse.json(
        { message: "Invalid End Date provided." },
        { status: 400 },
      );
    }

    if (dateTime && endDateTime) {
      const startDate = new Date(dateTime);
      const endDate = new Date(endDateTime);
      if (startDate > endDate) {
        return NextResponse.json(
          { message: "Start date cannot be after end date." },
          { status: 400 },
        );
      }
    }

    const urlPattern = /^https?:\/\/\S+$/;
    if (links && !links.every((link: any) => urlPattern.test(link))) {
      return NextResponse.json(
        { message: "Please provide valid URLs for all links" },
        { status: 400 },
      );
    }
    if (imageUrl && !urlPattern.test(imageUrl)) {
      return NextResponse.json(
        { message: "Please provide a valid URL for the image" },
        { status: 400 },
      );
    }

    if (!["alumni", "college", "club", "others"].includes(type)) {
      return NextResponse.json(
        { message: "Invalid event type provided." },
        { status: 400 },
      );
    }

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`,
      {
        name,
        dateTime,
        endDateTime,
        venue,
        description,
        content,
        imageUrl,
        links,
        type,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error(
      "Error updating event:",
      error.response?.data || error.message,
    );
    return NextResponse.json(
      {
        message: error.response?.data?.message || "Failed to update event.",
      },
      { status: error.response?.status || 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Not authorized - No token provided." },
        { status: 401 },
      );
    }

    const { id: eventId } = await context.params;

    if (!eventId) {
      return NextResponse.json(
        { message: "Event ID is required" },
        { status: 400 },
      );
    }

    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error(
      "Error deleting event:",
      error.response?.data || error.message,
    );
    return NextResponse.json(
      {
        message: error.response?.data?.message || "Failed to delete event.",
      },
      { status: error.response?.status || 500 },
    );
  }
}

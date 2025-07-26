import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

    if (!dateTime || isNaN(new Date(dateTime).getTime())) {
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
    if (!links || !links.every((link: any) => urlPattern.test(link))) {
      return NextResponse.json(
        { message: "Please provide valid URLs for all links" },
        { status: 400 },
      );
    }
    if (!imageUrl || !urlPattern.test(imageUrl)) {
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

    if (!content) {
      return NextResponse.json(
        { message: "Content is required." },
        { status: 400 },
      );
    }

    if (!name || !venue) {
      return NextResponse.json(
        { message: "Name and Venue are required." },
        { status: 400 },
      );
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/events`,
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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const search = searchParams.get("search");
    const type = searchParams.get("type");
    const startMonthYear = searchParams.get("startMonthYear");
    const endMonthYear = searchParams.get("endMonthYear");

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized. Please login to view job postings." },
        { status: 401 },
      );
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/events`;
    const queryParams = new URLSearchParams();

    if (page) queryParams.append("page", page);
    if (limit) queryParams.append("limit", limit);
    if (search) queryParams.append("search", search);
    if (type) queryParams.append("type", type);
    if (startMonthYear) queryParams.append("startMonthYear", startMonthYear);
    if (endMonthYear) queryParams.append("endMonthYear", endMonthYear);

    const apiUrl = `${baseUrl}?${queryParams.toString()}`;

    const response = await axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error(
      "Error fetching job postings:",
      error?.response?.data || error.message,
    );

    return NextResponse.json(
      {
        message:
          error.response?.data?.message || "Failed to fetch job postings.",
        error: error.message,
      },
      { status: error.response?.status || 500 },
    );
  }
}

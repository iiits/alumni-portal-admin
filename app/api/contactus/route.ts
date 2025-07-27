import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized. Please login to send a response." },
        { status: 401 },
      );
    }

    const data = await req.json();

    const { id, subject, message } = data;

    if (
      !id ||
      !subject ||
      !message ||
      typeof id !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { message: "Missing required fields (id, subject, message)" },
        { status: 400 },
      );
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contactus/respond`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error(
      "Error sending response:",
      error?.response?.data || error.message,
    );

    return NextResponse.json(
      {
        message: error.response?.data?.message || "Failed to send response.",
        error: error.message,
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
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const resolved = searchParams.get("resolved");

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized. Please login to view queries." },
        { status: 401 },
      );
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/contactus`;
    const queryParams = new URLSearchParams();

    if (page) queryParams.append("page", page);
    if (limit) queryParams.append("limit", limit);
    if (search) queryParams.append("search", search);
    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);
    if (resolved) queryParams.append("resolved", resolved);

    const apiUrl = `${baseUrl}?${queryParams.toString()}`;

    const response = await axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error(
      "Error fetching queries:",
      error?.response?.data || error.message,
    );

    return NextResponse.json(
      {
        message: error.response?.data?.message || "Failed to fetch queries.",
        error: error.message,
      },
      { status: error.response?.status || 500 },
    );
  }
}

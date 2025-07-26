import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const search = searchParams.get("search");
    const batch = searchParams.get("batch");
    const department = searchParams.get("department");
    const role = searchParams.get("role");
    const verified = searchParams.get("verified");

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized. Please login to view job postings." },
        { status: 401 },
      );
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/users`;
    const queryParams = new URLSearchParams();

    if (page) queryParams.append("page", page);
    if (limit) queryParams.append("limit", limit);
    if (search) queryParams.append("search", search);
    if (batch) queryParams.append("batch", batch);
    if (department) queryParams.append("department", department);
    if (role) queryParams.append("role", role);
    if (verified) queryParams.append("verified", verified);

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

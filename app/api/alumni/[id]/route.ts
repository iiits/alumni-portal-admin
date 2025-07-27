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
    const { verified } = body;
    const { id } = await context.params;

    if (typeof verified !== "boolean") {
      return NextResponse.json(
        { message: "Verified must be a boolean value." },
        { status: 400 },
      );
    }

    if (!id) {
      return NextResponse.json(
        { message: "Alumni ID is required" },
        { status: 400 },
      );
    }

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/alumni-details/${id}/verify/${verified}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error(
      "Error verifying alumni:",
      error.response?.data || error.message,
    );
    return NextResponse.json(
      {
        message: error.response?.data?.message || "Failed to verify alumni.",
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

    const { id: alumniId } = await context.params;

    if (!alumniId) {
      return NextResponse.json(
        { message: "Alumni ID is required" },
        { status: 400 },
      );
    }

    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/alumni-details/${alumniId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error(
      "Error deleting user profile:",
      error.response?.data || error.message,
    );
    return NextResponse.json(
      {
        message:
          error.response?.data?.message || "Failed to delete user profile.",
      },
      { status: error.response?.status || 500 },
    );
  }
}

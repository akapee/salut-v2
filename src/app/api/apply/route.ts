import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // URL Endpoint App Script (Aman karena dijalankan di sisi server, tidak bisa di-inspect)
    const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbykMuKmLDFMjaXchenjjlHk4W30FbFLHQ-cMY9iyR9DlbH-P_GLC_mXqTBK2qAbxnI/exec";

    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      // Mode text/plain digunakan khusus untuk mengelabui (bypass) blokir CORS Google
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return NextResponse.json(
      { result: "error", message: "Gagal menyimpan data di sisi server Google." },
      { status: 500 }
    );
  }
}

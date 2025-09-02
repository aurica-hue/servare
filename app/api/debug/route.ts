import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test end-to-end: Insert a test email into waitlist_email table
    const { data, error } = await supabase
      .from("waitlist_email")
      .insert({ email: "test@servare.ai" })
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ 
        ok: false, 
        error: error.message,
        details: error,
        hint: error.code === 'PGRST205' ? 
          "Table 'waitlist_email' doesn't exist. Create it in Supabase Dashboard first." : 
          "Check your Supabase permissions and table structure."
      }, { status: 400 });
    }

    return NextResponse.json({ 
      ok: true,
      message: "✅ End-to-end test successful!",
      data: data,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ 
      ok: false, 
      error: "Unexpected error occurred",
      details: err instanceof Error ? err.message : err
    }, { status: 500 });
  }
}

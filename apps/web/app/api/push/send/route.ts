import { NextRequest, NextResponse } from "next/server";

interface SendPushRequest {
  expoPushToken: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  const accessToken = process.env.EXPO_PUSH_ACCESS_TOKEN;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!accessToken) {
    return NextResponse.json(
      { ok: false, message: "EXPO_PUSH_ACCESS_TOKEN is missing. Push delivery is not active." },
      { status: 400 }
    );
  }

  if (!serviceRole) {
    return NextResponse.json(
      { ok: false, message: "SUPABASE_SERVICE_ROLE_KEY is missing. Server-side notification route is not active." },
      { status: 400 }
    );
  }

  const payload = (await request.json()) as SendPushRequest;

  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      to: payload.expoPushToken,
      title: payload.title,
      body: payload.body,
      data: payload.data ?? {}
    })
  });

  const result = await response.json();
  return NextResponse.json({ ok: response.ok, result }, { status: response.ok ? 200 : 500 });
}

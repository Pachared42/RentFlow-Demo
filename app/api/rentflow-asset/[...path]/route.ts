import { NextRequest, NextResponse } from "next/server";

import { getRentFlowApiBaseUrl } from "@/src/lib/runtime-api-url";

type RouteContext = {
  params: Promise<{
    path?: string[];
  }>;
};

function buildAssetUrl(path: string[], requestUrl: string) {
  const url = new URL(requestUrl);
  const assetPath = path.map((part) => encodeURIComponent(part)).join("/");
  const targetUrl = new URL(`/${assetPath}`, getRentFlowApiBaseUrl());
  targetUrl.search = url.search;
  return targetUrl;
}

async function proxyRentFlowAsset(
  request: NextRequest,
  context: RouteContext,
  method: "GET" | "HEAD"
) {
  const { path = [] } = await context.params;

  if (!path.length) {
    return NextResponse.json(
      { success: false, message: "ไม่พบไฟล์รูปภาพ" },
      { status: 404 }
    );
  }

  const targetUrl = buildAssetUrl(path, request.url);
  const upstream = await fetch(targetUrl, {
    cache: "no-store",
    headers: {
      Accept: request.headers.get("accept") || "*/*",
    },
    method: method === "HEAD" ? "GET" : "GET",
  });

  if (!upstream.ok) {
    return NextResponse.json(
      { success: false, message: "ไม่พบไฟล์รูปภาพ" },
      { status: upstream.status }
    );
  }

  const headers = new Headers();
  const contentType = upstream.headers.get("content-type");
  const cacheControl = upstream.headers.get("cache-control");

  if (contentType) headers.set("content-type", contentType);
  headers.set("cache-control", cacheControl || "public, max-age=60");

  if (method === "HEAD") {
    const contentLength = upstream.headers.get("content-length");
    if (contentLength) headers.set("content-length", contentLength);
    return new NextResponse(null, { status: 200, headers });
  }

  return new NextResponse(upstream.body, {
    status: 200,
    headers,
  });
}

export async function GET(request: NextRequest, context: RouteContext) {
  return proxyRentFlowAsset(request, context, "GET");
}

export async function HEAD(request: NextRequest, context: RouteContext) {
  return proxyRentFlowAsset(request, context, "HEAD");
}

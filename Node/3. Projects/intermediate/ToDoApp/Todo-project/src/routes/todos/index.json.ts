import type { RequestHandler } from "@sveltejs/kit";
import { api } from "./_api";

export const get: RequestHandler = (request) => {
  return api(request);
}

export const post: RequestHandler<{}, FormData> = (request) => {
  return api(request, {
    uid: `${Date.now()}`, //fazer um uid melhor para evitar confitos
    created_at: new Date(),
    content: request.body.get("tap-first-insert"),
    done: false
  });
}
import { auth } from "~/utils/auth";
import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { isUserAdmin } from "~/data-access/users";

export const authenticatedMiddleware = createMiddleware({
  type: "function",
}).server(async ({ next }) => {
  const request = getRequest();

  if (!request?.headers) {
    throw new Error("No headers");
  }
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    throw new Error("No session");
  }

  return next({
    context: { userId: session.user.id },
  });
});

export const assertAdminMiddleware = createMiddleware({
  type: "function",
}).server(async ({ next }) => {
  const request = getRequest();

  if (!request?.headers) {
    throw new Error("No headers");
  }
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    throw new Error("No session");
  }

  const userId = session.user.id;
  const adminCheck = await isUserAdmin(userId);
  if (!adminCheck) {
    throw new Error("Unauthorized: Only admins can perform this action");
  }

  return next({
    context: { userId },
  });
});

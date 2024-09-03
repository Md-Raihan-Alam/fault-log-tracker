export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/faults-log/new", "/faults-log/edit/:id+"],
};

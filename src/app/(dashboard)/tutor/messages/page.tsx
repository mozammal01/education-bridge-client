import { MessagesView } from "@/components/dashboard/shared/messages-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutor Messages",
  description: "Secure messaging with your students",
};

export default function TutorMessagesPage() {
  return <MessagesView />;
}

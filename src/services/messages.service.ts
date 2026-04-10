import { api } from "@/lib/api";
import { Conversation, Message, PaginatedResponse, PaginationParams } from "@/types";

export const messagesService = {
  getConversations: async (params?: PaginationParams) => {
    return api.get<PaginatedResponse<Conversation>>("/api/messages/conversations", { params });
  },

  getMessages: async (conversationId: string, params?: PaginationParams) => {
    return api.get<PaginatedResponse<Message>>(`/api/messages/conversations/${conversationId}`, { params });
  },

  sendMessage: async (conversationId: string, content: string) => {
    return api.post<Message>(`/api/messages/conversations/${conversationId}`, { content });
  },

  startConversation: async (tutorId: string, content: string) => {
    return api.post<Conversation>("/api/messages/conversations", { tutorId, content });
  },

  markAsRead: async (conversationId: string) => {
    return api.patch(`/api/messages/conversations/${conversationId}/read`);
  },
};

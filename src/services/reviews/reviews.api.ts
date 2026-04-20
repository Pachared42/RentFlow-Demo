import api from "@/src/lib/axios";
import type { ApiResponse } from "../types/types";
import type {
  CreateReviewPayload,
  Review,
  ReviewListResponse,
} from "./reviews.types";

function normalizeReview(raw: Partial<Review> & { id: string }): Review {
  return {
    id: raw.id,
    firstName: raw.firstName || "",
    lastName: raw.lastName || "",
    rating: Number(raw.rating || 0),
    comment: raw.comment || "",
    createdAt: raw.createdAt || "",
    updatedAt: raw.updatedAt,
  };
}

export const reviewsApi = {
  async getReviews() {
    const res = await api.get<ApiResponse<ReviewListResponse>>("/reviews");

    return {
      ...res.data,
      data: {
        items: (res.data.data?.items ?? []).map(normalizeReview),
        total: res.data.data?.total ?? 0,
      },
    };
  },

  async createReview(payload: CreateReviewPayload) {
    const res = await api.post<ApiResponse<Review>>("/reviews", payload);

    return {
      ...res.data,
      data: normalizeReview(res.data.data),
    };
  },
};

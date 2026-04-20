export type Review = {
  id: string;
  firstName: string;
  lastName: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt?: string;
};

export type ReviewListResponse = {
  items: Review[];
  total: number;
};

export type CreateReviewPayload = {
  firstName: string;
  lastName: string;
  rating: number;
  comment?: string;
};

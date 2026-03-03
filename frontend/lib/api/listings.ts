import { apiClient } from './client';
import { Listing, ListingFormData, Purchase, PaginatedResponse } from './types';

export interface SourcingData {
  name: string;
  contact: string;
  model?: string;
  budget?: number;
  note?: string;
}

export interface ListingParams {
  page?: number;
  search?: string;
  category?: string;
  sort?: string;
}

export const listingsApi = {
  getListings: (params: ListingParams = {}) => {
    const { page = 1, search, category, sort } = params;
    let url = `/listings?page=${page}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (category) url += `&category=${encodeURIComponent(category)}`;
    if (sort) url += `&sort=${encodeURIComponent(sort)}`;
    return apiClient.get<PaginatedResponse<Listing>>(url);
  },
  
  getListing: (slug: string) =>
    apiClient.get<Listing>(`/listings/${slug}`),

  getRelatedListings: (slug: string) =>
    apiClient.get<Listing[]>(`/listings/${slug}/related`),

  submitSourcing: (data: SourcingData) =>
    apiClient.post<{ message: string; data: any }>('/sourcing', data),

  // Seller APIs
  getMyListings: (token: string) =>
    apiClient.get<PaginatedResponse<Listing>>('/my-listings', token),

  createListing: (data: ListingFormData, token: string) =>
    apiClient.post<Listing>('/listings', data, token),

  updateListing: (id: number, data: Partial<ListingFormData>, token: string) =>
    apiClient.put<Listing>(`/listings/${id}`, data, token),

  deleteListing: (id: number, token: string) =>
    apiClient.delete<{ message: string }>(`/listings/${id}`, token),

  // Purchases
  getPurchases: (token: string) =>
    apiClient.get<PaginatedResponse<Purchase>>('/purchases', token),

  purchaseFree: (listingId: number, token: string) =>
    apiClient.post<Purchase>('/purchases', { listing_id: listingId }, token),

  checkPurchased: (listingId: number, token: string) =>
    apiClient.get<{ owned: boolean }>(`/purchases/check/${listingId}`, token),

  createCheckoutSession: (listingId: number, token: string) =>
    apiClient.post<{ url: string; session_id: string }>('/stripe/checkout', { listing_id: listingId }, token),
};

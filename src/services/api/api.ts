import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  SearchTicketOptions,
  SearchTicketResponse,
  RedeemTicketOptions,
  RedeemTicketResponse,
} from './apiTypes';

export const checkinApi = createApi({
  reducerPath: 'gatewayApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.77:3001',
  }),
  endpoints: (builder) => ({
    searchTicket: builder.query<SearchTicketResponse, SearchTicketOptions>({
      query: (opts) => {
        const params = new URLSearchParams(opts);
        return {
          url: `tickets/search?${params.toString()}`,
        };
      },
    }),
    redeemTicket: builder.mutation<RedeemTicketResponse, RedeemTicketOptions>({
      query: (opts) => ({
        url: `tickets/redeem/${opts.ticketId}`,
      }),
    }),
  }),
});

export type CheckinAPIType = typeof checkinApi;

export const { useSearchTicketQuery, useRedeemTicketMutation } = checkinApi;

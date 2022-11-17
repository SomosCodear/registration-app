export type APIArgsWithOptions<BaseArgs = Record<string, unknown>> = Record<
  string,
  unknown
> &
  BaseArgs;

export type AllUndefined<T> = {
  [K in keyof T]: undefined;
};

export type PossibleObj<T> = T | AllUndefined<T>;

export type SearchTicketOptions = {
  ticketId?: string;
  dni?: string;
};

export type SearchTicketPreferenceProps = {
  paymentStatus: string;
  foodPreference: string;
  preferenceStatus: string;
};

export type SearchTicketAttendeeProps = {
  attendeeFullName: string;
  attendeeEmail: string;
  attendeeID: string;
};

export type SearchTicketResponse = {
  ticketId: string;
  ticketStatus: string;
} & PossibleObj<SearchTicketPreferenceProps> &
  PossibleObj<SearchTicketAttendeeProps>;

export type RedeemTicketOptions = {
  ticketId: string;
};

export type RedeemTicketResponse = {
  redeemed: boolean;
};

import { gql } from "@apollo/client";
import type * as ApolloReactCommon from "@apollo/client/react";
import * as ApolloReactHooks from "@apollo/client/react";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Appointment = {
  __typename?: "Appointment";
  clientName: Scalars["String"]["output"];
  /** Format: YYYY-MM-DD */
  date: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  /** Format: HH:MM */
  time: Scalars["String"]["output"];
};

export type AppointmentGroup = {
  __typename?: "AppointmentGroup";
  appointments: Array<Appointment>;
  period: TimeOfDay;
};

export type AvailableTimes = {
  __typename?: "AvailableTimes";
  date: Scalars["String"]["output"];
  times: Array<TimeSlot>;
};

export type DailyAppointments = {
  __typename?: "DailyAppointments";
  date: Scalars["String"]["output"];
  groups: Array<AppointmentGroup>;
};

export type Mutation = {
  __typename?: "Mutation";
  createAppointment: Appointment;
  deleteAppointment: Scalars["Boolean"]["output"];
};

export type MutationCreateAppointmentArgs = {
  input: NewAppointmentInput;
};

export type MutationDeleteAppointmentArgs = {
  id: Scalars["ID"]["input"];
};

export type NewAppointmentInput = {
  clientName: Scalars["String"]["input"];
  date: Scalars["String"]["input"];
  time: Scalars["String"]["input"];
};

export type Query = {
  __typename?: "Query";
  appointments: Array<Appointment>;
  appointmentsByDay: DailyAppointments;
  availableTimesByDay: AvailableTimes;
};

export type QueryAppointmentsByDayArgs = {
  date: Scalars["String"]["input"];
};

export type QueryAvailableTimesByDayArgs = {
  date: Scalars["String"]["input"];
};

export enum TimeOfDay {
  /** 12:00 - 17:59 */
  Afternoon = "AFTERNOON",
  /** 18:00 - 23:59 */
  Evening = "EVENING",
  /** 06:00 - 11:59 */
  Morning = "MORNING",
}

export type TimeSlot = {
  __typename?: "TimeSlot";
  isAvailable: Scalars["Boolean"]["output"];
  time: Scalars["String"]["output"];
};

export type GetAvailableTimeQueryVariables = Exact<{
  date: Scalars["String"]["input"];
}>;

export type GetAvailableTimeQuery = {
  __typename?: "Query";
  availableTimesByDay: {
    __typename?: "AvailableTimes";
    date: string;
    times: Array<{
      __typename?: "TimeSlot";
      time: string;
      isAvailable: boolean;
    }>;
  };
};

export const GetAvailableTimeDocument = gql`
  query GetAvailableTime($date: String!) {
    availableTimesByDay(date: $date) {
      date
      times {
        time
        isAvailable
      }
    }
  }
`;

/**
 * __useGetAvailableTimeQuery__
 *
 * To run a query within a React component, call `useGetAvailableTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAvailableTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAvailableTimeQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useGetAvailableTimeQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetAvailableTimeQuery,
    GetAvailableTimeQueryVariables
  > &
    (
      | { variables: GetAvailableTimeQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    GetAvailableTimeQuery,
    GetAvailableTimeQueryVariables
  >(GetAvailableTimeDocument, options);
}
export function useGetAvailableTimeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetAvailableTimeQuery,
    GetAvailableTimeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetAvailableTimeQuery,
    GetAvailableTimeQueryVariables
  >(GetAvailableTimeDocument, options);
}
export function useGetAvailableTimeSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetAvailableTimeQuery,
        GetAvailableTimeQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetAvailableTimeQuery,
    GetAvailableTimeQueryVariables
  >(GetAvailableTimeDocument, options);
}
export type GetAvailableTimeQueryHookResult = ReturnType<
  typeof useGetAvailableTimeQuery
>;
export type GetAvailableTimeLazyQueryHookResult = ReturnType<
  typeof useGetAvailableTimeLazyQuery
>;
export type GetAvailableTimeSuspenseQueryHookResult = ReturnType<
  typeof useGetAvailableTimeSuspenseQuery
>;
export type GetAvailableTimeQueryResult = ApolloReactCommon.QueryResult<
  GetAvailableTimeQuery,
  GetAvailableTimeQueryVariables
>;

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

export type AvailableTimeGroup = {
  __typename?: "AvailableTimeGroup";
  period: TimeOfDay;
  times: Array<TimeSlot>;
};

export type AvailableTimes = {
  __typename?: "AvailableTimes";
  date: Scalars["String"]["output"];
  groups: Array<AvailableTimeGroup>;
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
  /** 18:00 - 21:59 */
  Evening = "EVENING",
  /** 09:00 - 11:59 */
  Morning = "MORNING",
}

export type TimeSlot = {
  __typename?: "TimeSlot";
  clientName?: Maybe<Scalars["String"]["output"]>;
  isAvailable: Scalars["Boolean"]["output"];
  time: Scalars["String"]["output"];
};

export type CreateAppointmentMutationVariables = Exact<{
  input: NewAppointmentInput;
}>;

export type CreateAppointmentMutation = {
  __typename?: "Mutation";
  createAppointment: {
    __typename?: "Appointment";
    id: string;
    clientName: string;
    date: string;
    time: string;
  };
};

export type GetAppointmentsByDayQueryVariables = Exact<{
  date: Scalars["String"]["input"];
}>;

export type GetAppointmentsByDayQuery = {
  __typename?: "Query";
  appointmentsByDay: {
    __typename?: "DailyAppointments";
    date: string;
    groups: Array<{
      __typename?: "AppointmentGroup";
      period: TimeOfDay;
      appointments: Array<{
        __typename?: "Appointment";
        id: string;
        clientName: string;
        time: string;
      }>;
    }>;
  };
};

export type GetAvailableTimeQueryVariables = Exact<{
  date: Scalars["String"]["input"];
}>;

export type GetAvailableTimeQuery = {
  __typename?: "Query";
  availableTimesByDay: {
    __typename?: "AvailableTimes";
    groups: Array<{
      __typename?: "AvailableTimeGroup";
      period: TimeOfDay;
      times: Array<{
        __typename?: "TimeSlot";
        time: string;
        isAvailable: boolean;
      }>;
    }>;
  };
};

export const CreateAppointmentDocument = gql`
  mutation CreateAppointment($input: NewAppointmentInput!) {
    createAppointment(input: $input) {
      id
      clientName
      date
      time
    }
  }
`;
export type CreateAppointmentMutationFn = ApolloReactCommon.MutationFunction<
  CreateAppointmentMutation,
  CreateAppointmentMutationVariables
>;

/**
 * __useCreateAppointmentMutation__
 *
 * To run a mutation, you first call `useCreateAppointmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAppointmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAppointmentMutation, { data, loading, error }] = useCreateAppointmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAppointmentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateAppointmentMutation,
    CreateAppointmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    CreateAppointmentMutation,
    CreateAppointmentMutationVariables
  >(CreateAppointmentDocument, options);
}
export type CreateAppointmentMutationHookResult = ReturnType<
  typeof useCreateAppointmentMutation
>;
export type CreateAppointmentMutationResult =
  ApolloReactCommon.MutationResult<CreateAppointmentMutation>;
export type CreateAppointmentMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    CreateAppointmentMutation,
    CreateAppointmentMutationVariables
  >;
export const GetAppointmentsByDayDocument = gql`
  query GetAppointmentsByDay($date: String!) {
    appointmentsByDay(date: $date) {
      date
      groups {
        period
        appointments {
          id
          clientName
          time
        }
      }
    }
  }
`;

/**
 * __useGetAppointmentsByDayQuery__
 *
 * To run a query within a React component, call `useGetAppointmentsByDayQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppointmentsByDayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppointmentsByDayQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useGetAppointmentsByDayQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetAppointmentsByDayQuery,
    GetAppointmentsByDayQueryVariables
  > &
    (
      | { variables: GetAppointmentsByDayQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    GetAppointmentsByDayQuery,
    GetAppointmentsByDayQueryVariables
  >(GetAppointmentsByDayDocument, options);
}
export function useGetAppointmentsByDayLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetAppointmentsByDayQuery,
    GetAppointmentsByDayQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetAppointmentsByDayQuery,
    GetAppointmentsByDayQueryVariables
  >(GetAppointmentsByDayDocument, options);
}
export function useGetAppointmentsByDaySuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetAppointmentsByDayQuery,
        GetAppointmentsByDayQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetAppointmentsByDayQuery,
    GetAppointmentsByDayQueryVariables
  >(GetAppointmentsByDayDocument, options);
}
export type GetAppointmentsByDayQueryHookResult = ReturnType<
  typeof useGetAppointmentsByDayQuery
>;
export type GetAppointmentsByDayLazyQueryHookResult = ReturnType<
  typeof useGetAppointmentsByDayLazyQuery
>;
export type GetAppointmentsByDaySuspenseQueryHookResult = ReturnType<
  typeof useGetAppointmentsByDaySuspenseQuery
>;
export type GetAppointmentsByDayQueryResult = ApolloReactCommon.QueryResult<
  GetAppointmentsByDayQuery,
  GetAppointmentsByDayQueryVariables
>;
export const GetAvailableTimeDocument = gql`
  query GetAvailableTime($date: String!) {
    availableTimesByDay(date: $date) {
      groups {
        period
        times {
          time
          isAvailable
        }
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

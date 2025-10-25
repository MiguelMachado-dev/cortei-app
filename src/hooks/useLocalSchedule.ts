import { useCallback, useEffect, useRef, useState } from "react";
import {
  createAppointment as persistAppointment,
  getDailyAppointments,
  getDailyAvailableTimes,
  subscribeToAppointments,
  type DailyAppointments,
  type DailyAvailableTimes,
  type NewAppointmentInput,
} from "@/lib/localSchedule";

type QueryState<T> = {
  loading: boolean;
  data: T | null;
  error: Error | null;
};

type LoadOptions = {
  skipLoadingState?: boolean;
};

const createInitialState = <T>(initialLoading: boolean): QueryState<T> => ({
  loading: initialLoading,
  data: null,
  error: null,
});

export const useLocalAppointmentsByDay = (date: string | undefined) => {
  const [state, setState] = useState<QueryState<DailyAppointments>>(
    createInitialState(Boolean(date)),
  );
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const load = useCallback(
    async (options?: LoadOptions) => {
      if (!mountedRef.current) {
        return;
      }

      if (!date) {
        setState(createInitialState(false));
        return;
      }

      if (!options?.skipLoadingState) {
        setState((previous) => ({
          ...previous,
          loading: true,
          error: null,
        }));
      }

      try {
        const result = await getDailyAppointments(date);

        if (!mountedRef.current) {
          return;
        }

        setState({
          loading: false,
          data: result,
          error: null,
        });
      } catch (unknownError) {
        if (!mountedRef.current) {
          return;
        }

        const error =
          unknownError instanceof Error
            ? unknownError
            : new Error("Não foi possível carregar os agendamentos.");

        setState({
          loading: false,
          data: null,
          error,
        });
      }
    },
    [date],
  );

  useEffect(() => {
    if (!date) {
      setState(createInitialState(false));
      return;
    }

    load();
  }, [date, load]);

  useEffect(() => {
    const unsubscribe = subscribeToAppointments(() => {
      void load({ skipLoadingState: true });
    });

    return unsubscribe;
  }, [load]);

  const refetch = useCallback(async () => {
    await load();
  }, [load]);

  return { ...state, refetch };
};

export const useLocalAvailableTimesByDay = (date: string | undefined) => {
  const [state, setState] = useState<QueryState<DailyAvailableTimes>>(
    createInitialState(Boolean(date)),
  );
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const load = useCallback(
    async (options?: LoadOptions) => {
      if (!mountedRef.current) {
        return;
      }

      if (!date) {
        setState(createInitialState(false));
        return;
      }

      if (!options?.skipLoadingState) {
        setState((previous) => ({
          ...previous,
          loading: true,
          error: null,
        }));
      }

      try {
        const result = await getDailyAvailableTimes(date);

        if (!mountedRef.current) {
          return;
        }

        setState({
          loading: false,
          data: result,
          error: null,
        });
      } catch (unknownError) {
        if (!mountedRef.current) {
          return;
        }

        const error =
          unknownError instanceof Error
            ? unknownError
            : new Error("Não foi possível carregar os horários disponíveis.");

        setState({
          loading: false,
          data: null,
          error,
        });
      }
    },
    [date],
  );

  useEffect(() => {
    if (!date) {
      setState(createInitialState(false));
      return;
    }

    load();
  }, [date, load]);

  useEffect(() => {
    const unsubscribe = subscribeToAppointments(() => {
      void load({ skipLoadingState: true });
    });

    return unsubscribe;
  }, [load]);

  const refetch = useCallback(async () => {
    await load();
  }, [load]);

  return { ...state, refetch };
};

export const useLocalCreateAppointment = () => {
  const [loading, setLoading] = useState(false);

  const createAppointment = useCallback(
    async (input: NewAppointmentInput) => {
      setLoading(true);

      try {
        const result = await persistAppointment(input);
        return result;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { createAppointment, loading };
};

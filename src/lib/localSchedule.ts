export type TimeOfDay = "MORNING" | "AFTERNOON" | "EVENING";

export type StoredAppointment = {
  id: string;
  clientName: string;
  date: string;
  time: string;
};

export type AppointmentGroup = {
  period: TimeOfDay;
  appointments: StoredAppointment[];
};

export type AvailableTime = {
  time: string;
  isAvailable: boolean;
};

export type AvailableTimeGroup = {
  period: TimeOfDay;
  times: AvailableTime[];
};

export type DailyAppointments = {
  date: string;
  groups: AppointmentGroup[];
};

export type DailyAvailableTimes = {
  date: string;
  groups: AvailableTimeGroup[];
};

export type NewAppointmentInput = {
  clientName: string;
  date: string;
  time: string;
};

type AppointmentsListener = () => void;

const STORAGE_KEY = "cortei-app:appointments";
const memoryStorage: { items: StoredAppointment[] } = { items: [] };
const listeners = new Set<AppointmentsListener>();

const PERIODS: TimeOfDay[] = ["MORNING", "AFTERNOON", "EVENING"];

const TIME_SLOTS: Record<TimeOfDay, string[]> = {
  MORNING: ["09:00", "10:00", "11:00", "12:00"],
  AFTERNOON: ["13:00", "14:00", "15:00", "16:00", "17:00"],
  EVENING: ["19:00", "20:00", "21:00"],
};

const STORAGE_UNAVAILABLE_ERROR = "localStorage is not available";

const parseAppointments = (rawValue: unknown): StoredAppointment[] => {
  if (!Array.isArray(rawValue)) {
    return [];
  }

  return rawValue.filter((item) => {
    if (!item || typeof item !== "object") {
      return false;
    }

    const { id, clientName, date, time } = item as Record<string, unknown>;

    return (
      typeof id === "string" &&
      typeof clientName === "string" &&
      typeof date === "string" &&
      typeof time === "string"
    );
  }) as StoredAppointment[];
};

const getStorage = (): Storage | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const { localStorage } = window;
    // Test access to make sure it doesn't throw
    const testKey = "__cortei_app_storage_test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return localStorage;
  } catch (error) {
    console.warn(STORAGE_UNAVAILABLE_ERROR, error);
    return null;
  }
};

const readAppointments = (): StoredAppointment[] => {
  if (memoryStorage.items.length > 0) {
    return [...memoryStorage.items];
  }

  const storage = getStorage();

  if (!storage) {
    return [...memoryStorage.items];
  }

  try {
    const rawValue = storage.getItem(STORAGE_KEY);

    if (!rawValue) {
      memoryStorage.items = [];
      return [];
    }

    const parsed = JSON.parse(rawValue) as unknown;
    const appointments = parseAppointments(parsed);
    memoryStorage.items = appointments;
    return [...appointments];
  } catch (error) {
    console.error("Failed to read appointments from localStorage", error);
    memoryStorage.items = [];
    return [];
  }
};

const writeAppointments = (appointments: StoredAppointment[]): void => {
  memoryStorage.items = [...appointments];

  const storage = getStorage();

  if (!storage) {
    return;
  }

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(memoryStorage.items));
  } catch (error) {
    console.error("Failed to persist appointments into localStorage", error);
  }
};

const emitChange = (): void => {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (error) {
      console.error("Failed to notify appointments listener", error);
    }
  });
};

export const subscribeToAppointments = (
  listener: AppointmentsListener,
): (() => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

const getPeriodForTime = (time: string): TimeOfDay => {
  const period = PERIODS.find((currentPeriod) =>
    TIME_SLOTS[currentPeriod].includes(time),
  );

  return period ?? "MORNING";
};

const sortByTime = (appointments: StoredAppointment[]): StoredAppointment[] => {
  return [...appointments].sort((appointmentA, appointmentB) =>
    appointmentA.time.localeCompare(appointmentB.time),
  );
};

const getAppointmentsByDate = (date: string): StoredAppointment[] => {
  const appointments = readAppointments();

  return sortByTime(
    appointments.filter((appointment) => appointment.date === date),
  );
};

const nextId = (): string => {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
  } catch (error) {
    console.warn("Failed to generate UUID using crypto", error);
  }

  return `appt_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

export const getDailyAppointments = async (
  date: string,
): Promise<DailyAppointments> => {
  const appointments = getAppointmentsByDate(date);

  const groups = PERIODS.map((period) => {
    return {
      period,
      appointments: appointments.filter(
        (appointment) => getPeriodForTime(appointment.time) === period,
      ),
    } satisfies AppointmentGroup;
  });

  return { date, groups } satisfies DailyAppointments;
};

export const getDailyAvailableTimes = async (
  date: string,
): Promise<DailyAvailableTimes> => {
  const appointments = getAppointmentsByDate(date);
  const takenTimes = new Set(appointments.map((appointment) => appointment.time));

  const groups = PERIODS.map((period) => {
    const times = TIME_SLOTS[period].map((time) => ({
      time,
      isAvailable: !takenTimes.has(time),
    }));

    return { period, times } satisfies AvailableTimeGroup;
  });

  return { date, groups } satisfies DailyAvailableTimes;
};

export const createAppointment = async (
  input: NewAppointmentInput,
): Promise<StoredAppointment> => {
  const existingAppointments = readAppointments();
  const slotAlreadyTaken = existingAppointments.some(
    (appointment) =>
      appointment.date === input.date && appointment.time === input.time,
  );

  if (slotAlreadyTaken) {
    throw new Error("Este horário já está reservado.");
  }

  const appointment: StoredAppointment = {
    id: nextId(),
    clientName: input.clientName,
    date: input.date,
    time: input.time,
  };

  const nextAppointments = [...existingAppointments, appointment];

  writeAppointments(nextAppointments);
  emitChange();

  return appointment;
};

export const resetAppointments = (nextAppointments: StoredAppointment[]) => {
  writeAppointments(nextAppointments);
  emitChange();
};

export const TIME_SLOTS_BY_PERIOD = TIME_SLOTS;
export const TIME_PERIODS = PERIODS;

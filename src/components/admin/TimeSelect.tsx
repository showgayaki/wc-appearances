import { useEffect, useState } from "react";
import Select, { type SingleValue, type StylesConfig } from "react-select";
import { FieldError } from "./FieldError";

type TimeSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  errorKey?: number;
};

type TimeOption = {
  value: string;
  label: string;
};

const hours = Array.from({ length: 30 }, (_, index) => String(index).padStart(2, "0"));
const minutes = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, "0"));
const hourOptions = hours.map((hour): TimeOption => ({ value: hour, label: hour }));
const minuteOptions = minutes.map((minute): TimeOption => ({ value: minute, label: minute }));

const selectStyles: StylesConfig<TimeOption, false> = {
  menuPortal: (base) => ({
    ...base,
    zIndex: 60,
  }),
};

const splitTime = (value: string): { hour: string; minute: string } => {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());

  if (!match) {
    return { hour: "", minute: "" };
  }

  const hour = match[1].padStart(2, "0");
  const minute = match[2];

  if (!hours.includes(hour) || !minutes.includes(minute)) {
    return { hour: "", minute: "" };
  }

  return { hour, minute };
};

export function TimeSelect({ label, value, onChange, error = "", errorKey = 0 }: TimeSelectProps) {
  const { hour, minute } = splitTime(value);
  const [draftHour, setDraftHour] = useState(hour);
  const [draftMinute, setDraftMinute] = useState(minute);
  const selectedHour = hourOptions.find((option) => option.value === draftHour) ?? null;
  const selectedMinute = minuteOptions.find((option) => option.value === draftMinute) ?? null;
  const portalTarget = typeof document === "undefined" ? undefined : document.body;
  const hourError = error && !draftHour ? "時を選択してください。" : "";
  const minuteError = error && !draftMinute ? "分を選択してください。" : "";

  useEffect(() => {
    if (!value) {
      setDraftHour("");
      setDraftMinute("");
      return;
    }

    setDraftHour(hour);
    setDraftMinute(minute);
  }, [hour, minute, value]);

  const update = (nextHour: string, nextMinute: string) => {
    setDraftHour(nextHour);
    setDraftMinute(nextMinute);

    if (!nextHour || !nextMinute) {
      return;
    }

    onChange(`${nextHour}:${nextMinute}`);
  };

  const updateHour = (option: SingleValue<TimeOption>) => {
    update(option?.value ?? "", draftMinute);
  };

  const updateMinute = (option: SingleValue<TimeOption>) => {
    update(draftHour, option?.value ?? "");
  };

  return (
    <fieldset className="time-select field-with-tooltip">
      <legend>{label}</legend>
      <div className="time-select-controls">
        <div className="time-select-field">
          <Select<TimeOption, false>
            aria-label={`${label}の時`}
            aria-invalid={hourError.length > 0}
            className="time-react-select"
            classNamePrefix="time-react-select"
            blurInputOnSelect
            isSearchable={false}
            menuPlacement="auto"
            menuPortalTarget={portalTarget}
            menuPosition="fixed"
            noOptionsMessage={() => "候補がありません"}
            onChange={updateHour}
            options={hourOptions}
            placeholder="時"
            styles={selectStyles}
            value={selectedHour}
          />
          <FieldError message={hourError} visibleKey={errorKey} />
        </div>
        <span aria-hidden="true">:</span>
        <div className="time-select-field">
          <Select<TimeOption, false>
            aria-label={`${label}の分`}
            aria-invalid={minuteError.length > 0}
            className="time-react-select"
            classNamePrefix="time-react-select"
            blurInputOnSelect
            isSearchable={false}
            menuPlacement="auto"
            menuPortalTarget={portalTarget}
            menuPosition="fixed"
            noOptionsMessage={() => "候補がありません"}
            onChange={updateMinute}
            options={minuteOptions}
            placeholder="分"
            styles={selectStyles}
            value={selectedMinute}
          />
          <FieldError message={minuteError} visibleKey={errorKey} />
        </div>
      </div>
    </fieldset>
  );
}

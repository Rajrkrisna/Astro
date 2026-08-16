'use client';

import React, { useState, useEffect } from 'react';

/**
 * 12-Hour Time Picker Component
 * Starts with 12 AM and provides Hour (12, 01..11), Minute (00..59), and AM/PM options.
 */
export default function TimePicker12Hour({ value = '', onChange, idPrefix = 'time' }) {
  // Parse existing value if provided (e.g., '12:00 AM' or '05:30 PM')
  const parseInitialValue = (valStr) => {
    if (!valStr) return { hour: '12', minute: '00', period: 'AM' };
    
    const match = valStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (match) {
      return {
        hour: match[1].padStart(2, '0'),
        minute: match[2],
        period: match[3].toUpperCase(),
      };
    }
    return { hour: '12', minute: '00', period: 'AM' };
  };

  const initial = parseInitialValue(value);
  const [hour, setHour] = useState(initial.hour);
  const [minute, setMinute] = useState(initial.minute);
  const [period, setPeriod] = useState(initial.period);

  // Sync internal state when external value changes
  useEffect(() => {
    if (value) {
      const parsed = parseInitialValue(value);
      setHour(parsed.hour);
      setMinute(parsed.minute);
      setPeriod(parsed.period);
    }
  }, [value]);

  const updateTime = (newHour, newMin, newPeriod) => {
    const formatted = `${newHour}:${newMin} ${newPeriod}`;
    if (onChange) {
      onChange(formatted);
    }
  };

  const handleHourChange = (e) => {
    const newHour = e.target.value;
    setHour(newHour);
    updateTime(newHour, minute, period);
  };

  const handleMinuteChange = (e) => {
    const newMin = e.target.value;
    setMinute(newMin);
    updateTime(hour, newMin, period);
  };

  const handlePeriodChange = (e) => {
    const newPeriod = e.target.value;
    setPeriod(newPeriod);
    updateTime(hour, minute, newPeriod);
  };

  // Hours: Starting from 12 AM (12, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11)
  const hoursList = ['12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
  
  // Minutes: 00 to 59
  const minutesList = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  return (
    <div className="time-picker-12hr-wrap">
      {/* Hour Dropdown */}
      <div className="time-select-unit">
        <select
          id={`${idPrefix}-hour`}
          value={hour}
          onChange={handleHourChange}
          className="time-select hour-select"
          aria-label="Hour (12-hour format)"
        >
          {hoursList.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        <span className="time-unit-label">Hr</span>
      </div>

      <span className="time-separator">:</span>

      {/* Minute Dropdown */}
      <div className="time-select-unit">
        <select
          id={`${idPrefix}-min`}
          value={minute}
          onChange={handleMinuteChange}
          className="time-select min-select"
          aria-label="Minutes"
        >
          {minutesList.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <span className="time-unit-label">Min</span>
      </div>

      {/* AM / PM Dropdown */}
      <div className="time-select-unit period-unit">
        <select
          id={`${idPrefix}-period`}
          value={period}
          onChange={handlePeriodChange}
          className="time-select period-select"
          aria-label="AM or PM"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
        <span className="time-unit-label">Meridiem</span>
      </div>
    </div>
  );
}

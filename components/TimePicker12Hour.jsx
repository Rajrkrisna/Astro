'use client';

import React, { useState, useEffect } from 'react';

/**
 * 12-Hour Time Picker Component (Indian Standard Format)
 * Reliable hour, minute, and AM/PM selection with zero clipping or blocking.
 */
export default function TimePicker12Hour({ value = '', onChange, idPrefix = 'tob' }) {
  const parseTime = (valStr) => {
    if (!valStr) return { hour: '12', minute: '00', period: 'AM' };
    
    const match = valStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (match) {
      return {
        hour: match[1].padStart(2, '0'),
        minute: match[2].padStart(2, '0'),
        period: match[3].toUpperCase(),
      };
    }
    return { hour: '12', minute: '00', period: 'AM' };
  };

  const initial = parseTime(value);
  const [hour, setHour] = useState(initial.hour);
  const [minute, setMinute] = useState(initial.minute);
  const [period, setPeriod] = useState(initial.period);

  useEffect(() => {
    if (value) {
      const parsed = parseTime(value);
      setHour(parsed.hour);
      setMinute(parsed.minute);
      setPeriod(parsed.period);
    }
  }, [value]);

  const emitChange = (h, m, p) => {
    const formatted = `${h}:${m} ${p}`;
    if (onChange) {
      onChange(formatted);
    }
  };

  const handleHour = (e) => {
    const newH = e.target.value;
    setHour(newH);
    emitChange(newH, minute, period);
  };

  const handleMinute = (e) => {
    const newM = e.target.value;
    setMinute(newM);
    emitChange(hour, newM, period);
  };

  const handlePeriod = (newP) => {
    setPeriod(newP);
    emitChange(hour, minute, newP);
  };

  // Hours: 12, 01, 02 .. 11 (Starts from 12 AM)
  const hours = ['12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
  
  // Minutes: 00 to 55 (every 5 mins) + options for precision
  const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

  return (
    <div className="time-picker-12hr-card">
      {/* Hour Dropdown */}
      <select
        id={`${idPrefix}-hour`}
        name={`${idPrefix}-hour`}
        value={hour}
        onChange={handleHour}
        className="time-native-select time-hour-select"
        aria-label="Hour (12-hour format)"
      >
        {hours.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>

      <span className="time-colon-dot" aria-hidden="true">:</span>

      {/* Minute Dropdown */}
      <select
        id={`${idPrefix}-min`}
        name={`${idPrefix}-min`}
        value={minute}
        onChange={handleMinute}
        className="time-native-select time-min-select"
        aria-label="Minute"
      >
        {minutes.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      {/* AM / PM Segmented Control */}
      <div className="ampm-segmented-control" role="group" aria-label="Time period AM or PM">
        <button
          type="button"
          className={`btn-ampm-tab ${period === 'AM' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handlePeriod('AM');
          }}
          aria-pressed={period === 'AM'}
        >
          AM
        </button>
        <button
          type="button"
          className={`btn-ampm-tab ${period === 'PM' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handlePeriod('PM');
          }}
          aria-pressed={period === 'PM'}
        >
          PM
        </button>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';

/**
 * 12-Hour Time Picker Component (Indian Standard Format)
 * Perfectly aligned with adjacent input fields (48px height, no uneven sub-labels).
 */
export default function TimePicker12Hour({ value = '', onChange, idPrefix = 'time' }) {
  const parseInitialValue = (valStr) => {
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

  const initial = parseInitialValue(value);
  const [hour, setHour] = useState(initial.hour);
  const [minute, setMinute] = useState(initial.minute);
  const [period, setPeriod] = useState(initial.period);

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

  const handlePeriodToggle = (newPeriod) => {
    setPeriod(newPeriod);
    updateTime(hour, minute, newPeriod);
  };

  // Hours: Starts from 12 AM (12, 01, 02 ... 11)
  const hoursList = ['12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
  
  // Clean, non-overflowing minutes list
  const minutesList = [
    '00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'
  ];

  return (
    <div className="time-picker-12hr-card">
      {/* Hour Dropdown */}
      <select
        id={`${idPrefix}-hour`}
        value={hour}
        onChange={handleHourChange}
        className="time-native-select time-hour-select"
        aria-label="Hour (12-hour format)"
      >
        {hoursList.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>

      <span className="time-colon-dot" aria-hidden="true">:</span>

      {/* Minute Dropdown */}
      <select
        id={`${idPrefix}-min`}
        value={minute}
        onChange={handleMinuteChange}
        className="time-native-select time-min-select"
        aria-label="Minutes"
      >
        {minutesList.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      {/* AM / PM Segmented Toggle Buttons */}
      <div className="ampm-segmented-control" role="radiogroup" aria-label="AM or PM">
        <button
          type="button"
          role="radio"
          aria-checked={period === 'AM'}
          className={`btn-ampm-tab ${period === 'AM' ? 'active' : ''}`}
          onClick={() => handlePeriodToggle('AM')}
        >
          AM
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={period === 'PM'}
          className={`btn-ampm-tab ${period === 'PM' ? 'active' : ''}`}
          onClick={() => handlePeriodToggle('PM')}
        >
          PM
        </button>
      </div>
    </div>
  );
}

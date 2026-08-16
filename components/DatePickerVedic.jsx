'use client';

import React, { useState, useEffect } from 'react';

/**
 * Vedic Date of Birth Picker Component
 * Uses compact DD / MM / YYYY formats that fit inside every box with 100% visibility.
 */
export default function DatePickerVedic({ value = '', onChange, idPrefix = 'dob', required = false }) {
  const parseInitialDate = (valStr) => {
    if (!valStr) return { day: '', month: '', year: '' };
    
    // YYYY-MM-DD
    const isoMatch = valStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (isoMatch) {
      return { year: isoMatch[1], month: isoMatch[2], day: isoMatch[3] };
    }

    // DD-MM-YYYY
    const dmyMatch = valStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
    if (dmyMatch) {
      return { day: dmyMatch[1], month: dmyMatch[2], year: dmyMatch[3] };
    }

    return { day: '', month: '', year: '' };
  };

  const initial = parseInitialDate(value);
  const [day, setDay] = useState(initial.day);
  const [month, setMonth] = useState(initial.month);
  const [year, setYear] = useState(initial.year);

  useEffect(() => {
    if (value) {
      const parsed = parseInitialDate(value);
      setDay(parsed.day);
      setMonth(parsed.month);
      setYear(parsed.year);
    }
  }, [value]);

  const updateDate = (newDay, newMonth, newYear) => {
    if (newDay && newMonth && newYear) {
      const formattedIso = `${newYear}-${newMonth}-${newDay}`;
      if (onChange) {
        onChange(formattedIso);
      }
    } else if (onChange) {
      onChange('');
    }
  };

  const handleDayChange = (e) => {
    const newDay = e.target.value;
    setDay(newDay);
    updateDate(newDay, month, year);
  };

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setMonth(newMonth);
    updateDate(day, newMonth, year);
  };

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setYear(newYear);
    updateDate(day, month, newYear);
  };

  // Days: 01 to 31
  const daysList = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));

  // Months: Clean short 3-letter strings that fit in any box
  const monthsList = [
    { num: '01', name: 'Jan (01)' },
    { num: '02', name: 'Feb (02)' },
    { num: '03', name: 'Mar (03)' },
    { num: '04', name: 'Apr (04)' },
    { num: '05', name: 'May (05)' },
    { num: '06', name: 'Jun (06)' },
    { num: '07', name: 'Jul (07)' },
    { num: '08', name: 'Aug (08)' },
    { num: '09', name: 'Sep (09)' },
    { num: '10', name: 'Oct (10)' },
    { num: '11', name: 'Nov (11)' },
    { num: '12', name: 'Dec (12)' },
  ];

  // Years: 2026 down to 1930 (covers 96+ years)
  const currentYear = new Date().getFullYear();
  const yearsList = [];
  for (let y = currentYear; y >= 1930; y--) {
    yearsList.push(String(y));
  }

  return (
    <div className="date-picker-vedic-card">
      {/* Day Dropdown */}
      <select
        id={`${idPrefix}-day`}
        value={day}
        onChange={handleDayChange}
        className="date-native-select date-day-select"
        aria-label="Birth Day"
        required={required}
      >
        <option value="">DD</option>
        {daysList.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <span className="date-slash-dot" aria-hidden="true">/</span>

      {/* Month Dropdown */}
      <select
        id={`${idPrefix}-month`}
        value={month}
        onChange={handleMonthChange}
        className="date-native-select date-month-select"
        aria-label="Birth Month"
        required={required}
      >
        <option value="">MM</option>
        {monthsList.map((m) => (
          <option key={m.num} value={m.num}>
            {m.name}
          </option>
        ))}
      </select>

      <span className="date-slash-dot" aria-hidden="true">/</span>

      {/* Year Dropdown */}
      <select
        id={`${idPrefix}-year`}
        value={year}
        onChange={handleYearChange}
        className="date-native-select date-year-select"
        aria-label="Birth Year"
        required={required}
      >
        <option value="">YYYY</option>
        {yearsList.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}

import React, { useState } from "react";
import { Mechanic, CarInRepair } from "@/types/dealer";

const SLOT_INTERVAL = 60; 
const START_HOUR = 8;
const END_HOUR = 18;
const TIME_SLOTS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => {
  const h = START_HOUR + i;
  return `${h.toString().padStart(2, "0")}:00`;
});

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function endOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}
function clampDayBounds(day: Date) {
  const start = new Date(day);
  start.setHours(START_HOUR, 0, 0, 0);
  const end = new Date(day);
  end.setHours(END_HOUR, 0, 0, 0);
  return { start, end };
}
function isValidDate(d: Date) {
  return !Number.isNaN(d.getTime());
}
function slotIndexFrom(date: Date, day: Date) {
  const { start } = clampDayBounds(day);
  const diff = date.getTime() - start.getTime();
  const idx = Math.floor(diff / (SLOT_INTERVAL * 60 * 1000));
  return Math.max(0, Math.min(idx, TIME_SLOTS.length - 1));
}
function slotSpanBetween(startDate: Date, endDate: Date, day: Date) {
  const { start, end } = clampDayBounds(day);
  const clampedStart = new Date(Math.max(start.getTime(), startDate.getTime()));
  const clampedEnd = new Date(Math.min(end.getTime(), endDate.getTime()));
  const raw = Math.ceil((clampedEnd.getTime() - clampedStart.getTime()) / (SLOT_INTERVAL * 60 * 1000));
  return Math.max(1, raw);
}

// PROPS
type Props = {
  mechanics: Mechanic[];
  carsInRepair: CarInRepair[];
};

// COMPONENT
export const MechanicTimetable: React.FC<Props> = ({ mechanics, carsInRepair }) => {
  const [selectedDate, setSelectedDate] = useState(() => startOfDay(new Date(2024, 7, 12))); // Set to Aug 12, 2024

  // Debug: Log input data
  console.log("mechanics:", mechanics);
  console.log("carsInRepair:", carsInRepair);

  // Filter repairs for the selected day
  const dayStart = startOfDay(selectedDate);
  const dayEnd = endOfDay(selectedDate);
  const visibleRepairs = carsInRepair.filter((car) => {
    const s = new Date(car.actualStartTime);
    const e = new Date(car.estimatedCompletion);
    const isValid = isValidDate(s) && isValidDate(e);
    const overlaps = s < dayEnd && e > dayStart;
    console.log("Repair:", car, "Start:", s, "End:", e, "isValid:", isValid, "overlaps:", overlaps);
    return isValid && overlaps;
  });
  console.log("visibleRepairs:", visibleRepairs);

  const goPrevDay = () => setSelectedDate((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1));
  const goNextDay = () => setSelectedDate((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1));

  return (
    <div className="overflow-x-auto">
      {/* Date controls */}
      <div className="flex items-center gap-4 mb-4">
        <button onClick={goPrevDay} className="px-3 py-1 rounded bg-[#23232b] text-gray-200 border border-gray-700 hover:bg-[#18181b]">
          &lt;
        </button>
        <span className="font-semibold text-lg text-gray-200">
          {selectedDate.toLocaleDateString()}
        </span>
        <button onClick={goNextDay} className="px-3 py-1 rounded bg-[#23232b] text-gray-200 border border-gray-700 hover:bg-[#18181b]">
          &gt;
        </button>
      </div>

      {visibleRepairs.length === 0 && (
        <div className="text-gray-400 mb-4">No repairs scheduled for {selectedDate.toLocaleDateString()}</div>
      )}

      <table className="min-w-full border text-xs bg-[#18181b] text-white">
        <thead>
          <tr>
            <th className="border px-2 py-6 bg-[#23232b] w-20 text-gray-400">Time</th>
            {mechanics.map((mech) => (
              <th key={`head-${mech.id ?? mech.name}`} className="border px-2 py-1 bg-[#23232b] text-gray-200">
                {mech.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {(() => {
            const skipMap: Record<string | number, Record<number, boolean>> = {};
            return TIME_SLOTS.map((label, rowIdx) => (
              <tr key={`row-${label}`}>
                <td className="border px-2 py-6 font-semibold w-20 text-center text-gray-500 bg-[#23232b]">
                  {label}
                </td>

                {mechanics.map((mech) => {
                  const mechKey = mech.id ?? mech.name;

                  if (skipMap[mechKey]?.[rowIdx]) return null;

                  const repair = visibleRepairs.find((car) => {
                    const matchesMechanic = car.mechanicAssigned?.trim().toLowerCase() === mech.name?.trim().toLowerCase();
                    const s = new Date(car.actualStartTime);
                    const e = new Date(car.estimatedCompletion);
                    if (!isValidDate(s) || !isValidDate(e)) return false;
                    const { start } = clampDayBounds(selectedDate);
                    const repairStartIdx = s < start ? 0 : slotIndexFrom(s, selectedDate);
                    console.log(
                      "Mechanic:", mech.name,
                      "Car Mechanic:", car.mechanicAssigned,
                      "Matches:", matchesMechanic,
                      "rowIdx:", rowIdx,
                      "repairStartIdx:", repairStartIdx
                    );
                    return matchesMechanic && rowIdx === repairStartIdx;
                  });

                  if (repair) {
                    const s = new Date(repair.actualStartTime);
                    const e = new Date(repair.estimatedCompletion);
                    const { start } = clampDayBounds(selectedDate);
                    const startIdx = s < start ? 0 : slotIndexFrom(s, selectedDate);
                    const span = slotSpanBetween(s, e, selectedDate);

                    for (let i = 1; i < span; i++) {
                      (skipMap[mechKey] ??= {})[rowIdx + i] = true;
                    }

                    return (
                      <td
                        key={`cell-${mechKey}-${rowIdx}`}
                        className="border px-2 py-6 align-top"
                        rowSpan={span}
                        style={{ minWidth: 200, background: "#23232b" }}
                      >
                        <div className="p-2 rounded border border-blue-900 shadow-sm bg-[#23232b]">
                          <div className="font-bold text-blue-300">
                            {repair.carModel} ({repair.licensePlate})
                          </div>
                          <div className="text-xs text-gray-400">{repair.status}</div>
                          <div className="text-xs text-gray-300">Service: {repair.serviceType}</div>
                          <div className="text-xs text-gray-500">
                            Start: {new Date(repair.actualStartTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                          <div className="text-xs text-gray-500">
                            End: {new Date(repair.estimatedCompletion).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                          {repair.notes && (
                            <div className="text-xs text-gray-500">{repair.notes}</div>
                          )}
                        </div>
                      </td>
                    );
                  }

                  return (
                    <td key={`empty-${mechKey}-${rowIdx}`} className="border px-2 py-6 bg-[#18181b]">
                      <span className="text-gray-700"> </span>
                    </td>
                  );
                })}
              </tr>
            ));
          })()}
        </tbody>
      </table>
    </div>
  );
};
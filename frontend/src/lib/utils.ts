import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(date: Date | string) {
  const d = new Date(date);
  const day = d.getDate();
  const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 
                     'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const monthName = monthNames[d.getMonth()];
  const year = d.getFullYear();

  let hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes.toString().padStart(2, '0');

  return {
    date: `${day} ${monthName} ${year}`,
    time: `${hours}:${minutesStr} ${ampm}`
  };
}
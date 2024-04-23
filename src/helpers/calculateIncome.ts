/**
 * Calculates the sum of donations depending on status.
 * @param {array} donations The array of donations.
 * @param {string} status The staus for calculations.
 * @returns {number} The sum of the two numbers.
*/

import { IncomeStatuses } from "@/enums/IncomeStatuses";
import { Donation } from "@/types/Donation";

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();

export const calculateIncome = (donations: Donation[], status: IncomeStatuses) => {
  return donations.filter(donation => {
    if (status === IncomeStatuses.month) {
      return (
        new Date(donation.createdAt).getMonth() === currentMonth
        && new Date(donation.createdAt).getFullYear() === currentYear
      );
    }

    if (status === IncomeStatuses.year) {
      return new Date(donation.createdAt).getFullYear() === currentYear;
    }

    return true;
  }).reduce(( accumulator, donation ) => Number(accumulator) + Number(donation.sum), 0);
}
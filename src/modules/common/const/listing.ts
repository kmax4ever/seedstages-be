export enum ListingDuration {
  ONE_HOUR = 'one_hour',
  SIX_HOURS = 'six_hours',
  TWELVE_HOURS = 'twelve_hours',
  ONE_DAY = 'one_day',
  THREE_DAYS = 'three_days',
  SEVEN_DAYS = 'seven_days',
  ONE_MONTH = 'one_month',
  THREE_MONTHS = 'three_months',
  SIX_MONTHS = 'six_months'
}

export const DURATION_UNIT = {
  [ListingDuration.ONE_HOUR]: {
    AMOUNT: 1,
    UNIT: 'hour'
  },
  [ListingDuration.SIX_HOURS]: {
    AMOUNT: 6,
    UNIT: 'hour'
  },
  [ListingDuration.TWELVE_HOURS]: {
    AMOUNT: 12,
    UNIT: 'hour'
  },
  [ListingDuration.ONE_DAY]: {
    AMOUNT: 1,
    UNIT: 'day'
  },
  [ListingDuration.THREE_DAYS]: {
    AMOUNT: 3,
    UNIT: 'day'
  },
  [ListingDuration.SEVEN_DAYS]: {
    AMOUNT: 7,
    UNIT: 'day'
  },
  [ListingDuration.ONE_MONTH]: {
    AMOUNT: 1,
    UNIT: 'month'
  },
  [ListingDuration.THREE_MONTHS]: {
    AMOUNT: 3,
    UNIT: 'month'
  },
  [ListingDuration.SIX_MONTHS]: {
    AMOUNT: 6,
    UNIT: 'month'
  }
}

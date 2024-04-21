export interface Response {
  rates: {
    TON: {
      prices: {
        TON: number;
        USD: number;
      },
      diff_24h: {
        TON: string;
        USD: string;
      },
      diff_7d: {
        TON: string;
        USD: string;
      },
      diff_30d: {
        TON: string;
        USD: string;
      }
    }
  }
}
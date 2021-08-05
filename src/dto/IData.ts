export interface IData {
  destination_addresses: string[];
  error_message?: string;
  origin_addresses: string[];
  rows: [{
    elements: [
      {
        distance: {
          text: string;
          value: number;
        },
        duration: {
          text: string;
          value: number;
        },
        duration_in_traffic: {
          text: string;
          value: number;
        },
        status: string;
      }
    ]
  }];
  status: string;
}
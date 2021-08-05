export interface IResponse {
  destinationAddresses: string[];
  originAddresses: string[];
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
        status: string;
      }
    ]
  }];
}
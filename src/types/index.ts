export interface IVisitor {
  uuid: string;
  markURLs: string[];
  name: string;
  ip: string;
  visitTime: Date;
  location: {
    country: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  device: {
    browser: string;
    os: string;
    type: string; // Desktop, Mobile, etc.
    screenResolution: string;
  };
  behavior: {
    referrer: string;
    timeSpent: number; // in seconds
    pagesVisited: string[];
  };
  visitorRank: number;
}
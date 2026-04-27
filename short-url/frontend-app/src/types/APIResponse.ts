export type URLRecord = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  urlCode: string;
  updatedAt: string;
  createdAt: string;
};

export type APIResponse = {
  message: string;
  data?: string | URLRecord;
};

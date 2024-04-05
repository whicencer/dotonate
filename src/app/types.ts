export interface ResponseAuthData {
  data: {
    authData: {
      authDate: string;
      hash: string;
      queryId: string;
      user: {
        allowsWriteToPm: boolean;
        firstName: string;
        id: number;
        languageCode: string;
        lastName: string;
        username: string;
      }
    },
    userExists: boolean
  };
  message: string;
}
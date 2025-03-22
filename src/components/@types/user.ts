enum useRole {
  ASSETPROVIDER = "assetProvider",
  CLIENT = "client",
}
export interface User {
  name: string;
  address: string;
  role: useRole;
}

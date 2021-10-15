export class UserAuth {
  token: string;
  expiresIn: number;
  userId: string;
  username: string;
}

export class CustomData {
  name: string;
  fullName: string;
  avatarUrl: string;
  email: string;
  customerID: string;
  jobTitle: string;
  roles: string[];
}

export class User {
  userId: string;
  username: string;
  password: string;
  customData: CustomData;
  createdBy: string;
}


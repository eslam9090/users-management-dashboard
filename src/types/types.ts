export interface User {
  login: { uuid: string };
  name: { title: string; first: string; last: string };
  email: string;
  phone: string;
  picture: { large: string; medium: string; thumbnail: string };
  location: {
    street: { number: number; name: string };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  currentPage: number;
}

export interface ProfileState {
  name: string;
  phone: string;
  jobTitle: string;
  yearsOfExperience: string;
  address: string;
  workingHours: string;
  loading: boolean;
  success: boolean;
}

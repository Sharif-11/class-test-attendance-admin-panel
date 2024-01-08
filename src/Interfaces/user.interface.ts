export interface Teacher {
  teacherId: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  specialization?: string;
  role: "teacher";
  profileImage: string;
  deptHead: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface LoggedInUser extends Teacher {
  token: string;
}
export interface UserState {
  teacher: LoggedInUser | null;
}

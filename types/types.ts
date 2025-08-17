// User model
export interface User {
  id: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  otpCodes: Otp[];
  fullName?: string;
  profilePic?: string;
  bio?: string;
  accounts: Account[];
  sessions: Session[];
  goals: Goal[];
  skills: Skill[];
  goalProgress: GoalProgress[];
  skillProgress: SkillProgress[];
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
}

// Account model
export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  createdAt: string;
  updatedAt: string;
}

// Session model
export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: string;
  createdAt: string;
  updatedAt: string;
}

// VerificationToken model
export interface VerificationToken {
  id: string;
  identifier: string;
  token: string;
  expires: string;
}

// Otp model
export interface Otp {
  id: string;
  userId: string;
  code: string;
  sentAt: string;
  expiresAt: string;
  isVerified: boolean;
}

// Goal model
export interface Goal {
  id: string;
  userId: string;
  user: User;
  title: string;
  description?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
  goalSkills: GoalSkill[];
  progress: GoalProgress[];
}

// Skill model
export interface Skill {
  id: string;
  userId: string;
  user: User;
  title: string;
  description?: string;
  requiredPoints?: number;
  createdAt: string;
  goalSkills: GoalSkill[];
  progress: SkillProgress[];
}

// GoalSkill model
export interface GoalSkill {
  id: string;
  goalId: string;
  skillId: string;
  goal: Goal;
  skill: Skill;
}

// GoalProgress model
export interface GoalProgress {
  id: string;
  userId: string;
  user: User;
  goalId: string;
  goal: Goal;
  date: string;
  rating: number;
  note?: string;
  createdAt: string;
}

// SkillProgress model
export interface SkillProgress {
  id: string;
  userId: string;
  user: User;
  skillId: string;
  skill: Skill;
  date: string;
  rating: number;
  note?: string;
  createdAt: string;
}

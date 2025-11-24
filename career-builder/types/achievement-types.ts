/**
 * 성과(Achievement) 관련 타입 정의
 */

/**
 * 성과 섹션 종류
 */
export enum AchievementSectionKind {
  CUSTOM = 'CUSTOM',
  BACKGROUND = 'BACKGROUND',
  CHALLENGE = 'CHALLENGE',
  ACTION = 'ACTION',
  RESULT = 'RESULT',
  LEARNING = 'LEARNING',
}

/**
 * 성과 상태
 */
export enum AchievementStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

/**
 * 성과 섹션 (achievement_sections 테이블)
 */
export interface AchievementSection {
  id?: string;
  achievementId?: string;
  kind: AchievementSectionKind | string;
  title: string;
  content: string;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 성과 (achievements 테이블)
 */
export interface Achievement {
  id?: string;
  userId?: string;
  title: string;
  orgName?: string;
  durationStart: string;
  durationEnd?: string;
  impactSummary?: string;
  status?: AchievementStatus | string;
  tags?: string;
  createdAt?: string;
  updatedAt?: string;
  sections?: AchievementSection[];
}

/**
 * 성과 등록 폼 데이터
 */
export interface AchievementFormData {
  title: string;
  orgName: string;
  durationStart: string;
  durationEnd: string;
  impactSummary: string;
  tags: string;
  sections: AchievementSection[];
}


# CareerBuilder Frontend

AI 기반 커리어 빌더 서비스의 프론트엔드 애플리케이션입니다.

## 기술 스택

- **Framework**: Nuxt 4 (Vue 3)
- **Rendering**: Client-Side Rendering (CSR)
- **UI Library**: Vuetify 3
- **State Management**: Pinia
- **Language**: TypeScript
- **Styling**: SCSS
- **Package Manager**: pnpm

## 시작하기

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

개발 서버가 `http://localhost:3000`에서 실행됩니다.

### 빌드

```bash
pnpm build
```

### 프로덕션 미리보기

```bash
pnpm preview
```

## 프로젝트 구조

```
CareerBuilder_FE/
├── app/                 # 앱 진입점
│   └── app.vue
├── assets/              # 정적 자산 (스타일, 이미지 등)
│   └── styles/
├── components/          # Vue 컴포넌트
├── composables/         # Composition API 함수들
├── layouts/             # 레이아웃 컴포넌트
├── pages/               # 페이지 컴포넌트 (자동 라우팅)
├── plugins/             # Nuxt 플러그인
├── public/              # Public 파일
├── stores/              # Pinia 스토어
├── types/               # TypeScript 타입 정의
└── nuxt.config.ts       # Nuxt 설정 파일
```

## 주요 기능

- ✅ Client-Side Rendering (CSR)
- ✅ Vuetify 3 통합
- ✅ Pinia 상태 관리
- ✅ TypeScript 지원
- ✅ ESLint + Prettier
- ✅ SCSS 스타일링
- ✅ 자동 라우팅

## 개발 가이드

### 컴포넌트 생성

컴포넌트는 `components/` 디렉터리에 생성하면 자동으로 import됩니다.

```vue
<!-- components/MyComponent.vue -->
<template>
  <div>My Component</div>
</template>

<script setup lang="ts">
// 컴포넌트 로직
</script>
```

### 페이지 생성

`pages/` 디렉터리에 파일을 생성하면 자동으로 라우팅됩니다.

```vue
<!-- pages/about.vue -->
<template>
  <div>About Page</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
});
</script>
```

### Pinia 스토어 사용

```typescript
// stores/myStore.ts
import { defineStore } from 'pinia';

export const useMyStore = defineStore('myStore', {
  state: () => ({
    data: null,
  }),
  actions: {
    async fetchData() {
      // 데이터 가져오기
    },
  },
});
```

## 환경 변수

`.env` 파일을 생성하여 환경 변수를 설정할 수 있습니다. `.env.example` 파일을 참고하세요.

```bash
cp .env.example .env
```

## 라이선스

Private

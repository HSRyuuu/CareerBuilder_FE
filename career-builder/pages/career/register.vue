<template>
  <div class="career-register-page">
    <!-- 메인 콘텐츠 -->
    <div class="page-header">
      <h1 class="page-title">이력 등록</h1>
      <p class="page-subtitle">새로운 이력을 등록하고 관리하세요</p>
    </div>

    <div class="form-container">
      <!-- 기본 정보 섹션 -->
      <section class="form-section">
        <div class="section-header">
          <div
            class="section-icon"
            style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%)"
          >
            <v-icon color="white" size="small">mdi-account</v-icon>
          </div>
          <h2 class="section-title">기본 정보</h2>
        </div>
        <div class="form-grid">
          <div class="form-field">
            <label class="field-label">이름 *</label>
            <input
              v-model="formData.name"
              type="text"
              class="field-input"
              placeholder="이름을 입력하세요"
            />
          </div>
          <div class="form-field">
            <label class="field-label">이메일 *</label>
            <input
              v-model="formData.email"
              type="email"
              class="field-input"
              placeholder="email@example.com"
            />
          </div>
          <div class="form-field">
            <label class="field-label">연락처</label>
            <input
              v-model="formData.phone"
              type="tel"
              class="field-input"
              placeholder="010-0000-0000"
            />
          </div>
          <div class="form-field">
            <label class="field-label">직무</label>
            <input
              v-model="formData.position"
              type="text"
              class="field-input"
              placeholder="예: 프론트엔드 개발자"
            />
          </div>
        </div>
      </section>

      <!-- 경력 사항 섹션 -->
      <section class="form-section">
        <div class="section-header">
          <div
            class="section-icon"
            style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
          >
            <v-icon color="white" size="small">mdi-briefcase</v-icon>
          </div>
          <h2 class="section-title">경력 사항</h2>
          <button class="add-btn" @click="addCareer">
            <v-icon size="small">mdi-plus</v-icon>
            추가
          </button>
        </div>

        <div v-for="(career, index) in formData.careers" :key="index" class="career-item">
          <div class="item-header">
            <span class="item-number">{{ index + 1 }}</span>
            <button class="delete-btn" @click="removeCareer(index)">
              <v-icon size="small">mdi-delete</v-icon>
            </button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label class="field-label">회사명</label>
              <input
                v-model="career.company"
                type="text"
                class="field-input"
                placeholder="회사명을 입력하세요"
              />
            </div>
            <div class="form-field">
              <label class="field-label">직책</label>
              <input
                v-model="career.role"
                type="text"
                class="field-input"
                placeholder="직책을 입력하세요"
              />
            </div>
            <div class="form-field">
              <label class="field-label">시작일</label>
              <input v-model="career.startDate" type="month" class="field-input" />
            </div>
            <div class="form-field">
              <label class="field-label">종료일</label>
              <input v-model="career.endDate" type="month" class="field-input" />
            </div>
            <div class="form-field full-width">
              <label class="field-label">업무 내용</label>
              <textarea
                v-model="career.description"
                class="field-textarea"
                placeholder="담당했던 업무 내용을 입력하세요"
                rows="4"
              ></textarea>
            </div>
          </div>
        </div>
      </section>

      <!-- 학력 사항 섹션 -->
      <section class="form-section">
        <div class="section-header">
          <div
            class="section-icon"
            style="background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)"
          >
            <v-icon color="white" size="small">mdi-school</v-icon>
          </div>
          <h2 class="section-title">학력 사항</h2>
          <button class="add-btn" @click="addEducation">
            <v-icon size="small">mdi-plus</v-icon>
            추가
          </button>
        </div>

        <div v-for="(education, index) in formData.educations" :key="index" class="career-item">
          <div class="item-header">
            <span class="item-number">{{ index + 1 }}</span>
            <button class="delete-btn" @click="removeEducation(index)">
              <v-icon size="small">mdi-delete</v-icon>
            </button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label class="field-label">학교명</label>
              <input
                v-model="education.school"
                type="text"
                class="field-input"
                placeholder="학교명을 입력하세요"
              />
            </div>
            <div class="form-field">
              <label class="field-label">전공</label>
              <input
                v-model="education.major"
                type="text"
                class="field-input"
                placeholder="전공을 입력하세요"
              />
            </div>
            <div class="form-field">
              <label class="field-label">학위</label>
              <input
                v-model="education.degree"
                type="text"
                class="field-input"
                placeholder="학사, 석사 등"
              />
            </div>
            <div class="form-field">
              <label class="field-label">졸업년도</label>
              <input
                v-model="education.graduationYear"
                type="number"
                class="field-input"
                placeholder="2024"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- 기술 스택 섹션 -->
      <section class="form-section">
        <div class="section-header">
          <div
            class="section-icon"
            style="background: linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%)"
          >
            <v-icon color="white" size="small">mdi-code-tags</v-icon>
          </div>
          <h2 class="section-title">기술 스택</h2>
        </div>
        <div class="form-field">
          <label class="field-label">기술 스택</label>
          <textarea
            v-model="formData.skills"
            class="field-textarea"
            placeholder="예: Vue.js, React, TypeScript, Node.js (쉼표로 구분)"
            rows="4"
          ></textarea>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

definePageMeta({
  layout: 'default',
});

interface Career {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  school: string;
  major: string;
  degree: string;
  graduationYear: number | null;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  careers: Career[];
  educations: Education[];
  skills: string;
}

const formData = ref<FormData>({
  name: '',
  email: '',
  phone: '',
  position: '',
  careers: [
    {
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ],
  educations: [
    {
      school: '',
      major: '',
      degree: '',
      graduationYear: null,
    },
  ],
  skills: '',
});

const addCareer = () => {
  formData.value.careers.push({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    description: '',
  });
};

const removeCareer = (index: number) => {
  if (formData.value.careers.length > 1) {
    formData.value.careers.splice(index, 1);
  }
};

const addEducation = () => {
  formData.value.educations.push({
    school: '',
    major: '',
    degree: '',
    graduationYear: null,
  });
};

const removeEducation = (index: number) => {
  if (formData.value.educations.length > 1) {
    formData.value.educations.splice(index, 1);
  }
};

const handleSave = () => {
  console.log('저장:', formData.value);
  // TODO: 저장 로직 구현
  alert('저장되었습니다!');
};
</script>

<style lang="scss" scoped>
@use '@/styles/pages/career-register-page.scss';
</style>

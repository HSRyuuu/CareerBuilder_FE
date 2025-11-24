<template>
  <div class="career-register-page">
    <!-- 메인 콘텐츠 -->
    <div class="page-header">
      <h1 class="page-title">성과 등록</h1>
      <p class="page-subtitle">새로운 성과를 등록하고 관리하세요</p>
    </div>

    <div class="page-layout">
      <!-- 왼쪽: 메인 폼 영역 (4) -->
      <div class="form-container">
        <!-- 기본 정보 섹션 -->
        <section class="form-section">
          <div class="section-header">
            <div
              class="section-icon"
              style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%)"
            >
              <v-icon color="white" size="small">mdi-trophy</v-icon>
            </div>
            <h2 class="section-title">기본 정보</h2>
          </div>
          <div class="form-grid">
            <div class="form-field full-width">
              <label class="field-label">제목 *</label>
              <Input
                v-model="formData.title"
                placeholder="성과 제목을 입력하세요"
                :size="CommonSize.Medium"
              />
            </div>

            <div class="form-field">
              <label class="field-label">시작일 *</label>
              <DatePicker v-model="formData.durationStart" type="date" />
            </div>
            <div class="form-field">
              <label class="field-label">종료일</label>
              <DatePicker v-model="formData.durationEnd" type="date" />
            </div>

            <div class="form-field full-width">
              <label class="field-label">소속</label>
              <Input
                v-model="formData.orgName"
                placeholder="회사명 또는 조직명"
                :size="CommonSize.Medium"
              />
            </div>

            <div class="form-field full-width">
              <label class="field-label">핵심 성과 *</label>
              <TextArea
                v-model="formData.impactSummary"
                placeholder="이 성과의 핵심 내용과 영향을 간략히 설명하세요"
                :rows="4"
              />
            </div>
          </div>
        </section>

        <!-- 스킬 섹션 (하드코딩, 수정 불가) -->
        <section class="form-section">
          <div class="section-header">
            <div
              class="section-icon"
              style="background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)"
            >
              <v-icon color="white" size="small">mdi-code-tags</v-icon>
            </div>
            <h2 class="section-title">스킬</h2>
          </div>
          <div class="form-grid">
            <div class="form-field full-width">
              <Input
                v-model="formData.skills"
                placeholder="관련 스킬을 쉼표로 구분하여 입력하세요 (예: Vue.js, TypeScript, Node.js)"
                :size="CommonSize.Medium"
              />
            </div>
          </div>
        </section>

        <!-- 상세 섹션들 (개별 form-section으로 구성) -->
        <section
          v-for="(section, index) in formData.sections"
          :key="section.tempId"
          class="form-section"
        >
          <div class="section-header">
            <div
              class="section-icon"
              style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
            >
              <v-icon color="white" size="small">mdi-text-box-multiple</v-icon>
            </div>

            <!-- 제목과 편집 버튼 그룹 -->
            <div class="section-title-group">
              <!-- 편집 모드가 아닐 때 -->
              <template v-if="!section.isEditingTitle">
                <h2 class="section-title">
                  {{ section.title || `항목 ${index + 1}` }}
                </h2>
                <button class="edit-btn-header" @click="startEditSectionTitle(index)">
                  <v-icon size="small">mdi-pencil</v-icon>
                </button>
              </template>

              <!-- 편집 모드일 때 -->
              <template v-else>
                <div class="section-title-edit">
                  <Input
                    v-model="section.tempTitle!"
                    placeholder="항목 제목을 입력하세요"
                    :size="CommonSize.Small"
                    class="section-title-input"
                  />
                  <button class="edit-action-btn apply" @click="applySectionTitle(index)">
                    <v-icon size="small">mdi-check</v-icon>
                  </button>
                  <button class="edit-action-btn cancel" @click="cancelSectionTitleEdit(index)">
                    <v-icon size="small">mdi-close</v-icon>
                  </button>
                </div>
              </template>
            </div>

            <button class="delete-btn-header" @click="removeSection(index)">
              <v-icon size="small">mdi-delete</v-icon>
            </button>
          </div>

          <div class="form-grid">
            <div class="form-field full-width">
              <label class="field-label">내용</label>
              <TextArea v-model="section.content" placeholder="상세 내용을 입력하세요" :rows="6" />
            </div>
          </div>
        </section>

        <!-- 빈 상태 -->
        <div v-if="formData.sections.length === 0" class="empty-state-standalone">
          <v-icon size="large" color="#9ca3af">mdi-text-box-plus</v-icon>
          <p class="empty-state-text">섹션을 추가하여 성과를 구체적으로 설명해보세요</p>
        </div>

        <!-- 액션 버튼 -->
        <div class="form-actions">
          <Button :variant="ButtonVariant.Secondary" :size="CommonSize.Large" @click="handleCancel">
            취소
          </Button>
          <Button :variant="ButtonVariant.Primary" :size="CommonSize.Large" @click="handleSave">
            저장
          </Button>
        </div>
      </div>

      <!-- 오른쪽: 액션 사이드바 (1) -->
      <aside class="action-sidebar">
        <!-- 섹션 관리 영역 -->
        <div class="sidebar-section">
          <div class="sidebar-header">
            <h3 class="sidebar-title">편집</h3>
          </div>

          <!-- 항목 추가 버튼 -->
          <Button
            :variant="ButtonVariant.Primary"
            :size="CommonSize.Medium"
            class="sidebar-add-btn"
            @click="addSection"
          >
            <v-icon size="small">mdi-plus</v-icon>
            항목 추가
          </Button>

          <!-- 섹션 목록 -->
          <div class="sidebar-sections-list">
            <!-- 고정 섹션 (수정 불가) -->
            <div class="sidebar-section-item sidebar-section-fixed">
              <div class="sidebar-section-info">
                <v-icon size="small" color="#2563eb">mdi-trophy</v-icon>
                <span class="sidebar-section-title">기본 정보</span>
              </div>
            </div>

            <div class="sidebar-section-item sidebar-section-fixed">
              <div class="sidebar-section-info">
                <v-icon size="small" color="#3b82f6">mdi-code-tags</v-icon>
                <span class="sidebar-section-title">스킬</span>
              </div>
            </div>

            <!-- 구분선 -->
            <div v-if="formData.sections.length > 0" class="sidebar-divider" />

            <!-- 동적 섹션 (순서 변경 가능) -->
            <VueDraggableNext
              v-model="formData.sections"
              tag="div"
              handle=".sidebar-section-drag-handle"
              :animation="200"
              ghost-class="sidebar-section-ghost"
              chosen-class="sidebar-section-chosen"
              drag-class="sidebar-section-drag"
              @end="updateSortOrder"
            >
              <div
                v-for="(section, index) in formData.sections"
                :key="section.tempId"
                class="sidebar-section-item"
              >
                <div class="sidebar-section-drag-handle">
                  <v-icon size="small" color="#6b7280">mdi-drag-vertical</v-icon>
                </div>
                <div class="sidebar-section-info">
                  <span class="sidebar-section-number">{{ index + 1 }}</span>
                  <span class="sidebar-section-title">
                    {{ section.title || `항목 ${index + 1}` }}
                  </span>
                </div>
                <button class="sidebar-section-delete" @click="removeSection(index)">
                  <v-icon size="small">mdi-delete-outline</v-icon>
                </button>
              </div>
            </VueDraggableNext>
          </div>
        </div>

        <!-- 미래 확장 공간 -->
        <!-- <div class="sidebar-section">
          <div class="sidebar-placeholder">
            <v-icon size="small" color="#d1d5db">mdi-dots-horizontal</v-icon>
            <p class="sidebar-placeholder-text">추가 기능 예정</p>
          </div>
        </div> -->
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import Button from '@/components/atoms/Button/Button.vue';
import Input from '@/components/atoms/Input/Input.vue';
import TextArea from '@/components/atoms/TextArea/TextArea.vue';
import DatePicker from '@/components/atoms/DatePicker/DatePicker.vue';
import { ButtonVariant, CommonSize } from '@/constants/enums/style-enum';
import type { AchievementSection } from '@/types/achievement-types';

const toast = useToast();

definePageMeta({
  layout: 'default',
});

interface FormSection extends AchievementSection {
  tempId: string; // 프론트엔드에서 임시로 사용할 ID
  isEditingTitle?: boolean; // 제목 편집 모드 여부
  tempTitle?: string; // 편집 중인 임시 제목 (수정 전 원본 저장)
}

interface FormData {
  title: string;
  orgName: string;
  durationStart: string;
  durationEnd: string;
  impactSummary: string;
  skills: string;
  sections: FormSection[];
}

const formData = ref<FormData>({
  title: '',
  orgName: '',
  durationStart: '',
  durationEnd: '',
  impactSummary: '',
  skills: '',
  sections: [],
});

let sectionCounter = 0;

const addSection = () => {
  formData.value.sections.push({
    tempId: `section_${Date.now()}_${sectionCounter++}`,
    kind: 'CUSTOM',
    title: '',
    content: '',
    sortOrder: formData.value.sections.length,
    isEditingTitle: false,
    tempTitle: '',
  });
};

const removeSection = (index: number) => {
  formData.value.sections.splice(index, 1);
  updateSortOrder();
};

// 섹션 순서 업데이트
const updateSortOrder = () => {
  formData.value.sections.forEach((section, index) => {
    section.sortOrder = index;
  });
};

// 섹션 제목 편집 시작
const startEditSectionTitle = (index: number) => {
  const section = formData.value.sections[index];
  section.tempTitle = section.title || `항목 ${index + 1}`; // 수정 전 원본 저장
  section.isEditingTitle = true;
};

// 섹션 제목 적용
const applySectionTitle = (index: number) => {
  const section = formData.value.sections[index];
  section.title = section.tempTitle || ''; // tempTitle을 실제 title로 적용
  section.tempTitle = '';
  section.isEditingTitle = false;
};

// 섹션 제목 편집 취소
const cancelSectionTitleEdit = (index: number) => {
  const section = formData.value.sections[index];
  section.tempTitle = '';
  section.isEditingTitle = false;
};

const handleSave = () => {
  // 필수 필드 검증
  if (!formData.value.title.trim()) {
    toast.error('제목을 입력해주세요.');
    return;
  }
  if (!formData.value.durationStart) {
    toast.error('시작일을 입력해주세요.');
    return;
  }
  if (!formData.value.impactSummary.trim()) {
    toast.error('핵심 성과를 입력해주세요.');
    return;
  }

  console.log('저장할 데이터:', formData.value);
  // TODO: API 호출하여 저장
  toast.success('성과가 저장되었습니다!');
};

const handleCancel = () => {
  // 폼 초기화 또는 이전 페이지로 이동
  window.history.back();
};
</script>

<style lang="scss" scoped>
@use '@/styles/pages/career-register-page.scss';
</style>

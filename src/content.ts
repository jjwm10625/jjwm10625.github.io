export const content = {
  name: "Cho Youngseo",
  koreanName: "영서",
  role: "iOS Developer",
  intro: "사용자 경험을 고민하는\niOS 개발자",
  profile: {
    headline: "Zero에서 시작해,\n결과까지 완성합니다.",
    paragraphs: [
      "안녕하세요, iOS 개발자 조영서입니다. 자연스러운 사용 경험과 읽기 좋은 코드를 고민합니다.",
    ],
    photo: null as string | null,
    details: [
      { label: "이름", value: "영서 / Cho Youngseo" },
      { label: "직무", value: "iOS Developer" },
      { label: "기술", value: "Swift · UIKit · SwiftUI · Combine · Tuist" },
      { label: "관심", value: "사용자 경험 · UI 인터랙션 · 유지보수성" },
    ],
    experience: [] as { period: string; organization: string; role: string }[],
  },
  projects: [
    {
      title: "하이링구얼",
      icon: "/앱아이콘.svg",
      type: "iOS APPLICATION",
      description: "영어 일기, 기록, AI 피드백",
      detail: "하이링구얼: 영어 일기, 기록, AI 피드백",
    },
    {
      title: "Project 02",
      type: "SELECTED WORK",
      description: "다음 이야기를 준비하고 있습니다.",
      detail: "프로젝트 설명 · 역할 · 성과를 추가해 주세요.",
    },
  ],
  contact: null as string | null,
  contactPreview: [
    { label: "Email", value: "youngseo@example.com", href: null, sample: true },
    { label: "GitHub", value: "github.com/jjwm10625", href: "https://github.com/jjwm10625", sample: false },
  ],
};

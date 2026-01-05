import { renderCurrentDate } from './utils/date.js';
import { initSubscriptionBadge } from './utils/subscription/subscriptionController.js';
import { initSubscriptionTabs } from './utils/subscription/subscriptionTabController.js';
import { initSubscriptionStore } from './utils/subscription/subscriptionStore.js';
import { initViewTabs } from './utils/viewTabController.js';
import { initList } from './utils/list/listController.js';
import { initRollingTabs } from './rolling/rolling.js';


function initApp() {
  // 구독 언론사 저장
  initSubscriptionStore();

  // 날짜 렌더링
  renderCurrentDate('current-date');

  // 구독 언론사 수 뱃지 개수
  initSubscriptionBadge({
    badgeSelector: '.badge'
  });

  // 전체 언론사 & 구독 언론사 전환
  initSubscriptionTabs();

  // 리스트 & 그리드 전환
  initViewTabs({
    listId: 'list-view',
    gridId: 'grid-view'
  });

  // 초기 리스트 표시
  initList({
    viewId: 'newsGrid',
    prevBtnId: 'prevBtn', // 이전 페이지 버튼
    nextBtnId: 'nextBtn'  // 다음 페이지 버튼
  });

  // 최신 기사 롤링 탭
  initRollingTabs();
}

initApp();
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```
dding
├─ README.md
├─ api
│  └─ ohaasa.ts
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ src
│  ├─ App.css
│  ├─ App.tsx
│  ├─ assets
│  │  ├─ enrichments
│  │  │  ├─ high_enrichments.png
│  │  │  ├─ ingredients
│  │  │  │  ├─ AmethystBlock.png
│  │  │  │  ├─ CobbleStoneBundle.png
│  │  │  │  ├─ CooperBlock.png
│  │  │  │  ├─ Corum.png
│  │  │  │  ├─ DeepslateStoneBundle.png
│  │  │  │  ├─ DiamondBlock.png
│  │  │  │  ├─ GoldBlock.png
│  │  │  │  ├─ IronBlock.png
│  │  │  │  ├─ LapisLazuliBlock.png
│  │  │  │  ├─ Lifton.png
│  │  │  │  ├─ RedStoneBlock.png
│  │  │  │  └─ Serent.png
│  │  │  ├─ low_enrichments.png
│  │  │  └─ middle_enrichments.png
│  │  ├─ food
│  │  │  ├─ common
│  │  │  │  ├─ garlic_cake.png
│  │  │  │  ├─ onion_rings.png
│  │  │  │  └─ tomato_spaghetti.png
│  │  │  ├─ epic
│  │  │  │  ├─ deep_cream_pane.png
│  │  │  │  ├─ tomato_lasagna.png
│  │  │  │  └─ triple_beef_rib_skewers.png
│  │  │  ├─ ingredients
│  │  │  │  ├─ base
│  │  │  │  │  ├─ garlic_base.png
│  │  │  │  │  ├─ onion_base.png
│  │  │  │  │  └─ tomato_base.png
│  │  │  │  ├─ basics
│  │  │  │  │  ├─ butter_piece.png
│  │  │  │  │  ├─ cheese_piece.png
│  │  │  │  │  ├─ cooking_milk.png
│  │  │  │  │  ├─ cooking_salt.png
│  │  │  │  │  ├─ oil.png
│  │  │  │  │  └─ wheat_dough.png
│  │  │  │  ├─ crops
│  │  │  │  │  ├─ beet_bundle.png
│  │  │  │  │  ├─ carrot_bundle.png
│  │  │  │  │  ├─ potato_bundle.png
│  │  │  │  │  ├─ pumpkin_bundle.png
│  │  │  │  │  ├─ sugar_cube.png
│  │  │  │  │  ├─ sweet_berries_bundle.png
│  │  │  │  │  └─ watermelon_bundle.png
│  │  │  │  ├─ fruits
│  │  │  │  │  ├─ coconut.png
│  │  │  │  │  └─ pineapple.png
│  │  │  │  └─ meats
│  │  │  │     ├─ beef_ribs.png
│  │  │  │     ├─ beef_sirloin.png
│  │  │  │     ├─ chicken.png
│  │  │  │     ├─ chicken_breast.png
│  │  │  │     ├─ chicken_drumstick.png
│  │  │  │     ├─ lamb_ribs.png
│  │  │  │     ├─ lamb_shoulder.png
│  │  │  │     ├─ mutton.png
│  │  │  │     ├─ pork.png
│  │  │  │     ├─ pork_belly.png
│  │  │  │     ├─ pork_shoulder.png
│  │  │  │     └─ steak.png
│  │  │  ├─ normal
│  │  │  │  ├─ garlic_lamb_rib_hotdog.png
│  │  │  │  ├─ pork_belly_tomato_stew.png
│  │  │  │  ├─ roast_chicken_pie.png
│  │  │  │  ├─ sweet_cereals.png
│  │  │  │  └─ triple_flavor_ice_cream.png
│  │  │  └─ rare
│  │  │     ├─ onion_soup.png
│  │  │     ├─ pork_belly_steamed_with_herbs.png
│  │  │     ├─ sweet_chicken_hamburger.png
│  │  │     └─ tomato_pineapple_pizza.png
│  │  └─ hero
│  │     └─ dding_hero.png
│  ├─ common
│  │  └─ components
│  │     └─ OhaasaSpinner.tsx
│  ├─ constants
│  │  ├─ enhancementData.ts
│  │  ├─ foodPriceData.ts
│  │  ├─ foodRecipeData.ts
│  │  └─ zodiacMap.ts
│  ├─ hooks
│  │  └─ useOhaasa.ts
│  ├─ index.css
│  ├─ layout
│  │  ├─ AppLayout.tsx
│  │  └─ components
│  │     └─ Header.tsx
│  ├─ lib
│  │  └─ supabase.ts
│  ├─ main.tsx
│  ├─ models
│  │  ├─ Food.ts
│  │  └─ User.ts
│  ├─ pages
│  │  ├─ Cooking
│  │  │  ├─ CookingPage.tsx
│  │  │  └─ components
│  │  │     ├─ FoodPriceChart.tsx
│  │  │     └─ FoodRecipe.tsx
│  │  ├─ Enhance
│  │  │  ├─ EnhancePage.tsx
│  │  │  └─ components
│  │  │     ├─ EnhanceTable.tsx
│  │  │     ├─ Enrichments.tsx
│  │  │     └─ ToolEffectTable.tsx
│  │  ├─ Landing
│  │  │  ├─ LandingPage.tsx
│  │  │  └─ components
│  │  │     ├─ Hero.tsx
│  │  │     ├─ NoticeBoard.tsx
│  │  │     ├─ OhaasaRanking.tsx
│  │  │     └─ SpeechBubble.tsx
│  │  ├─ Login
│  │  │  └─ LoginPage.tsx
│  │  └─ Register
│  │     └─ RegisterPage.tsx
│  ├─ routes
│  │  ├─ AppRouter.tsx
│  │  ├─ PrivateRouter.tsx
│  │  └─ PublicRouter.tsx
│  └─ stores
│     └─ foodStore.ts
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```

## 업데이트 내역

### 2026년 01월 26일

- 요리 리딩방 - 띵타이쿤 요리 조합법 및 가격 차트 확인
- 강화 분석실 - 강화석 조합법 및 강화 재료 / 강화 단계별 효과 확인

### 2026년 01월 27일

- (랜딩) - 오하아사 순위 표시, 로딩 스피너 추가
- 요리 리딩방 - 요리 선택 개선

### 2026년 02월 01일

- 로그인/회원가입 구현 - SUPABASE 사용
- (랜딩) - 유저별 별자리 순위 확인 쉽도록 색 변경

### 2026년 02월 02일

- 회원가입 - 유저 별 마인크래프트 머리 이미지 추가
- 모바일 반응형 적용

### 2026년 02월 03일

- Public/Private 라우트 설정
- 공통 스낵바 추가

### 2026년 02월 04일

- 플로팅 버튼 추가
  - 스크롤 투 탑 기능
  - 배경음악 컨트롤 패널 기능
- 배경음악 추가(오노추) - 추후 DB 연결 예정

### 2026년 02월 05일

- 요리 효율 계산기 추가
- 플로팅 버튼 개선
  - 높이에 따라 스크롤 투 바텀 가능하도록(효율 계산기 타겟팅)

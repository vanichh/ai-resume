import { AnalysisHistoryPage } from '@pages/analysis-history';
import { CoverLetterPage } from '@pages/cover-letter';
import { HomePage } from '@pages/home';
import { PrivacyPage } from '@pages/privacy';
import { ResumeAnalysisPage } from '@pages/resume-analysis';
import { TranslationPage } from '@pages/translation';
import { UnsupportedBrowserPage } from '@pages/unsupported-browser';
import { VacancyComparisonPage } from '@pages/vacancy-comparison';
import { Navigate, Route, Routes } from 'react-router-dom';

import { APP_ROUTES } from '@common/constants/routes';
import { useAppTheme } from '@common/hooks/useAppTheme';

import { useAppBootstrap } from './common/hooks/useAppBootstrap';

import { AppNavigation } from './components/app-navigation';
import { AppToast } from './components/app-toast';
import { ModelDownloadProgress } from './components/model-download-progress';
import { ModelGuardRoute } from './components/model-guard-route';

import styles from './App.module.scss';

export const App = () => {
  useAppBootstrap();
  const { onThemeToggle, theme } = useAppTheme();

  return (
    <main className={styles.app}>
      <AppNavigation theme={theme} onThemeToggle={onThemeToggle} />
      <ModelDownloadProgress />
      <Routes>
        <Route path={APP_ROUTES.home} element={<HomePage />} />
        <Route element={<ModelGuardRoute />}>
          <Route path={APP_ROUTES.resumeAnalysis} element={<ResumeAnalysisPage />} />
          <Route path={APP_ROUTES.analysisHistory} element={<AnalysisHistoryPage />} />
          <Route path={APP_ROUTES.coverLetter} element={<CoverLetterPage />} />
          <Route path={APP_ROUTES.privacy} element={<PrivacyPage />} />
          <Route path={APP_ROUTES.translation} element={<TranslationPage />} />
          <Route path={APP_ROUTES.vacancyComparison} element={<VacancyComparisonPage />} />
        </Route>
        <Route path={APP_ROUTES.unsupportedBrowser} element={<UnsupportedBrowserPage />} />
        <Route path="*" element={<Navigate replace to={APP_ROUTES.home} />} />
      </Routes>
      <AppToast />
    </main>
  );
};

import clsx from 'clsx';
import {
  BriefcaseBusiness,
  FileText,
  GitCompareArrows,
  Languages,
  LockKeyhole,
  Mail,
  ScanSearch,
  Send,
  Sparkles,
  Target,
  Upload,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { APP_ROUTES } from '@common/constants/routes';

import {
  HOME_CAPABILITIES,
  HOME_FEATURES,
  HOME_PREVIEW_STEPS,
  HOME_USE_CASES,
  HOME_WORKFLOW,
} from './common/constants';

import type { HomeFeatureType, HomeIconType, HomeInfoItemType, HomePreviewStepType } from './types';

import styles from './HomePage.module.scss';

const HOME_ICON_COMPONENTS: Record<HomeIconType, typeof BriefcaseBusiness> = {
  briefcase: BriefcaseBusiness,
  fileText: FileText,
  gitCompare: GitCompareArrows,
  languages: Languages,
  lock: LockKeyhole,
  mail: Mail,
  scanSearch: ScanSearch,
  send: Send,
  sparkles: Sparkles,
  target: Target,
  upload: Upload,
};

const renderFeature = ({ description, icon, title }: HomeFeatureType) => {
  const Icon = HOME_ICON_COMPONENTS[icon];

  return (
    <li key={title} className={styles.homePage__feature}>
      <span className={styles.homePage__icon}>
        <Icon aria-hidden size={18} />
      </span>
      <div className={styles.homePage__featureText}>
        <h2 className={styles.homePage__featureTitle}>{title}</h2>
        <p className={styles.homePage__featureDescription}>{description}</p>
      </div>
    </li>
  );
};

const renderInfoItem = ({ description, icon, title }: HomeInfoItemType) => {
  const Icon = HOME_ICON_COMPONENTS[icon];

  return (
    <li key={title} className={styles.homePage__infoItem}>
      <span className={styles.homePage__icon}>
        <Icon aria-hidden size={18} />
      </span>
      <div className={styles.homePage__infoText}>
        <h3 className={styles.homePage__infoTitle}>{title}</h3>
        <p className={styles.homePage__infoDescription}>{description}</p>
      </div>
    </li>
  );
};

const renderPreviewStep = ({ progress, score, title }: HomePreviewStepType) => {
  return (
    <li key={title} className={styles.homePage__previewStep}>
      <div className={styles.homePage__previewStepHeader}>
        <span>{title}</span>
        <strong>{score}</strong>
      </div>
      <div className={styles.homePage__previewTrack}>
        <span className={clsx(styles.homePage__previewProgress, styles[`homePage__previewProgress_${progress}`])} />
      </div>
    </li>
  );
};

export const HomePage = () => {
  return (
    <section className={styles.homePage}>
      <div className={styles.homePage__content}>
        <p className={styles.homePage__badge}>
          <Sparkles aria-hidden size={14} />
          AI-анализ резюме
        </p>
        <h1 className={styles.homePage__title}>
          Разберите резюме под конкретную роль до <span className={styles.homePage__titleAccent}>отправки отклика</span>
        </h1>
        <p className={styles.homePage__description}>
          AI Resume Review помогает быстро понять, насколько резюме готово к вакансии: показывает слабые места,
          недостающие ключевые слова и конкретные правки к тексту.
        </p>
        <div className={styles.homePage__actions}>
          <Link className={styles.homePage__primaryLink} to={APP_ROUTES.resumeAnalysis}>
            Начать анализ
          </Link>
          <Link className={styles.homePage__secondaryLink} to={APP_ROUTES.privacy}>
            Как хранятся данные
          </Link>
        </div>
        <ul className={styles.homePage__features}>{HOME_FEATURES.map(renderFeature)}</ul>
      </div>
      <aside className={styles.homePage__preview} aria-label="Пример результата анализа">
        <div className={styles.homePage__previewHeader}>
          <span className={styles.homePage__previewLabel}>Оценка резюме</span>
          <strong className={styles.homePage__previewScore}>82/100</strong>
        </div>
        <p className={styles.homePage__previewRole}>Lead Frontend Developer</p>
        <ul className={styles.homePage__previewSteps}>{HOME_PREVIEW_STEPS.map(renderPreviewStep)}</ul>
        <div className={styles.homePage__previewAdvice}>
          <span className={styles.homePage__previewAdviceIcon}>
            <Sparkles aria-hidden size={18} />
          </span>
          Усилить профиль под целевую роль, добавить больше метрик и вынести React, Next.js, FSD в верхнюю часть резюме.
        </div>
      </aside>
      <div className={styles.homePage__details}>
        <section className={styles.homePage__section}>
          <div className={styles.homePage__sectionHeader}>
            <h2 className={styles.homePage__sectionTitle}>Что можно сделать на сайте</h2>
            <p className={styles.homePage__sectionDescription}>
              Это не просто форма загрузки резюме. Внутри собраны основные шаги подготовки отклика: анализ, адаптация
              под вакансию, перевод, сравнение ролей и экспорт результата.
            </p>
          </div>
          <ul className={styles.homePage__infoGrid}>{HOME_CAPABILITIES.map(renderInfoItem)}</ul>
        </section>
        <section className={styles.homePage__section}>
          <div className={styles.homePage__sectionHeader}>
            <h2 className={styles.homePage__sectionTitle}>Как проходит работа</h2>
            <p className={styles.homePage__sectionDescription}>
              Сценарий рассчитан на быстрые итерации: загрузили резюме, уточнили цель, получили правки и сразу проверили
              следующую версию.
            </p>
          </div>
          <ul className={styles.homePage__workflow}>{HOME_WORKFLOW.map(renderInfoItem)}</ul>
        </section>
        <section className={styles.homePage__section}>
          <div className={styles.homePage__sectionHeader}>
            <h2 className={styles.homePage__sectionTitle}>Когда особенно полезно</h2>
            <p className={styles.homePage__sectionDescription}>
              Сервис помогает не переписывать резюме вслепую, а принимать решения по конкретной роли и требованиям
              вакансии.
            </p>
          </div>
          <ul className={styles.homePage__useCases}>{HOME_USE_CASES.map(renderInfoItem)}</ul>
        </section>
      </div>
    </section>
  );
};

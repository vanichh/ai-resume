import { useTranslation } from 'react-i18next';

import { SecondaryPageLayout } from '@components/layouts/secondary-page-layout';

import styles from './AboutProjectPage.module.scss';

const workLinks = [
  {
    label: 'Telegram',
    href: 'https://t.me/vanichh',
    text: '@vanichh',
  },
  {
    label: 'HeadHunter',
    href: 'https://hh.ru/resume/f8413244ff08cfd4a30039ed1f6c334a633134',
    textKey: 'workspace.about.resumeLink',
  },
] as const;

const features = [
  {
    key: 'analysis',
  },
  {
    key: 'comparison',
  },
  {
    key: 'coverLetter',
  },
  {
    key: 'local',
  },
] as const;

export const AboutProjectPage = () => {
  const { t } = useTranslation();

  return (
    <SecondaryPageLayout className={styles.root}>
      <section className={styles.root__content}>
        <p className={styles.root__eyebrow}>AI Resume Review</p>
        <h1 className={styles.root__title}>{t('workspace.about.title')}</h1>
        <p className={styles.root__lead}>{t('workspace.about.lead')}</p>

        <p className={styles.root__lead}>{t('workspace.about.hire')}</p>

        <div className={styles.root__contacts}>
          <h2 className={styles.root__contactsTitle}>{t('workspace.about.contacts')}</h2>
          <ul className={styles.root__contactList}>
            {workLinks.map((link) => (
              <li className={styles.root__contactItem} key={link.label}>
                <span className={styles.root__contactLabel}>{link.label}:</span>{' '}
                <a className={styles.root__link} href={link.href} rel="noreferrer" target="_blank">
                  {'textKey' in link ? t(link.textKey) : link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.root__grid}>
          {features.map(({ key }) => (
            <article className={styles.root__card} key={key}>
              <h2 className={styles.root__cardTitle}>{t(`workspace.about.features.${key}.title`)}</h2>
              <p className={styles.root__cardText}>{t(`workspace.about.features.${key}.description`)}</p>
            </article>
          ))}
        </div>

        <p className={styles.root__note}>{t('workspace.about.note')}</p>
      </section>
    </SecondaryPageLayout>
  );
};

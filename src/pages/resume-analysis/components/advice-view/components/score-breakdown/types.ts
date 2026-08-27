export type ScoreBreakdownItemType = {
  label: string;
  value: number;
};

export type ScoreBreakdownLabelsType = {
  atsAudit: string;
  sections: {
    education: string;
    experience: string;
    keywords: string;
    metrics: string;
    skills: string;
    summary: string;
  };
};

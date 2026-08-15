interface ScreenProps {
  actions?: React.ReactNode;
  children: React.ReactNode;
  goBack?: boolean | (() => void);
  title?: string;
}

export type { ScreenProps };

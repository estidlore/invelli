interface ScreenProps {
  children: React.ReactNode;
  goBack?: boolean | (() => void);
  title?: string;
}

export type { ScreenProps };

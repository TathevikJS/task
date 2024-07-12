export interface ButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: 'default' | 'danger';
    children: React.ReactNode;
  }
  
type Props = {
  title: string;
  onClick: () => void;
};

export const Button = ({ title, onClick }: Props) => (
  <button onClick={onClick}>{title}</button>
);

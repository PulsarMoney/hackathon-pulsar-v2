export interface ButtonProps {
  className: string;
  children: JSX.Element;
  link?: string;
  onClick: () => void;
  token?: string;
}

export const TokenPresetButton = (props: ButtonProps) => {
  return (
    <button
      className={props.className}
      onClick={(ev: React.MouseEvent) => {
        ev.preventDefault();
        props.onClick();
      }}
    >
      <a href={props.link}>{props.children}</a>
    </button>
  );
};

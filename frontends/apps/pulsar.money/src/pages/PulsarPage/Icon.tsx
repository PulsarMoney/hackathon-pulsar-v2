export interface IconProps {
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

export const Icon = (props: IconProps) => {
  const initialFirstName = props.firstName ? props.firstName.charAt(0) : "";
  const initialLastName = props.lastName ? props.lastName.charAt(0) : "";
  const initials = initialFirstName + initialLastName;

  const randomChannelValue = () => Math.floor(Math.random() * 256);

  const getRandomBackgroundColor = () => {
    const red = randomChannelValue();
    const green = randomChannelValue();
    const blue = randomChannelValue();
    const color = `#${red.toString(16).padStart(2, "0")}${green.toString(16).padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;
    return color;
  };

  const classes = `w-full h-full text-white flex items-center justify-center rounded-full text-6xl`;

  return (
    <>
      {props.imageUrl ? (
        <img src={props.imageUrl} alt="User Profile" className="object-cover rounded-full" />
      ) : (
        <div className={classes} style={{ backgroundColor: getRandomBackgroundColor() }}>
          {initials}
        </div>
      )}
    </>
  );
};

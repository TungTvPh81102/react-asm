const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <h1 className={`text-base font-bold ${className}`}>{children}</h1>;
};

export default Title;

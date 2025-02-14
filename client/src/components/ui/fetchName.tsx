const fetchName = (item: string, action?: () => void) => {
  return (
    <span className="w-[100%]" onClick={action}>
      {item}
    </span>
  );
};

export default fetchName;

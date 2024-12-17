const Label = ({ children, className = 'form__form-label' }) => {
  return <label className={className}>{children}</label>;
};

export default Label;

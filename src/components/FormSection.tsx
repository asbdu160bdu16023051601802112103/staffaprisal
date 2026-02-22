import React from "react";

interface FormSectionProps {
  number: string;
  icon: string;
  title: string;
  children: React.ReactNode;
}

const FormSection = ({ number, icon, title, children }: FormSectionProps) => {
  return (
    <div className="section-card">
      <h3 className="section-title">
        <span>{icon}</span>
        {number ? `${number}. ` : ""}{title}
      </h3>
      {children}
    </div>
  );
};

export default FormSection;

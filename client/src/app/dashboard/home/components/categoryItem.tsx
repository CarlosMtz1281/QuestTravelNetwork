import React from "react";

interface CategoryItemProps {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ name, icon, color }) => {
  return (
    <div
      className="flex items-center p-2 mb-2"
      style={{ backgroundColor: "#F8F8F8", borderRadius: "15px" }}
    >
      <div
        className="flex items-center justify-center w-10 h-10"
        style={{ backgroundColor: color, borderRadius: "10px" }}
      >
        {icon}
      </div>
      <p className="ml-2">{name}</p>
    </div>
  );
};

export default CategoryItem;

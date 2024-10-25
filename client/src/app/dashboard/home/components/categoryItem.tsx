import React from "react";

interface CategoryItemProps {
  name: string;
  icon: React.ReactNode;
  color: string;
  setCategory: (name: string) => void;
  isSelected: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  name,
  icon,
  color,
  setCategory,
  isSelected,
}) => {
  return (
    <div
      className="flex items-center p-2 mb-2 cursor-pointer"
      style={{
        backgroundColor: isSelected ? "#FF6F91" : "#F8F8F8",
        borderRadius: "15px",
      }}
      onClick={() => setCategory(name)}
    >
      <div
        className="flex items-center justify-center w-10 h-10"
        style={{ backgroundColor: color, borderRadius: "10px" }}
      >
        {icon}
      </div>
      <p className="ml-2" style={{ color: isSelected ? "#FFFFFF" : "#000000" }}>
        {name}
      </p>
    </div>
  );
};

export default CategoryItem;

import React from "react";
import { Leaf, UtensilsCrossed, Gem, PersonStanding, Receipt } from "lucide-react";

interface CategoryItemProps {
  name: string;
}

const categories = [
  {
    name: "Nature",
    icon: <Leaf className="text-[#fff]" />,
    color: "#8DE8C7",
  },
  {
    name: "Gastro",
    icon: <UtensilsCrossed className="text-[#fff]" />,
    color: "#EB5757",
  },
  {
    name: "Hidden",
    icon: <Gem className="text-[#fff]" />,
    color: "#48ADF5",
  },
  {
    name: "Solo",
    icon: <PersonStanding className="text-[#fff]" />,
    color: "#F57C48",
  },
  {
    name: "Budget",
    icon: <Receipt className="text-[#fff]" />,
    color: "#F548A7",
  },
];

const CategoryItem: React.FC<CategoryItemProps> = ({ name }) => {
  // Find the category based on the name prop
  const category = categories.find((cat) => cat.name === name);

  // Fallback values if the name is not found in categories
  const icon = category ? category.icon : null;
  const color = category ? category.color : "#cccccc";

  return (
    <div
      className="flex items-center"
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

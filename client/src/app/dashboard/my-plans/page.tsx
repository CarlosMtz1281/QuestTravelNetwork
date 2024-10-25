"use client";
/* eslint-disable */
import React, { useEffect, useState } from "react";
import "../../../css/myPlans.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { v4 as uuidv4 } from "uuid"; // Import the uuid function
import { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const url = "https://quest-travel-network.vercel.app/getMyPlans";

export interface Plan {
  authorKey: string;
  dates: string;
  name: string;
  plan: string;
  region: string;
}

export interface PlanResponse {
  data: Plan[];
  message: string;
}

const MyPlans = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(
    plans.length > 0 ? plans[0] : null
  );

  const fetchUsers = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          authorKey: "user001",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPlans(data.data); // Adjusted to access the data property
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const chosePlan = (plan: Plan) => {
    console.log("Chose Plan: ", plan);
    setSelectedPlan(plan);
  };
  console.log("Selected Plan: ", selectedPlan?.plan);

  function formatPlan(plan:string) {
    // Ensure proper formatting for Markdown elements
    let formattedPlan = plan
      .replace(/(\*\*Day \d+: .*)/g, "\n$1") // Ensure each day starts on a new line
      .replace(/(\*\*Arrival in .*)/g, "\n$1") // Ensure arrival section starts on a new line
      .replace(/( -? \*\*.*?\*\n)/g, "\n$1") // Ensure sub-sections start on a new line
      .replace(/([*] )/g, "\n$1") // Add newline before bullet points
      .replace(/(#+\s)/g, "\n$1") // Add newline before headers like #, ##, ###
      .replace(/\n{2,}/g, "\n"); // Clean up any extra blank lines
  
    // Trim whitespace from start and end
    formattedPlan = formattedPlan.trim();
  
    console.log("Formatted Plan: ", formattedPlan);
    return formattedPlan;
  }
  //modal logic
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    fetchUsers(); // Fetch data again when the modal closes
  };

  function deletePlan() {
    console.log("Delete Plan");
  }
  
  return (
    <div className="container">
      {/* Sidebar for Saved Plans */}
      <div className="sidebar">
        <h2 className="sidebarTitle">My Plans</h2>
        <button onClick={openModal} className="newPlanBtn">
          Create Plan
        </button>
        <PlansModal isOpen={isModalOpen} onClose={closeModal}>
          <h2>Create a New Plan</h2>
          <p>
            This is the content of the modal where you can create a new plan.
          </p>
        </PlansModal>

        <div>
          {plans.map((plan: Plan) => (
            <PlanComponent
              key={uuidv4()}
              plan={plan}
              functionChose={chosePlan}
              selected={selectedPlan === plan}
            />
          ))}
        </div>
      </div>

      {/* Trip Details */}
      <div className="details">
        {selectedPlan && selectedPlan.plan && (
          <ReactMarkdown
            className="markdown-content"
            remarkPlugins={[remarkGfm]}
          >
            {formatPlan(selectedPlan.plan)}
          </ReactMarkdown>
          
        )}
        <button className="deleteBtn">
          delete
          </button>
      </div>
    </div>
  );
};

const PlanComponent: React.FC<{
  plan: Plan;
  functionChose: (plan: Plan) => void;
  selected: boolean;
}> = ({ plan, functionChose, selected }) => {
  const getFlagEmoji = (region: string) => {
    const flags: { [key: string]: string } = {
      "United States": "🇺🇸",
      Canada: "🇨🇦",
      Mexico: "🇲🇽",
      Brazil: "🇧🇷",
      Argentina: "🇦🇷",
      "United Kingdom": "🇬🇧",
      France: "🇫🇷",
      Germany: "🇩🇪",
      Spain: "🇪🇸",
      Italy: "🇮🇹",
      Russia: "🇷🇺",
      China: "🇨🇳",
      Japan: "🇯🇵",
      "South Korea": "🇰🇷",
      India: "🇮🇳",
      Australia: "🇦🇺",
      "New Zealand": "🇳🇿",
      "South Africa": "🇿🇦",
      Egypt: "🇪🇬",
      Nigeria: "🇳🇬",
      Kenya: "🇰🇪",
      Turkey: "🇹🇷",
      "Saudi Arabia": "🇸🇦",
      "United Arab Emirates": "🇦🇪",
      Israel: "🇮🇱",
      Greece: "🇬🇷",
      Portugal: "🇵🇹",
      Netherlands: "🇳🇱",
      Belgium: "🇧🇪",
      Sweden: "🇸🇪",
      Norway: "🇳🇴",
      Denmark: "🇩🇰",
      Finland: "🇫🇮",
      Poland: "🇵🇱",
      "Czech Republic": "🇨🇿",
      Hungary: "🇭🇺",
      Austria: "🇦🇹",
      Switzerland: "🇨🇭",
      Ireland: "🇮🇪",
      Scotland: "🏴",
      Wales: "🏴",
      Ukraine: "🇺🇦",
      Romania: "🇷🇴",
      Bulgaria: "🇧🇬",
      Croatia: "🇭🇷",
      Serbia: "🇷🇸",
      Slovenia: "🇸🇮",
      Slovakia: "🇸🇰",
      "Bosnia and Herzegovina": "🇧🇦",
      Montenegro: "🇲🇪",
      "North Macedonia": "🇲🇰",
      Albania: "🇦🇱",
      Kosovo: "🇽🇰",
      Iceland: "🇮🇸",
      Luxembourg: "🇱🇺",
      Monaco: "🇲🇨",
      Liechtenstein: "🇱🇮",
      Malta: "🇲🇹",
      Cyprus: "🇨🇾",
      Estonia: "🇪🇪",
      Latvia: "🇱🇻",
      Lithuania: "🇱🇹",
      Belarus: "🇧🇾",
      Moldova: "🇲🇩",
      Georgia: "🇬🇪",
      Armenia: "🇦🇲",
      Azerbaijan: "🇦🇿",
      Kazakhstan: "🇰🇿",
      Uzbekistan: "🇺🇿",
      Turkmenistan: "🇹🇲",
      Kyrgyzstan: "🇰🇬",
      Tajikistan: "🇹🇯",
      Afghanistan: "🇦🇫",
      Pakistan: "🇵🇰",
      Bangladesh: "🇧🇩",
      "Sri Lanka": "🇱🇰",
      Nepal: "🇳🇵",
      Bhutan: "🇧🇹",
      Maldives: "🇲🇻",
      Myanmar: "🇲🇲",
      Thailand: "🇹🇭",
      Vietnam: "🇻🇳",
      Cambodia: "🇰🇭",
      Laos: "🇱🇦",
      Malaysia: "🇲🇾",
      Singapore: "🇸🇬",
      Indonesia: "🇮🇩",
      Philippines: "🇵🇭",
      Brunei: "🇧🇳",
      "East Timor": "🇹🇱",
      "Papua New Guinea": "🇵🇬",
      Fiji: "🇫🇯",
      Samoa: "🇼🇸",
      Tonga: "🇹🇴",
      Vanuatu: "🇻🇺",
      "Solomon Islands": "🇸🇧",
      Kiribati: "🇰🇮",
      Tuvalu: "🇹🇻",
      Nauru: "🇳🇷",
      Palau: "🇵🇼",
      "Marshall Islands": "🇲🇭",
      Micronesia: "🇫🇲",
      World: "🌍",
    };

    return flags[region] || flags["World"];
  };

  const handleClick = () => {
    functionChose(plan);
  };

  return (
    <div className={selected ? "plan-selected" : "plan"} onClick={handleClick}>
      <div className="planTxtWrp">
        <h2 className="planTitle">{plan.name}</h2>
        <p>{plan.dates}</p>
      </div>
      <div className="flagWrp">
        <div className="centerWrp">
          <h1 className="planFlag">{getFlagEmoji(plan.region)}</h1>
        </div>
        <h3 className="flagTxt">{plan.region}</h3>
      </div>
    </div>
  );
};

interface PlansModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const PlansModal: React.FC<PlansModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // State for plans, selected plan, and modal inputs
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [newPlanName, setNewPlanName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [tripDates, setTripDates] = useState(new Date());
  const [planDetails, setPlanDetails] = useState("");
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const countryOptions = [
    { value: "United States", label: "🇺🇸 United States" },
    { value: "Canada", label: "🇨🇦 Canada" },
    { value: "Mexico", label: "🇲🇽 Mexico" },
    { value: "Brazil", label: "🇧🇷 Brazil" },
    { value: "Argentina", label: "🇦🇷 Argentina" },
    { value: "United Kingdom", label: "🇬🇧 United Kingdom" },
    { value: "France", label: "🇫🇷 France" },
    { value: "Germany", label: "🇩🇪 Germany" },
    { value: "Spain", label: "🇪🇸 Spain" },
    { value: "Italy", label: "🇮🇹 Italy" },
    { value: "Russia", label: "🇷🇺 Russia" },
    { value: "China", label: "🇨🇳 China" },
    { value: "Japan", label: "🇯🇵 Japan" },
    { value: "South Korea", label: "🇰🇷 South Korea" },
    { value: "India", label: "🇮🇳 India" },
    { value: "Australia", label: "🇦🇺 Australia" },
    { value: "New Zealand", label: "🇳🇿 New Zealand" },
    { value: "South Africa", label: "🇿🇦 South Africa" },
    { value: "Egypt", label: "🇪🇬 Egypt" },
    { value: "Nigeria", label: "🇳🇬 Nigeria" },
    { value: "Kenya", label: "🇰🇪 Kenya" },
    { value: "Turkey", label: "🇹🇷 Turkey" },
    { value: "Saudi Arabia", label: "🇸🇦 Saudi Arabia" },
    { value: "United Arab Emirates", label: "🇦🇪 United Arab Emirates" },
    { value: "Israel", label: "🇮🇱 Israel" },
    { value: "Greece", label: "🇬🇷 Greece" },
    { value: "Portugal", label: "🇵🇹 Portugal" },
    { value: "Netherlands", label: "🇳🇱 Netherlands" },
    { value: "Belgium", label: "🇧🇪 Belgium" },
    { value: "Sweden", label: "🇸🇪 Sweden" },
    { value: "Norway", label: "🇳🇴 Norway" },
    { value: "Denmark", label: "🇩🇰 Denmark" },
    { value: "Finland", label: "🇫🇮 Finland" },
    { value: "Poland", label: "🇵🇱 Poland" },
    { value: "Czech Republic", label: "🇨🇿 Czech Republic" },
    { value: "Hungary", label: "🇭🇺 Hungary" },
    { value: "Austria", label: "🇦🇹 Austria" },
    { value: "Switzerland", label: "🇨🇭 Switzerland" },
    { value: "Ireland", label: "🇮🇪 Ireland" },
    { value: "Scotland", label: "🏴 Scotland" },
    { value: "Wales", label: "🏴 Wales" },
    { value: "Ukraine", label: "🇺🇦 Ukraine" },
    { value: "Romania", label: "🇷🇴 Romania" },
    { value: "Bulgaria", label: "🇧🇬 Bulgaria" },
    { value: "Croatia", label: "🇭🇷 Croatia" },
    { value: "Serbia", label: "🇷🇸 Serbia" },
    { value: "Slovenia", label: "🇸🇮 Slovenia" },
    { value: "Slovakia", label: "🇸🇰 Slovakia" },
    { value: "Bosnia and Herzegovina", label: "🇧🇦 Bosnia and Herzegovina" },
    { value: "Montenegro", label: "🇲🇪 Montenegro" },
    { value: "North Macedonia", label: "🇲🇰 North Macedonia" },
    { value: "Albania", label: "🇦🇱 Albania" },
    { value: "Kosovo", label: "🇽🇰 Kosovo" },
    { value: "Iceland", label: "🇮🇸 Iceland" },
    { value: "Luxembourg", label: "🇱🇺 Luxembourg" },
    { value: "Monaco", label: "🇲🇨 Monaco" },
    { value: "Liechtenstein", label: "🇱🇮 Liechtenstein" },
    { value: "Malta", label: "🇲🇹 Malta" },
    { value: "Cyprus", label: "🇨🇾 Cyprus" },
    { value: "Estonia", label: "🇪🇪 Estonia" },
    { value: "Latvia", label: "🇱🇻 Latvia" },
    { value: "Lithuania", label: "🇱🇹 Lithuania" },
    { value: "Belarus", label: "🇧🇾 Belarus" },
    { value: "Moldova", label: "🇲🇩 Moldova" },
    { value: "Georgia", label: "🇬🇪 Georgia" },
    { value: "Armenia", label: "🇦🇲 Armenia" },
    { value: "Azerbaijan", label: "🇦🇿 Azerbaijan" },
    { value: "Kazakhstan", label: "🇰🇿 Kazakhstan" },
    { value: "Uzbekistan", label: "🇺🇿 Uzbekistan" },
    { value: "Turkmenistan", label: "🇹🇲 Turkmenistan" },
    { value: "Kyrgyzstan", label: "🇰🇬 Kyrgyzstan" },
    { value: "Tajikistan", label: "🇹🇯 Tajikistan" },
    { value: "Afghanistan", label: "🇦🇫 Afghanistan" },
    { value: "Pakistan", label: "🇵🇰 Pakistan" },
    { value: "Bangladesh", label: "🇧🇩 Bangladesh" },
    { value: "Sri Lanka", label: "🇱🇰 Sri Lanka" },
    { value: "Nepal", label: "🇳🇵 Nepal" },
    { value: "Bhutan", label: "🇧🇹 Bhutan" },
    { value: "Maldives", label: "🇲🇻 Maldives" },
    { value: "Myanmar", label: "🇲🇲 Myanmar" },
    { value: "Thailand", label: "🇹🇭 Thailand" },
    { value: "Vietnam", label: "🇻🇳 Vietnam" },
    { value: "Cambodia", label: "🇰🇭 Cambodia" },
    { value: "Laos", label: "🇱🇦 Laos" },
    { value: "Malaysia", label: "🇲🇾 Malaysia" },
    { value: "Singapore", label: "🇸🇬 Singapore" },
    { value: "Indonesia", label: "🇮🇩 Indonesia" },
    { value: "Philippines", label: "🇵🇭 Philippines" },
    { value: "Brunei", label: "🇧🇳 Brunei" },
    { value: "East Timor", label: "🇹🇱 East Timor" },
    { value: "Papua New Guinea", label: "🇵🇬 Papua New Guinea" },
    { value: "Fiji", label: "🇫🇯 Fiji" },
    { value: "Samoa", label: "🇼🇸 Samoa" },
    { value: "Tonga", label: "🇹🇴 Tonga" },
    { value: "Vanuatu", label: "🇻🇺 Vanuatu" },
    { value: "Solomon Islands", label: "🇸🇧 Solomon Islands" },
    { value: "Kiribati", label: "🇰🇮 Kiribati" },
    { value: "Tuvalu", label: "🇹🇻 Tuvalu" },
    { value: "Nauru", label: "🇳🇷 Nauru" },
    { value: "Palau", label: "🇵🇼 Palau" },
    { value: "Marshall Islands", label: "🇲🇭 Marshall Islands" },
    { value: "Micronesia", label: "🇫🇲 Micronesia" },
  ];

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
  };

  const sendData = async () => {
    const planData = {
      name: newPlanName,
      country: selectedCountry,
      dates: date,
      details: planDetails,
    };

  console.log('Plan data:', planData);
    try {
      const response = await fetch('http://localhost:5002/generate_plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(planData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Plan created successfully:', responseData);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error creating plan:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 className="modalTittle">Create a New Plan</h2>
        <div className="modal-form">
          <label>Plan Name</label>
          <input
            type="text"
            value={newPlanName}
            onChange={(e) => setNewPlanName(e.target.value)}
            placeholder="Enter plan name"
          />
          <label>Country</label>
          <Select onValueChange={handleCountryChange}>
            <SelectTrigger className="select-trigger">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Countries</SelectLabel>
                {countryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <label>Dates</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={`button ${!date ? "text-muted-foreground" : ""}`}
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <label>Plan Details</label>
          <textarea
            value={planDetails}
            onChange={(e) => setPlanDetails(e.target.value)}
            placeholder="Enter trip details"
          ></textarea>
          <button className="save-plan-btn" onClick={sendData}>Save Plan</button>
        </div>
      </div>
    </div>
  );
};


export default MyPlans;

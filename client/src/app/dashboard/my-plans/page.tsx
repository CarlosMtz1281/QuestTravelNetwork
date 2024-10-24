"use client";
import React, { useEffect, useState } from "react";
import "../../../css/myPlans.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { v4 as uuidv4 } from "uuid"; // Import the uuid function

const url = "http://localhost:5001/getMyPlans";

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

  useEffect(() => {
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
    fetchUsers();
  }, [console.log(plans)]);

  const chosePlan = (plan: Plan) => {
    console.log("Chose Plan: ", plan);
    setSelectedPlan(plan);
  };
  console.log("Selected Plan: ", selectedPlan?.plan);

  function formatPlan(plan: string) {
    // if the next word has ### append \n befre it

    let formattedPlan = plan.replace(/###/g, "\n###");
    // if the next word has - append \n before it
    formattedPlan = formattedPlan.replace(/-/g, "\n-");
    // if the next word has ## append \n before it
    formattedPlan = formattedPlan.replace(/##/g, "\n##");
    // if the next word has # append \n before it

    console.log("Formatted Plan: ", formattedPlan);

    return formattedPlan;
  }

  return (
    <div className="container">
      {/* Sidebar for Saved Plans */}
      <div className="sidebar">
        <h2 className="sidebarTitle">My Saved Plans</h2>

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
          <ReactMarkdown className="markdown-content" remarkPlugins={[remarkGfm]}>
            {formatPlan(selectedPlan.plan)}
          </ReactMarkdown>
        )}
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

export default MyPlans;

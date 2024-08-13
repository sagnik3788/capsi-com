import available from "../assets/pricing/available.png";
import info from "../assets/pricing/info.png";
import notAvailable from "../assets/pricing/notAvailable.png";

const planData = [
  {
    plan: "Trial",
    price: 0,
    delay: 60,
    features: [
      { feature: "4 videos/month", typeImage: available, type: "Available" },
      {
        feature: "No water mark included",
        typeImage: info,
        type: "Information",
      },
      {
        feature: "No credit card require",
        typeImage: info,
        type: "Information",
      },
      {},
    ],
    isMonthly: true,
    isCreator: false,
  },
  {
    plan: "Basic",
    price: 199,
    delay: 120,
    features: [
      { feature: "30 videos/month", typeImage: available, type: "Available" },
      {
        feature: "Storage size upto 200 mb",
        typeImage: available,
        type: "Available",
      },
      {
        feature: "1 month of storage",
        typeImage: available,
        type: "Available",
      },
      {
        feature: "3 min/video",
        typeImage: notAvailable,
        type: "Not Available",
      },
    ],
    isMonthly: true,
    isCreator: false,
  },
  {
    plan: "Pro",
    price: 499,
    delay: 180,
    features: [
      { feature: "90 videos/month", typeImage: available, type: "Available" },
      {
        feature: "Storage size upto 500 mb",
        typeImage: available,
        type: "Available",
      },
      {
        feature: "1 month of storage",
        typeImage: available,
        type: "Available",
      },
      { feature: "3 min/video", typeImage: available, type: "Available" },
    ],
    isMonthly: true,
    isCreator: true,
  },
  {
    plan: "Agency",
    price: 1299,
    delay: 180,
    features: [
      { feature: "300 videos/month", typeImage: available, type: "Available" },
      {
        feature: "Storage size upto 1gb",
        typeImage: available,
        type: "Available",
      },
      {
        feature: "1 month of storage",
        typeImage: available,
        type: "Available",
      },
      { feature: "3 min/video", typeImage: available, type: "Available" },
    ],
    isMonthly: true,
    isCreator: false,
  },
  {
    plan: "Trial",
    price: 0,
    delay: 60,
    features: [
      { feature: "4 videos/year", typeImage: available, type: "Available" },
      {
        feature: "No water mark included",
        typeImage: info,
        type: "Information",
      },
      {
        feature: "No credit card require",
        typeImage: info,
        type: "Information",
      },
      {},
    ],
    isMonthly: false,
    isCreator: false,
  },
  {
    plan: "Basic",
    price: 199,
    delay: 120,
    features: [
      { feature: "30 videos/year", typeImage: available, type: "Available" },
      {
        feature: "Storage size upto 200 mb",
        typeImage: available,
        type: "Available",
      },
      { feature: "1 year of storage", typeImage: available, type: "Available" },
      {
        feature: "3 min/video",
        typeImage: notAvailable,
        type: "Not Available",
      },
    ],
    isMonthly: false,
    isCreator: false,
  },
  {
    plan: "Pro",
    price: 499,
    delay: 180,
    features: [
      { feature: "90 videos/year", typeImage: available, type: "Available" },
      {
        feature: "Storage size upto 500 mb",
        typeImage: available,
        type: "Available",
      },
      { feature: "1 year of storage", typeImage: available, type: "Available" },
      { feature: "3 min/video", typeImage: available, type: "Available" },
    ],
    isMonthly: false,
    isCreator: true,
  },
  {
    plan: "Agency",
    price: 1299,
    delay: 180,
    features: [
      { feature: "300 videos/year", typeImage: available, type: "Available" },
      {
        feature: "Storage size upto 1gb",
        typeImage: available,
        type: "Available",
      },
      { feature: "1 year of storage", typeImage: available, type: "Available" },
      { feature: "3 min/video", typeImage: available, type: "Available" },
    ],
    isMonthly: false,
    isCreator: false,
  },
];

export default planData;

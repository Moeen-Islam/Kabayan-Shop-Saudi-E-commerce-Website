"use strict";

const normalizeArea = (areaName = "") =>
  areaName.trim().toLowerCase().replace(/\s+/g, " ");

const getDeliveryRule = (areaName = "") => {
  const area = normalizeArea(areaName);

  const rules = {
    riyadh: { charge: 15, freeAbove: 130, minimumOrder: 50 },
    jeddah: { charge: 25, freeAbove: 180, minimumOrder: 70 },
    dammam: { charge: 20, freeAbove: 180, minimumOrder: 70 },
    hofuf: { charge: 25, freeAbove: 180, minimumOrder: 70 },
    buraydah: { charge: 25, freeAbove: 180, minimumOrder: 100 },
  };

  return rules[area] || { charge: 30, freeAbove: Infinity, minimumOrder: 300 };
};

const getDeliveryInfo = (areaName = "", subTotal = 0) => {
  const rule = getDeliveryRule(areaName);

  if (rule.minimumOrder > 0 && subTotal < rule.minimumOrder) {
    return {
      deliveryFee: rule.charge,
      freeAbove: rule.freeAbove,
      minimumOrder: rule.minimumOrder,
      belowMinimum: true,
      message: `Minimum order for this area is ${rule.minimumOrder} SR`,
    };
  }

  const isFreeDelivery = subTotal >= rule.freeAbove;
  const deliveryFee = isFreeDelivery ? 0 : rule.charge;

  return {
    deliveryFee,
    freeAbove: rule.freeAbove,
    minimumOrder: rule.minimumOrder,
    belowMinimum: false,
    message: isFreeDelivery
      ? "You got free delivery"
      : `Delivery charge is ${rule.charge} SR`,
  };
};

module.exports = {
  getDeliveryRule,
  getDeliveryInfo,
};
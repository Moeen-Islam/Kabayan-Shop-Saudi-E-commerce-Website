export const normalizeAreaName = (areaName = "") => {
  return areaName.trim().toLowerCase().replace(/\s+/g, " ");
};

export const getDeliveryInfo = (areaName = "", subTotal = 0) => {
  const area = normalizeAreaName(areaName);

  const rules = {
    riyadh: { charge: 15, freeAbove: 130, minimumOrder: 50 },
    jeddah: { charge: 25, freeAbove: 180, minimumOrder: 70 },
    dammam: { charge: 20, freeAbove: 180, minimumOrder: 70 },
    hofuf: { charge: 25, freeAbove: 180, minimumOrder: 70 },
    buraydah: { charge: 25, freeAbove: 180, minimumOrder: 100 },
  };

  const selectedRule = rules[area] || {
    charge: 30,
    freeAbove: Infinity,
    minimumOrder: 300,
  };

  const isFreeDelivery = subTotal >= selectedRule.freeAbove;
  const deliveryFee = isFreeDelivery ? 0 : selectedRule.charge;

  const belowMinimum =
    selectedRule.minimumOrder > 0 && subTotal < selectedRule.minimumOrder;

  return {
    areaType: rules[area] ? "known" : "other",
    deliveryFee,
    freeAbove: selectedRule.freeAbove,
    minimumOrder: selectedRule.minimumOrder,
    belowMinimum,
    message: belowMinimum
      ? `Minimum order for this area is ${selectedRule.minimumOrder} SR`
      : isFreeDelivery
      ? "You got free delivery"
      : `Delivery charge is ${selectedRule.charge} SR`,
  };
};
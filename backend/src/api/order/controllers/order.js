"use strict";

const { createCoreController } = require("@strapi/strapi").factories;
const { getDeliveryInfo } = require("../../../utils/delivery");

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async createPublicOrder(ctx) {
    try {
      const body = ctx.request.body;

      if (!body.customerName || !body.whatsapp || !body.areaName) {
        return ctx.badRequest("Missing required customer information");
      }

      if (!body.location || !body.location.lat || !body.location.lng) {
        return ctx.badRequest("Pinned location is required");
      }

      if (!Array.isArray(body.items) || body.items.length === 0) {
        return ctx.badRequest("Cart is empty");
      }

      const normalizedItems = body.items.map((item) => ({
        productTitle: item.productTitle,
        productSlug: item.productSlug || "",
        sku: item.sku || "",
        colorName: item.colorName || "",
        size: item.size || "",
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
        lineTotal: (Number(item.price) || 0) * (Number(item.quantity) || 1),
        thumbnailUrl: item.thumbnailUrl || "",
      }));

      const subTotal = normalizedItems.reduce(
        (sum, item) => sum + item.lineTotal,
        0
      );

      const deliveryInfo = getDeliveryInfo(body.areaName, subTotal);

      if (deliveryInfo.belowMinimum) {
        return ctx.badRequest(deliveryInfo.message);
      }

      const deliveryFee = deliveryInfo.deliveryFee;
      const grandTotal = subTotal + deliveryFee;
      const orderNumber = `KSS-${Date.now()}`;

      const createdOrder = await strapi.documents("api::order.order").create({
        data: {
          orderNumber,
          guestCustomerId: body.guestCustomerId || "",
          customerName: body.customerName,
          whatsapp: body.whatsapp,
          areaName: body.areaName,
          houseNo: body.houseNo || "",
          paymentMethod: body.paymentMethod || "COD",
          locationAddress: body.location.locationUrl || "",
          locationLat: body.location.lat,
          locationLng: body.location.lng,
          locationUrl: body.location.locationUrl || "",
          orderStatus: "pending",
          items: normalizedItems,
          subTotal,
          deliveryFee,
          grandTotal,
          notes: body.notes || "",
        },
        status: "published",
      });

      ctx.body = {
        success: true,
        orderNumber,
        order: createdOrder,
        totals: {
          subTotal,
          deliveryFee,
          grandTotal,
        },
      };
    } catch (error) {
      console.error("Create public order error:", error);
      ctx.internalServerError("Failed to create order");
    }
  },
}));
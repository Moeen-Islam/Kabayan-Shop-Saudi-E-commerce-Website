import type { Schema, Struct } from '@strapi/strapi';

export interface OrderItem extends Struct.ComponentSchema {
  collectionName: 'components_order_items';
  info: {
    displayName: 'item';
  };
  attributes: {
    colorName: Schema.Attribute.String;
    lineTotal: Schema.Attribute.Decimal;
    price: Schema.Attribute.Decimal;
    productSlug: Schema.Attribute.String;
    productTitle: Schema.Attribute.String;
    quantity: Schema.Attribute.Integer;
    size: Schema.Attribute.String;
    sku: Schema.Attribute.String;
    thumbnailUrl: Schema.Attribute.String;
  };
}

export interface ProductVariant extends Struct.ComponentSchema {
  collectionName: 'components_product_variants';
  info: {
    displayName: 'variant';
  };
  attributes: {
    colorCode: Schema.Attribute.String;
    colorName: Schema.Attribute.String;
    price: Schema.Attribute.Decimal;
    size: Schema.Attribute.Enumeration<
      ['S', 'M', 'L', 'XL', 'XXL', 'Free Size']
    >;
    sku: Schema.Attribute.String;
    stock: Schema.Attribute.Integer;
    variantImage: Schema.Attribute.Media<'images'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'order.item': OrderItem;
      'product.variant': ProductVariant;
    }
  }
}

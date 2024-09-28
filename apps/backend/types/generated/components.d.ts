import type { Struct, Schema } from '@strapi/strapi';

export interface CommonSocialMediaLink extends Struct.ComponentSchema {
  collectionName: 'components_common_social_media_links';
  info: {
    displayName: 'Social Media Link';
  };
  attributes: {
    Platform: Schema.Attribute.String;
    Link: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'common.social-media-link': CommonSocialMediaLink;
    }
  }
}

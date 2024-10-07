import type { Struct, Schema } from '@strapi/strapi';

export interface CommonSocialMediaLink extends Struct.ComponentSchema {
  collectionName: 'components_common_social_media_links';
  info: {
    displayName: 'Social Media Link';
    description: '';
  };
  attributes: {
    platform: Schema.Attribute.String;
    link: Schema.Attribute.String;
  };
}

export interface CommonExhibitions extends Struct.ComponentSchema {
  collectionName: 'components_common_exhibitions';
  info: {
    displayName: 'exhibitions';
  };
  attributes: {
    title: Schema.Attribute.String;
    description: Schema.Attribute.String;
    opening_date: Schema.Attribute.Date;
    closing_date: Schema.Attribute.Date;
    type: Schema.Attribute.Enumeration<
      [
        'Solo',
        'Group',
        'Duo',
        'Juried',
        'Invitational',
        'Biennale',
        'Retrospective',
        'Online',
      ]
    >;
    venue: Schema.Attribute.String;
    location: Schema.Attribute.String;
    curator: Schema.Attribute.String;
    artworks: Schema.Attribute.Relation<'oneToMany', 'api::artwork.artwork'>;
    link: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'common.social-media-link': CommonSocialMediaLink;
      'common.exhibitions': CommonExhibitions;
    }
  }
}

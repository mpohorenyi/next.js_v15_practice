/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: 'sanity.imagePaletteSwatch';
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: 'sanity.imagePalette';
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: 'sanity.imageDimensions';
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityImageHotspot = {
  _type: 'sanity.imageHotspot';
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageCrop = {
  _type: 'sanity.imageCrop';
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: 'sanity.fileAsset';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type SanityImageAsset = {
  _id: string;
  _type: 'sanity.imageAsset';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityImageMetadata = {
  _type: 'sanity.imageMetadata';
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type Geopoint = {
  _type: 'geopoint';
  lat?: number;
  lng?: number;
  alt?: number;
};

export type SanityAssetSourceData = {
  _type: 'sanity.assetSourceData';
  name?: string;
  id?: string;
  url?: string;
};

export type Idea = {
  _id: string;
  _type: 'idea';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  author?: {
    _ref: string;
    _type: 'reference';
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: 'author';
  };
  views?: number;
  summary?: string;
  category?: {
    _ref: string;
    _type: 'reference';
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: 'category';
  };
  image?: string;
  content?: string;
};

export type Category = {
  _id: string;
  _type: 'category';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  description?: string;
};

export type Slug = {
  _type: 'slug';
  current?: string;
  source?: string;
};

export type Author = {
  _id: string;
  _type: 'author';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  image?: string;
  bio?: string;
};

export type Markdown = string;

export type AllSanitySchemaTypes =
  | SanityImagePaletteSwatch
  | SanityImagePalette
  | SanityImageDimensions
  | SanityImageHotspot
  | SanityImageCrop
  | SanityFileAsset
  | SanityImageAsset
  | SanityImageMetadata
  | Geopoint
  | SanityAssetSourceData
  | Idea
  | Category
  | Slug
  | Author
  | Markdown;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ./sanity/queries/ideas.ts
// Variable: IDEAS_QUERY
// Query: *[_type == "idea" && defined(slug.current)]  | order(_createdAt desc) {    'id': _id,    title,    'slug': slug.current,    author -> {      'id': _id,      name,      image,      bio    },    views,    summary,    'category': category -> { title }.title,    image,    'createdAt': _createdAt,  }[select(    defined($search) => title match ('*' + $search + '*')      || category match ('*' + $search + '*')      || author.name match ('*' + $search + '*'),    true  )]
export type IDEAS_QUERYResult = Array<{
  id: string;
  title: string | null;
  slug: string | null;
  author: {
    id: string;
    name: string | null;
    image: string | null;
    bio: string | null;
  } | null;
  views: number | null;
  summary: string | null;
  category: string | null;
  image: string | null;
  createdAt: string;
}>;

// Query TypeMap
import '@sanity/client';
declare module '@sanity/client' {
  interface SanityQueries {
    "*[_type == \"idea\" && defined(slug.current)]\n  | order(_createdAt desc) {\n    'id': _id,\n    title,\n    'slug': slug.current,\n    author -> {\n      'id': _id,\n      name,\n      image,\n      bio\n    },\n    views,\n    summary,\n    'category': category -> { title }.title,\n    image,\n    'createdAt': _createdAt,\n  }[select(\n    defined($search) => title match ('*' + $search + '*')\n      || category match ('*' + $search + '*')\n      || author.name match ('*' + $search + '*'),\n    true\n  )]": IDEAS_QUERYResult;
  }
}

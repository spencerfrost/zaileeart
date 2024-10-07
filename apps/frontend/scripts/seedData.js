import { useStrapi } from '#imports';

// Placeholder data for Artist Profile
const artistProfileData = {
  Name: "Zailee Art",
  Biography: "Zailee is a contemporary artist known for vibrant, abstract paintings inspired by nature and urban landscapes. With a career spanning over a decade, Zailee's work has been featured in galleries across the country and in private collections worldwide.",
  Contact: "zailee@example.com",
  Socials: [
    { platform: "Instagram", url: "https://instagram.com/zaileeart" },
    { platform: "Twitter", url: "https://twitter.com/zaileeart" },
    { platform: "Facebook", url: "https://facebook.com/zaileeart" }
  ]
};

// Placeholder data for Artworks
const artworksData = [
  {
    Name: "Urban Jungle",
    Description: "A vibrant depiction of city life intertwined with nature.",
    Year: 2023,
    Medium: "Acrylic on canvas",
    Dimensions: "48x36 inches",
    Availability: "Available",
    Price: 2500
  },
  {
    Name: "Coastal Dreams",
    Description: "An abstract interpretation of a serene coastline at sunset.",
    Year: 2022,
    Medium: "Oil on canvas",
    Dimensions: "36x24 inches",
    Availability: "Sold",
    Price: 1800
  },
  {
    Name: "Neon Nights",
    Description: "A dynamic piece capturing the energy of a city after dark.",
    Year: 2024,
    Medium: "Mixed media",
    Dimensions: "40x30 inches",
    Availability: "On Exhibition",
    Price: 3000
  }
];

// Placeholder data for Blog Posts
const blogPostsData = [
  {
    Title: "Finding Inspiration in Everyday Life",
    Content: "As an artist, I often get asked where I find inspiration for my work. The truth is, inspiration is all around us...",
    Published: "2024-03-15"
  },
  {
    Title: "The Evolution of My Artistic Style",
    Content: "When I look back at my earlier works, I'm amazed at how much my style has evolved over the years...",
    Published: "2024-02-28"
  },
  {
    Title: "Behind the Scenes: Creating 'Urban Jungle'",
    Content: "In this post, I want to take you behind the scenes of my latest piece, 'Urban Jungle'. This painting was born from...",
    Published: "2024-01-10"
  }
];

// Function to seed data
async function seedData() {
  const { create } = useStrapi();

  try {
    // Seed Artist Profile
    const artistProfile = await create('artist-profiles', { data: artistProfileData });
    console.log('Artist Profile created:', artistProfile);

    // Seed Artworks
    for (const artwork of artworksData) {
      const newArtwork = await create('artworks', { data: artwork });
      console.log('Artwork created:', newArtwork);
    }

    // Seed Blog Posts
    for (const post of blogPostsData) {
      const newPost = await create('blog-posts', { data: post });
      console.log('Blog Post created:', newPost);
    }

    console.log('Data seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

// Call the seed function
seedData();
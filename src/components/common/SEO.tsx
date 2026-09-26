import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Tanush Fitness | Commercial & Residential Gym Equipment & B2B Services',
  description = "India's premier Commercial & Residential Gym marketplace. Source commercial equipment, recruit certified trainers, and launch AI WhatsApp lead generation funnels.",
  keywords = 'Commercial & Residential Gym equipment, gym manpower hiring, fitness B2B, gym design, tanush fitness',
  ogImage = 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
}) => {
  useEffect(() => {
    // Update Title
    document.title = title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update Meta Keywords
    let metaKey = document.querySelector('meta[name="keywords"]');
    if (!metaKey) {
      metaKey = document.createElement('meta');
      metaKey.setAttribute('name', 'keywords');
      document.head.appendChild(metaKey);
    }
    metaKey.setAttribute('content', keywords);

    // Injects JSON-LD Structured Data
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Tanush Fitness B2B Private Limited',
      url: 'https://tanush-fitness-b2b.vercel.app',
      logo: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
      description: description,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-7383249680',
        contactType: 'Customer Service',
      },
    };

    let scriptTag = document.getElementById('json-ld-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('id', 'json-ld-schema');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);
  }, [title, description, keywords, ogImage]);

  return null;
};

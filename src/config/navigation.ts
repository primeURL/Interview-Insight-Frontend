/**
 * Navigation Configuration
 *
 * @description
 * Centralized navigation configuration for header and footer.
 * All navigation items are defined here for consistency and easy maintenance.
 *
 * Items with a `feature` property will only be shown if that feature is enabled
 * in the site config's feature flags.
 */

import type { Navigation } from '../lib/types';

export const navigation: Navigation = {
  /**
   * Header Navigation
   * - main: Primary navigation links
   * - cta: Call-to-action buttons on the right
   */
  header: {
    main: [
      { label: 'How It Works', href: '/#how-it-works' },
      { label: 'Interview Prep', href: '/interview-prep' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog', feature: 'blog' },
    ],
    cta: [
      { label: 'Login', href: '/login', variant: 'ghost' },
      { label: 'Get Started', href: '/interview-prep', variant: 'primary' },
    ],
  },

  /**
   * Footer Navigation
   * Organized into 5 columns: Product, Solutions, Resources, Company, Legal
   */
  footer: {
    product: [
      { label: 'Interview Prep', href: '/interview-prep' },
      { label: 'How It Works', href: '/#how-it-works' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'FAQ', href: '/faq' },
    ],
    solutions: [
      { label: 'For Job Seekers', href: '/interview-prep' },
      { label: 'For Career Changers', href: '/interview-prep' },
      { label: 'Success Stories', href: '/testimonials', feature: 'testimonials' },
    ],
    resources: [
      { label: 'Blog', href: '/blog', feature: 'blog' },
      { label: 'Changelog', href: '/changelog', feature: 'changelog' },
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Testimonials', href: '/testimonials', feature: 'testimonials' },
    ],
    legal: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
};

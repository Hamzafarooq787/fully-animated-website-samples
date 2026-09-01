import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/google-ads/Breadcrumbs";
import GoogleAdsHero from "@/components/google-ads/Hero";
import GoogleAdsJourney from "@/components/google-ads/Journey";
import GoogleAdsServicesGrid from "@/components/google-ads/ServicesGrid";
import GoogleAdsDashboard from "@/components/google-ads/Dashboard";
import WhyChooseUs from "@/components/google-ads/WhyChooseUs";
import ProcessRoute from "@/components/google-ads/ProcessRoute";
import CaseStudies from "@/components/google-ads/CaseStudies";
import Pricing from "@/components/google-ads/Pricing";
import GoogleAdsFaq from "@/components/google-ads/GoogleAdsFaq";
import GoogleAdsFinalCta from "@/components/google-ads/FinalCta";
import { faqs } from "@/data/google-ads-content";

const SITE_URL = "https://www.northstardigital.co.uk";
const PAGE_URL = `${SITE_URL}/services/google-ads`;

export const metadata: Metadata = {
  title: "Google Ads Management Agency | Northstar Digital",
  description:
    "Professional Google Ads management from Northstar Digital — search, shopping, and Performance Max campaigns built to turn clicks into paying customers. Get a free ads audit.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Google Ads Management Agency | Northstar Digital",
    description:
      "Search, shopping, and Performance Max campaigns built to turn clicks into paying customers. Get a free Google Ads audit from Northstar Digital.",
    url: PAGE_URL,
    siteName: "Northstar Digital",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Google Ads Management",
  name: "Google Ads Management",
  provider: {
    "@type": "Organization",
    name: "Northstar Digital",
    url: SITE_URL,
  },
  areaServed: "GB",
  url: PAGE_URL,
  description:
    "Professional Google Ads management covering search, display, shopping, Performance Max, remarketing, and local lead campaigns.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: `${SITE_URL}/#services`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Google Ads Management",
      item: PAGE_URL,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function GoogleAdsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />
      <main className="flex-1 pt-18">
        <Breadcrumbs />
        <GoogleAdsHero />
        <GoogleAdsJourney />
        <GoogleAdsServicesGrid />
        <GoogleAdsDashboard />
        <WhyChooseUs />
        <ProcessRoute />
        <CaseStudies />
        <Pricing />
        <GoogleAdsFaq />
        <GoogleAdsFinalCta />
      </main>
      <Footer />
    </>
  );
}

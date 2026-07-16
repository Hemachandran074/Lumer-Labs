export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Lumer Labs",
    "url": "https://www.lumerlabs.in",
    "logo": "https://www.lumerlabs.in/icon.svg",
    "description":
      "Lumer Labs is a growth and creative agency specializing in AI solutions, web development, branding, UI/UX, automation, SaaS development, and digital marketing.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
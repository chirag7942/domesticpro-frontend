// src/components/SEO.jsx
import { Helmet } from 'react-helmet-async';

const DEFAULT_DESCRIPTION =
    "Hire verified, background-checked live-in maids, baby caretakers, cooks, patient care & japa helpers across Delhi NCR. Domestic Pro — trusted by 1000+ families.";

const DEFAULT_IMAGE = "https://domesticpro.in/updatedLogo.png";

export default function SEO({
    title,
    description,
    canonical,
    ogImage = DEFAULT_IMAGE,
    noIndex = false,
    schema,
}) {
    const fullTitle = title
        ? `${title} | DomesticPro`
        : "DomesticPro — Verified 24×7 Live-In Domestic Helpers";

    const fullDescription = description || DEFAULT_DESCRIPTION;
    const fullCanonical = canonical ? `https://domesticpro.in${canonical}` : undefined;

    const schemas = schema
        ? Array.isArray(schema) ? schema : [schema]
        : [];

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={fullDescription} />
            <meta
                name="robots"
                content={noIndex ? "noindex, nofollow" : "index, follow"}
            />
            {fullCanonical && <link rel="canonical" href={fullCanonical} />}

            {/* Open Graph */}
            <meta property="og:site_name" content="DomesticPro" />
            <meta property="og:locale" content="en_IN" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={fullDescription} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            {fullCanonical && <meta property="og:url" content={fullCanonical} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={fullDescription} />
            <meta name="twitter:image" content={ogImage} />

            {/* JSON-LD */}
            {schemas.map((s, i) => (
                <script key={i} type="application/ld+json">
                    {JSON.stringify(s)}
                </script>
            ))}
        </Helmet>
    );
}
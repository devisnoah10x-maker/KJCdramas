import { site } from '../data/site';
import { Shell } from '../components/ui/Section';
import { PageHeader } from '../components/ui/PageHeader';
import { breadcrumbSchema } from '../components/ui/Breadcrumbs';
import { Seo } from '../components/seo/Seo';
import { ButtonLink } from '../components/ui/Button';

type LegalKey = 'privacy' | 'terms' | 'dmca';

const pages: Record<
  LegalKey,
  {title: string;intro: string;description: string;sections: {heading: string;body: string[];}[];}> =
{
  privacy: {
    title: 'Privacy Policy',
    description:
    'How KJCDramas collects, uses and protects information, including analytics, advertising and cookies.',
    intro:
    'This policy explains what we collect, why, and how to opt out. Last updated 20 August 2026.',
    sections: [
    {
      heading: 'What we collect',
      body: [
      'Anonymous usage analytics: pages visited, referring source, approximate country, device type and session duration. We do not collect names, addresses or payment details.',
      'If you subscribe to our newsletter, we store the email address you provide and nothing else. If you contact us, we keep the message until the matter is resolved.']

    },
    {
      heading: 'Cookies and advertising',
      body: [
      'We use a small number of first-party cookies for site preferences, and our advertising partners may set their own cookies to measure ad performance. Advertising is served by third-party networks; their own privacy policies govern the data they collect.',
      'You can block cookies in your browser settings. The site remains fully usable with cookies disabled.']

    },
    {
      heading: 'Data storage and security',
      body: [
      'Data is stored on managed infrastructure with encryption in transit over HTTPS. We do not store sensitive personal data in your browser and we never sell personal information.']

    },
    {
      heading: 'Your rights',
      body: [
      'You can request a copy of any data associated with your email address, or ask us to delete it, by contacting us. We respond within 30 days.']

    }]

  },
  terms: {
    title: 'Terms of Use',
    description: 'The terms that govern your use of KJCDramas, including acceptable use and content ownership.',
    intro: 'By using KJCDramas you agree to these terms. Last updated 20 August 2026.',
    sections: [
    {
      heading: 'What this site is',
      body: [
      'KJCDramas is an informational discovery platform for Korean, Japanese and Chinese dramas and films. We publish descriptions, metadata, editorial commentary, promotional stills and short clips. We are not a streaming service and we do not host full episodes.']

    },
    {
      heading: 'Acceptable use',
      body: [
      'Do not scrape the site at scale, attempt to bypass security controls, or republish our editorial content without attribution and a link. Automated access that degrades service for other users may be rate-limited or blocked.']

    },
    {
      heading: 'Content ownership',
      body: [
      'Posters, stills, trailers and clips remain the property of their respective rights holders and are used for identification and commentary. Editorial text and site design are owned by KJCDramas.']

    },
    {
      heading: 'Accuracy and liability',
      body: [
      'We work hard to keep cast lists, episode counts and release dates accurate, but we provide the site "as is". We are not liable for decisions made on the basis of information published here.']

    }]

  },
  dmca: {
    title: 'DMCA / Copyright',
    description:
    'How to submit a copyright takedown notice to KJCDramas and how quickly we act on valid requests.',
    intro:
    'We respect copyright and act quickly on valid notices — normally within 48 hours. Last updated 20 August 2026.',
    sections: [
    {
      heading: 'Our position',
      body: [
      'KJCDramas does not host, stream or link to unauthorised full episodes or films. We publish metadata, promotional imagery and short excerpts for the purpose of identification, review and commentary.']

    },
    {
      heading: 'How to file a notice',
      body: [
      'Send us a message using the Contact form with the topic "Copyright / DMCA" and include: the exact URL of the material, a description of the copyrighted work, proof you own or represent the owner, your contact details, and a statement made in good faith that the use is not authorised.']

    },
    {
      heading: 'What happens next',
      body: [
      'We acknowledge every valid notice, remove or disable the material within 48 hours, and confirm in writing when it is done. Repeat infringement by any contributor results in permanent removal of publishing access.']

    },
    {
      heading: 'Counter-notices',
      body: [
      'If material was removed in error, you may submit a counter-notice with the same contact details and an explanation. We will review it and restore the material where appropriate.']

    }]

  }
};

export function LegalPage({ page }: {page: LegalKey;}) {
  const content = pages[page];
  const crumbs = [{ label: 'Home', to: '/' }, { label: content.title }];

  return (
    <Shell>
      <Seo
        title={content.title}
        description={content.description}
        canonical={`${site.url}/${page}/`}
        schema={breadcrumbSchema(crumbs)} />
      
      <PageHeader title={content.title} crumbs={crumbs} intro={content.intro} />

      <div className="max-w-3xl py-10 pb-16">
        {content.sections.map((section) =>
        <section key={section.heading} className="mb-8">
            <h2 className="font-display text-xl font-bold text-white">{section.heading}</h2>
            {section.body.map((p, i) =>
          <p key={i} className="mt-3 text-[15px] leading-[1.75] text-mist-bright">
                {p}
              </p>
          )}
          </section>
        )}

        <div className="rounded-card border border-line-soft bg-ink-900 p-6">
          <h2 className="font-display text-base font-bold text-white">Need to reach a person?</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-mist">
            Every message goes to the team directly — no ticket queue.
          </p>
          <ButtonLink to="/contact" size="sm" className="mt-4">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </Shell>);

}
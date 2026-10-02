# Lead tracking

The two Netlify forms are progressively enhanced by `src/scripts/lead-submission.mjs`.
Without supported JavaScript they keep their native POST/redirect behaviour.

- The wizard validates and updates derived fields before the document-level submit handler.
- An accepted HTTP POST emits `generate_lead` only when analytics consent is granted.
- This means Netlify accepted the request; it does not prove sales qualification or email delivery.
- Invalid forms, rejected/network-failed POSTs and direct thank-you page visits do not emit this event.
- Duplicate clicks are blocked while a request is pending. Fields remain populated after failure.
- Analytics/storage errors cannot cancel an already accepted request.
- The analytics payload is limited to form name and language; no customer data is sent.
- Add `?qa=1` to a page when testing: the submission still reaches Netlify but does not emit `generate_lead`.
- Netlify notifications and spam classification remain independent. Check the Forms dashboard when investigating a missing notification.

## GA4 administration

Use `generate_lead` as the lead key event. Remove any old `form_submit` or `devis_wizard_submit` key-event configuration if present. GA4 enhanced measurement can still produce its own interaction events; these must not be used as accepted leads. The repository change does not change account-level GA4 settings.

## Verification on 2026-10-03

- Unit tests cover URL encoding, failed HTTP/network responses, consent, test exclusion and absence of premature/thank-you conversion triggers.
- Static SEO audit checks all 101 generated pages.
- English short-form preview submission reached `/en/thank-you/` and the notification was received at `contact@transportcarcassonne.fr`, including the submitted email and selected marketplace service.
- Internal tests are labelled `TEST TECHNIQUE TC 2026-10-03`; they are not customer bookings.

Lead acknowledgement, reminders and review-request automation are deliberately deferred.

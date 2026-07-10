# Gmail Inquiry Tagging

The site contact links can use Gmail plus-addressing so inquiries are easy to
identify in the inbox.

## Contact Address

Use this address in site contact links:

```text
tbrunia+ai-consulting@gmail.com
```

Messages sent to this address will arrive in the normal `tbrunia@gmail.com`
inbox. Gmail keeps the full `To` address, which makes it possible to create a
filter for messages that came from the site.

## Create a Gmail Filter

1. Open Gmail.
2. Select the settings gear.
3. Select **See all settings**.
4. Open **Filters and Blocked Addresses**.
5. Select **Create a new filter**.
6. In the **To** field, enter:

```text
tbrunia+ai-consulting@gmail.com
```

7. Select **Create filter**.
8. Choose **Apply the label**.
9. Create or select a label such as:

```text
AI Consulting
```

10. Optionally choose **Never send it to Spam**.
11. Select **Create filter**.

## Optional Subject Filter

The current site contact link can also include a default subject:

```text
AI workflow inquiry
```

Filtering by the plus-addressed `To` field is usually more reliable than
filtering by subject because senders can edit the subject before sending.

## Automated Processing Options

Gmail filters are useful for labeling, archiving, forwarding, starring, and
similar inbox actions. They do not directly send matching messages to an
arbitrary webhook.

There are two practical ways to automate site inquiries after they arrive.

## Option 1: Google Apps Script Polling

This is the simplest path for a small consulting site.

Use a Gmail filter to apply the `AI Consulting` label, then create a Google
Apps Script that runs on a time-based trigger. The script searches Gmail for
new labeled messages and sends selected details to a webhook using
`UrlFetchApp`.

Google documentation:

- GmailApp can search Gmail with the same query syntax used in Gmail search:
  https://developers.google.com/apps-script/reference/gmail/gmail-app#searchquery
- UrlFetchApp can make HTTP and HTTPS requests, including POST requests:
  https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app
- Apps Script supports installable time-driven triggers:
  https://developers.google.com/apps-script/guides/triggers/installable

Example approach:

1. Gmail filter applies the `AI Consulting` label.
2. Apps Script runs every 5 or 15 minutes.
3. The script searches for unread or unprocessed labeled inquiries.
4. The script POSTs a small JSON payload to a webhook.
5. The script marks the email as processed by applying another label, such as
   `AI Consulting/Processed`.

Example Gmail search query:

```text
to:tbrunia+ai-consulting@gmail.com label:"AI Consulting" -label:"AI Consulting/Processed"
```

Example Apps Script sketch:

```javascript
const WEBHOOK_URL = "https://example.com/webhook";

function sendNewAiConsultingInquiries() {
  const query =
    'to:tbrunia+ai-consulting@gmail.com label:"AI Consulting" -label:"AI Consulting/Processed"';
  const processedLabel =
    GmailApp.getUserLabelByName("AI Consulting/Processed") ||
    GmailApp.createLabel("AI Consulting/Processed");

  const threads = GmailApp.search(query, 0, 10);

  for (const thread of threads) {
    const message = thread.getMessages().at(-1);

    if (!message) {
      continue;
    }

    const payload = {
      from: message.getFrom(),
      subject: message.getSubject(),
      receivedAt: message.getDate().toISOString(),
      body: message.getPlainBody(),
      threadId: thread.getId(),
    };

    UrlFetchApp.fetch(WEBHOOK_URL, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
    });

    thread.addLabel(processedLabel);
  }
}
```

Notes:

- Treat email content as sensitive. Only send the fields the downstream system
  actually needs.
- Protect the webhook with a secret token or another authentication mechanism.
- Add error handling before relying on this for production processing.
- Apps Script polling is not instant. It is usually good enough for lead
  triage.

## Option 2: Gmail API Push Notifications

This is the more robust engineering option.

The Gmail API can watch mailbox changes and publish notifications through
Google Cloud Pub/Sub. Pub/Sub can deliver notifications to a webhook endpoint.
After receiving a notification, the application uses the Gmail API to fetch the
message changes and process matching inquiries.

Google documentation:

- Gmail API push notifications:
  https://developers.google.com/workspace/gmail/api/guides/push

Important details:

- Gmail API push notifications send mailbox change notifications, not the full
  email body.
- The webhook receives a Pub/Sub message containing the email address and a
  Gmail history ID.
- The application must call the Gmail API to retrieve the relevant message
  details.
- The Gmail watch must be renewed at least every 7 days; Google recommends
  renewing it daily.

This option is better if inquiries become important enough to justify a small
backend service, Google Cloud setup, OAuth handling, storage of processed
history IDs, retries, and monitoring.

## Recommendation

Start with Gmail plus-addressing, a Gmail label, and a manual filter. If
automation becomes useful, use Apps Script polling first. Move to Gmail API
push notifications only when near-real-time processing or production-grade
integration is worth the extra operational complexity.

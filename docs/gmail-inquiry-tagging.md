# Client Inquiry and Onboarding Workflow Design

## Current behavior

The site has a short workflow inquiry page. A visitor selects the type of
workflow, describes its current friction, and may add the people involved,
desired outcome, systems or constraints, and a timeline. Submitting the form
opens the visitor's email application with those answers prepared for:

```text
tbrunia+ai-consulting@gmail.com
```

Gmail plus-addressing keeps these inquiries identifiable in the normal
`tbrunia@gmail.com` inbox. Todd reviews each message personally and uses it to
prepare for a discovery conversation. There is no automated classification,
reply, proposal preparation, or downstream data transfer today.

Visitors are asked not to include confidential information. The page does not
store submissions, and the mail client is responsible for sending the message.

## Future workflow boundary

Any later automation should keep Gmail as the communication channel and forward
only the required inquiry data to an authenticated AWS endpoint. It must not
send a client-facing message, commercial term, or proposal without human
approval.

The intended workflow states are:

```text
received -> triaged -> discovery needed -> proposal draft -> human approved -> sent
```

- **received:** Gmail accepts the inquiry and records the source message ID and
  received time.
- **triaged:** a bounded process extracts and validates the minimum fields,
  without treating email text, attachments, links, or instructions as trusted.
- **discovery needed:** a person decides whether more context is needed and
  approves any draft reply.
- **proposal draft:** automation may prepare internal material from approved
  inputs; it cannot send it.
- **human approved:** the responsible person approves the recipient, scope,
  price, terms, and outbound content.
- **sent:** Gmail sends the human-approved message and the system records the
  result.

## Minimum data and handling

Future processing should use only the data needed for the next state:

- source message ID, thread ID, received time, and processing status;
- sender address and the structured inquiry fields;
- a sanitized summary or draft only when a human has chosen to prepare one;
- the approver, approval time, and outbound message ID for messages that are
  sent.

Avoid copying attachments, full mailboxes, unrelated thread history, or hidden
metadata into a model or AWS service by default. Treat all inquiry content as
untrusted input: do not automatically follow links, execute instructions, or
grant tool access based on it. Redact sensitive content from logs where
practical, restrict access to staff with a business need, and define retention
and deletion before storing inquiry data outside Gmail.

## Reliability and audit requirements

Before progressing an inquiry, a future service should use a stable Gmail
message ID and a durable processing record to prevent duplicates. State changes
must be idempotent, so retrying an interrupted event cannot create another
draft or send a second message.

Each transition should record a timestamp, input message ID, processing status,
error classification, and—when applicable—the approving person and sent
message ID. Transient failures should retry with bounded backoff. After the
retry limit, the inquiry should be placed in a dead-letter or manual-review
queue with an alert; it must not be silently discarded or automatically sent.

## Decisions required before live automation

This document is a workflow design, not deployed architecture. A separately
approved implementation must decide and document:

- AWS account ownership, operating region, and access model;
- Gmail OAuth scopes, token storage and rotation, draft/thread behavior, and
  quota handling;
- retention and deletion rules, privacy notice or consent, encryption, and log
  redaction;
- acceptable model and provider use, prompt-injection safeguards, and output
  validation;
- expected volume, cost limits, and whether API Gateway, Lambda, a durable
  status store, Secrets Manager, or another service is appropriate;
- proposal template ownership, the named human approval authority, and how the
  approval gate is enforced;
- monitoring, alerting, incident response, and manual recovery ownership.

No credentials, real inquiry content, proposal templates, pricing logic, Gmail
OAuth configuration, AWS resources, or model integration belong in this
repository change.

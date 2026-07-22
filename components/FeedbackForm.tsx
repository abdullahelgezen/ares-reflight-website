"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_EMAIL_CONFIGURED } from "@/content/site";

const categories = [
  "Technical correction",
  "Design suggestion",
  "Safety concern",
  "Documentation issue",
  "Research reference",
  "Collaboration proposal",
  "Accessibility feedback",
  "General comment",
];

export function FeedbackForm() {
  const [anonymous, setAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    if (values.get("website")) return;
    const category = String(values.get("category") || "General comment");
    const body = [
      `Identity: ${anonymous ? "Anonymous" : String(values.get("name") || "Not provided")}`,
      `Reply email: ${String(values.get("email") || "Not provided")}`,
      `Category: ${category}`,
      `Reference: ${String(values.get("reference") || "Not provided")}`,
      `Public attribution consent: ${values.get("attribution") ? "Yes" : "No"}`,
      "",
      String(values.get("message") || ""),
    ].join("\n");
    setSubmitted(true);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`[ARES feedback] ${category}`)}&body=${encodeURIComponent(body)}`;
  }

  if (submitted) {
    return <div className="feedback-confirmation" role="status"><CheckCircle2 aria-hidden="true" /><h2>Your feedback draft is ready.</h2><p>Your email application should open with the message prepared. The website has not stored or submitted your response. Delivery to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> is not confirmed because mailbox configuration is pending.</p><Link href="/corrections">Review the public corrections log <ArrowRight size={14} /></Link><button type="button" onClick={() => setSubmitted(false)}>Prepare another message</button></div>;
  }

  return (
    <form className="feedback-form" onSubmit={submit}>
      <div className="feedback-field feedback-span"><fieldset><legend>How should we identify you?</legend><label><input type="radio" name="identity" value="named" checked={!anonymous} onChange={() => setAnonymous(false)} /> Use my name</label><label><input type="radio" name="identity" value="anonymous" checked={anonymous} onChange={() => setAnonymous(true)} /> Submit anonymously</label></fieldset></div>
      <label className="feedback-field"><span>Name</span><input name="name" autoComplete="name" disabled={anonymous} required={!anonymous} placeholder={anonymous ? "Anonymous selected" : "Your name"} /></label>
      <label className="feedback-field"><span>Email <small>optional</small></span><input name="email" type="email" autoComplete="email" placeholder="For a private reply" /></label>
      <label className="feedback-field"><span>Category</span><select name="category" required>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
      <label className="feedback-field"><span>Reference link <small>optional</small></span><input name="reference" type="url" inputMode="url" placeholder="https://" /></label>
      <label className="feedback-field feedback-span"><span>Message</span><textarea name="message" rows={8} required minLength={20} placeholder="Describe the claim, assumption, risk, evidence, or improvement as specifically as possible." /></label>
      <label className="feedback-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="feedback-consent feedback-span"><input name="attribution" type="checkbox" /><span>I consent to public attribution by name if this feedback results in a correction. Leave unchecked to keep acknowledgment anonymous.</span></label>
      <div className="feedback-privacy feedback-span"><p><b>Privacy notice.</b> This static form prepares an email in your own email application. The website does not store or submit the form contents. Email addresses are never published. Please do not include sensitive personal, operational, or security information.</p><p><b>Contact status.</b> {CONTACT_EMAIL_CONFIGURED ? `The project mailbox ${CONTACT_EMAIL} is configured.` : `Mailbox configuration for ${CONTACT_EMAIL} is pending and delivery cannot yet be confirmed.`}</p><p>A hidden honeypot field provides basic spam resistance without tracking. It is not equivalent to server-side abuse protection.</p></div>
      <button className="button button-dark feedback-span" type="submit">Prepare feedback email <ArrowRight size={16} /></button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "./ui/Button";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd)),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "border-0 border-b hairline bg-transparent py-3 text-sm focus:outline-none focus:border-brass placeholder:text-taupe/60";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8 max-w-xl">
      <label className="flex flex-col gap-2">
        <span className="tracked text-[11px] text-brass-deep">{t("name")}</span>
        <input name="name" required className={inputCls} />
      </label>
      <label className="flex flex-col gap-2">
        <span className="tracked text-[11px] text-brass-deep">
          {t("email")}
        </span>
        <input type="email" name="email" required className={inputCls} />
      </label>
      <label className="flex flex-col gap-2">
        <span className="tracked text-[11px] text-brass-deep">
          {t("message")}
        </span>
        <textarea name="message" rows={5} required className={inputCls} />
      </label>
      <div className="flex items-center gap-4">
        <Button type="submit" disabled={status === "sending"}>
          {t("send")}
        </Button>
        {status === "sent" && (
          <span className="text-xs text-brass-deep">{t("sent")}</span>
        )}
        {status === "error" && (
          <span className="text-xs text-red-700">{t("error")}</span>
        )}
      </div>
    </form>
  );
}

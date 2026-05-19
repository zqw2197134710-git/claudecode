"use client";

import { useState } from "react";
import ReserveForm from "./ReserveForm";
import ReserveConfirm from "./ReserveConfirm";

interface SuccessData {
  name: string;
  date: string;
  time: string;
  guests: number;
}

export default function ReservePageClient() {
  const [success, setSuccess] = useState<SuccessData | null>(null);

  if (success) {
    return <ReserveConfirm {...success} />;
  }

  return <ReserveForm onSuccess={setSuccess} />;
}

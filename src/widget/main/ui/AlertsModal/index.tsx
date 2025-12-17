"use client"

import { useEffect } from "react";

import { useGetAlerts } from "@/feature/alert/model/useGetAlerts";
import { useReadAlertById } from "@/feature/alert/model/useReadAlertById";
import { cn } from "@/shared/lib/cn";

export default function AlertsModal() {
  const { data: alerts } = useGetAlerts();
  const { mutate } = useReadAlertById();

  useEffect(() => {
    if (alerts && alerts.length > 0) mutate({ lastAlertId: alerts?.[alerts.length - 1].id })
  }, [alerts, mutate])

  return (
    <div className="w-96 flex flex-col bg-white border border-gray-200 rounded-xl ml-auto max-h-96">
      <div className="px-5 py-4 border-b border-gray-200">
        <p className="text-lg font-semibold">알림함</p>
      </div>
      <div className="overflow-y-auto">
        {alerts?.map((alert) => (
          <article key={alert.id} className="flex flex-col px-5 py-3 border-b border-gray-200 last:border-b-0">
            <div className="flex justify-between items-start">
              <h3 className={cn("font-semibold", alert.alertType === 'REJECTED' ? 'text-error' : "text-main-500")}>{alert.title}</h3>
              <p className="text-sm">{alert.createdAt.split("T")[0]}</p>
            </div>
            <p className="text-sm">{alert.content}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

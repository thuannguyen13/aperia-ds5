import { CircleAlertIcon } from "lucide-react"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Button,
  PageHeader,
} from "aperia-ds5"
import { Anatomy } from "../anatomy"

// The Anatomy drawing of the Banner Alerts page: an error banner alert with all four parts, under a page header. Each
// part is marked in the order of the part list in banner-alerts.md.

export const bannerAlertAnatomy = (
  <Anatomy
    targets={{
      1: { selector: "[data-slot=alert] > svg", side: "left" },
      2: {
        selector: "[data-slot=alert-title]",
        side: "top",
        align: "start",
      },
      3: {
        selector: "[data-slot=alert-description]",
        side: "bottom",
        align: "start",
      },
      4: { selector: "[data-slot=alert-action] > button", side: "top" },
    }}
  >
    <div className="@container flex w-[44rem] max-w-full flex-col gap-5 pb-4">
      <PageHeader title="Acme Renewal" subtitle="Opportunity #659" />
      <Alert variant="destructive">
        <CircleAlertIcon />
        <AlertTitle>Service Outage</AlertTitle>
        <AlertDescription>
          The file service is not responding. Try again in a few minutes.
        </AlertDescription>
        <AlertAction>
          <Button variant="outline" size="xs">
            Try Again
          </Button>
        </AlertAction>
      </Alert>
    </div>
  </Anatomy>
)

import type { ReactNode } from "react"
import {
  CircleAlertIcon,
  InfoIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  PageHeader,
} from "aperia-ds5"
import { DoDont, Example } from "../blocks"
import { DetailRow, DetailSection, IconButton, TitledCard } from "../recipes"
import { Screen } from "./before-after"
import { AppStatusColors } from "./app-status"
import { bannerAlertAnatomy } from "./banner-alerts-anatomy"

// Banner alerts: one Alert under the page header about the whole page, in one of three types. The warning's amber is
// the app's own status pair, stood in for by brand.example.css.

const WARNING =
  "bg-status-amber text-status-amber-foreground *:data-[slot=alert-description]:text-status-amber-foreground"

function Closed({ closable = false }: { closable?: boolean }) {
  return (
    <Alert role="status">
      <InfoIcon />
      <AlertTitle>Closed Opportunity</AlertTitle>
      <AlertDescription>
        Closed opportunities cannot be changed.
      </AlertDescription>
      {closable && (
        <AlertAction>
          <IconButton label="Close" size="icon-xs">
            <XIcon />
          </IconButton>
        </AlertAction>
      )}
    </Alert>
  )
}

function Stale() {
  return (
    <Alert role="status" className={WARNING}>
      <TriangleAlertIcon />
      <AlertTitle>Figures Out of Date</AlertTitle>
      <AlertDescription>
        Volume figures are from 11/22/2026. Today&apos;s figures arrive after
        6:00 AM.
      </AlertDescription>
    </Alert>
  )
}

function Outage() {
  return (
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
  )
}

function Header() {
  return (
    <PageHeader
      title="Acme Renewal"
      subtitle="Opportunity #659"
      properties={[
        [
          "Stage",
          <Badge key="stage" variant="outline">
            Closed Won
          </Badge>,
        ],
      ]}
    />
  )
}

function Details() {
  return (
    <TitledCard title="Details">
      <div className="px-4 pb-4">
        <DetailSection>
          <DetailRow label="Owner">Dana Whitfield</DetailRow>
          <DetailRow label="Close Date">10/30/2026</DetailRow>
        </DetailSection>
      </div>
    </TitledCard>
  )
}

function Page({ children }: { children: ReactNode }) {
  return (
    <div className="@container flex w-full flex-col gap-5 rounded-lg bg-background p-4">
      {children}
    </div>
  )
}

export const bannerAlertExamples = {
  "@intro": (
    <Screen caption="A closed opportunity: the banner under the page header says why the record cannot be changed, and stays while the record is closed.">
      <Header />
      <Closed />
      <Details />
    </Screen>
  ),
  "What is available": (
    <Example
      caption="The three types: information, a warning in a color pair the app sets (amber here), and an error."
      className="flex-col items-stretch"
    >
      <AppStatusColors />
      <Closed />
      <Stale />
      <Outage />
    </Example>
  ),
  Anatomy: bannerAlertAnatomy,
  "Show one banner alert, under the page header": (
    <DoDont
      stack
      good={
        <Page>
          <Header />
          <Outage />
          <Details />
        </Page>
      }
      bad={
        <Page>
          <Outage />
          <Closed />
          <Header />
          <Details />
        </Page>
      }
      badNote="two banners, stacked above the page header"
    />
  ),
  "Match the type to how much it stops": (
    <DoDont
      good={<Closed />}
      bad={
        <Alert variant="destructive">
          <CircleAlertIcon />
          <AlertTitle>Closed Opportunity</AlertTitle>
          <AlertDescription>
            Closed opportunities cannot be changed.
          </AlertDescription>
        </Alert>
      }
      badNote="a closed-record notice in the error type"
    />
  ),
  "Keep a lasting state's banner alert open": (
    <DoDont
      good={<Closed />}
      bad={<Closed closable />}
      badNote="a close button on a record that stays closed"
    />
  ),
}

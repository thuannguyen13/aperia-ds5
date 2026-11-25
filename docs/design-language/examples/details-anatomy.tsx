import { CardContent } from "aperia-ds5"
import { Anatomy } from "../anatomy"
import { DetailRow, DetailSection, EmptyValue, TitledCard } from "../recipes"

// The Anatomy drawing of the Details pattern page: a details card with two blocks of detail rows. The part list lives
// in the page's Markdown; each part is marked in the order of that list.

function DetailsDrawing() {
  return (
    <div className="w-[28rem] max-w-full text-sm">
      <TitledCard title="Prospect">
        <CardContent className="flex flex-col gap-4 pb-4">
          <DetailSection title="Details">
            <DetailRow label="Company">Northwind Payments</DetailRow>
            <DetailRow label="Owner">Dana Whitfield</DetailRow>
            <DetailRow label="Phone">
              <a href="tel:2145550142" className="text-link hover:underline">
                (214) 555-0142
              </a>
            </DetailRow>
            <DetailRow label="Website">
              <EmptyValue />
            </DetailRow>
          </DetailSection>
          <DetailSection title="Billing">
            <DetailRow label="Plan">Growth</DetailRow>
            <DetailRow label="Last Contacted">Nov 18, 2026</DetailRow>
          </DetailSection>
        </CardContent>
      </TitledCard>
    </div>
  )
}

export const detailsAnatomy = (
  <Anatomy
    targets={{
      1: { selector: '[data-slot="card"]', side: "right", align: "start" },
      2: { selector: '[data-slot="card-title"]', side: "top" },
      3: { selector: "section:nth-of-type(1) h3", side: "left" },
      4: {
        selector: "section:nth-of-type(1) dl > div:nth-child(2)",
        side: "right",
      },
      5: {
        selector: "section:nth-of-type(1) dl > div:nth-child(2) dt",
        side: "left",
      },
      6: {
        selector: "section:nth-of-type(1) dl > div:nth-child(3) dd a",
        side: "right",
      },
      7: {
        selector: "section:nth-of-type(1) dl > div:nth-child(4) dd span",
        side: "right",
      },
    }}
  >
    <DetailsDrawing />
  </Anatomy>
)

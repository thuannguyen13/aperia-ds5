import { Card, CardContent, CardTitle } from "aperia-ds5"
import { DoDont } from "../blocks"

/** A page title above a card, the card's title set as the rule says (good) or as large as the page title in medium (bad). */
function TitleAndCard({ good }: { good: boolean }) {
  return (
    <div className="grid w-full max-w-60 gap-3">
      <h1 className="text-2xl leading-9 font-semibold tracking-tight">Tasks</h1>
      <Card>
        <CardContent>
          <CardTitle className={good ? undefined : "text-2xl font-medium"}>
            Recent Activity
          </CardTitle>
          <p className="text-muted-foreground">Updated 2 hours ago</p>
        </CardContent>
      </Card>
    </div>
  )
}

/** A label and its value: the label in a step and weight the roles name (good) or in LG and bold (bad). */
function LabelAndValue({ good }: { good: boolean }) {
  return (
    <div className="grid gap-1">
      <span className={good ? "text-sm font-medium" : "text-lg font-bold"}>
        Assignee
      </span>
      <span className="text-sm">Dana Whitfield</span>
    </div>
  )
}

export const typographyRuleExamples = {
  "Use only the steps and weights the roles name": (
    <DoDont
      good={<LabelAndValue good />}
      bad={<LabelAndValue good={false} />}
    />
  ),
  "Set card titles a step below the page title": (
    <DoDont good={<TitleAndCard good />} bad={<TitleAndCard good={false} />} />
  ),
}

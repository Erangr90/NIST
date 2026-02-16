// card for displaying the top 5 important cve's information
import type { CVE } from "../types/cve"
import "../styles/cveCard.css"

function CveCard({ cve }: { cve: CVE }) {
  const { cveId, published, lastModified, descriptions, metrics } = cve
  const metric =
    metrics.cvssMetricV40?.[0] ||
    metrics.cvssMetricV31?.[0] ||
    metrics.cvssMetricV30?.[0] ||
    metrics.cvssMetricV2?.[0]
  const baseScore = metric?.cvssData?.baseScore || null

  // Format dates
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Get the first English description or fallback to first available
  const description =
    descriptions.find((desc) => desc.lang === "en")?.value ||
    descriptions[0]?.value ||
    "No description available"

  return (
    <div className="cve-card">
      <div className="cve-card-header">
        <h2 className="cve-card-id">{cveId}</h2>
        {baseScore !== null && (
          <div className="cve-card-score">
            <span className="score-value">{baseScore}</span>
          </div>
        )}
      </div>
      <div className="cve-card-body">
        <p className="cve-card-description">{description}</p>
      </div>
      <div className="cve-card-footer">
        <div className="cve-card-date">
          <span className="date-label">Published:</span>
          <span className="date-value">{formatDate(published)}</span>
        </div>
        <div className="cve-card-date">
          <span className="date-label">Last Modified:</span>
          <span className="date-value">{formatDate(lastModified)}</span>
        </div>
      </div>
    </div>
  )
}

export default CveCard

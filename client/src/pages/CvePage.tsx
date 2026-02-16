import type { CVE } from "../types/cve"

function CvePage({ cve }: { cve: CVE }) {
  return (
    <div>
      <h1> {cve.cveId} </h1>
      <p> {cve.descriptions[0].value} </p>
      <p> {cve.published.toLocaleDateString()} </p>
      <p> {cve.lastModified.toLocaleDateString()} </p>
      <p> {cve.vulnStatus} </p>
    </div>
  )
}

export default CvePage

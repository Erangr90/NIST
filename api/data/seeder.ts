import CVE from "../src/models/CVE"
import data from "./data.json"
import connectDB from "../src/config/db"

const cveData = JSON.parse(JSON.stringify(data))

const seed = async () => {
  for (const cve of cveData) {
    try {
      var temp = await CVE.create({
        cveId: cve.cve.id,
        sourceIdentifier: cve.cve.sourceIdentifier,
        published: cve.cve.published,
        lastModified: cve.cve.lastModified,
        vulnStatus: cve.cve.vulnStatus,
        descriptions: cve.cve.descriptions,
        metrics: cve.cve.metrics,
        weaknesses: cve.cve.weaknesses,
        configurations: cve.cve.configurations,
        references: cve.cve.references,
        vendorComments: cve.cve.vendorComments,
        evaluatorComment: cve.cve.evaluatorComment,
        evaluatorSolution: cve.cve.evaluatorSolution,
        evaluatorImpact: cve.cve.evaluatorImpact,
        cveTags: cve.cve.cveTags,
      })
      console.log(`${temp.cveId} saved`)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.log(error)
    }
  }
}

;(async () => {
  await connectDB()
  await seed()
})()

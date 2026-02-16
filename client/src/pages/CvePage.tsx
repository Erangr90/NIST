import type { CVE } from "../types/cve"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCVEById } from "../slices/cve/cveActions"
import type { AppDispatch, RootState } from "../store"
import Loader from "../components/Loader"
import { useParams } from "react-router-dom"
import "../styles/cvePage.css"

function CvePage() {
  const { cveId } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { loading } = useSelector((state: RootState) => state.cve)
  const [cve, setCve] = useState<CVE | null>(null)

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  useEffect(() => {
    const fetchCve = async () => {
      try {
        const data = await dispatch(
          getCVEById({ cveId: cveId as string }),
        ).unwrap()
        setCve(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCve()
  }, [cveId, dispatch])

  if (!cve) {
    return <div>No CVE found</div>
  }
  const metric =
    cve.metrics.cvssMetricV40?.[0] ||
    cve.metrics.cvssMetricV31?.[0] ||
    cve.metrics.cvssMetricV30?.[0] ||
    cve.metrics.cvssMetricV2?.[0]

  if (loading) {
    return <Loader loading={loading} />
  }
  return (
    <div>
      <div className="showcase">
        <h1>{cve.cveId} </h1>
        <p>
          {" "}
          <b> Source Identifier: </b> {cve.sourceIdentifier}{" "}
        </p>
        <p> {cve.descriptions[0].value} </p>
        <p>
          {" "}
          <b> Published: </b> {formatDate(cve.published)}{" "}
        </p>
        <p>
          {" "}
          <b> Last Modified: </b> {formatDate(cve.lastModified)}{" "}
        </p>
      </div>

      <div className="cve-page">
        <div className="col">
          <p>
            {" "}
            <b> Vulnerability Status: </b> {cve.vulnStatus}{" "}
          </p>
          <p>
            {" "}
            <b> Base Score: </b> {metric?.cvssData?.baseScore || "N/A"}{" "}
          </p>
          <p>
            {" "}
            <b> Access Vector: </b>{" "}
            {metric?.cvssData?.accessVector || "N/A"}{" "}
          </p>
          <p>
            {" "}
            <b> Access Complexity: </b>{" "}
            {metric?.cvssData?.accessComplexity || "N/A"}{" "}
          </p>
          <p>
            {" "}
            <b> Authentication: </b>{" "}
            {metric?.cvssData?.authentication || "N/A"}{" "}
          </p>
          <p>
            <b> Confidentiality Impact: </b>
            {metric?.cvssData?.confidentialityImpact || "N/A"}
          </p>
        </div>

        <div className="col">
          <p>
            {" "}
            <b> Integrity Impact: </b>{" "}
            {metric?.cvssData?.integrityImpact || "N/A"}{" "}
          </p>
          <p>
            <b> Availability Impact: </b>{" "}
            {metric?.cvssData?.availabilityImpact || "N/A"}
          </p>
          <p>
            {" "}
            <b> Base Severity: </b> {metric?.baseSeverity || "N/A"}{" "}
          </p>
          <p>
            {" "}
            <b> Exploitability Score: </b>{" "}
            {metric?.exploitabilityScore || "N/A"}{" "}
          </p>
          <p>
            {" "}
            <b> Impact Score: </b> {metric?.impactScore || "N/A"}{" "}
          </p>
          <div>
            <b> Weaknesses: </b>
            <ul>
              {cve.weaknesses.map((weakness, index) => (
                <li key={index}>{weakness.description[0].value}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer">
        <b> References: </b>
        <ul>
          {cve.references.map((reference, index) => (
            <li key={index}>
              {" "}
              <a href={reference.url} target="_blank">
                {reference.url}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CvePage

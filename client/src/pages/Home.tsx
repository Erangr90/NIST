import CveCard from "../components/CveCard"
import type { CVE } from "../types/cve"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCves } from "../slices/cve/cveActions"
import Loader from "../components/Loader"
import "../styles/home.css"
import type { AppDispatch, RootState } from "../store"

function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { loading } = useSelector((state: RootState) => state.cve)
  const [cves, setCves] = useState<CVE[]>([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchCves = async () => {
      const data = await dispatch(getCves({ page })).unwrap()
      setCves(data)
    }
    fetchCves()
  }, [page, dispatch])

  if (loading) {
    return <Loader loading={loading} />
  }

  return (
    <div className="home-div">
      <div className="home-showcase">
        <h1 className="home-title">NIST CVEs</h1>
        <p>
          National Institute of Standards and Technology Common Vulnerabilities
          and Exposures
        </p>
      </div>

      {cves.map((cve) => (
        <CveCard key={cve.cveId} cve={cve} />
      ))}
      {page > 1 && <button onClick={() => setPage(page - 1)}>Previous</button>}
      {page < 10 && <button onClick={() => setPage(page + 1)}>Next</button>}
    </div>
  )
}

export default Home

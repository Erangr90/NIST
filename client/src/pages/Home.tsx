import CveCard from "../components/CveCard"
import type { CVE } from "../types/cve"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCves } from "../slices/cve/cveActions"
import { useNavigate } from "react-router-dom"
import Loader from "../components/Loader"
import "../styles/home.css"
import type { AppDispatch, RootState } from "../store"

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { loading } = useSelector((state: RootState) => state.cve)
  const [cves, setCves] = useState<CVE[]>([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchCves = async () => {
      const data = await dispatch(getCves({ page })).unwrap()
      setCves(data)
    }
    console.log(page)
    fetchCves()
  }, [page, dispatch])

  if (loading) {
    return <Loader loading={loading} />
  }

  return (
    <div className="home-div">
      {cves.map((cve) => (
        <CveCard key={cve.cveId} cve={cve} />
      ))}
      {page > 1 && <button onClick={() => setPage(page - 1)}>Previous</button>}
      {page < 10 && <button onClick={() => setPage(page + 1)}>Next</button>}
    </div>
  )
}

export default Home

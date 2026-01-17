import type { CSSProperties } from "react"
import { ClipLoader } from "react-spinners"

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
}

function Loader({ loading }: { loading: boolean }) {
  const color = "#ffffff"
  return (
    <ClipLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  )
}

export default Loader

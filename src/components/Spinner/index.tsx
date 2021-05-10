import { FaJediOrder } from "react-icons/fa"

export const Spinner = (): JSX.Element => (
  <div className="spinner-container">
    <FaJediOrder className="spinner" />
    <h1>Loading...</h1>
  </div>
)

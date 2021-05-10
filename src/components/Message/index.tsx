type Props = {
  messageText: string
}

export const Message = ({ messageText }: Props): JSX.Element => (
  <div className="message-container">
    <h2>{messageText}</h2>
  </div>
)

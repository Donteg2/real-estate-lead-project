interface Props {
  onSelect: (text: string) => void
  disabled?: boolean
}

const SUGGESTIONS = [
  'Looking for a 3-bedroom apartment in Lekki around ₦85m to buy within 2 months',
  'I want to rent a 2-bedroom flat in Ikeja GRA with a budget of ₦8m per year',
  'Interested in 2 plots of commercial land in Epe for investment',
]

export function ChatSuggestions({ onSelect, disabled }: Props) {
  return (
    <div className="suggestions">
      <p className="suggestions-label">Try one of these:</p>
      <div className="suggestions-list">
        {SUGGESTIONS.map((text) => (
          <button
            key={text}
            type="button"
            className="suggestion-chip"
            disabled={disabled}
            onClick={() => onSelect(text)}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  )
}

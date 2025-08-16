export default function WarroomLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="warroom-container">
      {children}
    </div>
  )
}
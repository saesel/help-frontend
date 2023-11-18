// eslint-disable-next-line react/prop-types
export default function NotificationModal({ message }) {
  return (
    <div className="fixed left-0 top-0 w-full">
      <div className="w-full bg-red-300 p-4 text-center shadow-sm">
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
}

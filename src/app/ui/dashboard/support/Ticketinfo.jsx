import SupportTicket from "./SupportTicket";
import VisitorInfo from "./VisitorInfo";
export default function Ticketinfo() {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div>
            <SupportTicket/>
        </div>
        <div>
            <VisitorInfo/>
        </div>
      </div>
    )
}
  
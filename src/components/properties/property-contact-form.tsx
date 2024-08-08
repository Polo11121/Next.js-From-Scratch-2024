import { Input } from "@/components/input";
import { Textarea } from "@/components/text-area";

export const PropertyContactForm = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
    <form className="flex flex-col gap-y-4">
      <Input
        labelText="Name:"
        type="text"
        id="name"
        name="name"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        labelClassName="text-sm"
        placeholder="Enter your name"
      />
      <Input
        labelText="Email:"
        type="email"
        id="email"
        name="email"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        labelClassName="text-sm"
        placeholder="Enter your email"
      />

      <Input
        labelText="Phone:"
        type="phone"
        id="phone"
        name="phone"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        labelClassName="text-sm"
        placeholder="Enter your phone"
      />

      <Textarea
        labelText="Message:"
        id="message"
        name="message"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline resize-none"
        labelClassName="text-sm"
        placeholder="Enter your message"
      />

      <div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
          type="submit"
        >
          <i className="fas fa-paper-plane mr-2"></i> Send Message
        </button>
      </div>
    </form>
  </div>
);

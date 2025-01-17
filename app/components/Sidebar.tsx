import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const trendingTopics = [
  "NextJS",
  "React",
  "TailwindCSS",
  "JavaScript",
  "TypeScript",
]

const suggestedUsers = [
  { username: "jane_doe", name: "Jane Doe" },
  { username: "john_smith", name: "John Smith" },
  { username: "alice_wonder", name: "Alice Wonder" },
]

export default function Sidebar() {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Trending Topics</h2>
        <ul>
          {trendingTopics.map((topic) => (
            <li key={topic} className="mb-1">
              <a href="#" className="text-blue-500 hover:underline">#{topic}</a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Suggested Users</h2>
        <ul>
          {suggestedUsers.map((user) => (
            <li key={user.username} className="flex items-center mb-2">
              <Avatar className="h-8 w-8 rounded-full mr-2">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.username}`} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm text-gray-500">@{user.username}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

